<template>
  <div class="mt-24">
    <div class="relative flex flex-col items-center justify-center text-center">
      <h1 class="text-gray-700 text-4xl poppins-extrabold mt-12">My Account</h1>
      <div class="w-full bg-white shadow shadow-gray-400 p-6 rounded-lg mb-6 border border-black mt-12">
        <nav class="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-around">
          <router-link
          to="/summary"
          class="flex justify-center p-4 rounded-lg hover:bg-gray-700 hover:text-white bg-gray-700 text-white transition-all duration-300 "
          :class="{ 'border-b-2 border-orange-400': $route.path === '/summary' }"
        >
          <span class="material-icons mr-2">account_circle</span>
          <span>Profile Summary</span>
        
        </router-link>

        <router-link
          to="/managepetlistings"
          class="flex justify-center p-4 rounded-lg hover:bg-gray-700 transition-all duration-300 bg-gray-700 text-white "
          :class="{ 'border-b-2 border-orange-400': $route.path === '/managepetlistings' }"
        >
          <span class="material-icons mr-2">pets</span>
          <span>Manage Pet Listings</span>
        </router-link>

        <router-link
          to="/applicants"
          class="flex justify-center p-4 rounded-lg hover:bg-gray-700 transition-all duration-300 bg-gray-700 text-white "
          :class="{ 'border-b-2 border-orange-400': $route.path === '/applicants' }"
        >
          <span class="material-icons mr-2">assignment_ind</span>
          <span >Adoption Applicants</span>
        </router-link>

        <router-link
          to="/managereports"
          class="flex justify-center p-4 rounded-lg hover:bg-gray-700 transition-all duration-300 bg-gray-700 text-white"
          :class="{ 'border-b-2 border-orange-400': $route.path === '/managereports' }"
        >
          <span class="material-icons mr-2">report_problem</span>
          <span>Manage Reports</span>
        </router-link>
        <router-link
          to="/manageposts"
          class="flex justify-center p-4 rounded-lg hover:bg-gray-700 transition-all duration-300 bg-gray-700 text-white"
          :class="{ 'border-b-2 border-orange-400': $route.path === '/manageposts' }"
        >
          <span class="material-icons mr-2">forum</span>
          <span>Manage Posts</span>
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
