<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" @click.self="close">
      <div class="relative bg-white p-4 rounded-lg shadow-lg max-w-screen-sm max-h-screen">
        <button @click="close" class="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img :src="imageUrl" alt="Preview" class="max-w-full max-h-[80vh] object-contain">
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isOpen: Boolean,
      imageUrl: String
    },
    methods: {
      close() {
        this.$emit('close');
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add any custom styling here */
  </style>
  