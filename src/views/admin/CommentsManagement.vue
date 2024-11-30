<template>
  <div class="p-6 min-h-screen">
    <div class="mb-8 text-center">
      <h1 class="text-4xl font-extrabold italic mb-8 text-center text-gray-800 animate-fade-in">
     Forum Comments Management
    </h1>
      <div class="flex items-center justify-center">
        <div class="relative w-full max-w-lg">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <span class="material-icons text-gray-400">search</span>
          </span>
          <input
            type="text"
            class="w-full py-3 pl-12 pr-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search comments..."
            v-model="searchQuery"
            @input="handleSearch"
          />
        </div>
      </div>
    </div>

    <div class="overflow-x-auto shadow-black bg-white shadow-md rounded-lg mb-8">
      <table class="min-w-full">
        <thead class="bg-blue-600 text-white uppercase text-sm leading-normal font-semibold">
          <tr>
            <th class="py-4 px-6 text-left">Post Title</th>
            <th class="py-4 px-6 text-left">Commenter Name</th>
            <th class="py-4 px-6 text-left">Comment</th>
            <th class="py-4 px-6 text-center">Date</th>
            <th class="py-4 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="text-gray-700 text-sm font-medium">
          <tr
            v-for="comment in comments"
            :key="comment.CommentID"
            class="border-b border-gray-200 hover:bg-gray-50"
          >
            <td class="py-4 px-6 text-left whitespace-nowrap">{{ comment.PostTitle }}</td>
            <td class="py-4 px-6 text-left">{{ comment.CommenterName }}</td>
            <td class="py-4 px-6 text-left max-w-xs truncate">{{ comment.Content }}</td>
            <td class="py-4 px-6 text-center">{{ comment.CommentDate }}</td>
            <td class="py-4 px-6 text-center">
  <div class="flex justify-center gap-4">
    <button
      class="flex items-center justify-center w-10 h-10 rounded-full hover:bg-blue-100 transition"
      @click="viewComment(comment)"
      aria-label="View Comment"
    >
      <span class="material-icons text-blue-500">visibility</span>
    </button>
    <button
      class="flex items-center justify-center w-10 h-10 rounded-full hover:bg-blue-100 transition"
      @click="editComment(comment)"
      aria-label="Edit Comment"
    >
      <span class="material-icons text-blue-500">edit</span>
    </button>
    <button
      class="flex items-center justify-center w-10 h-10 rounded-full hover:bg-red-100 transition"
      @click="deleteComment(comment)"
      aria-label="Delete Comment"
    >
      <span class="material-icons text-red-500">delete</span>
    </button>
  </div>
</td>

          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center mt-6 gap-4">
      <button 
        @click="goToPage(currentPage - 1)" 
        :disabled="currentPage <= 1" 
        class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Previous
      </button>
      <span class="text-lg font-semibold">Page {{ currentPage }} of {{ totalPages }}</span>
      <button 
        @click="goToPage(currentPage + 1)" 
        :disabled="currentPage >= totalPages" 
        class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Next
      </button>
    </div>

    <!-- View Comment Modal -->
    <div v-if="showViewModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg p-8 w-1/3 max-w-lg">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">View Comment</h2>
        <p class="text-gray-700 mb-4"><strong>Post Title:</strong> {{ selectedComment.PostTitle }}</p>
        <p class="text-gray-700 mb-4"><strong>Commenter Name:</strong> {{ selectedComment.CommenterName }}</p>
        <p class="text-gray-700 mb-6"><strong>Content:</strong> {{ selectedComment.Content }}</p>
        <button @click="closeViewModal" class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">Close</button>
      </div>
    </div>

    <!-- Edit Comment Modal -->
    <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg p-8 w-1/3 max-w-lg">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">Edit Comment</h2>
        <textarea v-model="editedContent" class="w-full p-4 border border-gray-300 rounded-lg mb-6 text-sm focus:ring-2 focus:ring-blue-500" rows="6"></textarea>
        <div class="flex justify-end gap-4">
          <button @click="updateComment" class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">Update</button>
          <button @click="closeEditModal" class="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Delete Comment Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg p-8 w-1/3 max-w-lg">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">Delete Comment</h2>
        <p class="text-gray-700 mb-6">Are you sure you want to delete this comment?</p>
        <div class="flex justify-end gap-4">
          <button @click="confirmDeleteComment" class="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition">Yes, Delete</button>
          <button @click="closeDeleteModal" class="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import instance from '@/utils/axios';
import Swal from 'sweetalert2';

const comments = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const totalPages = ref(1);
const perPage = ref(5);

const showViewModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const selectedComment = ref(null);
const editedContent = ref('');

// Set the authorization header
instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

// Fetch comments from the API
const fetchComments = async () => {
  try {
    const response = await instance.get(`/api/forum/comments`, {
      params: {
        search: searchQuery.value,
        page: currentPage.value,
        pageSize: perPage.value
      }
    });
    comments.value = response.data.comments;
    totalPages.value = response.data.totalPages || 1;
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    Swal.fire('Error', 'Could not fetch comments.', 'error');
  }
};

// Handle search input
const handleSearch = () => {
  currentPage.value = 1;
  fetchComments();
};

// Pagination logic
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    fetchComments();
  }
};

// Modal methods
const viewComment = (comment) => {
  selectedComment.value = comment;
  showViewModal.value = true;
};

const closeViewModal = () => {
  showViewModal.value = false;
};

const editComment = (comment) => {
  selectedComment.value = comment;
  editedContent.value = comment.content; // Use 'content' instead of 'Content'
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
};

// Update comment function
const updateComment = () => {
  if (editedContent.value) {
    console.log("Sending request body:", { content: editedContent.value }); // Log the request body
    instance.put(`/api/forum/comments/${selectedComment.value.CommentID}`, { content: editedContent.value }) // Ensure 'content' is lowercase
      .then(response => {
        Swal.fire('Success', response.data.msg, 'success');
        fetchComments(); // Refresh comments after editing
        closeEditModal(); // Close the edit modal
      })
      .catch(error => {
        console.error('Failed to edit comment:', error);
        Swal.fire('Error', 'Could not edit comment.', 'error');
      });
  } else {
    Swal.fire('Error', 'Comment content is required.', 'error');
  }
};

// Delete comment methods
const deleteComment = (comment) => {
  selectedComment.value = comment;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
};

const confirmDeleteComment = () => {
  instance.delete(`/api/forum/comments/${selectedComment.value.CommentID}`)
    .then(response => {
      Swal.fire('Deleted!', response.data.msg, 'success');
      fetchComments();
      closeDeleteModal();
    })
    .catch(error => {
      Swal.fire('Error', 'Could not delete comment.', 'error');
    });
};

// Fetch comments on component mount
onMounted(fetchComments);
</script>