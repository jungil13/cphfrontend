<template>
  <div class="p-6 min-h-screen">
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-4xl font-extrabold italic mb-8 text-center text-gray-800 animate-fade-in">
      Users Management
    </h1>
      <div class="justify-center flex items-center">
        <div class="relative w-1/3">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <span class="material-icons text-gray-500 text-center">search</span>
          </span>
          <input
            v-model="searchQuery"
            @input="fetchUsers"
            type="text"
            class="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
            placeholder="Search users..."
          />
        </div>
      </div>
    </div>

    <!-- Users Table -->
    <div class="overflow-x-auto bg-white shadow-lg shadow-black rounded-lg">
      <table class="min-w-full whitespace-nowrap bg-white">
        <thead class="bg-blue-600 text-white uppercase text-sm leading-normal">
          <tr>
            <th class="py-3 px-6 text-left">Profile Photo</th>
            <th class="py-3 px-6 text-left">Name</th>
            <th class="py-3 px-6 text-left">Email</th>
            <th class="py-3 px-6 text-left">Address</th>
            <th class="py-3 px-6 text-center">Role</th>
            <th class="py-3 px-6 text-center">Verified</th>
            <th class="py-3 px-6 text-center">Status</th>
            <th class="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="text-gray-800 text-sm font-semibold">
          <tr v-for="user in users" :key="user.UserID" class="border border-gray-200 hover:bg-yellow-100">
            <td class="py-3 px-6 text-left">
              <img 
                :src="getUserPhotoUrl(user.ProfilePhoto)" 
                alt="User Image" 
                class="w-20 h-20 object-cover rounded-lg shadow-md shadow-black cursor-pointer" 
                @click="openModal(user.ProfilePhoto)" 
              />
            </td>
            <td class="py-3 px-6 text-left">{{ user.Fullname }}</td>
            <td class="py-3 px-6 text-left">{{ user.Email }}</td>
            <td class="py-3 px-6 text-left">{{ user.Address }}</td>
            <td class="py-3 px-6 text-center">{{ user.UserType }}</td>
            <td class="py-3 px-6 text-center">{{ user.isVerified ? 'Verified' : 'Not Verified' }}</td>
            <td class="py-3 px-6 text-center">
              <span :class="['bg-' + (user.status === 'Active' ? 'green' : 'red') + '-200', 'text-' + (user.status === 'Active' ? 'green' : 'red') + '-700', 'py-1', 'px-3', 'rounded-full', 'text-xs']">
                {{ user.status }}
              </span>
            </td>
            <td class="py-3 px-6 text-center">
              <div class="flex item-center justify-center space-x-2">
                <button v-if="canView(user)" @click="openUserModal(user)">
                  <span class="material-icons text-blue-500">visibility</span>
                </button>
                <button v-if="canEdit(user)" @click="editUser(user)">
                  <span class="material-icons text-yellow-500">edit</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center mt-6">
      <button 
        @click="changePage(currentPage - 1)" 
        :disabled="currentPage <= 1" 
        class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Previous
      </button>
      <span class="mx-4 text-lg font-semibold">Page {{ currentPage }} of {{ totalPages }}</span>
      <button 
        @click="changePage(currentPage + 1)" 
        :disabled="currentPage >= totalPages" 
        class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Next
      </button>
    </div>

    <!-- User Detail Modal (for editing/viewing) -->
    <div v-if="userModalVisible" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70">
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
        <button @click="userModalVisible = false" class="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          <span class="material-icons">close</span>
        </button>
        <h2 class="text-2xl font-bold mb-4">{{ isEditing ? 'Edit User' : 'User Details' }}</h2>
        <form @submit.prevent="handleSubmit" class="flex flex-col lg:flex-row gap-6">
          <div class="flex-shrink-0 lg:w-1/3 mb-4 lg:mb-0">
            <label class="block text-gray-700 font-semibold mb-2" for="profilePhoto">Profile Photo</label>
            <img 
              :src="getUserPhotoUrl(selectedUser.ProfilePhoto)" 
              alt="User Photo" 
              class="w-40 h-40 object-cover rounded-xl shadow-lg mb-4 mx-auto lg:mx-0 cursor-pointer" 
              @click="openModal(selectedUser.ProfilePhoto)" 
            />
            <div class="mb-4">
              <label class="block text-gray-700 font-semibold mb-2" for="newFullname">New Full Name</label>
              <input v-model="newFullname" id="newFullname" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" :readonly="!isEditing" />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 font-semibold mb-2" for="newEmail">New Email</label>
              <input v-model="newEmail" id="newEmail" type="email" class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" :readonly="!isEditing" />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 font-semibold mb-2" for="newAddress">New Address</label>
              <input v-model="newAddress" id="newAddress" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" :readonly="!isEditing" />
            </div>
          </div>
          <div class="flex-1">
            <div v-if="isEditing" class="mb-4">
              <label class="block text-gray-700 font-semibold mb-2" for="newPassword">New Password</label>
              <input v-model="newPassword" id="newPassword" type="password" class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 font-semibold mb-2" for="newUserType">New Role</label>
              <select v-model="newUserType" id="newUserType" class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" :disabled="!isEditing">
                <option value="Admin">Admin</option>
                <option value="Regular">Regular</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 font-semibold mb-2" for="newIsVerified">New Verified Status</label>
              <select v-model="newIsVerified" id="newIsVerified" class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" :disabled="!isEditing">
                <option value="1">Verified</option>
                <option value="0">Not Verified</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 font-semibold mb-2" for="newAge">New Age</label>
              <input v-model="newAge" id="newAge" type="number" class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" :readonly="!isEditing" />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 font-semibold mb-2" for="newContactnumber">New Contact Number</label>
              <input v-model="newContactnumber" id="newContactnumber" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" :readonly="!isEditing" />
            </div>
          </div>
        </form>
        <div class="flex justify-end mt-4">
          <button type="button" @click="userModalVisible = false" class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
            Cancel
          </button>
          <button v-if="isEditing" type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ml-4" @click.prevent="updateUser">
            Save Changes
          </button>
        </div>
      </div>
    </div>

    <!-- Photo Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div class="relative">
        <img 
          :src="getUserPhotoUrl(currentPhoto)" 
          alt="User Photo" 
          class="max-w-3xl max-h-3xl rounded-lg shadow-lg" 
        />
        <button @click="closeModal" class="absolute top-2 right-2 text-white text-2xl">
          &times; <!-- Close button -->
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import instance from '@/utils/axios';
import Swal from 'sweetalert2';

const searchQuery = ref('');
const users = ref([]);
const currentPage = ref(1);  // Current page
const totalPages = ref(1);  // Total number of pages
const selectedUser = ref(null);
const userModalVisible = ref(false);
const isEditing = ref(false);
const isModalOpen = ref(false);
const currentPhoto = ref(''); // For the photo modal

// User form data
const newFullname = ref('');
const newEmail = ref('');
const newAddress = ref('');
const newPassword = ref('');
const newUserType = ref('');
const newIsVerified = ref(false);
const newAge = ref('');
const newContactnumber = ref('');

// Token and Axios setup
const token = localStorage.getItem('token');
instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

const fetchUsers = async () => {
  try {
    const response = await instance.get(`/admin/users`, {
      params: {
        search: searchQuery.value,
        page: currentPage.value,
        pageSize: 5
      }
    });
    users.value = response.data.users;
    totalPages.value = response.data.totalPages;
  } catch (error) {
    console.error('Error fetching users:', error);
    Swal.fire('Error', 'Failed to load users.', 'error');
  }
};

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    fetchUsers();
  }
};

const openUserModal = (user) => {
  selectedUser.value = { ...user };
  newFullname.value = user.Fullname || '';
  newEmail.value = user.Email || '';
  newAddress.value = user.Address || '';
  newPassword.value = ''; 
  newUserType.value = user.UserType || '';
  newIsVerified.value = !!user.isVerified;
  newAge.value = user.Age || '';
  newContactnumber.value = user.Contactnumber || '';
  userModalVisible.value = true;
  isEditing.value = false;
};

const editUser = (user) => {
  openUserModal(user);
  isEditing.value = true;
};

const updateUser = async () => {
  try {
    if (!newFullname.value || !newEmail.value) {
      return Swal.fire('Error', 'Fullname and Email are required.', 'error');
    }

    const updatedUser = { 
      Fullname: newFullname.value,
      Email: newEmail.value,
      Address: newAddress.value,
      Password: newPassword.value ? newPassword.value : undefined, 
      UserType: newUserType.value,
      isVerified: newIsVerified.value,
      Age: newAge.value,
      Contactnumber: newContactnumber.value
    };

    await instance.put(`/admin/users/${selectedUser.value.UserID}`, updatedUser);
    newPassword.value = ''; 
    Swal.fire('Success', 'User details updated successfully', 'success');
    fetchUsers();
    userModalVisible.value = false;
  } catch (error) {
    console.error('Error updating user:', error);
    Swal.fire('Error', 'An error occurred while updating user details.', 'error');
  }
};

// Helper function to return user photo URL
const getUserPhotoUrl = (photoPath) => {
  return photoPath ? `http://192.168.67.185:3000/${photoPath}` : 'https://via.placeholder.com/150';
};

const canView = (user) => {
  return true; 
};

const canEdit = (user) => {
  return true; 
};

function openModal(photo) {
  currentPhoto.value = photo; // Set the current photo to display
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}

onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
/* Add any additional styles for the modal here */
.modal {
  /* Example styles for the modal */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.animate-fade-in {
  animation: fadeIn 1.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>