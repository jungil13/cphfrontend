<template>
  <div class="p-6 min-h-screen">
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-4xl font-extrabold italic mb-8 text-center text-gray-800 animate-fade-in">
      Forum Posts Management
    </h1>
      <div class="flex items-center justify-center">
        <div class="relative w-1/3">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <span class="material-icons text-gray-500">search</span>
          </span>
          <input
            type="text"
            class="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search posts..."
            v-model="searchQuery"
            @input="handleSearch"
          />
        </div>
      </div>
    </div>

    <!-- Posts Table -->
    <div class="overflow-x-auto bg-white shadow-md shadow-black rounded-lg">
      <table class="min-w-full bg-white">
        <thead class="bg-blue-600 text-white uppercase text-sm leading-normal font-semibold">
          <tr>
            <th class="py-3 px-6 text-left">Category Name</th>
            <th class="py-3 px-6 text-left">Author</th>
            <th class="py-3 px-6 text-left">Title</th>
            <th class="py-3 px-6 text-center">Content</th>
            <th class="py-3 px-6 text-center">Date</th>
            <th class="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-semibold">
          <tr v-for="post in posts" :key="post.PostID" class="border-b border-gray-200 hover:bg-gray-100">
            <td class="py-3 px-6 text-left whitespace-nowrap">{{ post.CategoryName }}</td>
            <td class="py-3 px-6 text-left">{{ post.AuthorFullName }}</td>
            <td class="py-3 px-6 text-left">{{ post.Title }}</td>
            <td class="py-3 px-6 text-center">{{ post.Content }}</td>
            <td class="py-3 px-6 text-center">{{ post.PostDate }}</td>
            <td class="py-3 px-6 text-center">
              <div class="flex items-center justify-center space-x-2">
                <button @click="openViewModal(post)" class="w-8 h-8 rounded-full hover:bg-blue-100 flex items-center justify-center">
                  <span class="material-icons text-blue-500">visibility</span>
                </button>
                <button @click="openEditModal(post)" class="w-8 h-8 rounded-full hover:bg-green-100 flex items-center justify-center">
                  <span class="material-icons text-green-500">edit</span>
                </button>
                <button @click="deletePost(post)" class="w-8 h-8 rounded-full hover:bg-red-100 flex items-center justify-center">
                  <span class="material-icons text-red-500">delete</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

     <!-- View Modal -->
     <div v-if="showViewModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
  <div class="bg-white rounded-lg shadow-lg p-8 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 transform transition-all duration-300">
    <button @click="closeViewModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <h2 class="text-3xl font-semibold text-gray-800 mb-2">{{ selectedPost.Title }}</h2>
    <p class="text-sm text-gray-500 mb-6">{{ selectedPost.PostDate }} • {{ selectedPost.CategoryName }}</p>
    
    <div class="text-gray-700 mb-6">
      <h3 class="text-xl font-medium mb-2">{{ selectedPost.AuthorFullName }}</h3>
      <p class="leading-relaxed">{{ selectedPost.Content }}</p>
    </div>
    
    <button @click="closeViewModal" class="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200">
      Close
    </button>
  </div>
</div>


    <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg p-6 w-1/3">
        <h2 class="text-2xl font-bold mb-4">Edit Post</h2>
        <input v-model="selectedPost.Title" class="border border-gray-300 rounded px-4 py-2 mb-4 w-full" />
        <textarea v-model="selectedPost.Content" class="border border-gray-300 rounded px-4 py-2 w-full mb-4"></textarea>
        <button @click="updatePost" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2">Save</button>
        <button @click="closeEditModal" class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import instance from '@/utils/axios';
import Swal from 'sweetalert2';

const posts = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const totalPages = ref(1);
const perPage = ref(6);
const showViewModal = ref(false);
const showEditModal = ref(false);
const selectedPost = ref({});

instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

const openViewModal = (post) => {
  selectedPost.value = post;
  showViewModal.value = true;
};

const closeViewModal = () => {
  showViewModal.value = false;
};

const openEditModal = (post) => {
  selectedPost.value = { ...post };
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
};

const updatePost = async () => {
  try {
    await instance.put(`/api/forum/edit-my-posts/${selectedPost.value.PostID}`, selectedPost.value);
    Swal.fire('Updated!', 'Your post has been updated.', 'success');
    closeEditModal();
    fetchPosts();
  } catch (error) {
    Swal.fire('Error', 'Could not update post.', 'error');
  }
};

const fetchPosts = async () => {
  try {
    const response = await instance.get('/api/forum/posts', {
      params: {
        search: searchQuery.value,
        page: currentPage.value,
        pageSize: perPage.value
      }
    });

    console.log('API Response:', response.data);  
    posts.value = response.data.posts;
    totalPages.value = response.data.totalPages || 1;  
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    Swal.fire('Error', 'Could not fetch posts.', 'error');
  }
};

const handleSearch = () => {
  currentPage.value = 1;
  fetchPosts();   
};

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    fetchPosts(); 
  }
};


async function deletePost(post) {
  const confirmDelete = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  });

  if (confirmDelete.isConfirmed) {
    try {
      await instance.delete(`/api/forum/my-posts/${post.PostID}`);
      Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
      fetchPosts(); // Refresh the posts list
    } catch (error) {
      console.error('Failed to delete post:', error);
      Swal.fire('Error', 'Could not delete post.', 'error');
    }
  }
}

onMounted(fetchPosts);
</script>

<style scoped>
.material-icons {
  font-size: 1.25rem;  
}
</style>