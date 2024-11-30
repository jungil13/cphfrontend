<template>
  <Account />
  <div class="container mx-auto px-4">
    <div class="py-8">
      <div class="bg-white p-5 text-center shadow shadow-black border border-black mb-8 mx-6 rounded-lg">
        <h1 class="text-2xl text-gray-700 font-extrabold">Adoption Applicants</h1>
      </div>
      <div v-if="loading" class="text-lg font-semibold text-center">
        <p>Loading applications...</p>
      </div>
      <div v-else-if="adoptionApplications.length"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div v-for="application in adoptionApplications" :key="application.ApplicationID"
          class="bg-zinc-900 p-6 animate-fade-in rounded-lg shadow-lg shadow-black transform transition duration-300 hover:scale-105 hover:shadow-lg hover:shadow-black relative">
          <!-- Status Badge -->
          <div v-if="application.Status" class="absolute top-4 left-6 px-3 py-1 rounded-full text-sm font-semibold"
            :class="{
              'bg-green-500 text-white': application.Status === 'approved',
              'bg-red-500 text-white': application.Status === 'declined'
            }">
            {{ application.Status === 'declined' ? 'Rejected' : application.Status.charAt(0).toUpperCase() +
              application.Status.slice(1) }}
          </div>
          <!-- Delete Icon -->
          <button @click="deleteApplication(application.ApplicationID)"
            class="absolute top-4 right-6 text-red-500 hover:text-red-700 focus:outline-none">
            <span class="material-icons">delete</span>
          </button>
          <div class="flex flex-col items-center">
            <img :src="getProfilePhotoUrl(application.ApplicantProfilePhoto)" alt="Applicant Photo"
              class="w-32 h-32 rounded-full border-4 border-blue-300 mb-4">
            <h3 class="font-semibold text-lg text-white">{{ application.ApplicantName }}</h3>
            <p class="text-white text-sm mb-2"><strong>Pet Name:</strong> {{ application.PetName }}</p>
            <img :src="getProfilePhotoUrl(application.PetPhoto)" alt="Pet Photo"
              class="w-full h-40 object-cover rounded-lg mb-4 border">
          </div>
          <div class="flex flex-col space-y-2">
            <button @click="openModal(application)"
              class="bg-blue-500 font-semibold rounded-lg text-white py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              View Application Form
            </button>
            <button @click="approveApplication(application.ApplicationID)"
              :disabled="application.Status !== 'pending'" :class="[ 
                'font-semibold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500',
                application.Status === 'pending' ? 'bg-green-600 text-white' : 'bg-gray-400 cursor-not-allowed'
              ]">
              Approve
            </button>
            <button @click="rejectApplication(application.ApplicationID)"
              :disabled="application.Status !== 'pending'" :class="[ 
                'font-semibold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500',
                application.Status === 'pending' ? 'bg-red-600 text-white' : 'bg-gray-400 cursor-not-allowed'
              ]">
              Reject
            </button>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-lg text-gray-600">
        <p>No applications available.</p>
      </div>
    </div>
    <div v-if="showModal" class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 mt-14">
      <div class="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full">
        <div class="text-center">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">{{ selectedApplication.ApplicantName }}'s Application
          </h3>
          <img :src="getProfilePhotoUrl(selectedApplication.ApplicantProfilePhoto)" alt="Applicant Photo"
            class="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-300">
          <div class="space-y-3">
            <p><strong>Applicant Email:</strong> {{ selectedApplication.ApplicantEmail }}</p>
            <p><strong>Applicant Address:</strong> {{ selectedApplication.ApplicantAddress }}</p>
            <p><strong>Contact Number:</strong> {{ selectedApplication.ApplicantContactnumber }}</p>
            <p><strong>Pet Experience:</strong> {{ selectedApplication.PetExperience }}</p>
            <p><strong>Home Environment:</strong> {{ selectedApplication.HomeEnvironment }}</p>
            <p><strong>Other Pets:</strong> {{ selectedApplication.OtherPets }}</p>
            <p><strong>Children At Home:</strong> {{ selectedApplication.ChildrenAtHome }}</p>
            <p><strong>Reason for Adoption:</strong> {{ selectedApplication.ReasonForAdoption }}</p>
            <img :src="getProfilePhotoUrl(selectedApplication.PetPhoto)" alt="Pet Photo"
              class="w-32 h-32 rounded mx-auto border-2 border-gray-300">
          </div>
          <button @click="showModal = false"
            class="mt-5 bg-gray-500 text-white py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 hover:bg-gray-600">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Account from '@/views/user/Profile/Account.vue';
import instance from '@/utils/axios';
import Swal from 'sweetalert2';

export default {
  components: {
    Account
  },
  data() {
    return {
      adoptionApplications: [],
      loading: true,
      showModal: false,
      selectedApplication: null
    };
  },
  created() {
    this.fetchOwnerApplications();
  },
  methods: {
    fetchOwnerApplications() {
      instance.get('/api/my-pets/applications', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      })
        .then(response => {
          this.adoptionApplications = response.data.applications;
          this.loading = false;
        })
        .catch(error => {
          console.error('Failed to fetch applications:', error);
          this.loading = false;
        });
    },
    deleteApplication(applicationId) {
      Swal.fire({
        title: 'Are you sure?',
        text: "This action cannot be undone!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          instance.delete(`/api/applications/${applicationId}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          })
            .then(() => {
              Swal.fire('Deleted!', 'The application has been deleted.', 'success');
              // Reload the window to reflect the changes
              window.location.reload();
            })
            .catch(error => {
              console.error('Failed to delete application:', error);
              Swal.fire('Error!', 'Failed to delete the application. Please try again.', 'error');
            });
        }
      });
    },
    approveApplication(applicationId) {
      this.updateApplicationStatus(applicationId, 'approved');
    },
    rejectApplication(applicationId) {
      this.updateApplicationStatus(applicationId, 'declined');
    },
    updateApplicationStatus(applicationId, status) {
      instance.patch(`/api/applications/${applicationId}`, { status }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      })
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: `Application has been ${status === 'declined' ? 'rejected' : status}.`,
          });
          this.fetchOwnerApplications();
        })
        .catch(error => {
          console.error('Failed to update application status:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to update the application status. Please try again.',
          });
        });
    },
    openModal(application) {
      this.selectedApplication = application;
      this.showModal = true;
    },
    getProfilePhotoUrl(photoPath) {
      if (!photoPath) return '/path/to/default/image.jpg';

      try {
        const photos = JSON.parse(photoPath.replace(/\\\\/g, "/"));
        if (Array.isArray(photos) && photos.length > 0) {
          return `http://192.168.67.185:3000/${photos[0]}`;
        } else {
          return `http://192.168.67.185:3000/${photoPath}`;
        }
      } catch {
        return `http://192.168.67.185:3000/${photoPath}`;
      }
    },
  }
};
</script>
