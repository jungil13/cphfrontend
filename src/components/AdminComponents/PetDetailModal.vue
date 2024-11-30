<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-5 rounded-lg max-w-3xl w-full overflow-auto">
        <h2 class="text-xl font-bold mb-4">Pet Details</h2>
        <form @submit.prevent="submitUpdate">
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block font-medium text-gray-700">Pet Name:</label>
              <input type="text" v-model="editablePet.name" :placeholder="editablePet.name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            </div>
            <div>
              <label class="block font-medium text-gray-700">Species:</label>
              <input type="text" v-model="editablePet.species" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            </div>
            <div>
              <label class="block font-medium text-gray-700">Breed:</label>
              <input type="text" v-model="editablePet.breed" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            </div>
            <div>
              <label class="block font-medium text-gray-700">Owner Name:</label>
              <input type="text" v-model="editablePet.ownerFullName" disabled class="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-200">
            </div>
          </div>
          <div>
            <label class="block font-medium text-gray-700">Description:</label>
            <textarea v-model="editablePet.description" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
          </div>
          <div class="flex items-center justify-between mt-4">
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Update</button>
            <button @click="close" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Close</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, reactive } from 'vue';
 import instance from '@/utils/axios';
  import Swal from 'sweetalert2';
  
  const props = defineProps({
    pet: Object
  });
  
  const emit = defineEmits(['close', 'refresh']);
  
  const editablePet = reactive({ ...props.pet });
  
  watch(() => props.pet, (newVal) => {
    Object.assign(editablePet, newVal);
  });
  
  const close = () => {
    emit('close');
  };
  
  const submitUpdate = async () => {
    try {
      const response = await instance.put(`/admin/pets/${editablePet.PetID}`, editablePet, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }   
      });
      Swal.fire('Success', 'Pet details updated successfully.', 'success');
      emit('refresh');
      close();
    } catch (error) {
      console.error('Error updating pet details:', error);
      Swal.fire('Error', 'Failed to update pet details. Please check your entries and try again.', 'error');
    }
  };
  </script>
  
  <style scoped>
    /* You might want to add styles for your modal here */
  </style>
  