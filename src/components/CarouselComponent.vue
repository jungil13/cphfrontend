<template>
    <div class="carousel w-full relative overflow-hidden mt-12">
      <!-- Carousel Wrapper -->
      <div class="flex transition-transform duration-300">
        <div class="w-full flex-shrink-0">
          <img src="/love.jpg" class="w-full h-80 object-cover"/>
          <!-- Text Overlay -->
          <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-65 text-white p-4">
          <p class="text-5xl font-extrabold font-serif">Welcome to Cordova Pet Hub<span class="material-symbols-outlined ml-2">sound_detection_dog_barking</span></p>
        </div>
        </div>
      </div>
      <!-- Navigation Buttons -->
      <!-- <button @click="prevSlide" class="absolute top-1/2 left-3 transform -translate-y-1/2 px-4 py-2 bg-transparent text-white border rounded-full hover:bg-slate-700">
        ‹
      </button>
      <button @click="nextSlide" class="absolute top-1/2 right-3 transform -translate-y-1/2 px-4 py-2 bg-transparent text-white border rounded-full hover:bg-slate-700">
        ›
      </button> -->
    </div>
  </template>
  
  <script>
  </script>
  
  <style scoped>
  </style>
  