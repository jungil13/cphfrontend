<template>
  <div class="min-h-screen mt-24">
    <!-- Hero Section -->
    <div class="bg-teal-50 flex flex-col md:flex-row items-center justify-center text-center py-12">
      <div class="flex flex-col md:flex-row items-center justify-center text-center">
        <div class="animate-fade-in">
          <h1 class="text-3xl sm:text-3xl font-extrabold mb-2 text-teal-800">
            Adopt a Pet.
          </h1>
          <h2 class="text-4xl sm:text-5xl font-extrabold mb-2 text-gray-700">
            Find the right friend
          </h2>
          <h2 class="text-4xl sm:text-5xl font-extrabold mb-12 md:mb-0 text-orange-500">for you.</h2>
          <div class="mt-16"></div>
        </div>
        <img src="/find.png" alt="Happy family with a pet" class="ml-6" width="500">
      </div>
    </div>
    <!-- Filters and Pet Cards -->
    <div class="px-5 py-6">
      <FilterPets @filteredPets="updatePets" />
      <div class="container mx-auto">
        <h2 class="text-4xl font-extrabold text-center text-teal-900 mb-6">Browse for Pets</h2>
        <div class="flex justify-center w-full bg-teal-50 p-6 ">
          <RouterLink to="/addpet" type="submit"
            class="transition-transform duration-300 hover:scale-105 text-center bg-blue-600 text-white font-bold text-lg rounded-full shadow shadow-black py-2 p-8 border border-white">
            Add a Pet
          </RouterLink>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="pet in pets" :key="pet.id" class="animate-fade-in relative bg-white shadow-lg shadow-black border border-gray-300 rounded-lg overflow-hidden 
                      transition-transform duration-300 hover:scale-105 max-w-sm mx-auto my-6 p-6">
            <div class="relative group">
              <img :src="getPetPhotoUrl(pet.photoUrl[0])" alt="Animal Image"
                class="w-full h-48 object-cover rounded-t-lg">
              <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="flex space-x-2">
                  <img v-for="(photo, index) in pet.photoUrl" :key="index" :src="getPetPhotoUrl(photo)"
                    class="w-20 h-20 object-cover rounded-full border-2 border-white" />
                </div>
              </div>
            </div>

            <div class="p-6 text-center">
              <span :class="pet.status === 'Adopted' ? 'bg-red-500' : 'bg-green-500'"
                class="absolute top-4 left-4 text-white font-semibold px-3 py-1 rounded shadow-md">
                {{ pet.status }}
              </span>

              <h3 class="text-xl font-extrabold text-teal-900 mb-6">Pet Name: {{ pet.name }}</h3>
              <p class="text-teal-800 font-extrabold mb-2">Breed: <span class="text-gray-800 font-bold">{{ pet.breed
                  }}</span></p>
              <p v-if="pet.status === 'Adopted'" class="text-red-800 font-extrabold">New Owner:
                <span class="text-blue-800 font-semibold">{{ pet.newOwnerFullName }}</span>
              </p>
              <p v-else-if="pet.status === 'Available'" class="text-teal-800 font-extrabold">Current Owner:
                <span class="text-gray-800 font-semibold">{{ pet.ownerFullName }}</span>
              </p>

              <p class="text-teal-800 font-extrabold">Date Added: <span class="text-gray-800 font-semibold">{{
                  pet.dateadded }}</span></p>

              <router-link :to="`/petdetails/${pet.id}`"
                class="mt-4 inline-block text-white font-bold hover:underline bg-slate-800 p-2 rounded-xl">
                View Details
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8 mt-4">
      <div
        class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        <div class="flex items-center mb-4 md:mb-0">
          <img src="/cphlogo.png" alt="Cordova Pet Hub Logo" class="rounded-full w-24 h-24 mr-3 object-cover" />
          <div>
            <h5 class="text-lg font-semibold">Pet Adoption</h5>
            <p class="mt-2 text-sm">Contact us: <a href="mailto:cph@gmail.com"
                class="underline hover:text-gray-400">cph@gmail.com</a></p>
          </div>
        </div>
        <div class="text-sm space-y-2 md:space-y-0 md:block">
          <p>© 2024 Cordova Pet Hub. All rights reserved.</p>
          <p>Developed by: Team Alas</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import instance from '@/utils/axios';
import FilterPets from '@/components/FilterPets.vue';
import CarouselComponent from '@/components/CarouselComponent.vue';
import Swal from 'sweetalert2'; // Ensure SweetAlert2 is installed
import { RouterLink } from 'vue-router';

export default {
  components: {
    CarouselComponent,
    FilterPets
  },
  data() {
    return {
      pets: []
    };
  },

  async created() {
    try {
      const response = await instance.get('/api/pets/approved', {});
      this.pets = response.data.map(pet => ({
        id: pet.PetID,
        photoUrl: pet.PetPhoto ? JSON.parse(pet.PetPhoto) : [], // Ensure photos are parsed if they are stored as JSON
        name: pet.PetName,
        breed: pet.Breed,
        status: pet.Status,
        ownerFullName: pet.ownerFullName || 'Unknown',
        newOwnerFullName: pet.newOwnerFullName || 'Unknown', // Add newOwnerFullName
        dateadded: pet.DateAdded
      }));
    } catch (error) {
      console.error('There was an error fetching the pets:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch approved pet data. Please try again later.',
      });
    }
  },

  methods: {
    getPetPhotoUrl(photoPath) {
      return photoPath ? `http://192.168.67.185:3000/${photoPath}` : '/default-image.jpg'; // Replace with a valid default image path
    },

    updatePets(filteredPets) {
      this.pets = filteredPets.map(pet => ({
        id: pet.PetID,
        photoUrl: pet.PetPhoto ? JSON.parse(pet.PetPhoto) : [],
        name: pet.PetName,
        breed: pet.Breed,
        status: pet.Status,
        ownerFullName: pet.ownerFullName || 'Unknown',
        newOwnerFullName: pet.newOwnerFullName || 'Unknown', // Add newOwnerFullName
        dateadded: pet.DateAdded
      }));
    }
  }
};
</script>

<style>
.animate-fade-in {
  animation: fadeIn 1.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>