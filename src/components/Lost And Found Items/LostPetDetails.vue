<template>
  <div class="mt-20 bg-gradient-to-br from-blue-50 to-teal-50 min-h-screen p-8">
    <!-- Report Details Container -->
    <div class="w-full max-w-4xl mx-auto bg-white shadow-lg shadow-black rounded-xl shadow-lg p-8">
      <!-- Report Type and Description -->
      <h1 class="text-3xl font-extrabold text-teal-700 mb-4">{{ report.ReportType }} Report</h1>
      <p class="text-gray-800 mb-6 font-bold text-lg">
        <span class="font-extrabold text-teal-700">Description:</span> {{ report.Description }}
      </p>

      <!-- Location and Contact Info -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 class="text-xl font-extrabold text-teal-700">Location:</h2>
          <p class="text-gray-800 font-bold">{{ report.Location }}</p>
        </div>
        <div>
          <h2 class="text-xl font-extrabold text-teal-700">Date Reported:</h2>
          <p class="text-gray-800 font-bold">{{ report.DateReported }}</p>
        </div>
        <div>
          <h2 class="text-xl font-extrabold text-teal-700">Reporter:</h2>
          <p @click="openUserModal" class="text-blue-900 font-bold cursor-pointer underline">{{ report.reporterFullName }}</p>
        </div>
        <div>
          <h2 class="text-xl font-extrabold text-teal-700">Status:</h2>
          <p :class="report.Status === 'Adopted' ? 'text-red-600' : 'text-green-700 font-bold'">{{ report.Status }}</p>
        </div>
      </div>

      <!-- Images Section -->
      <div class="mb-8">
        <h2 class="text-xl font-extrabold text-teal-700 mb-4">Photos</h2>
        <div class="flex flex-wrap justify-center border border-gray-800 rounded-lg shadow-md p-4 gap-4">
          <div v-for="(image, index) in photos" :key="index" class="relative">
            <img :src="getImageUrl(image)" @click="openModal(index)" class="w-34 h-32 object-cover rounded-lg cursor-pointer hover:opacity-90 transition duration-300 shadow-md" alt="Pet photo" />
          </div>
        </div>
      </div>

      <!-- Contact Information Section -->
      <div>
        <h2 class="text-xl font-extrabold text-teal-800 mb-1">Other Contact Information:</h2>
        <p class="text-black font-bold mb-6">{{ report.ContactInfo }}</p>
      </div>

      <!-- Modal for Image Preview -->
      <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="rounded-lg p-4 relative max-w-2xl w-full shadow-xl">
          <button @click="closeModal" class="absolute top-5 right-5 bg-red-600 text-white py-2 px-4 rounded-full font-bold">Close</button>
          <img :src="getImageUrl(photos[activeImageIndex])" class="w-full h-full object-cover rounded-lg" alt="Preview">
        </div>
      </div>

      <!-- Modal for User Details -->
      <div v-if="isUserModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white rounded-lg p-6 relative max-w-lg w-full shadow-xl">
          <button @click="closeUserModal" class="absolute top-2 right-2 bg-red-500 text-white py-2 px-4 rounded-full font-bold">Close</button>
          <h2 class="text-xl font-semibold text-teal-900 mb-4">User Details</h2>
          <div class="flex items-center mb-4">
            <img :src="getProfilePhotoUrl(userDetails.ProfilePhoto)" @click="openProfilePhotoModal" alt="Profile Photo" class="w-16 h-16 object-cover rounded-full border-2 border-gray-300 mr-4 cursor-pointer shadow-md">
            <div>
              <p><strong>Full Name:</strong> {{ userDetails.Fullname }}</p>
              <p><strong>Email:</strong> {{ userDetails.Email }}</p>
              <p><strong>Contact Number:</strong> {{ userDetails.Contactnumber }}</p>
              <p><strong>Address:</strong> {{ userDetails.Address }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal for Profile Photo Preview -->
      <div v-if="isProfilePhotoModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class=" rounded-lg p-4 relative max-w-2xl shadow-xl">
          <button @click="closeProfilePhotoModal" class="absolute top-6 right-6 text-black py-2 px-4 rounded-full text-3xl font-semibold">X</button>
          <img :src="getProfilePhotoUrl(userDetails.ProfilePhoto)" class="w-80 h-90 object-cover rounded-lg" alt="Profile Photo Preview">
        </div>
      </div>
    </div>
  </div>
  <footer class="bg-gray-800 text-white py-8 mt-24">
      <div class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div class="text-center md:text-left mb-4 md:mb-0">
          <h5 class="text-lg font-semibold">Pet Adoption</h5>
          <p class="mt-2 text-sm">Contact us: <a href="mailto:info@petadoption.com" class="underline hover:text-gray-400">info@petadoption.com</a></p>
        </div>
        <div class="text-center md:text-right text-sm">
          <p>© 2024 Pet Adoption. All rights reserved.</p>
          <p>Developed by: Jun Gil</p>
        </div>
      </div>
    </footer>
</template>

<script>
import instance from '@/utils/axios';

export default {
  data() {
    return {
      report: {},
      photos: [],
      isModalOpen: false,
      isUserModalOpen: false,
      isProfilePhotoModalOpen: false, // New state for profile photo modal
      activeImageIndex: 0,
      userDetails: {} // Holds the user's details for the modal
    };
  },
  mounted() {
    this.fetchReportDetails();
  },
  methods: {
    fetchReportDetails() {
      const reportId = this.$route.params.id; // Assuming the route contains the report ID
      instance.get(`/api/reports/${reportId}`)
        .then(response => {
          this.report = response.data;
          this.photos = response.data.Photo ? JSON.parse(response.data.Photo) : [];
        })
        .catch(error => {
          console.error('Error fetching report details:', error);
          alert('Failed to fetch report details.');
        });
    },
    getImageUrl(photo) {
      return photo ? `http://192.168.67.185:3000/${photo}` : 'https://via.placeholder.com/150';
    },
    getProfilePhotoUrl(photo) {
      return photo ? `http://192.168.67.185:3000/${photo}` : 'https://via.placeholder.com/150';
    },
    openModal(index) {
      this.activeImageIndex = index;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    openUserModal() {
      const userId = this.report.ReporterID; 
      const token = localStorage.getItem('token');

      instance.get(`/api/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      })
      .then(response => {
        this.userDetails = response.data;
        this.isUserModalOpen = true;
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
        alert('Failed to fetch user details. Make sure you are logged in.');
      });
    },
    closeUserModal() {
      this.isUserModalOpen = false;
    },
    openProfilePhotoModal() {
      this.isProfilePhotoModalOpen = true;
    },
    closeProfilePhotoModal() {
      this.isProfilePhotoModalOpen = false;
    }
  }
};
</script>
