<template>
    <div class="p-6 bg-white min-h-screen">
        <!-- Header and Search Bar -->
        <div class="flex flex-col items-center mb-6">
            <h1 class="text-4xl font-extrabold italic mb-8 text-center text-gray-800 animate-fade-in">
    Applications Management
    </h1>
            <div class="relative w-full max-w-xl">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <span class="material-icons text-gray-500">search</span>
                </span>
                <input type="text"
                    v-model="searchQuery"
                    @input="handleSearch"
                    class="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    placeholder="Search applications..." />
            </div>
        </div>

        <!-- Content -->
        <div class="flex justify-center">
            <div v-if="isLoading" class="text-center">Loading...</div>
            <div v-else class="w-full overflow-x-auto bg-white shadow-md rounded-lg shadow-black">
                <table class="min-w-full bg-white">
                    <thead class="bg-blue-600 text-white font-bold">
                        <tr>
                            <th class="py-3 px-6 text-left">Applicant</th>
                            <th class="py-3 px-6 text-left">Pet Name</th>
                            <th class="py-3 px-6 text-left">Pet Experience</th>
                            <th class="py-3 px-6 text-left">Reason For Adoption</th>
                            <th class="py-3 px-6 text-left">Status</th>
                            <th class="py-3 px-6 text-left">Date Submitted</th>
                            <th class="py-3 px-6 text-center">Profile</th>
                            <th class="py-3 px-6 text-center">Pet Photo</th>
                            <th class="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-500 font-bold text-sm">
                        <tr v-for="application in applications" :key="application.ApplicationID"
                            class="hover:bg-gray-100">
                            <td class="py-3 px-6 text-left">{{ application.ApplicantName }}</td>
                            <td class="py-3 px-6 text-left">{{ application.PetName }}</td>
                            <td class="py-3 px-6 text-left">{{ application.PetExperience }}</td>
                            <td class="py-3 px-6 text-left">{{ application.ReasonForAdoption }}</td>
                            <td class="py-3 px-6 text-center">
                                <span :class="application.Status === 'approved' ? 'bg-green-200 text-green-700' :
                                    application.Status === 'declined' ? 'bg-red-200 text-red-700' :
                                        'bg-blue-200 text-blue-700'" class="py-1 px-3 text-xs rounded-full">
                                    {{ application.Status }}
                                </span>
                            </td>

                            <td class="py-3 px-6 text-left">{{ application.DateSubmitted }}</td>
                            <td class="py-3 px-6 text-center">
                                <img :src="getProfilePhotoUrl(application.ApplicantProfilePhoto)" alt="Applicant Photo"
                                    class="h-20 w-20 rounded-full shadow-md shadow-black">
                            </td>
                            <td class="py-3 px-6 text-center">
                                <img :src="getProfilePhotoUrl(application.PetPhoto[0])" alt="Pet Photo"
                                    class="h-20 w-20 rounded-xl shadow-md shadow-black">
                            </td>
                            <td class="py-3 px-6 text-center flex justify-center space-x-4">
                                <span class="material-icons text-blue-500 hover:text-blue-700 cursor-pointer"
                                    @click="openModal(application)">visibility</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center mt-6">
            <button 
                @click="goToPage(currentPage - 1)" 
                :disabled="currentPage <= 1" 
                class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
                Previous
            </button>
            <span class="mx-4 text-lg font-semibold">Page {{ currentPage }} of {{ totalPages }}</span>
            <button 
                @click="goToPage(currentPage + 1)" 
                :disabled="currentPage >= totalPages" 
                class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
                Next
            </button>
        </div>

        <!-- Modal for Detailed View -->
        <div v-if="selectedApplication"
            class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4">
            <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full">
                <div class="flex justify-between items-center border-b p-4 text-xl">
                    <h3>{{ selectedApplication.ApplicantName }}'s Application</h3>
                    <span class="material-icons text-black hover:text-red-500 cursor-pointer"
                        @click="selectedApplication = null">close</span>
                </div>
                <div class="p-4 grid grid-cols-2 gap-4">
                    <div>
                        <img :src="getProfilePhotoUrl(selectedApplication.ApplicantProfilePhoto)" alt="Applicant Photo"
                            class="rounded-xl h-30 w-30 object-cover">
                    </div>
                    <div class="space-y-2">
                        <p><strong>Email:</strong> {{ selectedApplication.ApplicantEmail }}</p>
                        <p><strong>Address:</strong> {{ selectedApplication.ApplicantAddress }}</p>
                        <p><strong>Contact Number:</strong> {{ selectedApplication.ApplicantContactnumber }}</p>
                        <p><strong>Pet Experience:</strong> {{ selectedApplication.PetExperience }}</p>
                        <p><strong>Home Environment:</strong> {{ selectedApplication.HomeEnvironment }}</p>
                        <p><strong>Other Pets:</strong> {{ selectedApplication.OtherPets }}</p>
                        <p><strong>Children At Home:</strong> {{ selectedApplication.ChildrenAtHome }}</p>
                        <p><strong>Reason For Adoption:</strong> {{ selectedApplication.ReasonForAdoption }}</p>
                        <p><strong>Status:</strong> {{ selectedApplication.Status }}</p>
                    </div>
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
const searchQuery = ref('');
const currentPage = ref(1);
const totalPages = ref(1);  // Initialize to 1 to avoid division by zero
const isLoading = ref(true);
const isError = ref(false);
const perPage = ref(5);

const token = localStorage.getItem('token');
if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
    console.warn('No token found in localStorage');
}

const fetchApplications = async () => {
    isLoading.value = true;
    isError.value = false;
    try {
        const response = await instance.get('/api/applications', {
            params: {
                search: searchQuery.value,
                page: currentPage.value,
                pageSize: perPage.value
            }
        });

        console.log('API Response:', response.data);  // Debugging step to log the API response

        // Assuming the response structure is { applications: [], totalPages: number }
        applications.value = response.data.applications || [];
        totalPages.value = response.data.totalPages || 1;  // Default to 1 if not provided
        isLoading.value = false;
    } catch (error) {
        console.error('Failed to fetch applications:', error);
        Swal.fire('Error', 'Could not fetch applications.', 'error');
        isLoading.value = false;
        isError.value = true;
    }
};

// Handle search input
const handleSearch = () => {
    currentPage.value = 1;  // Reset to the first page when the search query changes
    fetchApplications();    // Fetch applications with the updated search query
};

// Pagination logic
const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        fetchApplications();  // Re-fetch applications based on the new page
    }
};

const openModal = (application) => {
    selectedApplication.value = application;
};

const getProfilePhotoUrl = (photoPath) => {
    return photoPath ? `http://192.168.67.185:3000/${photoPath}` : '/default-image.jpg';
};

onMounted(fetchApplications);
</script>