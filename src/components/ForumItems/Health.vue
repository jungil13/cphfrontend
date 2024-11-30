<template>
  <Forum />
  <div class="max-w-7xl mx-auto p-12 bg-teal-700 shadow-lg rounded-lg"> <!-- Increased padding and rounded corners -->
    <div class="text-center mb-8">
      <button @click="showAddHealthModal = true"
        class="bg-yellow-300 shadow-md hover:bg-blue-700 text-black font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out">
        Add New Topic
      </button>
    </div>
    <div class="text-center mb-8 animate-fade-in">
      <h2 class="text-4xl font-bold tracking-tight text-teal-50 sm:text-5xl">Health and Nutrition Forum</h2>
      <p class="mt-2 text-lg text-teal-50">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa illo quaerat distinctio.</p>
    </div>
    <div class="mt-10">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"> <!-- Responsive grid setup -->
        <article v-for="topic in topics" :key="topic.PostID"
          class="flex flex-col bg-white rounded-xl p-6 shadow-lg border border-gray-300 hover:shadow-xl transition-transform transform hover:scale-105">
          <!-- Improved card styles -->
          <div class="flex items-center gap-x-4 text-xs text-gray-500 mb-4">
            <time :datetime="topic.PostDate" class="text-gray-500">{{ topic.PostDate }}</time>
            <p class="z-50 absolute top-16 left-8 bg-teal-300 text-teal-900 font-semibold px-3 py-1 rounded-lg shadow-md text-sm uppercase tracking-wider">
              Health
            </p>
          </div>
          <div class="relative h-48 overflow-hidden rounded-t-lg mb-4">
            <img v-if="topic.Images && topic.Images.length > 0" :src="getPostImageUrl(topic.Images[0])" alt="Post Image"
              class="w-full h-full object-cover" />
            <img v-else src="/no.jpg" alt="Default Image" class="w-full h-full object-cover" />
          </div>
          <div class="group relative mt-4">
            <h3 class="text-3xl font-extrabold text-teal-800 mb-6 font-serif">
              <a href="#">{{ topic.Title }}</a>
            </h3>
            <p class="mt-2 text-sm text-gray-600 line-clamp-3">{{ topic.Content }}</p>
          </div>
          <hr class="mt-6 border-t-2 border-gray-200" />
          <div class="mt-4 flex items-center gap-x-4 text-center">
            <img :src="getImageUrl(topic.AuthorProfilePhoto)" alt="Author's Profile"
              class="w-12 h-12 rounded-full shadow-md border border-white" />
            <div class="text-sm leading-6">
              <p class="font-semibold text-gray-900">
                <a href="#">{{ topic.AuthorFullName }}</a>
              </p>
            </div>
          </div>
          <div class="mt-4 text-center">
            <router-link :to="`/topic/${topic.PostID}`"
              class="text-blue-600 font-bold p-2 rounded-full hover:bg-blue-100">
              View Post
            </router-link>
          </div>
        </article>
      </div>
    </div>
    <AddHealthModal v-if="showAddHealthModal" @close="showAddHealthModal = false" @submit="addNewTopic" />
  </div>
  <footer class="bg-gray-800 text-white py-8 mt-16">
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

<script setup>
import { ref, onMounted } from 'vue';
import instance from '@/utils/axios';
import Forum from '@/views/user/Forum.vue';
import AddHealthModal from './AddHealthModal.vue';

const topics = ref([]);
const showAddHealthModal = ref(false); // Ensure this variable is used to control the modal visibility

// Function to handle image URL formatting
const getImageUrl = (path) => {
  return path ? `http://192.168.67.185:3000/${path.replace(/\\/g, '/')}` : '/path/to/default/image.jpg';
};

// Function to handle post image URLs
const getPostImageUrl = (imagePath) => {
  return imagePath ? `http://localhost:3000${imagePath}` : '/dog.jpg';
};

// Fetch posts when the component is mounted
const fetchUserDetails = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await instance.get('/api/forum/posts/2', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const fetchedPosts = response.data;
    topics.value = fetchedPosts.map((post) => ({
      ...post,
      Images: Array.isArray(post.Images)
        ? post.Images // If already an array, use it directly
        : JSON.parse(post.Images || '[]'), // Otherwise, parse the JSON string into an array
    }));
  } catch (error) {
    console.error('Failed to fetch posts:', error);
  }
}

// Add a new topic to the forum
const addNewTopic = async (newTopic) => {
  try {
    const response = await instance.post('/api/forum/posts', {
      categoryID: 1,
      title: newTopic.title,
      content: newTopic.content
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    topics.value.unshift(response.data);
    showAddHealthModal.value = false; // Close the modal after submission
    fetchUserDetails();
  } catch (error) {
    console.error('Failed to add new topic:', error);
    window.location.reload();
  }
};

// Fetch topics when component is mounted
onMounted(() => {
  fetchUserDetails();
});
</script>

<style scoped>
/* Tailwind CSS for layout and transitions */
</style>