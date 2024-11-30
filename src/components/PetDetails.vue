<template>
  <div class="container mx-auto px-4 py-8 mt-24">
    <div v-if="pet" class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
      <!-- Left Section: Pet Images and Vaccination Certificates -->
      <div class="bg-white p-6 shadow-lg shadow-black rounded space-y-8">
        <div>
          <h2 class="text-4xl text-teal-800 font-extrabold text-center">Pet Images</h2>
          <div class="grid grid-cols-2 gap-4 mt-6">
            <div v-for="(photo, index) in pet.PetPhoto" :key="index"
              class="w-full h-40 bg-gray-200 rounded-lg overflow-hidden border-lg border border-black">
              <img :src="getPetPhotoUrl(photo)" alt="Pet photo" class="object-cover w-full h-full cursor-pointer"
                @click="openPhotoModal(getPetPhotoUrl(photo))">
            </div>
          </div>
        </div>
        <div>
          <h2 class="text-4xl text-teal-800  font-extrabold text-center">Vaccination Certificates</h2>
          <div class="grid grid-cols-2 gap-4 mt-6">
            <div v-for="(certificate, index) in pet.VaccinationCertificate" :key="index"
              class="w-full h-40 bg-gray-200 rounded-lg overflow-hidden border-lg border border-black">
              <img :src="getPetPhotoUrl(certificate)" alt="Vaccination certificate"
                class="object-cover w-full h-full cursor-pointer" @click="openPhotoModal(getPetPhotoUrl(certificate))">
            </div>
          </div>
        </div>
      </div>

      <!-- Middle Section: Pet Details -->
      <div class="md:col-span-2 bg-white p-6 shadow-lg shadow-black rounded">
        <h2 class="text-3xl font-extrabold text-teal-800 mb-6">Pet Details <span class="material-symbols-outlined">
            pets
          </span></h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p class="text-xl font-bold mb-2">Pet Name: <span class="text-xl text-teal-700">{{ pet.PetName }}</span></p>
            <p class="text-xl poppins-semibold mb-2">
              Pet Status:
              <span :class="pet.Status === 'Adopted' ? 'text-red-500' : 'text-green-500'">
                ({{ pet.Status }})
              </span>
            </p>
            <p class="text-xl font-bold mb-4">Pet Owner: <span class="text-teal-700 p-1 cursor-pointer"
                @click="fetchUserDetails(pet.OwnerID)">{{ pet.ownerFullName || 'Unknown' }}</span></p>
            <!-- New Owner Display -->
            <p v-if="pet.Status === 'Adopted'" class="text-xl text-red-700 font-bold mb-4">New Owner: 
              <span class="text-blue-700 p-1 cursor-pointer">{{ pet.newOwnerFullName || 'Not Available' }}</span>
            </p>
            <p class="text-xl font-bold mb-2">Date Added: <span class="text-xl text-teal-700">{{ pet.DateAdded }}</span></p>
          </div>
          <div>
            <h2 class="text-4xl text-teal-800  font-extrabold">Reason For Rehoming 🐾</h2>
            <p class="text-gray-800 text-lg leading-relaxed font-medium whitespace-pre-line">{{ pet.Description }}</p>
            <div class="mt-6 mb-8">
              <router-link :to="`/questions/${pet.PetID}`"
                class="bg-teal-800 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-lg shadow transform transition-transform duration-300 hover:scale-110 mt-4"
                v-if="pet.Status !== 'Adopted'" 
              >
                Apply to Adopt
              </router-link>
              <span v-else class="text-gray-500 py-2 px-6 rounded-lg mt-4">Apply to Adopt (Not Available)</span>
            </div>
          </div>
        </div>
        <div class="">
          <h1 class="text-2xl font-extrabold text-teal-800 mb-4">About</h1>
          <h1 class="text-lg font-semibold font-serif text-teal-800">Type</h1>
          <p class="text-lg font-semibold">{{ pet.Type }}</p>
          <h1 class="text-lg font-semibold font-serif text-teal-800">Pet ID</h1>
          <p class="text-lg font-semibold">{{ pet.PetID }}</p>
          <h1 class="text-lg font-semibold font-serif text-teal-800">Breed</h1>
          <p class="text-lg font-semibold">{{ pet.Breed }}</p>
          <h1 class="text-lg font-semibold font-serif text-teal-800">Species</h1>
          <p class="text-lg font-semibold">{{ pet.Species }}</p>
          <h1 class="text-lg font-semibold font-serif text-teal-800">Markings</h1>
          <p class="text-lg font-semibold">{{ pet.Markings }}</p>
          <h1 class="text-lg font-semibold font-serif text-teal-800">Sex</h1>
          <p class="text-lg font-semibold">{{ pet.Sex }}</p>
          <h1 class="text-lg font-semibold font-serif text-teal-800">Birthday</h1>
          <p class="text-lg font-semibold">{{ pet.Birth }}</p>
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      <p>Loading...</p>
    </div>
  </div>
  <!-- Photo Preview Modal -->
  <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
    <div class="bg-transparent rounded-lg p-6 relative max-w-lg w-full">
      <button @click="closePhotoModal"
        class="absolute top-6 right-6 border-white text-white py-2 px-4 rounded-full font-extrabold"><span
          class="material-symbols-outlined text-4xl">
          close
        </span></button>
      <img :src="currentImage" alt="Preview" class="w-full h-auto max-h-[80vh] object-contain">
    </div>
  </div>

  <!-- User Details Modal -->
  <div v-if="isUserModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-lg p-6 relative max-w-md w-full">
      <button @click="closeUserModal"
        class="absolute top-2 right-2 bg-teal-800 text-white py-2 px-4 rounded-full font-extrabold">Close</button>
      <h2 class="text-xl font-bold mb-4">Owner Details</h2>
      <div class="flex items-center mb-4">
        <!-- Clickable User Profile Photo -->
        <img :src="getProfilePhotoUrl(userDetails.ProfilePhoto)" @click="openProfilePhotoModal" alt="Profile Photo"
          class="w-16 h-16 object-cover rounded-full border-2 border-gray-300 mr-4 cursor-pointer">
        <div>
          <p><strong>Full Name:</strong> {{ userDetails.Fullname }}</p>
          <p><strong>Email:</strong> {{ userDetails.Email }}</p>
          <p><strong>Contact:</strong> {{ userDetails.Contactnumber }}</p>
          <p><strong>Address:</strong> {{ userDetails.Address }}</p>
          <!-- Additional fields can be added here -->
        </div>
      </div>
    </div>
  </div>
  <div v-if="isProfilePhotoModalOpen"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
    <div class="bg-transparent rounded-lg p-6 relative max-w-lg w-full">
      <button @click="closeProfilePhotoModal"
        class="absolute top-8 right-10 text-white py-2 px-4 rounded-full font-extrabold"><span
          class="material-symbols-outlined text-4xl">
          close
        </span></button>
      <img :src="getProfilePhotoUrl(userDetails.ProfilePhoto)" alt="Profile Photo Preview"
        class="w-full h-auto max-h-[80vh] object-contain">
    </div>
  </div>
  <footer class="bg-gray-800 text-white py-8 mt-24">
    <div class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
      <div class="text-center md:text-left mb-4 md:mb-0">
        <h5 class="text-lg font-semibold">Pet Adoption</h5>
        <p class="mt-2 text-sm">Contact us: <a href="mailto:info@petadoption.com"
            class="underline hover:text-gray-400">info@petadoption.com</a></p>
      </div>
      <div class="text-center md:text-right text-sm">
        <p>© 2024 Pet Adoption. All rights reserved.</p>
        <p>Developed by: Jun Gil</p>
      </div>
    </div>
  </footer>
</template>

<script>
import instance from '@/utils/axios';

export default {
  data() {
    return {
      pet: null,
      currentImage: '',
      isModalOpen: false,
      isUserModalOpen: false,
      isProfilePhotoModalOpen: false, 
      userDetails: {}
    };
  },
  created() {
    this.fetchPetDetails(this.$route.params.id);
  },
  methods: {
    async fetchPetDetails(petId) {
      try {
        const response = await instance.get(`/api/pets/${petId}`);
        this.pet = response.data;
        this.pet.PetPhoto = Array.isArray(this.pet.PetPhoto) ? this.pet.PetPhoto : [this.pet.PetPhoto];
        this.pet.VaccinationCertificate = Array.isArray(this.pet.VaccinationCertificate) ? this.pet.VaccinationCertificate : [this.pet.VaccinationCertificate];
      } catch (error) {
        console.error('Error fetching the pet details:', error);
      }
    },
    getPetPhotoUrl(photoPath) {
      return photoPath ? `http://192.168.67.185:3000/${photoPath}` : '/path/to/default/image.jpg';
    },
    getProfilePhotoUrl(photoPath) {
      return photoPath ? `http://192.168.67.185:3000/${photoPath}` : '/path/to/default/image.jpg';
    },
    openPhotoModal(imageSrc) {
      this.currentImage = imageSrc;
      this.isModalOpen = true;
    },
    closePhotoModal() {
      this.isModalOpen = false;
    },
    async fetchUserDetails(ownerId) {
      try {
        const response = await instance.get(`/api/users/${ownerId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.userDetails = response.data;
        this.isUserModalOpen = true;
      } catch (error) {
        console.error('Error fetching user details:', error);
        alert('Failed to fetch user details. Ensure you are logged in.');
      }
    },
    closeUserModal() {
      this.isUserModalOpen = false;
    },
    openProfilePhotoModal() {
      this.isProfilePhotoModalOpen = true;
    },
    closeProfilePhotoModal() {
      this.isProfilePhotoModalOpen = false;
    },
  }
};
</script>