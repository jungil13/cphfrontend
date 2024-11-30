<template>
  <div class="p-6 bg-white min-h-screen">
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-4xl font-extrabold italic mb-8 text-center text-gray-800 animate-fade-in">
      Pet Listings Management
    </h1>
      <div class="justify-center flex items-center">
        <!-- Search Bar -->
        <div class="relative w-1/3">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <span class="material-icons text-gray-500 text-center">search</span>
          </span>
          <input
            type="text"
            class="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
            placeholder="Search applications..."
            v-model="searchQuery"
          />
        </div>
      </div>
    </div>

    <!-- Applications Table -->
    <div class="overflow-x-auto bg-white shadow-md shadow-black rounded-lg">
      <table class="min-w-full bg-white">
        <thead class="bg-blue-600 text-white uppercase text-sm leading-normal">
          <tr>
            <th class="py-3 px-6 text-left">Owner_Full_Name</th>
            <th class="py-3 px-6 text-left">Type</th>
            <th class="py-3 px-6 text-left">Pet Name</th>
            <th class="py-3 px-6 text-left">Pet_Photo</th>
            <th class="py-3 px-6 text-left">Vaccination_Certificate</th>
            <th class="py-3 px-6 text-center">Description</th>
            <th class="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
          <tr class="border-b border-gray-200 hover:bg-gray-100" v-for="application in applications" :key="application.id">
            <td class="py-3 px-6 text-left whitespace-nowrap">
              <span class="font-medium">{{ application.OwnerFullName }}</span>
            </td>
            <td class="py-3 px-6 text-left whitespace-nowrap">
              <span class="py-1 px-3 text-black text-md font-medium">{{ application.Type }}</span>
            </td>
            <td class="py-3 px-6 text-left">
              <span class="py-1 px-3 text-black text-md font-medium">{{ application.PetName }}</span>
            </td>
            <td class="py-3 px-6 text-left">
              <img 
                :src="getPetPhotoUrl(application.photoUrl[0])" 
                alt="Animal Image" 
                class="w-20 h-20 object-cover rounded-xl shadow-md shadow-black cursor-pointer" 
                @click="viewPhoto(getPetPhotoUrl(application.photoUrl[0]))"
              >
            </td>
            <td class="py-3 px-6 text-left">
              <img 
                :src="getPetPhotoUrl(application.vacUrl[0])" 
                alt="Vaccination Certificate" 
                class="w-20 h-20 object-cover rounded-xl shadow-md shadow-black cursor-pointer" 
                @click="viewPhoto(getPetPhotoUrl(application.vacUrl[0]))"
              >
            </td>
            <td class="py-3 px-6 text-center">
              <span class="py-1 px-3 text-black text-md font-medium">{{ application.Description }}</span>
            </td>
            <td class="py-3 px-6 text-center">
              <div class="flex item-center justify-center space-x-2">
                <button class="w-8 h-8 rounded-full hover:bg-blue-100 flex items-center justify-center" @click="openModal(application)">
                  <span class="material-icons text-blue-500">visibility</span>
                </button>
                <button class="w-8 h-8 rounded-full hover:bg-green-100 flex items-center justify-center" @click="approveApplication(application.PetID)">
                  <span class="material-icons text-green-500">check_circle</span>
                </button>
                <button class="w-8 h-8 rounded-full hover:bg-red-100 flex items-center justify-center" @click="rejectApplication(application.PetID)">
                  <span class="material-icons text-red-500">cancel</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-between items-center mt-4">
      <button class="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 disabled:opacity-50" :disabled="currentPage === 1" @click="prevPage">
        <span class="material-icons">navigate_before</span>
        Previous
      </button>
      <button class="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400" :disabled="currentPage === totalPages" @click="nextPage">
        Next
        <span class="material-icons">navigate_next</span>
      </button>
    </div>

    <!-- Photo Viewer Modal -->
    <div v-if="photoViewerVisible" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
  <div class="relative bg-transparent rounded-lg shadow-2xl shadow-black p-6 max-w-4xl w-full mx-6">
    <!-- Close Button -->
    <button @click="photoViewerVisible = false" class="absolute top-4 right-4 text-gray-100 hover:text-gray-800 transition">
      <span class="material-icons text-3xl">close</span>
    </button>
    <!-- Image -->
    <img :src="currentPhotoUrl" alt="View Photo" class="w-full max-h-[70vh] object-contain rounded-lg" />
  </div>
</div>

    <!-- Modal for Application Details -->
    <div v-if="selectedApplication" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div class="bg-white rounded-lg shadow-2xl p-8 max-w-5xl w-full mx-6">
        <button @click="selectedApplication = null" class="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <span class="material-icons">close</span>
        </button>
        <h2 class="text-3xl font-bold text-teal-600 mb-8 text-center">Application Details</h2>
        <div class="grid grid-cols-2 gap-8">
          <!-- Profile and Pet Photo Section -->
          <div class="flex flex-col items-center">
            <img 
              :src="getProfilePhotoUrl(selectedApplication.photoUrl[0])" 
              alt="Profile Photo" 
              class="w-40 h-40 object-cover rounded-xl shadow-md cursor-pointer hover:opacity-80 transition-opacity"
              @click="viewPhoto(getProfilePhotoUrl(selectedApplication.photoUrl[0]))"
            />
            <img 
              :src="getPetPhotoUrl(selectedApplication.vacUrl[0])" 
              alt="Pet Photo" 
              class="w-40 h-40 object-cover rounded-md shadow-md cursor-pointer hover:opacity-80 transition-opacity mt-4"
              @click="viewPhoto(getPetPhotoUrl(selectedApplication.vacUrl[0]))"
            />
          </div>
          <!-- Details Section -->
          <div>
            <h3 class="text-2xl font-semibold mb-4 text-gray-700">Details</h3>
            <div class="text-left space-y-2 text-gray-700">
              <p><strong>Owner Full Name:</strong> {{ selectedApplication.OwnerFullName }}</p>
              <p><strong>Pet Type:</strong> {{ selectedApplication.Type }}</p>
              <p><strong>Pet Name:</strong> {{ selectedApplication.PetName }}</p>
              <p><strong>Description:</strong> {{ selectedApplication.Description }}</p>
              <p><strong>Breed:</strong> {{ selectedApplication.Breed }}</p>
              <p><strong>Species:</strong> {{ selectedApplication.Species }}</p>
              <p><strong>Markings:</strong> {{ selectedApplication.Markings }}</p>
            </div>
          </div>
        </div>
        <!-- Close Button -->
        <div class="flex justify-end mt-6">
          <button @click="selectedApplication = null" class="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import instance from '@/utils/axios';
import Swal from 'sweetalert2';

const applications = ref([]);
const selectedApplication = ref(null);
const photoViewerVisible = ref(false);
const currentPhotoUrl = ref('');
const searchQuery = ref('');
const currentPage = ref(1);
const pageSize = ref(5);  // Number of items per page
const totalPages = ref(1); // Total number of pages for pagination

const viewPhoto = (url) => {
  currentPhotoUrl.value = url;
  photoViewerVisible.value = true;
};

const token = localStorage.getItem('token');
instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

const openModal = (application) => {
  console.log("Opening modal for:", application); // Check what's being received
  selectedApplication.value = application;
};

// Fetch applications with pagination and search
const fetchApplications = async () => {
  try {
    const response = await instance.get('/admin/applications');
    // Log the entire response to inspect its structure
    console.log('Response from API:', response);
    
    // Check if response.data exists and is an array
    if (Array.isArray(response.data)) {
      applications.value = response.data.map(app => ({
        ...app,
        photoUrl: app.PetPhoto ? JSON.parse(app.PetPhoto) : ['/default-image.jpg'],
        vacUrl: app.VaccinationCertificate ? JSON.parse(app.VaccinationCertificate) : ['/default-image.jpg']
      }));
    } else {
      // Handle the case where response.data is not an array
      console.error('Response data is not an array:', response.data);
      Swal.fire('Error', 'Could not fetch applications. Invalid response format.', 'error');
    }
  } catch (error) {
    console.error('Failed to fetch applications:', error);
    Swal.fire('Error', 'Could not fetch applications. Please log in.', 'error');
  }
};

onMounted(fetchApplications);

// Watch for changes in the search query to refetch data
watch(searchQuery, fetchApplications);

// Handle pagination
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchApplications();
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchApplications();
  }
};

const approveApplication = async (petId) => {
  try {
    await instance.post(`/api/pets/${petId}/approve`);
    Swal.fire('Approved!', 'The application has been approved.', 'success');
    fetchApplications(); // Refresh the list after approving
  } catch (error) {
    console.error('Failed to approve application:', error);
    Swal.fire('Error', 'Failed to approve application. Please ensure you have the right permissions.', 'error');
  }
};

const rejectApplication = async (petId) => {
  try {
    await instance.post(`/api/pets/${petId}/decline`);
    Swal.fire('Rejected!', 'The application has been rejected.', 'success');
    fetchApplications(); // Refresh the list after rejecting
  } catch (error) {
    console.error('Failed to reject application:', error);
    Swal.fire('Error', 'Failed to reject application. Please ensure you have the right permissions.', 'error');
  }
};

// This is a method, not a function defined in setup, so it must be used directly in the template
const getPetPhotoUrl = (photoPath) => {
  return photoPath ? `http://192.168.67.185:3000/${photoPath}` : '/default-image.jpg';
};

const getProfilePhotoUrl = (photoPath) => {
  return photoPath ? `http://192.168.67.185:3000/${photoPath}` : '/default-profile-image.jpg';
};
</script>

<style scoped>
/* Scrollbar styles */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px; /* height of horizontal scrollbar */
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background-color: darkgrey; /* color of the scroll thumb */
  border-radius: 10px; /* roundness of the scroll thumb */
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f0f0f0; /* color of the scroll track */
}
</style>