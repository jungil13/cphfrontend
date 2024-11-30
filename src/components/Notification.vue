<template>
  <div class="relative">
    <!-- Notification Bell Icon -->
    <button
      @click="toggleNotifications"
      class="relative p-3 bg-teal-500 text-white rounded-full hover:bg-blue-400 focus:outline-none transition duration-300"
    >
      <!-- Bell Icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 17h5l-1.403-1.403C18.8 14.26 19 13.132 19 12V8a7 7 0 10-14 0v4c0 1.132.2 2.26.403 3.597L4 17h5m6 0v1a2 2 0 11-4 0v-1m0-5v-3a3 3 0 116 0v3"
        />
      </svg>
      <!-- Notification Count Badge -->
      <span
        v-if="unreadCount > 0"
        class="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full animate-bounce"
      >
        {{ unreadCount }}
      </span>
    </button>

    <!-- Notification Dropdown -->
    <div
      v-if="showNotifications"
      class="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50"
    >
      <h2 class="text-lg font-semibold p-4 border-b text-gray-700">
        Notifications
      </h2>
      <ul class="max-h-60 overflow-y-auto p-4 space-y-3">
        <li
          v-for="notification in notifications"
          :key="notification.id"
          class="bg-gray-100 p-3 rounded-md hover:bg-gray-200 transition duration-200"
        >
          <div class="flex flex-col gap-1">
            <p class="text-sm">{{ notification.message }}</p>
            <div class="flex justify-between items-center">
              <span v-if="notification.commenterName" class="text-xs text-gray-600">
                By: {{ notification.commenterName }}
              </span>
              <span class="text-xs text-gray-500">
                {{ formatDate(notification.createdAt) }}
              </span>
            </div>
          </div>
        </li>
      </ul>
      <div
        v-if="notifications.length === 0"
        class="p-4 text-center text-gray-500"
      >
        No new notifications
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import socket from '@/socket'; // assuming the socket instance is set up in a separate file
import { useToast } from 'vue-toastification';
import instance from '@/utils/axios';

const notifications = ref([]);
const showNotifications = ref(false);
const toast = useToast();
const unreadCount = computed(() => notifications.value.filter((n) => !n.is_read).length);

// Format date helper function
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString();
};

// Fetch existing notifications
const fetchNotifications = async () => {
  const userId = localStorage.getItem('user_id'); // Assume the user ID is stored in localStorage

  if (!userId) {
    console.log('User not authenticated');
    return;
  }

  try {
    const response = await instance.get(`/api/notifications/${userId}`);
    notifications.value = response.data;
  } catch (error) {
    console.error('Failed to fetch notifications:', error);
    toast.error('Failed to load notifications');
  }
};

// Setup socket connection for authenticated user
const setupSocketConnection = () => {
  const userId = localStorage.getItem('user_id');
  
  if (userId) {
    socket.emit('join', userId);

    // Listen for new notifications
    socket.on('notification', (data) => {
      if (data && data.message) {
        notifications.value.unshift({
          ...data,
          createdAt: new Date(),
          is_read: false, // Mark as unread by default
        });

        toast.success(data.message, {
          timeout: 5000,
          position: 'top-right',
        });
      } else {
        console.error('Invalid notification data received:', data);
      }
    });
  }
};

// Toggle notification dropdown visibility
const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
  if (showNotifications.value) {
    fetchNotifications();
  }
};

onMounted(async () => {
  const userId = localStorage.getItem('user_id');
  
  if (userId) {
    await fetchNotifications();
    setupSocketConnection();
  }
});

onBeforeUnmount(() => {
  socket.off('notification');
});
</script>
