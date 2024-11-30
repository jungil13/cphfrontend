<template>
    <div class="max-w-screen">
        <h2 class="text-4xl font-extrabold text-teal-900 mb-8 text-center">Latest Forum Posts</h2>

        <!-- Loading Placeholder -->
        <div v-if="loading" class="text-center py-10 text-gray-500 text-lg font-medium">
            Loading posts...
        </div>

        <!-- Error Message -->
        <div v-else-if="error" class="text-center py-10 text-red-500 text-lg font-medium">
            Failed to load posts. Please try again later.
        </div>

        <!-- Posts Grid -->
        <div v-else
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 w-full bg-teal-50 py-10 rounded-lg">
            <div v-for="post in posts" :key="post.PostID"
                class="bg-white rounded-xl shadow-md shadow-black transform transition-transform duration-300 hover:scale-105 overflow-hidden">
                <!-- Category Badge -->
                <div class="relative">
                    <p
                        class="z-50 absolute top-4 left-4 bg-teal-300 text-teal-900 font-semibold px-3 py-1 rounded-lg shadow-md text-sm uppercase tracking-wider">
                        {{ post.CategoryName }}
                    </p>

                    <!-- Slideshow -->
                    <div class="relative h-48 overflow-hidden rounded-t-lg">
                        <!-- Check if there are images, otherwise show the fallback image -->
                        <img v-if="post.images.length === 0" src="/no.jpg" alt="No Image"
                            class="w-full h-full object-cover" />

                        <img v-for="(image, index) in post.images" :key="index" :src="getPostImageUrl(image)"
                            alt="Post Image"
                            class="absolute inset-0 w-full h-full object-cover transition-opacity duration-700" :class="{
                                'opacity-0': currentSlide[post.PostID] !== index,
                                'opacity-100': currentSlide[post.PostID] === index,
                            }" />

                        <div v-if="post.images.length > 1" class="absolute bottom-2 right-2 flex space-x-2">
                            <span v-for="(dot, idx) in post.images" :key="idx" class="w-2 h-2 rounded-full bg-gray-200"
                                :class="{ 'bg-teal-500': currentSlide[post.PostID] === idx }"></span>
                        </div>
                    </div>

                </div>

                <!-- Post Details -->
                <div class="p-6">
                    <h3 class="text-2xl font-extrabold text-teal-800 mb-6 font-serif">{{ post.Title }}</h3>
                    <hr class="mt-6 mb-6 border-t-2 border-gray-200" />
                    <p class="text-gray-700 mb-4 line-clamp-3">
                        {{ post.Content ? post.Content.substring(0, 100) + "..." : "No content available." }}
                    </p>
                    <div class="text-sm text-gray-600 mb-4">
                        <p><span class="font-semibold">Author:</span> <span class="text-teal-800">{{ post.AuthorFullName}}</span></p>
                        <p><span class="font-semibold">Date:</span> <span>{{post.PostDate}}</span></p>
                    </div>
                    <router-link :to="`/topic/${post.PostID}`"
                        class="block text-center bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800 font-semibold transition duration-300">
                        View Details
                    </router-link>
                </div>
            </div>
        </div>

        <!-- Right aligned View All button -->
        <div class="text-center w-full mt-8">
            <router-link to="/posts"
                class="text-white bg-orange-600 font-bold py-3 px-6 rounded-full transform transition-transform duration-300 hover:scale-110 shadow-lg">
                View All Posts
            </router-link>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

// Reactive state
const posts = ref([]);
const loading = ref(true);
const error = ref(false);
const currentSlide = ref({});

// Function to get the post image URL
const getPostImageUrl = (imagePath) => {
    return imagePath ? `http://localhost:3000${imagePath}` : '../no.jpg';
};

// Fetch posts using Axios
const fetchPosts = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/forum/latest-posts', { params: { page: 1, perPage: 4 } });

        const fetchedPosts = response.data.posts;
        posts.value = fetchedPosts.map((post) => ({
            ...post,
            images: Array.isArray(post.Images)
                ? post.Images // If already an array, use it directly
                : JSON.parse(post.Images || '[]'), // Otherwise, parse the JSON string into an array
        }));

        // Initialize slideshow state for each post
        posts.value.forEach((post) => {
            if (post.images.length > 0) {
                currentSlide.value[post.PostID] = 0;
            }
        });
    } catch (err) {
        console.error('Error fetching posts:', err);
        error.value = true;
    } finally {
        loading.value = false;
    }
};

// Auto-slide logic
const startSlideshow = () => {
    setInterval(() => {
        posts.value.forEach((post) => {
            if (post.images.length > 1) {
                currentSlide.value[post.PostID] = (currentSlide.value[post.PostID] + 1) % post.images.length;
            }
        });
    }, 3000); // Change slides every 3 seconds
};

// Fetch posts on component mount and start slideshow
onMounted(() => {
    fetchPosts();
    startSlideshow();
});
</script>

<style scoped>
/* Additional styles for better visuals */
h2 {
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.bg-white:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>
