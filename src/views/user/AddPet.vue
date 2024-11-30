<template>
  <div class="mt-24">
    <div class="bg-teal-50 flex flex-col md:flex-row items-center justify-center text-center py-12">
      <!-- Text Content on the left -->
      <div class="flex flex-col md:flex-row items-center justify-center text-center">
        <!-- Text Content on the left -->
        <div>
          <h1 class="text-3xl sm:text-3xl font-extrabold mb-2 text-teal-800">
            Open Your Home
          </h1>
          <h2 class="text-4xl sm:text-5xl font-extrabold mb-2 text-gray-700">
            Open Your Heart
          </h2>
          <h2 class="text-4xl sm:text-5xl font-extrabold mb-12 md:mb-0 text-orange-500">Rehome a Pet!</h2>
          <div class="mt-16">
          </div>
        </div>
        <!-- Image on the right -->
        <img src="/iring.png" alt="Happy family with a pet" class="ml-6" width="500">
      </div>
    </div>
    <div class="max-w-4xl mx-auto p-6 rounded-lg mb-12">
      <h1 class="text-3xl font-extrabold text-gray-800 mb-4 text-center">Before you start</h1>
      <p class="mb-6 text-center font-bold">
        Please make sure you’ve read and agree to these points before you create a listing.
      </p>
      <ul class="list-none pl-5 space-y-4 text-gray-600 font-sans text-center font-semibold">
        <li>
          1. You won’t get paid for your pet but it is free to list them.
        </li>
        <li>
          2. All listings are subject to approval by the CPH team. Before we post your listing on the site,
          we’ll check your pet’s profile thoroughly. If we have any questions, we will give you a call.
        </li>
        <li>
          3. If your listing does not provide a detailed description of your pet which must include good quality photos,
          we will REJECT the listing and you will need to resubmit a new listing.
        </li>
        <li>
          4. We ONLY support the rehoming of pets that are living in the <span class="font-bold">Cordova Cebu</span>
        </li>
      </ul>
    </div>
    <div class="container mx-auto py-28 px-4 mr-26 ml-26 bg-white rounded-xl shadow-lg shadow-black">
      <!-- Upload Pet Photo Section -->
      <div class="mb-8">
        <h2 class="text-3xl font-extrabold mb-4 text-center text-teal-900">List a Pet</h2>
        <h2 class="text-xl font-extrabold mb-4 text-teal-900 text-center">Upload up to 4 Pet Photos</h2>
        <div class="relative border-2 border-dashed border-gray-400 p-6 rounded-xl bg-indigo-100 text-center ">
          <input type="file" @change="handlePetPhotoUpload" multiple accept="image/*" class="poppins-bold bg-whiteshadow-sm shadow-black block w-full text-sm text-slate-500 rounded-lg
        file:mr-4 file:py-3 file:px-4 file:rounded-md
        file:border-0 file:text-sm file:font-semibold
        file:bg-teal-800 file:text-white">
          <div v-if="petPhotoPreviews.length">
            <div v-for="(preview, index) in petPhotoPreviews" :key="index" class="inline-block relative">
              <img :src="preview" alt="Pet Photo Preview"
                class="w-48 h-48 object-cover mx-2 border border-gray-300 rounded-lg" />
              <button @click="removePetPhoto(index)"
                class="absolute top-0 right-0 bg-red-400 text-black font-bold rounded-full py-2 px-3 text-xs border border-black">X</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Adding Pet Section -->
      <div class="mb-8 p-5">
        <h2 class="text-xl font-extrabold mb-4  text-teal-900">Fill up Pet Details</h2>
        <form @submit.prevent="submitPetDetails">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 ">
            <div>
              <label for="type" class="block text-gray-700 font-bold mb-2">Type:</label>
              <select id="type" v-model="petDetails.type"
                class="w-full bg-indigo-100 rounded-full shadow-sm p-4 shadow-black focus:ring-blue-500 focus:border-blue-500"
                required>
                <option value="" disabled>Select a type</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Other Pets">Other Pets</option>
              </select>
            </div>
            <div>
              <label for="petName" class="block text-gray-700 font-bold mb-2">Pet Name:</label>
              <input type="text" id="petName" v-model="petDetails.name"
                class="w-full bg-indigo-100 rounded-full shadow-sm p-4 shadow-black focus:ring-blue-500 focus:border-blue-500"
                required />
            </div>
            <div>
              <label for="species" class="block text-gray-700 font-bold mb-2">Species:</label>
              <input type="text" id="species" v-model="petDetails.species"
                class="w-full bg-indigo-100 rounded-full shadow-sm p-4 shadow-black focus:ring-blue-500 focus:border-blue-500"
                required />
            </div>
            <div>
              <label for="breed" class="block text-gray-700 font-bold mb-2">Breed:</label>
              <input type="text" id="breed" v-model="petDetails.breed"
                class="w-full bg-indigo-100 rounded-full shadow-sm p-4 shadow-black focus:ring-blue-500 focus:border-blue-500"
                required />
            </div>
            <div>
              <label for="markings" class="block text-gray-700 font-bold mb-2">Markings:</label>
              <input type="text" id="markings" v-model="petDetails.markings"
                class="w-full bg-indigo-100 rounded-full shadow-sm p-4 shadow-black focus:ring-blue-500 focus:border-blue-500"
                required />
            </div>
            <div>
              <label for="sex" class="block text-gray-700 font-bold mb-2">Sex:</label>
              <select id="sex" v-model="petDetails.sex"
                class="w-full bg-indigo-100 rounded-full shadow-sm p-4 shadow-black focus:ring-blue-500 focus:border-blue-500"
                required>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label for="birth" class="block text-gray-700 font-bold mb-2">Birth:</label>
              <input type="date" id="birth" v-model="petDetails.birth"
                class="w-full mb-6 bg-indigo-100 rounded-full shadow-sm p-4 shadow-black focus:ring-blue-500 focus:border-blue-500"
                required />
            </div>
          </div>
          <!-- Upload Vaccination Certificate Section -->
          <div class="mb-8">
            <h2 class="text-xl font-extrabold mb-4 text-center text-teal-900">Upload up to 4 Vaccination Certificates
            </h2>
            <div class="relative border-2 border-dashed border-gray-400 p-6 rounded-xl bg-indigo-100 text-center">
              <input type="file" @change="handleVaccinationUpload" multiple accept="image/*" class="mb-4 poppins-bold bg-whiteshadow-sm shadow-black block w-full text-sm text-slate-500 rounded-lg
        file:mr-4 file:py-3 file:px-4 file:rounded-md
        file:border-0 file:text-sm file:font-semibold
        file:bg-teal-800 file:text-white">
              <div v-if="vaccinationCertificatePreviews.length">
                <div v-for="(preview, index) in vaccinationCertificatePreviews" :key="index"
                  class="inline-block relative">
                  <img :src="preview" alt="Vaccination Certificate Preview"
                    class="w-48 h-48 object-cover mx-2 border border-gray-300 rounded-lg" />
                  <button @click="removeVaccinationCertificate(index)"
                    class="absolute top-0 right-0 bg-red-400 text-black font-bold rounded-full py-2 px-3 text-xs border border-black">X</button>
                </div>
              </div>
            </div>
          </div>
          <!-- Description Section -->
          <div class="justify center text-center">
            <h2 class="text-xl font-extrabold mb-4 ml-24 mr-24 text-teal-900">Reason for Rehoming</h2>
            <textarea id="description" v-model="petDetails.description"
              class="text-center border-gray-300 bg-indigo-100 rounded-xl shadow-sm shadow-black focus:ring-blue-500 focus:border-blue-500 py-6 p-16 w-full mb-4"
              rows="5" placeholder="Enter description here (required)" required></textarea>
          </div>
          <div class="text-center">
            <button type="submit"
              class=" bg-teal-800 text-white py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300 space-x-1 font-bold">
              <div class="flex">
                <span class="material-symbols-outlined">
                  home
                </span>
                <span>Rehome this Pet</span>
              </div>
            </button>
          </div>
        </form>
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

<script>
import instance from '@/utils/axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      petDetails: {
        type: '',
        name: '',
        species: '',
        breed: '',
        markings: '',
        sex: '',
        birth: '',
        description: ''
      },
      petPhoto: [],
      petPhotoPreviews: [],
      vaccinationCertificate: [],
      vaccinationCertificatePreviews: []
    };
  },
  methods: {
    handlePetPhotoUpload(event) {
      const files = Array.from(event.target.files);
      if (files.length + this.petPhoto.length > 4) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You can only upload up to 4 pet photos.'
        });
        return;
      }
      this.petPhoto.push(...files.slice(0, 4 - this.petPhoto.length));
      this.petPhotoPreviews = this.petPhoto.map(file => URL.createObjectURL(file));
    },
    handleVaccinationUpload(event) {
      const files = Array.from(event.target.files);
      if (files.length + this.vaccinationCertificate.length > 4) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You can only upload up to 4 vaccination certificates.'
        });
        return;
      }
      this.vaccinationCertificate.push(...files.slice(0, 4 - this.vaccinationCertificate.length));
      this.vaccinationCertificatePreviews = this.vaccinationCertificate.map(file => URL.createObjectURL(file));
    },
    removePetPhoto(index) {
      this.petPhoto.splice(index, 1);
      this.petPhotoPreviews.splice(index, 1);
    },
    removeVaccinationCertificate(index) {
      this.vaccinationCertificate.splice(index, 1);
      this.vaccinationCertificatePreviews.splice(index, 1);
    },
    async submitPetDetails() {
      if (this.petPhoto.length === 0 || this.vaccinationCertificate.length === 0) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Both pet photos and vaccination certificates are required.'
        });
        return;
      }

      const formData = new FormData();
      Object.keys(this.petDetails).forEach(key => formData.append(key, this.petDetails[key]));
      this.petPhoto.forEach(photo => formData.append('petPhoto', photo));
      this.vaccinationCertificate.forEach(cert => formData.append('vaccinationCertificate', cert));

      const token = localStorage.getItem('token');

      try {
        await instance.post('/api/pets/pets', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        });
        Swal.fire({
          icon: 'success',
          title: 'Submission Received!',
          text: 'Thank you for posting a pet. We will review your request and approve it shortly.',
          confirmButtonText: 'OK'
        });
        this.resetForm();
      } catch (error) {
        console.error('There was an error uploading the pet details:', error.response ? error.response.data : error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error adding the pet.'
        });
      }
    },
    resetForm() {
      this.petDetails = {
        type: '',
        name: '',
        species: '',
        breed: '',
        markings: '',
        sex: '',
        birth: '',
        description: ''
      };
      this.petPhoto = [];
      this.petPhotoPreviews = [];
      this.vaccinationCertificate = [];
      this.vaccinationCertificatePreviews = [];
    }
  }
}
</script>
