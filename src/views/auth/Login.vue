<template>
  <div class="min-h-screen flex items-center justify-center md:bg-teal-800 mt-16 bg-white mt-16">
    <div class="flex w-full max-w-4xl  rounded-lg overflow-hidden shadow-black">
      <div class="hidden lg:flex lg:w-1/2 bg-white p-12">
        <div class="flex flex-col justify-between">
          <img src="/adopt.jpg" alt="Decorative image" class="max-w-full h-auto rounded-lg shadow">
          <div>
            <h3 class="text-xl font-semibold mt-4 poppins-bold">Non Profitable Pet Adoption Website for Everyone, <span class="font-extrabold text-teal-800">Adopt Don't Shop!!</span></h3>
            <p class="text-gray-600 mt-2 poppins-regular">All users are welcome to register and login!</p>
            <p class="text-gray-600 mt-1 poppins-regular">Get started by signing in and explore the additional features
              of our Website.</p>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-1/2 bg-white p-8">
        <div class="lg:hidden block">
          <img src="/peaks.png" alt="Peaking Dog" class="max-w-full h-auto">
        </div>
        <h2 class="text-3xl font-extrabold text-black mb-6 text-center shadow-lg p-2 shadow-black rounded-xl">
          𝒲𝑒𝓁𝒸𝑜𝓂𝑒 𝓉𝑜<span class="text-orange-500"> 𝓒𝓟𝓗</span>
        </h2>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Email Input with Icon -->
          <div class="flex flex-col">
            <label for="email" class="block text-sm font-medium text-black">Email Address</label>
            <div class="mt-1 flex items-center border border-gray-300 rounded-md shadow-sm">
              <span class="material-symbols-outlined ml-2">
                mail
              </span>
              <input type="email" id="email" v-model="email" placeholder="Enter your email" required
                class="px-3 py-2 flex block w-full border-r border-gray-300 rounded-none rounded-md sm:text-sm">
            </div>
          </div>

          <!-- Password Input with Icons -->
          <div class="flex flex-col">
            <label for="password" class="block text-sm font-medium text-black">Password</label>
            <div class="mt-1 flex items-center border border-gray-300 rounded-md shadow-sm">
              <span class="material-symbols-outlined ml-2">
                lock
              </span>
              <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password"
                placeholder="Enter your password" required
                class="px-3 py-2 flex-1 block w-full border-gray-300 rounded-none rounded-r-md focus:ring-teal-500 focus:border-teal-500 sm:text-sm">
              <span class="material-symbols-outlined px-3 cursor-pointer text-gray-500"
                @click="togglePasswordVisibility">
                {{ showPassword ? 'visibility_off' : 'visibility' }}
              </span>
            </div>
          </div>

          <!-- Submit Button -->
          <button type="submit"
            class="w-full py-3 px-4 bg-teal-500 text-white font-bold rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500">
            Sign in
          </button>
          <div class="text-center text-sm text-gray-600 mt-4">or</div>
          <p class="mt-6 text-center text-sm text-gray-600">
            New User? <router-link to="/register" class="text-teal-500 hover:underline">Create Account</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>


<style>
.bg-pastel-green {
  background-color: #a8dadc;
}
</style>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import axiosInstance from '@/utils/axios';

const email = ref('');
const password = ref('');
const router = useRouter();
const showPassword = ref(false);


const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const requestVerification = async () => {
  if (!email.value) {
    Swal.fire({
      icon: 'info',
      title: 'Email Required',
      text: 'Please enter your email address to request a verification code.',
      confirmButtonText: 'OK'
    });
    return;
  }

  try {
    const response = await axiosInstance.post('/api/users/request-verification', { Email: email.value });
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

const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post('/api/users/login', {
      Email: email,
      Password: password
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response;
    } else {
      throw new Error('Login failed due to server error');
    }
  }
};

const handleSubmit = async () => {
  try {
    const response = await loginUser(email.value, password.value);
    console.log('Login response:', response);
    const { msg, token, username, userType, user } = response;
    localStorage.setItem('token', token);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username);
    localStorage.setItem('userType', userType);
    localStorage.setItem('userID', user.id);

    Swal.fire({
      icon: 'success',
      title: 'Login Successful',
      text: `You have been logged in successfully as ${username}!`,
      confirmButtonText: 'OK'
    }).then(() => {
      if (userType === 'Admin') {
        router.push('/dashboard');
      } else {
        router.push('/browse');
      }
      location.reload();
    });
  } catch (error) {
    console.error('Login error:', error);
    localStorage.clear();

    if (error.data) {
      const errorMsg = error.data.msg || 'An error occurred';
      switch (error.status) {
        case 400:
          Swal.fire({
            icon: 'error',
            title: 'Missing Information',
            text: errorMsg,
            confirmButtonText: 'OK'
          });
          break;
        case 401:
          Swal.fire({
            icon: 'error',
            title: 'Invalid Credentials',
            text: errorMsg,
            confirmButtonText: 'OK'
          });
          break;
        case 403:
          break;
        default:
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: errorMsg,
            confirmButtonText: 'OK'
          });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message,
        confirmButtonText: 'OK'
      });
    }
  }


};
</script>
