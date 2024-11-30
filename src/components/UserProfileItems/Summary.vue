<template>
  <div v-if="user">
      <Account :user="user" />
    

    <!-- User Details Section -->
    <div class="animate-fade-in bg-zinc-800 p-8 mx-4 md:mx-8 lg:mx-12 xl:mx-16 shadow-lg shadow-sky-400 border border-white rounded-3xl text-center mb-10">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <!-- Profile Photo with Verified Badge -->
        <div class="col-span-full flex justify-center relative">
          <div class="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-white shadow-md cursor-pointer">
            <img :src="previewImage || getProfilePhotoUrl(user.ProfilePhoto)" alt="Profile Photo" class="object-cover w-full h-full rounded-full" />
            <div v-if="user.isVerified" class="border absolute ml-24 bottom-0 bg-blue-500 text-white p-2 rounded-full shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Conditionally Display User Details or Edit Form -->
        <div v-if="!isEditing" class="col-span-full">
          <h2 class="text-3xl font-extrabold text-white mb-4">{{ user.Fullname }}<span v-if="user.isVerified" class="ml-2 text-xl font-bold text-sky-100 mb-2">(Verified)</span></h2>
          <button
      v-if="showVerificationButton"
      @click="requestVerification"
      class="btn btn-primary rounded bg-blue-600 p-2 mb-6 text-white border"
    >
      Request Verification
    </button>
          <h3 class="text-lg font-bold text-gray-100 mb-2"><span class="font-medium">Age: </span> {{ user.Age }}</h3>
          <h3 class="text-lg font-bold text-gray-100 mb-2"><span class="font-medium">Email: </span> {{ user.Email }}</h3>
          <h3 class="text-lg font-bold text-gray-100 mb-2"><span class="font-medium">Phone Number: </span> {{ user.Contactnumber }}</h3>
          <h3 class="text-lg font-bold text-gray-100 mb-2"><span class="font-medium">Address: </span> {{ user.Address }}</h3>

          <!-- Edit Mode Button -->
          <div class="flex justify-center space-x-4 mt-4">
            <button class="bg-teal-300 text-black font-bold py-2 px-5 rounded-lg shadow-md hover:bg-sky-600 hover:text-white transition-colors duration-200"
              @click="isEditing = true">
              Edit Information
            </button>
          </div>
        </div>

        <!-- Edit Information Form -->
        <div v-if="isEditing" class="col-span-full">
          <h2 class="text-2xl font-extrabold mb-4 text-white">Edit Information</h2>
          <input type="file" @change="handleFileChange" class="shadow-sm shadow-black border border-white block w-full text-sm text-white rounded-lg
        file:mr-4 file:py-3 file:px-4 file:rounded-md
        file:border-0 file:text-sm file:font-semibold
        file:bg-pink-50 file:text-pink-700
        hover:file:bg-pink-100"/>
          <template v-for="(value, key) in editableUser" :key="'edit-' + key">
            <div v-if="shouldShowField(key)" class="mb-4">
              <label class="block text-white text-md font-medium mb-1 capitalize">{{ formatLabel(key) }}</label>
              <input v-model="editableUser[key]" 
                :type="key === 'Password' ? 'password' : (key === 'Birthdate' ? 'date' : 'text')"
                class="form-input w-full rounded-full p-2 shadow-black shadow-lg focus:ring-2 focus:ring-teal-500" />
            </div>
          </template>
          <!-- Action Buttons -->
          <div class="flex justify-center space-x-4 mt-4">
            <button @click="saveInformation"
              class="border-white border bg-teal-300 hover:bg-teal-700 hover:text-white text-black font-bold py-2 px-4 rounded-lg shadow-lg transition-colors duration-200 ease-in-out">Save</button>
            <button @click="cancelEdit"
              class="bg-red-100 hover:bg-red-600 text-red-700 hover:text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-colors duration-200 ease-in-out">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <footer class="bg-gray-800 text-white py-8 mt-4">
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
import Swal from 'sweetalert2';
import axiosInstance from '@/utils/axios';
import Account from "@/views/user/Profile/Account.vue";

// Define reactive properties
const user = ref(null);
const editableUser = ref({});
const isEditing = ref(false);
const previewImage = ref(null);
const showVerificationButton = ref(false); // Track whether to show the button

// Fetch user details when the component is mounted
onMounted(async () => {
  await fetchUserDetails();
});

// Function to fetch user details
const fetchUserDetails = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axiosInstance.get('/api/users/user', {
      headers: { Authorization: `Bearer ${token}` }
    });
    user.value = response.data;
    editableUser.value = { ...user.value, Password: '' };
    // Determine if the user should see the verification button
    showVerificationButton.value = !user.value.isVerified;
  } catch (error) {
    console.error('Error fetching user details:', error);
    Swal.fire('Error', 'Failed to load user details. Please try again.', 'error');
  }
};

// Handle the request verification action
const requestVerification = async () => {
  const email = editableUser.value.Email; // Assuming the email is in editableUser

  if (!email) {
    Swal.fire({
      icon: 'info',
      title: 'Email Required',
      text: 'Please enter your email address to request a verification code.',
      confirmButtonText: 'OK'
    });
    return;
  }

  try {
    const response = await axiosInstance.post('/api/users/request-verification', { Email: email });
    Swal.fire({
      icon: 'success',
      title: 'Verification Email Sent',
      text: 'Please check your email for the verification code.',
      confirmButtonText: 'OK'
    });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Failed to Send Verification Email',
      text: error.response?.data?.message || 'Failed to send verification email due to server error.',
      confirmButtonText: 'OK'
    });
  }
};

// Handle profile photo change
const handleFileChange = (e) => {
  const file = e.target.files[0];
  editableUser.value.ProfilePhoto = file;
  previewImage.value = URL.createObjectURL(file);
};

// Save the user information
const saveInformation = async () => {
  if (!editableUser.value.UserID) {
    Swal.fire('Error', 'User ID is missing or invalid.', 'error');
    return;
  }

  const formData = new FormData();
  Object.keys(editableUser.value).forEach(key => {
    formData.append(key, editableUser.value[key]);
  });

  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.put(`/api/users/${editableUser.value.UserID}`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    user.value = response.data.user;
    editableUser.value = { ...user.value, Password: '' };
    isEditing.value = false;
    previewImage.value = null;
    Swal.fire('Success', 'Information updated successfully.', 'success');
    await fetchUserDetails(); // Refetch user details after update
  } catch (error) {
    console.error('Error updating user details:', error.response ? error.response.data : error);
    Swal.fire('Error', `Failed to update user details: ${error.response ? error.response.data.message : "Please try again."}`, 'error');
  }
};

// Cancel editing mode
const cancelEdit = () => {
  isEditing.value = false;
  if (previewImage.value) {
    URL.revokeObjectURL(previewImage.value);
    previewImage.value = null;
  }
  editableUser.value = { ...user.value, Password: '' };
};

// Check if the field should be shown in the form
const shouldShowField = (key) => {
  return !['UserID','GoogleID', 'UserType', 'created_at', 'updated_at', 'isVerified', 'verificationToken', 'status', 'DateJoined', 'Birthdate', 'ProfilePhoto'].includes(key);
};

// Format labels for the fields (e.g., "UserID" -> "User ID")
const formatLabel = (key) => {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
};

// Profile photo URL helper with null check
const getProfilePhotoUrl = (photoPath) => {
  return photoPath && user.value ? `http://192.168.67.185:3000/${photoPath}` : '/path/to/default/image.jpg';
};
</script>
