<template>
  <div class="mt-8 bg-teal-700">
    <div class="container mx-auto px-4 py-24 max-w-3xl">
      <div v-if="topic" class="bg-white rounded-lg shadow-md shadow-black p-8 mb-8">
        <h1 class="text-4xl font-extrabold text-teal-800 mb-6 font-serif">{{ topic.Title }}</h1>
        <div class="flex items-center space-x-4 mb-6">
          <img :src="getImageUrl(topic.AuthorProfilePhoto)" alt="Author's Profile Photo"
            class="w-16 h-16 rounded-full shadow-md border border-gray-300" />
          <div class="text-lg font-semibold text-gray-700">
            <p class="font-bold">Author : <span class="italic font-semibold">{{ topic.AuthorFullName }}</span></p>
          </div>
        </div>
        <p class="text-sm text-gray-500 mb-8">{{ topic.PostDate }}</p>
        <p class="text-lg text-gray-700 font-bold italic leading-relaxed mb-8">{{ topic.Content }}</p>
        
        <!-- Image Carousel -->
        <div v-if="topic.Images && topic.Images.length > 0" class="mt-6 relative">
          <div class="flex justify-center items-center overflow-hidden border-4 rounded-lg">
            <img :src="getPostImageUrl(topic.Images[currentImageIndex])" alt="Post Image"
              class="w-full h-64 object-cover rounded-md" />
          </div>
          <div class="absolute top-1/2 left-6 transform -translate-y-1/2">
            <button @click="prevImage" class="text-white bg-gray-800 p-2 rounded-full hover:bg-gray-600">
              <span class="material-icons">chevron_left</span>
            </button>
          </div>
          <div class="absolute top-1/2 right-6 transform -translate-y-1/2">
            <button @click="nextImage" class="text-white bg-gray-800 p-2 rounded-full hover:bg-gray-600">
              <span class="material-icons">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Comments Section -->
      <div class="bg-gray-100 rounded-2xl px-10 py-8 shadow-md shadow-black transition duration-500">
        <h2 class="text-3xl font-extrabold text-gray-700 mb-6">Comments:</h2>
        <div v-for="comment in comments" :key="comment.CommentID" class="mt-4 border-b border-gray-200 pb-4 mb-6">
          <div class="flex items-center space-x-2 mb-4">
            <img :src="getImageUrl(comment.CommenterProfilePhoto)" alt="Commenter's Profile Photo"
              class="w-12 h-12 rounded-full" />
            <div class="text-md font-semibold text-gray-800">{{ comment.CommenterFullName }} • <span
                class="font-normal text-gray-500">{{ comment.CommentDate }}</span></div>
          </div>
          <p class="mt-2 text-md text-gray-700 mb-6">{{ comment.Content }}</p>
          <div v-if="isLoggedIn(comment.CommenterID)" class="flex space-x-4">
            <button @click="openEditModal(comment)" class="text-blue-500 hover:underline text-sm">
               Edit
            </button>
            <button @click="deleteComment(comment.CommentID)" class="text-red-500 hover:underline text-sm">
              Delete
            </button>
          </div>
        </div>
        <div class="mt-6 flex items-center">
          <textarea v-model="newComment" placeholder="Write a comment..."
            class="border-gray-300 border p-2 w-full rounded mr-2"></textarea>
          <button @click="addComment"
            class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-150 ease-in-out">
            <span class="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>
      <edit-comment-modal v-if="showEditModal" :comment="currentComment" @close="closeEditModal"
        @update="updateComment" />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import instance from '@/utils/axios';
import Swal from 'sweetalert2';
import EditCommentModal from './EditCommentModal.vue';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const topic = ref(null);
const comments = ref([]);
const newComment = ref('');
const currentComment = ref(null);
const showEditModal = ref(false);
const currentImageIndex = ref(0);

const fetchTopic = async () => {
  try {
    const response = await instance.get(`/api/forum/posts/id/${props.id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    topic.value = response.data;
    // Fixing the image parsing:
    if (Array.isArray(topic.value.Images)) {
      topic.value.Images = topic.value.Images;
    } else {
      topic.value.Images = JSON.parse(topic.value.Images || '[]');
    }
  } catch (error) {
    console.error('Failed to fetch topic:', error);
    Swal.fire('Error', 'Failed to load topic details.', 'error');
  }
};

const fetchComments = async () => {
  try {
    const response = await instance.get(`/api/forum/comments/post/${props.id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    comments.value = response.data;
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    Swal.fire('Error', 'Failed to load comments.', 'error');
  }
};

const openEditModal = (comment) => {
  currentComment.value = comment;
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
  currentComment.value = null;
};

const getImageUrl = (path) => {
  const imagePath = Array.isArray(path) ? path[0] : path;
  return imagePath ? `http://192.168.67.185:3000/${imagePath.replace(/\\/g, '/')}` : '/path/to/default/image.jpg';
};

const getPostImageUrl = (imagePath) => {
  return imagePath ? `http://localhost:3000${imagePath}` : '/dog.jpg';
};

const isLoggedIn = (CommenterID) => {
  return localStorage.getItem('userID') === CommenterID?.toString();
};

const addComment = async () => {
  if (!newComment.value.trim()) {
    Swal.fire('Error', 'Please enter a comment before posting!', 'error');
    return;
  }

  try {
    const response = await instance.post('/api/forum/comments', {
      postID: props.id,
      content: newComment.value
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    comments.value.push(response.data);
    newComment.value = '';
    Swal.fire('Success', 'Comment added successfully!', 'success');
    fetchComments();
  } catch (error) {
    console.error('Failed to add comment:', error);
    Swal.fire('Error', 'Failed to post comment.', 'error');
  }
};

const updateComment = async (CommentId, content) => {
  try {
    await instance.put(`/api/forum/comments/${CommentId}`, { content }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    Swal.fire('Success', 'Comment updated successfully!', 'success');
    fetchComments();
    closeEditModal(); // Close the modal upon success
  } catch (error) {
    console.error('Failed to edit comment:', error);
    Swal.fire('Error', 'Failed to update comment.', 'error');
  }
};

const deleteComment = (commentId) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      instance.delete(`/api/forum/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
        .then(() => {
          Swal.fire('Deleted!', 'Your comment has been deleted.', 'success');
          fetchComments();
        })
        .catch(error => {
          console.error('Failed to delete comment:', error);
          Swal.fire('Error', 'Failed to delete comment.', 'error');
        });
    }
  });
};

const prevImage = () => {
  if (currentImageIndex.value === 0) {
    currentImageIndex.value = topic.value.Images.length - 1;
  } else {
    currentImageIndex.value--;
  }
};

const nextImage = () => {
  if (currentImageIndex.value === topic.value.Images.length - 1) {
    currentImageIndex.value = 0;
  } else {
    currentImageIndex.value++;
  }
};

onMounted(() => {
  fetchTopic();
  fetchComments();
});
</script>

<style scoped>
.material-icons {
  font-size: 2rem;
}
</style>
