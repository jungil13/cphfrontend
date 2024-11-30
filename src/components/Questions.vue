<template>
  <div class="mt-16">
    <div class="relative flex flex-col items-center justify-center text-center py-24">
      <h2 class="text-4xl text-gray-700 font-extrabold mb-4">Fill up this form to proceed!</h2>
      <div class="mt-6 bg-white shadow-lg shadow-black rounded-lg p-6 w-full md:w-1/2 lg:w-1/3 mb-6 transform transition-transform duration-300 hover:scale-105">
        <form @submit.prevent="submitApplication" class="space-y-4">
          <!-- Question 1: Name -->
          <div class="flex flex-col items-start">
            <label for="name" class="text-gray-700 font-semibold">Your Name</label>
            <input type="text" id="name" v-model="userData.Fullname" readonly class="w-full px-3 py-2 mt-1 border rounded-lg border-gray-300" />
          </div>
  
          <!-- Question 2: Contact Information -->
          <div class="flex flex-col items-start">
            <label for="email" class="text-gray-700 font-semibold">Email</label>
            <input type="email" id="email" v-model="userData.Email" readonly class="w-full px-3 py-2 mt-1 border rounded-lg border-gray-300" />
          </div>

          <div class="flex flex-col items-start">
            <label for="phone" class="text-gray-700 font-semibold">Contact Number</label>
            <input type="tel" id="phone" v-model="userData.Contactnumber" readonly class="w-full px-3 py-2 mt-1 border rounded-lg border-gray-300" />
          </div>

          <!-- Question 3: Previous Pet Experience -->
          <div class="flex flex-col items-start">
            <label for="experience" class="text-gray-700 font-semibold">Pet Experience:</label>
            <input type="text" id="experience" v-model="applicationData.petExperience" class="w-full px-3 py-2 mt-1 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
          </div>

          <!-- Question 4: Living Situation -->
          <div class="flex flex-col items-start">
            <label for="living" class="text-gray-700 font-semibold">Home Environment:</label>
            <input type="text"id="living" v-model="applicationData.homeEnvironment" placeholder="Do you live in a house, apartment, etc.? Do you have a yard?" class="w-full px-3 py-2 mt-1 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
          </div>

          <!-- Question 5: Commitment Level -->
          <div class="flex flex-col items-start">
            <label for="otherPets" class="text-gray-700 font-semibold">Other Pets:</label>
            <select id="otherPets" v-model="applicationData.otherPets" class="w-full px-3 py-2 mt-1 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <!-- Question 6: Children at Home -->
          <div class="flex flex-col items-start">
            <label for="childrenAtHome" class="text-gray-700 font-semibold">Children at Home:</label>
            <select id="childrenAtHome" v-model="applicationData.childrenAtHome" class="w-full px-3 py-2 mt-1 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <!-- Question 7: Reason for Adoption -->
          <div class="flex flex-col items-start">
            <label for="reasonForAdoption" class="text-gray-700 font-semibold">Reason for Adoption:</label>
            <input type="text" id="reasonForAdoption" v-model="applicationData.reasonForAdoption" placeholder="Why do you want to adopt?" class="w-full px-3 py-2 mt-1 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <button type="submit"
            class="bg-slate-800 rounded-lg px-5 py-2 text-white transform transition-transform duration-300 hover:scale-105 mt-6">
            Submit
          </button>
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
      applicationData: {
        petId: this.$route.params.petId, 
        petExperience: "",
        homeEnvironment: "",
        otherPets: "",
        childrenAtHome: "",
        reasonForAdoption: ""
      },
      userData: {
        Fullname: '',
        Email: '',
        Contactnumber: '',
      }
    };
  },
  created() {
    this.fetchUserDetails();
  },
  methods: {
    fetchUserDetails() {
      const token = localStorage.getItem('token');
      instance.get('/api/users/user', { headers: { Authorization: `Bearer ${token}` }})
      .then(response => {
        this.userData.Fullname = response.data.Fullname;
        this.userData.Email = response.data.Email;
        this.userData.Contactnumber = response.data.Contactnumber;
        // populate other data fields as necessary
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
    },

    submitApplication() {
      const token = localStorage.getItem('token'); // Ensure you're handling the token securely
      instance.post('/api/applications', this.applicationData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Application Submitted!',
          text: 'Your adoption application has been successfully submitted.',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.$router.push('/ongoing');
          }
        });
      })
      .catch(error => {
        console.error('Failed to submit application:', error);
        Swal.fire({
          icon: 'error',
          title: 'Submission Failed',
          text: 'Failed to submit application. Please try again.',
          confirmButtonText: 'Try Again'
        });
      });
    }
  }
};
</script>


<style scoped>
/* Optional: Add any scoped styles for this component */
</style>
