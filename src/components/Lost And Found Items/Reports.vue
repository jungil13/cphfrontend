<template>
  <LostFound />
  <div class="w-full mx-auto bg-white p-5 rounded-lg shadow-lg shadow-black">
    <h1 class="text-3xl font-extrabold mb-4 text-center text-center">My Reports</h1>
    <p class="text-gray-600 text-center text-center font-semibold mb-6">Manage your reports</p>

    <!-- Report Cards Container -->
    <div v-if="reports.length" class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 text-center">
      <!-- Report Card -->
      <div v-for="report in reports" :key="report.ReportID"
        class="relative flex flex-col bg-gray-100 p-4 rounded-lg shadow-lg shadow-black transition-transform transform hover:scale-105 border border-black">
        <!-- Report Image -->
        <div class="relative group w-full h-48 mb-4">
          <img :src="getImageUrl(report.Photo[0])" alt="Report Picture"
            class="w-full h-full object-cover rounded-md mb-4 transition-transform duration-300 group-hover:scale-105">
          <div v-if="report.Photo.length > 1"
            class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div class="flex space-x-2 overflow-auto">
              <img v-for="(photo, index) in report.Photo" :key="index" :src="getImageUrl(photo)" alt="Report Photo"
                class="w-24 h-24 object-cover rounded-md cursor-pointer" @click="photoPreview = getImageUrl(photo)">
            </div>
          </div>
        </div>
        <div class="flex-1 mb-4 font-bold">
          <h2 class="text-xl font-bold text-red-800 mb-2">
            <span class="text-gray-800">Report Type: </span> ({{ report.ReportType }})
          </h2>
          <p class="text-teal-600 mb-2">
            <span class="text-black">Status: </span>{{ report.Status }}
          </p>
          <p class="text-gray-600 mb-2">
            <span>Description: </span>{{ report.Description }}
          </p>
          <p class="text-gray-600 mb-4">
            Location: <span class="bg-teal-600 p-1 text-white rounded-full">{{ report.Location }}</span>
          </p>
          <button @click="editReport(report)"
            class="mt-2 text-center bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
            Edit Report
          </button>
          <button @click="deleteReport(report)"
            class="mt-2 ml-4 text-center bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300">
            Delete Report
          </button>
        </div>
      </div>
    </div>
    <p v-else class="text-center text-gray-600">You have no reports yet.</p>

    <!-- Edit Report Form -->
    <div v-if="selectedReport" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center top-12">
      <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 class="text-xl font-bold mb-4">Edit Report</h2>
        <form @submit.prevent="updateReportDetails" enctype="multipart/form-data">
          <div class="mb-4">
            <label for="status" class="block text-gray-700">Report Type</label>
            <select v-model="selectedReport.ReportType" id="status"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
              <option value="Found">Found</option>
              <option value="Lost">Lost</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="description" class="block text-gray-700">Description</label>
            <textarea v-model="selectedReport.Description" id="description" rows="4"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md"></textarea>
          </div>
          <div class="mb-4">
            <label for="location" class="block text-gray-700">Location</label>
            <input v-model="selectedReport.Location" id="location" type="text"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
          </div>
          <div class="mb-4">
            <label for="status" class="block text-gray-700">Status</label>
            <select v-model="selectedReport.Status" id="status"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="photo" class="block text-gray-700">Add Photo</label>
            <input @change="handlePhotoChange" type="file" id="photo" accept="image/*"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
          </div>
          <div class="flex justify-between">
            <button type="button" @click="cancelEdit"
              class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save
              Changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <footer class="bg-gray-800 text-white py-8 mt-4">
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
import instance from '@/utils/axios';
import LostFound from '@/views/user/LostFound.vue';
import Swal from 'sweetalert2';

export default {
  components: {
    LostFound
  },
  data() {
    return {
      reports: [],
      selectedReport: null, 
      photoPreview: null, 
      newPhoto: null, 
      errorMessage: '', 
    };
  },
  mounted() {
    this.fetchReports();
  },
  methods: {
    async fetchReports() {
      try {
        const response = await instance.get('/api/my-reports', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.reports = response.data.map(report => ({
          ...report,
          Photo: JSON.parse(report.Photo)
        }));
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    },

    editReport(report) {
      this.selectedReport = { ...report }; 
      this.photoPreview = this.selectedReport.Photo.length ? this.getImageUrl(this.selectedReport.Photo[0]) : null; 
    },

    cancelEdit() {
      this.selectedReport = null; 
      this.photoPreview = null;
      this.newPhoto = null; 
      this.errorMessage = ''; 
    },

    async updateReportDetails() {
      const formData = new FormData();
      formData.append('ReportType', this.selectedReport.ReportType);
      formData.append('Description', this.selectedReport.Description);
      formData.append('Location', this.selectedReport.Location);
      formData.append('Status', this.selectedReport.Status);
      formData.append('PetID', this.selectedReport.PetID || '');
      if (this.newPhoto) {
        formData.append('Photo', this.newPhoto);
      } else {
        formData.append('Photo', JSON.stringify(this.selectedReport.Photo)); 
      }

      try {
        await instance.patch(`/api/my-reports/${this.selectedReport.ReportID}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Report updated successfully!',
        });
        const index = this.reports.findIndex(r => r.ReportID === this.selectedReport.ReportID);
        if (index !== -1) {
          this.reports.splice(index, 1, this.selectedReport);
        }
        this.cancelEdit();
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Failed to update report: ${error.response ? error.response.data.message : error.message}`,
        });
        console.error('Failed to update report:', error.response ? error.response.data : error.message);
      }
    },

    deleteReport(report) {
      Swal.fire({
        title: 'Are you sure?',
        text: "This report will be permanently deleted!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          instance.delete(`/api/reports/${report.ReportID}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
            .then(() => {
              Swal.fire(
                'Deleted!',
                'The report has been deleted.',
                'success'
              );
              this.reports = this.reports.filter(r => r.ReportID !== report.ReportID);
            })
            .catch(error => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Failed to delete report: ${error.response ? error.response.data.message : error.message}`,
              });
              console.error('Failed to delete report:', error);
            });
        }
      });
    },

    handlePhotoChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.newPhoto = file; 
        this.photoPreview = URL.createObjectURL(file); 
      }
    },
    getImageUrl(photoPath) {
      return photoPath ? `http://192.168.67.185:3000/${photoPath}` : 'https://via.placeholder.com/150'; 
    }
  }
};
</script>
<style scoped>
.group-hover:opacity-100,
.group-hover:scale-105 {
  transition: all 0.3s ease;
}
</style>