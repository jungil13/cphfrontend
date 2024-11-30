<template>
  <LostFound />
  <div class="max-w-5xl mx-auto bg-teal-800 border border-gray-900 p-6 rounded-lg shadow-lg shadow-black">
    <h1 class="text-3xl font-extrabold mb-6 text-center text-white font-sans">Report Lost or Found Pet</h1>
    <form @submit.prevent="submitReport" enctype="multipart/form-data">
      <!-- Report Type Selection -->
      <div class="mb-5">
        <label for="report-type" class="block text-gray-100 font-extrabold mb-2">Report Type</label>
        <select id="report-type" v-model="report.reportType" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="Lost">I lost my pet</option>
          <option value="Found">I found a pet</option>
        </select>
      </div>

      <!-- Description Input -->
      <div class="mb-5">
        <label for="description" class="block text-gray-100 font-extrabold mb-2">Description</label>
        <textarea id="description" v-model="report.description" rows="4" placeholder="Describe the pet and any details about the incident" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
      </div>

      <!-- Last Seen Location Input -->
      <div class="mb-5">
        <label for="last-seen-location" class="block text-gray-100 font-extrabold mb-2">Last Seen or Found Location</label>
        <input type="text" id="last-seen-location" v-model="report.location" placeholder="Enter the location where the pet was last seen or found" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
      </div>

      <!-- Contact Information Input -->
      <div class="mb-5">
        <label for="contact-info" class="block text-gray-100 font-extrabold mb-2">Your Contact Information</label>
        <input type="text" id="contact-info" v-model="report.contactInfo" placeholder="Provide a phone number or email for contact" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
      </div>

      <!-- Photo Upload Input -->
      <div class="mb-5">
        <label for="photo" class="block text-gray-100 font-extrabold mb-6">Upload Photos (Max 4)</label>
        <input type="file" id="photo" @change="handleFileUpload" multiple class="file:bg-indigo-500 file:border-0 file:rounded file:text-white file:font-bold text-white font-bold file:px-4 file:py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500">

        <!-- Image Preview Section -->
        <div class="flex flex-wrap mt-4">
          <div v-for="(image, index) in photoPreviews" :key="index" class="relative w-24 h-24 m-2">
            <img :src="image" alt="Preview" class="w-full h-full object-cover rounded-lg border border-gray-300">
            <button type="button" @click="removeImage(index)" class="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-700">×</button>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="text-center mt-6">
        <button type="submit" class="bg-indigo-600 text-white font-bold py-2 px-8 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700">
          Submit Report
        </button>
      </div>
    </form>
  </div>
   <footer class="bg-gray-800 text-white py-8 mt-8">
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
import Swal from 'sweetalert2'; // Ensure you have SweetAlert2 installed
import LostFound from '@/views/user/LostFound.vue';

export default {
  components: {
    LostFound
  },
  data() {
    return {
      report: {
        reportType: 'Lost',
        description: '',
        location: '',
        contactInfo: ''
      },
      photos: [], // Array to hold the photos
      photoPreviews: [] // Array to hold the preview URLs
    };
  },
  methods: {
    submitReport() {
      const formData = new FormData();
      formData.append('reportType', this.report.reportType);
      formData.append('description', this.report.description);
      formData.append('location', this.report.location);
      formData.append('contactInfo', this.report.contactInfo);
      
      this.photos.forEach((photo, index) => {
        formData.append(`photo`, photo); // Append each photo
      });

      const token = localStorage.getItem('token'); 

      instance.post('/api/reports', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        Swal.fire('Success', 'Report submitted successfully!', 'success');
        this.resetForm();
      })
      .catch(error => {
        console.error('Error submitting report:', error);
        Swal.fire('Error', 'Failed to submit the report.', 'error');
      });
    },
    handleFileUpload(event) {
      const files = Array.from(event.target.files);

      if (files.length + this.photos.length > 4) {
        Swal.fire('Limit Reached', 'Sorry, you can only add up to 4 images.', 'warning');
        return;
      }

      files.forEach(file => {
        this.photos.push(file);
        this.photoPreviews.push(URL.createObjectURL(file));
      });
    },
    removeImage(index) {
      this.photos.splice(index, 1); // Remove photo from array
      this.photoPreviews.splice(index, 1); // Remove preview URL from array
    },
    resetForm() {
      this.report = {
        reportType: 'Lost',
        description: '',
        location: '',
        contactInfo: ''
      };
      this.photos = [];
      this.photoPreviews = [];
    }
  }
}
</script>

<style scoped>
/* Additional styles if needed */
</style>
