<template>
    <section class="w-full h-full p-12 shadow-md shadow-teal-800">
      <div class="flex flex-col items-center justify-center">
        <div class="bg-teal-800 p-8 rounded-lg shadow-xl shadow-teal-600 max-w-lg transform transition-all duration-500 hover:scale-105">
          <h1 class="text-3xl font-extrabold text-gray-100 mb-4 animate__animated animate__fadeIn">Manage Donations</h1>
          <h2 class="text-lg text-gray-100 mb-6 animate__animated animate__fadeIn animate__delay-1s">Upload or replace the GCash QR Code</h2>
  
          <!-- Current Image Preview -->
          <div v-if="image" class="mb-6 transition-all transform scale-95 hover:scale-100">
        <img :src="image" alt="Current Donation Image" class="mx-auto rounded-lg shadow-lg" style="max-width: 300px; height: auto;" />
          </div>
          <div v-else class="mb-6 transition-all transform scale-95 hover:scale-100">
            <!-- Fallback image if no image is set -->
            <img src="https://via.placeholder.com/300" alt="Default Donation Image" class="mx-auto rounded-lg shadow-lg" style="max-width: 300px; height: auto;" />
          </div>
  
          <!-- File Upload -->
          <input
            type="file"
            @change="onFileChange"
            class="input mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
            accept="image/*"
          />
          <button
            @click="uploadImage"
            class="btn mb-6 px-6 py-2 rounded-lg text-white bg-teal-600 hover:bg-teal-700 transition-all duration-300 transform active:scale-95"
            :disabled="!selectedFile"
          >
            Upload Image
          </button>
        </div>
      </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const image = ref(null); // URL of the current image
const selectedFile = ref(null); // The file selected for upload

// Fetch the current image when the component is mounted
onMounted(() => {
  fetchCurrentImage();
});

// Fetch the current image from the specified URL
const fetchCurrentImage = async () => {
    try {
        // Fetch the current image from the backend
        const response = await axios.get('http://localhost:3000/api/donations/get-image', { responseType: 'blob' });
        const imageUrl = URL.createObjectURL(response.data); // Create a URL for the image blob
        image.value = imageUrl; // Set the image URL
        console.log('Fetched image URL:', image.value); // Debugging line
    } catch (error) {
        console.error('Error fetching current image:', error);
        image.value = 'https://via.placeholder.com/150'; // Fallback to a default image in case of error
    }
};
const onFileChange = (event) => {
  selectedFile.value = event.target.files[0]; // Get the selected file
};

const uploadImage = async () => {
  if (!selectedFile.value) {
    alert('Please select a file to upload.');
    return;
  }

  const formData = new FormData();
  formData.append('image', selectedFile.value); // Append the file to the form data

  try {
    const response = await axios.post('http://localhost:3000/api/donations/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    // Assuming the server responds with the new image URL
    if (response.data && response.data.filePath) {
      image.value = response.data.filePath; // Update the image URL directly from the response
      alert('Image uploaded successfully!');
    } else {
      alert('Image upload failed, no filePath returned.');
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    alert('Failed to upload image.');
  }
};
</script>