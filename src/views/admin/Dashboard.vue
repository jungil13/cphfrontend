<template>
  <div class="p-6 min-h-screen">
    <h1 class="text-4xl font-extrabold italic mb-8 text-center text-gray-800 animate-fade-in">
      Admin Dashboard
    </h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Users Card -->
      <div
        class="bg-blue-600 text-white p-6 rounded-lg shadow-md shadow-black hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex justify-between items-center"
      >
        <div>
          <h2 class="text-xl font-medium">Users</h2>
          <p class="text-4xl font-bold mt-2">{{ usersCount }}</p>
        </div>
        <span class="material-icons text-5xl">person</span>
      </div>

      <!-- Pets Card -->
      <div
        class="bg-orange-500 text-white p-6 rounded-lg shadow-md shadow-black hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex justify-between items-center"
      >
        <div>
          <h2 class="text-xl font-medium">Pets</h2>
          <p class="text-4xl font-bold mt-2">{{ petsCount }}</p>
        </div>
        <span class="material-icons text-5xl">pets</span>
      </div>

      <!-- Reports Card -->
      <div
        class="bg-teal-500 text-white p-6 rounded-lg shadow-md shadow-black hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex justify-between items-center"
      >
        <div>
          <h2 class="text-xl font-medium">Reports</h2>
          <p class="text-4xl font-bold mt-2">{{ reportsCount }}</p>
        </div>
        <span class="material-icons text-5xl">report</span>
      </div>

      <!-- Forum Posts Card -->
      <div
        class="bg-yellow-400 text-gray-800 p-6 rounded-lg shadow-md shadow-black hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex justify-between items-center"
      >
        <div>
          <h2 class="text-xl font-medium">Forum Posts</h2>
          <p class="text-4xl font-bold mt-2">{{ forumCount }}</p>
        </div>
        <span class="material-icons text-5xl">forum</span>
      </div>

      <!-- Applications Card -->
      <div
        class="bg-purple-500 text-white p-6 rounded-lg shadow-md shadow-black hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex justify-between items-center"
      >
        <div>
          <h2 class="text-xl font-medium">Applications</h2>
          <p class="text-4xl font-bold mt-2">{{ applicationsCount }}</p>
        </div>
        <span class="material-icons text-5xl">app_registration</span>
      </div>

      <!-- Comments Card -->
      <div
        class="bg-pink-500 text-white p-6 rounded-lg shadow-md shadow-black hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex justify-between items-center"
      >
        <div>
          <h2 class="text-xl font-medium">Comments</h2>
          <p class="text-4xl font-bold mt-2">{{ commentsCount }}</p>
        </div>
        <span class="material-icons text-5xl">comment</span>
      </div>
    </div>
  </div>
</template>

<script>
import instance from "@/utils/axios";

export default {
  name: "Dashboard",
  data() {
    return {
      usersCount: 0,
      petsCount: 0,
      reportsCount: 0,
      forumCount: 0,
      applicationsCount: 0,
      commentsCount: 0,
    };
  },
  created() {
    this.fetchCounts();
  },
  methods: {
    fetchCounts() {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const endpoints = {
        usersCount: "/admin/user-count",
        petsCount: "/admin/pet-count",
        reportsCount: "/admin/report-count",
        forumCount: "/admin/forum-count",
        applicationsCount: "/admin/application",
        commentsCount: "/admin/comments",
      };

      Object.keys(endpoints).forEach((key) => {
        instance
          .get(endpoints[key], { headers })
          .then((response) => {
            this[key] = response.data.count;
          })
          .catch((error) => {
            console.error(`Error fetching ${key}:`, error);
            this[key] = "Error";
          });
      });
    },
  },
};
</script>

<style>
/* Add simple animation styles */
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
