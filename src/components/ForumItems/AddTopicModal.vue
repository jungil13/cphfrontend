<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
      <h3 class="text-lg font-semibold">Add New Topic</h3>
      <form @submit.prevent="submitTopic">
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" placeholder="Type a post title here..." v-model="newTopic.title"
            class="mt-1 p-2 block w-full rounded-md border-gray-300 shadow shadow-black focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required>
        </div>
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700">Content</label>
          <textarea placeholder="Type a content here..." v-model="newTopic.content" rows="4"
            class="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm shadow-black focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required></textarea>
        </div>
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700">Upload Images (max 4)</label>
          <input type="file" @change="handleFileUpload" multiple accept="image/*"
            class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0 file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
          <p class="mt-2 text-xs text-gray-500">You can upload up to 4 images.</p>
        </div>
        <div class="mt-4 grid grid-cols-2 gap-2">
          <div v-for="(image, index) in newTopic.images" :key="index" class="relative">
            <img :src="URL.createObjectURL(image)" alt="Image Preview" class="w-full h-24 object-cover rounded-md" />
            <button type="button" @click="removeImage(index)" class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1">
              &times;
            </button>
          </div>
        </div>
        <div class="flex justify-between mt-6">
          <button type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out">
            Submit
          </button>
          <button @click="$emit('close')" type="button"
            class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import instance from '@/utils/axios';
import Swal from 'sweetalert2';  // Import SweetAlert2

const newTopic = ref({
  title: '',
  content: '',
  images: [] // Store uploaded images here
});

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files);
  if (newTopic.value.images.length + files.length > 4) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'You can upload a maximum of 4 images!'
    });
    return;
  }
  newTopic.value.images.push(...files); // Store the selected files
};

const removeImage = (index) => {
  newTopic.value.images.splice(index, 1); // Remove the selected image
};

const submitTopic = () => {
  if (!newTopic.value.title || !newTopic.value.content) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Both title and content are required!'
    });
    return; // Prevent the submission if data is missing
  }

  // Prepare the form data for submission
  const formData = new FormData();
  formData.append('title', newTopic.value.title);
  formData.append('content', newTopic.value.content);
  formData.append('categoryID', 1); // This should be dynamic based on your application logic

  // Append images to the form data
  newTopic.value.images.forEach((image) => {
    formData.append('images', image);
  });

  // Make an API call to create a new topic
  instance.post('/api/forum/posts', formData, {
    headers: { 
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data' // Set content type for file upload
    }
  })
    .then(response => {
      this.$emit('topic-created', { ...response.data, AuthorFullName: 'Current User' });
      newTopic.value = { title: '', content: '', images: [] }; // Reset the form
      this.$emit('close'); // Close the modal upon successful submission
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Your topic has been added successfully!'
      });
    })
    .catch(error => {
      console.error('Failed to add new topic:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to Post',
        text: `Could not add your topic. Please try again. Error: ${error.message}`
      });
    });
};
</script>
