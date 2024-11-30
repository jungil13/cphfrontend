<template>
  <div class="mt-10">
    <div class="relative flex flex-col items-center justify-center text-center mb-12">
      <div class="relative w-full h-64">
        <img src="/forum.png" alt="Lost or Found Pets" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-black opacity-60"></div>
      </div>
    </div>

    <div class="relative flex flex-col items-center justify-center text-center">
      <div class="animate-fade-in"></div>
      <h1 class="text-gray-700 text-4xl font-extrabold mb-2">Pet Forum
        <span class="material-symbols-outlined ml-4">pet_supplies</span>
      </h1>
      <h2 class="font-semibold text-lg mb-6 text-gray-600">
        Connect with fellow pet enthusiasts and share tips, stories, and advice.
      </h2>

      <div class="w-full bg-white shadow-md shadow-black p-6 border mb-6">
        <nav class="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-around">
          <router-link
            to="/general"
            class="relative  bg-white shadow-md shadow-gray-400 rounded-lg text-black px-4 py-3 font-semibold transform transition-transform duration-300 hover:scale-105"
            :class="{ 'border-b-2 border-teal-700': $route.path === '/general' }"
          >
            General Pet Care Forum
            <span v-if="$route.path === '/general'" class="absolute bottom-0 left-0 right-0 h-1 bg-teal-700"></span>
          </router-link>
          
          <router-link
            to="/health"
            class="relative bg-white shadow-md shadow-gray-400 rounded-lg text-black px-4 py-3 font-semibold transform transition-transform duration-300 hover:scale-105"
            :class="{ 'border-b-2 border-teal-700': $route.path === '/health' }"
          >
            Health and Nutrition Forum
            <span v-if="$route.path === '/health'" class="absolute bottom-0 left-0 right-0 h-1 bg-teal-700"></span>
          </router-link>
          
          <router-link
            to="/training"
            class="relative bg-white shadow-md shadow-gray-400 rounded-lg text-black px-4 py-3 font-semibold transform transition-transform duration-300 hover:scale-105"
            :class="{ 'border-b-2 border-teal-700': $route.path === '/training' }"
          >
            Training and Behavior Forum
            <span v-if="$route.path === '/training'" class="absolute bottom-0 left-0 right-0 h-1 bg-teal-700"></span>
          </router-link>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // Add any necessary script here
};
</script>

<style scoped>
/* Optional: Scoped CSS for additional styling */
</style>
