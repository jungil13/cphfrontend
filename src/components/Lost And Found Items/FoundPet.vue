<template>
    <LostFound/>
    <div class="w-full mx-auto bg-white border border-gray-400 p-5 rounded-lg shadow-md">
      <h1 class="text-2xl font-semibold mb-4 text-center md:text-left">Report Found Pet</h1>
  
      <!-- Last Seen Location -->
      <div class="mb-4">
        <label for="last-seen-location" class="block text-gray-700 font-medium mb-2">Last Seen Location</label>
        <input type="text" id="last-seen-location" placeholder="Enter Location" class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500">
      </div>
  
      <!-- Add a Photo -->
      <div class="mb-4">
        <label for="photo" class="block text-gray-700 font-medium mb-2">Add a Photo</label>
        <input type="file" id="photo" class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500">
      </div>
  
      <!-- Sex -->
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2">Sex</label>
        <div class="flex flex-col md:flex-row md:items-center">
          <label class="mb-2 md:mb-0 md:mr-4">
            <input type="radio" name="sex" value="male" class="mr-2"> Male
          </label>
          <label>
            <input type="radio" name="sex" value="female" class="mr-2"> Female
          </label>
        </div>
      </div>
  
      <!-- Description -->
      <div class="mb-4">
        <label for="description" class="block text-gray-700 font-medium mb-2">Description</label>
        <textarea id="description" rows="4" placeholder="Enter a description" class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
      </div>
  
      <!-- Your Name -->
      <div class="mb-4">
        <label for="name" class="block text-gray-700 font-medium mb-2">Your Name</label>
        <input type="text" id="name" placeholder="Enter your name" class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500">
      </div>
  
      <!-- Email -->
      <div class="mb-4">
        <label for="email" class="block text-gray-700 font-medium mb-2">Email</label>
        <input type="email" id="email" placeholder="Enter your email" class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500">
      </div>
  
      <!-- Phone Number -->
      <div class="mb-4">
        <label for="phone" class="block text-gray-700 font-medium mb-2">Phone Number</label>
        <input type="tel" id="phone" placeholder="Enter your phone number" class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500">
      </div>
  
      <!-- Buttons -->
      <div class="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0">
        <button class="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600">Cancel</button>
        <button class="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700">Submit</button>
      </div>
    </div>
  </template>
  
  <script>
  // Import the required components
  import LostFound from '@/views/user/LostFound.vue';
  
  export default {
    components: {
      LostFound
    }
  };
  </script>
  
  <style scoped>
  /* Add any additional styling if necessary */
  </style>
  