<template>
  <div class="min-h-screen flex items-center justify-center md:bg-teal-800 mt-16 bg-white">
    <div class="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-xl">
      <div class="text-right">
        <router-link to="/login" class="text-sm text-teal-600 hover:text-teal-700">
          Already have an account? Sign in here!
        </router-link>
      </div>
      <h2 class="text-3xl font-bold text-center text-teal-800">Create An Account</h2>
      <form @submit.prevent="handleSubmit" class="mt-4 space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-600 mb-2">Email</label>
          <input type="email" id="email" v-model="email" required
            class="shadow-sm shadow-black w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email" />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="fullname" class="block text-sm font-medium text-gray-600 mb-2">Full Name</label>
            <input type="text" id="fullname" v-model="fullname" required
              class="shadow-sm shadow-black w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Full Name" />
          </div>
          <div>
            <label for="username" class="block text-sm font-medium text-gray-600 mb-2">Username</label>
            <input type="text" id="username" v-model="username" required
              class="shadow-sm shadow-black w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="address" class="block text-sm font-medium text-gray-600 mb-2">Address</label>
            <input type="text" id="address" v-model="address" required
              class="shadow-sm shadow-black w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your address" />
          </div>
          <div>
            <label for="age" class="block text-sm font-medium text-gray-600 mb-2">Age</label>
            <input type="number" id="age" v-model="age" required
              class="shadow-sm shadow-black w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your age" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="birthdate" class="block text-sm font-medium text-gray-600 mb-2">Birthdate</label>
            <input type="date" id="birthdate" v-model="birthdate" required
              class="shadow-sm shadow-black w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Select your birthdate" />
          </div>
          <div>
            <label for="contactnumber" class="block text-sm font-medium text-gray-600 mb-2">Contact Number</label>
            <input type="text" id="contactnumber" v-model="contactnumber" required
              class="shadow-sm shadow-black w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your contact number" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="relative">
            <label for="password" class="block text-sm font-medium text-gray-600 mb-2">Password</label>
            <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" required
              class="shadow-sm shadow-black w-full px-4 py-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password" />
            <span
              class="material-symbols-outlined absolute inset-y-0 right-3 top-8 flex items-center cursor-pointer text-gray-500"
              @click="togglePasswordVisibility">
              {{ showPassword ? 'visibility_off' : 'visibility' }}
            </span>
          </div>
          <div class="relative">
            <label for="confirmPassword" class="block text-sm font-medium text-gray-600 mb-2">Confirm Password</label>
            <input :type="showPassword ? 'text' : 'password'" id="confirmPassword" v-model="confirmPassword" required
              class="shadow-sm shadow-black w-full px-4 py-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password" />
            <span
              class="material-symbols-outlined absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 top-8"
              @click="togglePasswordVisibility">
              {{ showPassword ? 'visibility_off' : 'visibility' }}
            </span>
          </div>
        </div>

        <button type="submit"
          class="shadow-sm shadow-black w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
          Create Account
        </button>
      </form>
      <p class="text-center text-xs text-gray-500">
        Creating your account and you accept Terms & Conditions.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import axiosInstance from '@/utils/axios';

const router = useRouter();
const username = ref('');
const fullname = ref('');
const contactnumber = ref('');
const address = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const age = ref('');
const birthdate = ref('');
const profilePhoto = ref(null);
const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const handleSubmit = async () => {
  if (password.value !== confirmPassword.value) {
    Swal.fire({ icon: 'error', title: 'Oops...', text: 'Passwords do not match!', confirmButtonText: 'OK' });
    return;
  }

  if (!username.value || !email.value || !password.value || !fullname.value || !contactnumber.value || !address.value || !age.value || !birthdate.value) {
    Swal.fire({ icon: 'error', title: 'Oops...', text: 'Please fill in all fields!', confirmButtonText: 'OK' });
    return;
  }

  if (!validateEmail(email.value)) {
    Swal.fire({ icon: 'error', title: 'Invalid Email', text: 'Please enter a valid email address.', confirmButtonText: 'OK' });
    return;
  }

  const formData = new FormData();
  formData.append('Username', username.value);
  formData.append('Email', email.value);
  formData.append('Password', password.value);
  formData.append('Fullname', fullname.value);
  formData.append('Contactnumber', contactnumber.value);
  formData.append('Address', address.value);
  formData.append('Age', age.value);
  formData.append('Birthdate', birthdate.value);
  if (profilePhoto.value) formData.append('ProfilePhoto', profilePhoto.value);

  try {
    const response = await axiosInstance.post('/api/users/register', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    Swal.fire({
      icon: 'success',
      title: 'Registered Successfully!',
      text: 'Check your Gmail inbox for verification.',
      confirmButtonText: 'OK'
    }).then(() => {
      router.push('/login');
    });
  } catch (error) {
    const message = error.response?.data?.msg || 'Failed to register. Please try again.';
    Swal.fire({ icon: 'error', title: 'Registration Failed', text: message, confirmButtonText: 'OK' });
  }
};
</script>
