<template>
    <div class="mt-16">
      <div class="animate-fade-in mx-auto p-8 rounded-lg py-28">
      <div class="text-center mb-10">
        <h1 class="text-4xl font-bold text-gray-800">About Us</h1>
        <p class="mt-2 text-gray-600 text-lg font-bold">
          Welcome to Cordova Pet Hub – your one-stop destination for pet adoption, lost and found pets, and a vibrant pet forum.
        </p>
      </div>
  
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-white shadow-black p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p class="text-gray-700 font-bold">
            At Cordova Pet Hub, we believe in finding loving homes for every pet and reuniting lost pets with their families. Our mission is to create a compassionate community for pet lovers and provide the tools needed to support pets in need.
          </p>
        </div>
  
        <div class="bg-white shadow-black p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Our Services</h2>
          <ul class="list-disc list-inside text-gray-700 font-bold">
            <li class="mb-2">Pet Adoption: Browse and adopt pets looking for their forever homes.</li>
            <li class="mb-2">Lost & Found: Report and search for lost pets in your area.</li>
            <li class="mb-2">Pet Forum: Connect with fellow pet enthusiasts and share tips, stories, and advice.</li>
          </ul>
        </div>
      </div>
  
      <div class="mt-8 text-center">
        <h2 class="text-2xl text-gray-800 mb-4 font-bold">Join Us</h2>
        <p class="text-gray-700 mb-4 font-bold">
          Become a part of our community and make a difference in the lives of pets and their families. Together, we can create a better world for our furry friends.
        </p>
        <RouterLink to="/contact" class="inline-block bg-yellow-300 text-black font-bold py-2 px-4 rounded-lg shadow-md shadow-black hover:bg-blue-600 transform transition-transform duration-300 hover:scale-105">
          Get In Touch
        </RouterLink>
      </div>
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
  export default {
    name: 'AboutPage',
  }
  </script>
  
  <style scoped>
  /* Add any additional custom styles here */
  </style>
  