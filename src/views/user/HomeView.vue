<template>
  <div class="relative h-screen mt-24">
    <div class="bg-teal-50 flex flex-col md:flex-row items-center justify-center text-center py-12">
      <!-- Text Content on the left -->
      <div class="flex flex-col md:flex-row items-center justify-center text-center">
        <!-- Text Content on the left -->
        <div class="animate-fade-in">
          <h1 class="text-4xl sm:text-5xl font-extrabold mb-2 text-teal-800">
            There's no place like home.
          </h1>
          <h2 class="text-3xl sm:text-4xl font-bold mb-2">
            Discover a world filled with adorable pets
          </h2>
          <h2 class="text-3xl sm:text-4xl font-bold mb-12 md:mb-0 text-orange-500">𝒞𝑜𝓇𝒹𝑜𝓋𝒶 𝒫𝑒𝓉 𝐻𝓊𝒷 <span
              class="text-teal-800 font-bold">is a best choice for you</span></h2>
          <div class="mt-16">
            <RouterLink to="/browse"
              class="bg-orange-500 text-white font-bold py-3 px-4 rounded-full shadow-lg hover:bg-orange-600 transition duration-300">
              See How It Works
            </RouterLink>
          </div>
        </div>
     
        <img src="/vet.png" alt="Happy family with a pet" class="ml-6" width="500">
      </div>
    </div>
    <section>
      <div class="bg-teal-50 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-extrabold text-teal-900 text-center mb-12">𝗗𝗶𝗳𝗳𝗲𝗿𝗲𝗻𝘁 𝗪𝗮𝘆𝘀 𝘁𝗼 𝗛𝗲𝗹𝗽 𝗢𝘂𝗿 𝗙𝘂𝗿𝗿𝘆 𝗙𝗿𝗶𝗲𝗻𝗱𝘀
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Card 1: Find a Pet -->
            <div
              class="shadow-lg shadow-black bg-white rounded-xl shadow px-6 py-8 hover:translate-y-1 transform transition duration-300 ease-in-out">
              <div class="flex flex-col items-center">
                <img src="https://home-home.org/assets/icon/paw.svg" alt="Find a Pet" class="w-16 h-16 mb-4">
                <h3 class="text-lg font-bold mb-2">Find a Pet</h3>
                <p class="text-gray-600 text-center mb-6">Looking for a new best friend? browse for pets
                  needing a new home or temporary foster care.</p>
                <router-link to="/browse"
                  class="bg-teal-800 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300">Browse
                  Pets</router-link>
              </div>
            </div>

            <!-- Card 2: Post a Pet -->
            <div
              class="shadow-lg shadow-black bg-white rounded-lg shadow px-6 py-8 hover:translate-y-1 transform transition duration-300 ease-in-out">
              <div class="flex flex-col items-center">
                <img src="https://home-home.org/assets/icon/home.svg" alt="Post a Pet" class="w-16 h-16 mb-4">
                <h3 class="text-lg font-bold mb-2">Post a Pet</h3>
                <p class="text-gray-600 text-center mb-6">Help your pet find a new home or temporary foster care by
                  creating a new profile.</p>
                <router-link to="/register"
                  class="bg-teal-800 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300">Register</router-link>
              </div>
            </div>

            <!-- Card 3: For Animal Shelters -->
            <div
              class="shadow-lg shadow-black bg-white rounded-lg shadow px-6 py-8 hover:translate-y-1 transform transition duration-300 ease-in-out">
              <div class="flex flex-col items-center">
                <img src="https://home-home.org/assets/icon/love.svg" alt="For Animal Shelters" class="w-16 h-16 mb-4">
                <h3 class="text-lg font-bold mb-2">Report a Pet</h3>
                <p class="text-gray-600 text-center mb-6">Help pets Find there way home and reunite with there owners.</p>
                <router-link to="/lostpet"
                  class="bg-teal-800 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300">Report Now</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="p-8 rounded-xl lg:mr-24 lg:ml-24 mb-8">
      <div class="text-center px-6 py-8">
        <h1 class="text-4xl font-extrabold text-teal-900 mb-8">About Us</h1>
        <p class="mt-2 font-semibold text-teal-900 text-lg mb-6 py-2 lg:mr-24 lg:ml-24">
          <span class="text-orange-600 font-bold">Welcome to Cordova Pet Hub</span> – your one-stop destination for pet adoption, lost and found pets, and a vibrant
          pet forum.
          At Cordova Pet Hub, we believe in finding loving homes for every pet and reuniting lost pets with their
          families. Our mission is to create a compassionate community for pet lovers and provide the tools needed
          to support pets in need.
        </p>
      </div>
    </section>
    <!-- Latest Pets Posted -->
    <section
      class="bg-teal-50 relative flex flex-col items-center justify-center text-center pt-7 py-6 lg:mr-24 lg:ml-24">
      <h2 class="text-4xl font-extrabold text-teal-900 mb-6">Latest Pets Posted</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full px-4 bg-teal-50 py-10">
        <div v-for="pet in latestPets" :key="pet.id"
          class="bg-white rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 shadow-black p-4">
          <div class="relative group">
            <img :src="getPetPhotoUrl(pet.photoUrl[0])" alt="Animal Image" class="w-full object-cover h-40">
            <!-- Reduced height to make card smaller -->
            <div
              class="absolute inset-0 bg-teal-500 bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="flex overflow-hidden">
                <img v-for="(photo, index) in pet.photoUrl" :key="index" :src="getPetPhotoUrl(photo)"
                  class="w-16 h-16 object-cover" />
              </div>
            </div>
          </div>
          <div>
            <p :class="pet.status === 'Adopted' ? 'bg-red-500' : 'bg-green-500'" class="absolute top-2 left-2 text-white font-semibold px-2 py-1 rounded">
            {{ pet.status }}
            </p>
            <h3 class="text-xl font-extrabold text-teal-900 mb-1">Pet Name: <span class="text-gray-600 text-md">{{ pet.name }}</span></h3>
            <h3 class="text-lg font-bold text-gray-700">Breed ({{ pet.breed }})</h3>
            <p class="text-gray-600 font-bold">Owner: <span
                class="text-teal-800 rounded-lg p-1 text-black font-semibold">{{ pet.ownerFullname }}</span></p>
            <p class="text-gray-600 font-bold">Sex: <span class="font-semibold">{{ pet.sex }}</span></p>
            <p class="font-bold text-teal-700 mb-6">Date Added : <span class="text-gray-800 font-semibold">{{ pet.dateadded }}</span></p>
            <router-link :to="`/petdetails/${pet.id}`"
              class="bg-teal-800 text-white px-4 py-2 rounded hover:bg-teal-700 mt-2 text-md font-semibold">View
              Details</router-link>
          </div>
        </div>
      </div>
      <!-- Right aligned View All button -->
      <div class="text-center w-full px-4">
        <router-link to="/browse"
          class="text-white bg-orange-600 font-bold py-3 px-2 rounded-full transform transition-transform duration-300 hover:scale-105">
          View All Pets
        </router-link>
      </div>
    </section>
    <section class="bg-teal-50 py-8 md:py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
    <!-- Image Section -->
    <div class="md:flex-1 mb-6 md:mb-0">
      <img src="/cutee.png" alt="Descriptive Alt Text" class="mx-auto rounded-lg " style="max-width: 90%; height: auto;">
    </div>

    <!-- Text Section -->
    <div class="md:flex-1">
      <h1 class="text-lg md:text-xl font-bold italic text-gray-800 text-center md:text-left mb-6">
        "The Pet Forum helps you discuss your concerns about raising a pet, offers advice on pet care, health, and training suggestions."
      </h1>
      <h1 class="text-lg md:text-xl font-semibold text-gray-800 text-center md:text-left mb-6">
        "Select your choice of category, General Pet Care, Health and Nutrition and Training and Behavior then start of adding a topic"
      </h1>
      <div class="text-center md:text-right">
        <router-link to="/general" class="bg-orange-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-orange-700 transition duration-300">
          Join the Pet Discussions
        </router-link>
      </div>
    </div>
  </div>
</section>
<section class="relative flex flex-col items-center justify-center text-center pt-7 p-6 py-6 lg:mr-24 lg:ml-24">
<LatestPosts />
</section>
<footer class="bg-gray-800 text-white py-8 mt-4">
  <div class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
    <div class="flex items-center mb-4 md:mb-0">
      <img src="/cphlogo.png" alt="Cordova Pet Hub Logo" class="rounded-full w-24 h-24 mr-3 object-cover" />
      <div>
        <h5 class="text-lg font-semibold">Pet Adoption</h5>
        <p class="mt-2 text-sm">Contact us: <a href="mailto:cph@gmail.com" class="underline hover:text-gray-400">cph@gmail.com</a></p>
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
<script setup>
// Import the Axios instance
import instance from '@/utils/axios';
import SweetAlert from 'sweetalert2';
import { ref, onMounted } from 'vue';
import LatestPosts from '@/components/LatestPosts.vue';

// Reactive state
const latestPets = ref([]);
const carouselItems = ref([/* existing carousel items */]);

// Fetch latest pets on component mount
onMounted(async () => {
  try {
    const response = await instance.get('/api/pets/pets/latest');
    latestPets.value = response.data.map(pet => ({
      id: pet.PetID,
      name: pet.PetName,
      sex: pet.Sex,
      breed: pet.Breed,
      status: pet.Status,
      description: pet.Description,
      photoUrl: pet.PetPhoto ? JSON.parse(pet.PetPhoto) : [],
      ownerFullname: pet.ownerFullName || 'Unknown',
      ownerId: pet.OwnerID,
      dateadded: pet.formattedDateAdded
    }));
  } catch (error) {
    SweetAlert.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to load latest pets. Please try again later.'
    });
    console.error('Error fetching latest pets:', error);
  }
});

// Methods
const getPetPhotoUrl = (photoPath) => {
  return photoPath ? `http://192.168.67.185:3000/${photoPath}` : '/path/to/default/image.jpg';
};

const goToSignUp = () => {
  // Navigate to the sign-up page
  router.push('/register');
};

const goToSignIn = () => {
  // Navigate to the sign-in page
  router.push('/login');
};
</script>
<style>
@media (max-width: 768px) {
  .md\:flex-row {
    flex-direction: column;
  }

  .md\:mr-6 {
    margin-right: 0;
  }
}

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