<template>
    <div class="mt-16">
    <div class="w-full max-w-4xl mx-auto bg-white p-5 rounded-lg shadow-md py-24 text-center">
      <h1 class="text-2xl font-extrabold mb-4">Found Pet Details</h1>
      
      <!-- Pet Images -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <img 
          v-for="(image, index) in petImages" 
          :key="index" 
          :src="image" 
          alt="Pet Picture" 
          class="w-full h-48 object-cover rounded-md cursor-pointer"
          @click="openModal(image)"
        >
      </div>
  
      <!-- Pet Information -->
      <div class="mb-6">
        <p class="text-lg font-bold text-gray-800">Pet Name: <span class="font-normal">Althea</span></p>
        <p class="text-lg font-bold text-gray-800">Reported By: <span class="font-normal">John Doe</span></p>
        <p class="text-lg font-bold text-gray-800">Status: <span class="font-normal text-green-600">Found</span></p>
        <p class="text-lg font-bold text-gray-800">Sex: <span class="font-normal">Male</span></p>
        <p class="text-lg font-bold text-gray-800">Type: <span class="font-normal">Cat</span></p>
        <p class="text-lg font-bold text-gray-800">Breed: <span class="font-normal">Not Specified</span></p>
        <p class="text-lg font-bold text-gray-800">Date Last Seen: <span class="font-normal">1/10/24</span></p>
        <p class="text-lg font-bold text-gray-800">Area Last Seen: <span class="font-normal">Roro Port</span></p>
        <p class="text-lg font-bold text-gray-800">Description: <span class="font-normal">Contact finder through phone or email</span></p>
      </div>
  
      <!-- Contact Button -->
      <button @click="toggleContact" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
        Show Reporter Details
      </button>
  
      <!-- Reporter Details -->
      <div v-if="showContact" class="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg">
        <p class="font-semibold">Reporter: John Doe</p>
        <p>Mobile Number: <a :href="'tel:' + reporterPhone" class="text-blue-500 hover:underline">{{ reporterPhone }}</a></p>
        <p>Email: <a :href="'mailto:' + reporterEmail" class="text-blue-500 hover:underline">{{ reporterEmail }}</a></p>
      </div>
  
      <!-- Modal for Viewing Image -->
      <div v-if="modalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="closeModal">
        <div class="relative bg-white p-4 rounded-lg max-w-4xl mx-4" @click.stop>
          <img :src="currentImage" alt="Pet Picture" class="w-full h-auto object-cover rounded-md">
        </div>
      </div>
    </div>
</div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // Array of pet images
        petImages: [
          '/bella.jpg',
          'https://via.placeholder.com/150',
          'https://via.placeholder.com/150',
          'https://via.placeholder.com/150'
        ],
        showContact: false, // Control visibility of reporter details
        modalOpen: false, // Control visibility of the image modal
        currentImage: '', // Store the currently clicked image
        reporterPhone: '09568692103',
        reporterEmail: 'Johndoe@gmail.com'
      };
    },
    methods: {
      // Toggle the visibility of contact details
      toggleContact() {
        this.showContact = !this.showContact;
      },
      // Open the modal and set the current image
      openModal(image) {
        this.currentImage = image;
        this.modalOpen = true;
      },
      // Close the modal
      closeModal() {
        this.modalOpen = false;
        this.currentImage = '';
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any additional styling if necessary */
  </style>
  