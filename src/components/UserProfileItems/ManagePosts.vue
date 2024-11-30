<template>
    <Account />
    <div class="w-full max-w-6xl mx-auto p-5 rounded-lg">
        <h1 class="text-3xl font-extrabold mb-4 text-center">My Posts</h1>
        <p class="text-gray-600 text-center font-semibold mb-6">Manage your forum posts</p>
        <div v-if="posts.length" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 text-center">
            <div v-for="post in posts" :key="post.PostID"
                class="animate-fade-in flex flex-col bg-zinc-900 p-4 rounded-lg shadow-lg shadow-black transition-transform transform hover:scale-105 border border-gray-300">
                <div class="flex-1 mb-4 font-bold">
                    <p class="text-gray-100 mb-4">Category: <span class="bg-teal-600 p-1 text-white rounded-full">{{
                            post.CategoryName }}</span></p>
                    <h2 class="text-xl poppins-bold text-white mb-8">Title : {{ post.Title }}</h2>
                    <p class="text-white poppins-semibold mb-12"><span class>Description: </span>{{ post.Content }}
                    </p>
                  
                    <div class="flex justify-center mt-12">
                        <button @click="editPost(post)"
                            class="text-blue-400 px-4 py- rounded-full hover:bg-blue-600 transition duration-300 mr-2"><span
                                class="material-symbols-outlined">
                                edit
                            </span></button>
                        <button @click="deletePost(post)"
                            class=" text-red-400 px-4 py- rounded-full hover:bg-red-600 transition duration-300"><span
                                class="material-symbols-outlined">
                                delete
                            </span></button>
                        <router-link :to="`/topic/${post.PostID}`"
                            class="text-green-400 px-4 py-1 rounded-lg hover:bg-green-600 transition duration-300 ml-2"><span
                                class="material-symbols-outlined">
                                visibility
                            </span></router-link>
                    </div>
                </div>
            </div>
        </div>
        <p v-else class="text-center text-gray-600">You have no posts yet.</p>

        <!-- Edit Post Form -->
        <div v-if="selectedPost" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
                <h2 class="text-xl font-bold mb-4">Edit Post</h2>
                <form @submit.prevent="updatePostDetails">
                    <div class="mb-4">
                        <label for="title" class="block text-gray-700">Title</label>
                        <input v-model="selectedPost.Title" id="title" type="text"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div class="mb-4">
                        <label for="description" class="block text-gray-700">Description</label>
                        <textarea v-model="selectedPost.Content" id="description" rows="4"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"></textarea>
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
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axiosInstance from '@/utils/axios';
import Swal from 'sweetalert2';
import Account from '@/views/user/Profile/Account.vue';

const posts = ref([]);
const selectedPost = ref(null);

const fetchPosts = async () => {
    try {
        const response = await axiosInstance.get('api/forum/my-posts', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        posts.value = response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to fetch posts. Please try again later.',
        });
    }
};

const editPost = (post) => {
    selectedPost.value = { ...post };
};

const cancelEdit = () => {
    selectedPost.value = null;
};

const updatePostDetails = async () => {
    try {
        await axiosInstance.put(`/api/forum/edit-my-posts/${selectedPost.value.PostID}`, selectedPost.value, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Post updated successfully!',
        });
        const index = posts.value.findIndex(p => p.PostID === selectedPost.value.PostID);
        if (index !== -1) {
            posts.value.splice(index, 1, selectedPost.value);
        }
        cancelEdit();
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `Failed to update post: ${error.response ? error.response.data.message : error.message}`,
        });
        console.error('Failed to update post:', error);
    }
};

const deletePost = (post) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "This post will be permanently deleted!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            axiosInstance.delete(`api/forum/my-posts/${post.PostID}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(() => {
                    Swal.fire('Deleted!', 'The post has been deleted.', 'success');
                    posts.value = posts.value.filter(p => p.PostID !== post.PostID);
                })
                .catch(error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `Failed to delete post: ${error.response ? error.response.data.message : error.message}`,
                    });
                    console.error('Failed to delete post:', error);
                });
        }
    });
};

const getImageUrl = (photoPath) => {
    return photoPath ? `http://192.168.67.185:3000/${photoPath}` : 'https://via.placeholder.com/150';
};

// Fetch posts when the component is mounted
onMounted(fetchPosts);
</script>

<style scoped>
.grid {
    margin-top: 1rem;
    /* Add spacing above grid */
}
</style>
