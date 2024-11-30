<template>
    <div
      v-if="isVisible"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Application Form</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-gray-600 font-semibold">Applicant's Name:</label>
            <p class="text-gray-700">{{ application.applicant_name }}</p>
          </div>
          <div>
            <label class="block text-gray-600 font-semibold">Email:</label>
            <p class="text-gray-700">{{ application.email }}</p>
          </div>
          <div>
            <label class="block text-gray-600 font-semibold">Address:</label>
            <p class="text-gray-700">{{ application.address }}</p>
          </div>
          <div>
            <label class="block text-gray-600 font-semibold">Pet Experience:</label>
            <p class="text-gray-700">{{ application.petExperience }}</p>
          </div>
          <div>
            <label class="block text-gray-600 font-semibold">Home Environment:</label>
            <p class="text-gray-700">{{ application.homeEnvironment }}</p>
          </div>
          <div>
            <label class="block text-gray-600 font-semibold">Other Pets:</label>
            <p class="text-gray-700">{{ application.otherPets }}</p>
          </div>
          <div>
            <label class="block text-gray-600 font-semibold">Children at Home:</label>
            <p class="text-gray-700">{{ application.childrenAtHome }}</p>
          </div>
          <div>
            <label class="block text-gray-600 font-semibold">Reason for Adoption:</label>
            <p class="text-gray-700">{{ application.reasonForAdoption }}</p>
          </div>
        </div>
        <div class="mt-6 flex justify-end">
          <button
            @click="closeModal"
            class="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: Boolean,
      application: Object,
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any additional styles if needed */
  </style>
  