<template>
  <section class="mt-24" id="contact">
    <div class="animate-fade-in mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20 ">
      <div class="mb-4">
        <div class="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
          <p class="text-base font-semibold uppercase tracking-wide text-gray-700  mb-6">
            Contact
          </p>
          <h2 class="font-heading mb-4 poppins-bold tracking-tight text-teal-900 dark:text-white text-3xl sm:text-5xl">
            Get in Touch
          </h2>
          <p class="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-slate-400 poppins-bold">Free to contact us if you have concerns.
          </p>
        </div>
      </div>
      <div class="flex items-stretch justify-center">
        <div class="grid md:grid-cols-2">
          <div class="h-full pr-6">
            <p class="mt-3 mb-12 text-lg text-gray-600 dark:text-slate-400 poppins-semibold">
              Class aptent taciti sociosqu ad
              litora torquent per conubia nostra, per inceptos himenaeos. Duis nec ipsum orci. Ut scelerisque
              sagittis ante, ac tincidunt sem venenatis ut.
            </p>
            <ul class="mb-6 md:mb-0">
              <li class="flex">
                <div class="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="h-6 w-6">
                    <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                    <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z">
                    </path>
                  </svg>
                </div>
                <div class="ml-4 mb-14">
                  <h3 class="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white poppins-bold">Our Address
                  </h3>
                  <p class="text-gray-600 dark:text-slate-400 poppins-semibold">Cordova, Cebu</p>
                  <p class="text-gray-600 dark:text-slate-400 poppins-semibold">Philippines</p>
                </div>
              </li>
              <li class="flex">
                <div class="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="h-6 w-6">
                    <path
                      d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2">
                    </path>
                    <path d="M15 7a2 2 0 0 1 2 2"></path>
                    <path d="M15 3a6 6 0 0 1 6 6"></path>
                  </svg>
                </div>
                <div class="ml-4 mb-4">
                  <h3 class="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white poppins-bold">Contact
                  </h3>
                  <p class="text-gray-600 dark:text-slate-400 poppins-semibold">Mail: cordovapethub@gmail.com</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="card h-fit max-w-6xl p-5 md:p-12 bg-slate-800 shadow-md shadow-black rounded-xl" id="form">
            <h2 class="mb-4 text-2xl font-bold text-white poppins-semibold">Ready to Get Started?</h2>
            <div class="container mx-auto p-6">
              <form @submit.prevent="sendEmail" class="space-y-4">
                <div>
                  <label for="name" class="block text-sm text-white font-medium poppins-bold mb-2">Name</label>
                  <input v-model="name" type="text" id="name" class="border p-2 w-full" required />
                </div>
                <div>
                  <label for="email" class="block text-sm text-white font-medium mb-2 poppins-bold">Email</label>
                  <input v-model="email" type="email" id="email" class="border p-2 w-full" required />
                </div>
                <div>
                  <label for="message" class="block text-sm text-white font-medium mb-2 poppins-bold">Message</label>
                  <textarea v-model="message" id="message" class="border p-2 w-full" required></textarea>
                </div>
                <button type="submit" class="bg-blue-500 text-white p-2 rounded poppins-bold">Send </button>
              </form>
              <p v-if="successMessage" class="text-green-500 mt-4">{{ successMessage }}</p>
              <p v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <footer class="bg-gray-800 text-white py-8">
    <div class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
      <div class="flex items-center mb-4 md:mb-0">
        <img src="/cphlogo.png" alt="Cordova Pet Hub Logo" class="rounded-full w-24 h-24 mr-3 object-cover" />
        <div>
          <h5 class="text-lg font-semibold">Pet Adoption</h5>
          <p class="mt-2 text-sm">Contact us: <a href="mailto:cph@gmail.com"
              class="underline hover:text-gray-400">cph@gmail.com</a></p>
        </div>
      </div>
      <div class="text-sm space-y-2 md:space-y-0 md:block">
        <p>© 2024 Cordova Pet Hub. All rights reserved.</p>
        <p>Developed by: Team Alas</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';
import instance from '@/utils/axios';
import Swal from 'sweetalert2';

const name = ref('');
const email = ref('');
const message = ref('');

const sendEmail = async () => {
  try {
    const response = await instance.post('/api/contact', {
      name: name.value,
      email: email.value,
      message: message.value,
    });
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: response.data.msg,
      confirmButtonText: 'Okay',
    });
    name.value = '';
    email.value = '';
    message.value = '';
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: 'Failed to send message. Please try again.',
      confirmButtonText: 'Okay',
    });
  }
};
</script>

<style scoped>
.input {
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

.textarea {
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  height: 100px;
}

.btn {
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
