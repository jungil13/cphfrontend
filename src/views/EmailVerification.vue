<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 class="text-2xl font-semibold mb-4">{{ message }}</h1>
        <p class="text-gray-600">{{ details }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        message: 'Processing...',
        details: ''
      };
    },
    created() {
      const token = this.$route.query.token;
      if (!token) {
        this.message = 'No token provided.';
        this.details = 'Invalid link or the token is missing.';
      } else {
        this.verifyToken(token);
      }
    },
    methods: {
      verifyToken(token) {
        axios.get(`http://localhost:3000/api/users/verify-email?token=${token}`)
          .then(response => {
            this.message = response.data.message;
            this.details = 'You can now log in to your account.';
          })
          .catch(error => {
            this.message = 'Verification Failed';
            this.details = 'The link may be invalid or expired. Please request a new verification link.';
          });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Style your component here */
  </style>
  