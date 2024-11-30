<template>
  <div class="w-full">
    <Account />

    <!-- Manage Pet Listings Header -->
    <div class="bg-white p-5 text-center shadow shadow-black border border-black mb-8 mx-6 rounded-lg">
      <h1 class="text-2xl text-gray-700 font-extrabold">Manage Pet Listings</h1>
    </div>

    <div class="p-8">
      <div v-if="pets.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="pet in pets" :key="pet.PetID"
          class="relative flex flex-col animate-fade-in bg-zinc-900 p-4 rounded-lg shadow-lg shadow-black transition-transform transform hover:scale-105">
          <!-- Pet Image -->
          <div class="relative group w-full h-48">
            <img :src="getImageUrl(pet.photoUrl[0])" alt="Pet Picture"
              class="w-full h-full object-cover border rounded-md mb-4 transition-transform duration-300 group-hover:scale-105">
            <div v-if="pet.photoUrl.length > 1"
              class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div class="flex space-x-2 overflow-auto">
                <img v-for="(photo, index) in pet.photoUrl" :key="index" :src="getImageUrl(photo)" alt="Pet Photo"
                  class="w-24 h-24 object-cover rounded-md">
              </div>
            </div>
          </div>
          <div class="p-6 flex-1 flex flex-col">
            <div class="mb-4">
              <div class="flex justify-center items-center mb-2">
                <h3 class="text-xl font-bold text-white ml-4 mr-2">{{ pet.PetName }}</h3>
              </div>
              <h3 class="text-lg font-bold text-white text-center ml-4 mr-2 mb-2 font-extrabold">Breed : <span
                  class="text-white font-semibold p-1 py-1 rounded-full ">{{ pet.Breed }}</span></h3>
              <h3 class="text-lg font-bold text-white text-center ml-4 mr-2 mb-2">Status : <span
                  class="text-white font-serif">{{ pet.Status }}</span></h3>
            </div>

            <div class="mt-auto text-center">
              <button @click="editPet(pet)" class="font-semibold bg-blue-500 text-white py-2 px-4 rounded flex-1 mr-2">
                Edit Pet
              </button>
              <button @click="deletePet(pet)" class="font-semibold bg-red-500 text-white py-2 px-4 rounded flex-1">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <p v-else class="text-center text-gray-600">You have no pets listed.</p>
    </div>

    <!-- Edit Pet Modal -->
    <div v-if="editingPet" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Edit Pet</h2>
        <form @submit.prevent="updatePet" class="space-y-4">
          <!-- Form Fields -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="petName" class="block font-semibold text-gray-700">Name:</label>
              <input v-model="editingPet.PetName" id="petName" type="text"
                class="border border-gray-300 rounded p-2 w-full">
            </div>
            <div>
              <label for="type" class="block font-semibold text-gray-700">Type:</label>
              <input v-model="editingPet.Type" id="type" type="text" class="border border-gray-300 rounded p-2 w-full">
            </div>
            <div>
              <label for="breed" class="block font-semibold text-gray-700">Breed:</label>
              <input v-model="editingPet.Breed" id="breed" type="text"
                class="border border-gray-300 rounded p-2 w-full">
            </div>
            <div>
              <label for="markings" class="block font-semibold text-gray-700">Markings:</label>
              <input v-model="editingPet.Markings" id="markings" type="text"
                class="border border-gray-300 rounded p-2 w-full">
            </div>
            <div>
              <label for="species" class="block font-semibold text-gray-700">Species:</label>
              <input v-model="editingPet.Species" id="species" type="text"
                class="border border-gray-300 rounded p-2 w-full">
            </div>
            <div>
              <label for="sex" class="block font-semibold text-gray-700">Sex:</label>
              <input v-model="editingPet.Sex" id="sex" type="text" class="border border-gray-300 rounded p-2 w-full">
            </div>
            <div>
              <label for="status" class="block font-semibold text-gray-700">Status: <span class="text-green-600">Required</span></label>
              <select v-model="editingPet.Status" id="status" class="border border-gray-300 rounded p-2 w-full">
                <option value="Adopted">Adopted</option>
                <option value="Available">Available</option>
              </select>
            </div>
          </div>

          <div>
            <label for="description" class="block font-semibold text-gray-700">Description:</label>
            <textarea v-model="editingPet.Description" id="description"
              class="border border-gray-300 rounded p-2 w-full" rows="3"></textarea>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-4 mt-6">
            <button type="submit"
              class="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded">Update Pet</button>
            <button @click="cancelEdit"
              class="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Pet Details Modal -->
    <div v-if="selectedPet" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center mt-24">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
        <img :src="selectedPet.PetPhoto" :alt="`Image of ${selectedPet.PetName}`"
          class="w-full h-48 object-cover mb-4" />
        <p><strong>Name:</strong> {{ selectedPet.PetName }}</p>
        <p><strong>Type:</strong> {{ selectedPet.Type }}</p>
        <p><strong>Breed:</strong> {{ selectedPet.Breed }}</p>
        <p><strong>Markings:</strong> {{ selectedPet.Markings }}</p>
        <p><strong>Species:</strong> {{ selectedPet.Species }}</p>
        <p><strong>Sex:</strong> {{ selectedPet.Sex }}</p>
        <p><strong>Status:</strong> {{ selectedPet.Status }}</p>
        <p><strong>Description:</strong> {{ selectedPet.Description }}</p>
        <div class="flex justify-end mt-4">
          <button @click="closeDetails" class="bg-red-500 text-white py-2 px-4 rounded">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Account from "@/views/user/Profile/Account.vue";
import instance from "@/utils/axios";
import Swal from 'sweetalert2';

export default {
  components: {
    Account,
  },
  data() {
    return {
      pets: [],
      selectedPet: null,
      photoPreview: null,
      editingPet: null,
    };
  },
  created() {
    this.fetchPets();
  },
  methods: {
    hoverPet(pet, isHovering) {
      if (isHovering && pet.alternatePhoto) {
        pet.currentPhoto = pet.alternatePhoto;
      } else {
        pet.currentPhoto = pet.petPhoto;
      }
    },
    async fetchPets() {
      const token = localStorage.getItem('token');
      try {
        const response = await instance.get('/api/pets/byownerid', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.pets = response.data.map(pet => ({
          ...pet,
          photoUrl: pet.PetPhoto ? JSON.parse(pet.PetPhoto) : [],
        }));
      } catch (error) {
        console.error('Error fetching pet listings:', error);
        Swal.fire({
          icon: 'error',
          title: 'Failed to load pet listings',
          text: 'Please try again later.',
        });
      }
    },

    showDetails(pet) {
      this.selectedPet = pet;
    },
    closeDetails() {
      this.selectedPet = null;
    },
    async editPet(pet) {
      this.editingPet = { ...pet };
    },
    cancelEdit() {
      this.editingPet = null;
    },
    async updatePet() {
      const token = localStorage.getItem('token');
      console.log('Editing Pet Data:', this.editingPet);

      if (!this.editingPet || !this.editingPet.PetID) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Invalid pet ID.',
        });
        return;
      }

      try {
        await instance.put(`/api/pets/${this.editingPet.PetID}`, this.editingPet, {
          headers: { Authorization: `Bearer ${token}` }
        });
        Swal.fire({
          icon: 'success',
          title: 'Pet updated successfully',
          text: 'Your pet information has been updated.',
        });
        this.fetchPets();
        this.cancelEdit();
      } catch (error) {
        console.error('Error updating pet:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error updating pet',
          text: 'Please try again later.',
        });
      }
    },
    
    async deletePet(pet) {
    const token = localStorage.getItem('token');
    try {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            const response = await instance.delete(`/api/pets/${pet.PetID}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            Swal.fire({
                icon: 'success',
                title: 'Pet deleted successfully',
                text: 'The pet has been removed from your listings.',
            });
            this.fetchPets(); // Refresh pet listings
        }
    } catch (error) {
        // Check if the error message is related to the foreign key constraint
        if (error.response && error.response.data && error.response.data.message) {
            // Display the specific error message from the backend
            Swal.fire({
                icon: 'error',
                title: 'Error deleting pet',
                text: error.response.data.message === "Cannot delete pet: related applications exist."
                    ? "Cannot delete pet: related applications exist."
                    : 'Please try again later.',
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error deleting pet',
                text: 'Please try again later.',
            });
        }
    }
},

    handlePhotoChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.newPhoto = file;
        this.photoPreview = URL.createObjectURL(file);
      }
    },
    getImageUrl(photoPath) {
      return photoPath ? `http://192.168.67.185:3000/${photoPath}` : 'https://via.placeholder.com/150';
    }
  },
};
</script>

<style scoped>
.pet-image {
  transition: transform 0.3s ease;
}

.pet-image:hover {
  transform: scale(1.1);
}
</style>
