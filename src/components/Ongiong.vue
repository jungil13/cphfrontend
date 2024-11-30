<template>
  <div class="mt-16">
    <div class="relative flex flex-col items-center justify-center text-center py-24">
      <div class="bg-white shadow-black shadow-md rounded-lg p-8 w-full max-w-md md:w-1/2 lg:w-1/3 mb-8 transform transition-transform duration-300 hover:scale-105">
        <h1 class="text-2xl font-bold text-gray-800 mb-4">Thank You for Adopting!</h1>
        <p class="text-gray-600 mb-6">
          We will review your application and contact you via email or phone number when your application is successful.
        </p>
        <p class="text-gray-500 italic">Please check your email or phone regularly for updates.</p>
      </div>
      <RouterLink to="/browse" class="bg-blue-600 rounded-lg px-6 py-3 text-white font-semibold transform transition-transform duration-300 hover:bg-blue-700 hover:scale-110 mt-6">
        Done
      </RouterLink>
    </div>
  </div>
  </template>
  
  <script>
  export default {
    // Component logic (if any) goes here
  };
  </script>
  
  <style scoped>
  /* Optional: Add any scoped styles for this component */
  </style>
  