<template>
    <div class="bg-white shadow-lg rounded-lg p-5 flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold">{{ title }}</h2>
        <p class="text-3xl font-bold">{{ count }}</p>
      </div>
      <div class="text-blue-500">
        <span class="material-icons w-12 h-12">{{ icon }}</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      count: {
        type: Number,
        required: true
      },
      icon: {
        type: String,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .material-icons {
    font-size: 2rem; /* Adjust icon size if needed */
  }
  </style>