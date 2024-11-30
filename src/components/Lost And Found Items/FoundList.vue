<template>
    <LostFound />
    <div class="w-full bg-white border border-gray-400 p-5">
      <!-- Found Pets Section -->
      <h1 class="text-2xl font-semibold mb-6">Found Pet Listings</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="pet in foundPets" :key="pet.id" class="bg-white border rounded-lg shadow-md overflow-hidden relative shadow-black">
          <div class="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
            Found
          </div>
          <img :src="pet.image" alt="Found Pet Picture" class="w-full h-48 object-cover">
          <div class="p-4">
            <h2 class="text-xl font-bold text-gray-800">{{ pet.name }}</h2>
            <p class="text-gray-600 mb-4">{{ pet.location }}</p>
            <RouterLink to="/foundpetdetails" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
              View Details
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  // Import the required components
  import LostFound from '@/views/user/LostFound.vue';
  
  export default {
    components: {
      LostFound
    },
    data() {
      return {
        // Sample data for lost pets
        lostPets: [
          { id: 1, name: 'Buddy', location: 'Downtown', image: 'https://via.placeholder.com/150' },
          { id: 2, name: 'Max', location: 'Park Avenue', image: 'https://via.placeholder.com/150' },
          { id: 3, name: 'Bella', location: 'Green Street', image: 'https://via.placeholder.com/150' },
          // Add more lost pet objects here
        ],
        // Sample data for found pets
        foundPets: [
          { id: 1, name: 'Lucy', location: 'Main Street', image: 'https://via.placeholder.com/150' },
          { id: 2, name: 'Charlie', location: 'Sunset Blvd', image: 'https://via.placeholder.com/150' },
          { id: 3, name: 'Daisy', location: 'Elm Road', image: 'https://via.placeholder.com/150' },
          // Add more found pet objects here
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  /* Additional styles if needed */
  </style>
  