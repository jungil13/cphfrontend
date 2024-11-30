<template>
  <div class="p-6 min-h-screen">
    <div class="mb-6">
      <h1 class="text-4xl font-extrabold italic mb-8 text-center text-gray-800 animate-fade-in">
      Lost and Found Pet Reports
    </h1>
      <div class="flex items-center justify-center">
        <div class="relative w-1/3">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <span class="material-icons text-gray-500">search</span>
          </span>
          <input type="text"
            class="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search reports..." v-model="searchQuery" @input="handleSearch" />
        </div>
      </div>
    </div>

    <div class="overflow-x-auto bg-white shadow-md shadow-black rounded-lg">
      <table class="min-w-full bg-white">
        <thead class="bg-blue-600 text-white uppercase text-sm leading-normal font-semibold">
          <tr>
            <th class="py-3 px-6 text-left">Photo</th>
            <th class="py-3 px-6 text-left">Reporter Name</th>
            <th class="py-3 px-6 text-left">Location</th>
            <th class="py-3 px-6 text-left">Pet Description</th>
            <th class="py-3 px-6 text-center">Type</th>
            <th class="py-3 px-6 text-center">Status</th>
            <th class="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-semibold">
          <tr v-for="report in reports" :key="report.ReportID" class="border-b border-gray-200 hover:bg-gray-100">
            <td class="py-3 px-6 text-left">
              <img :src="getReportPhotoUrl(report.photoUrl[0])" alt="Report Photo"
                class="object-cover w-20 h-20 rounded-xl shadow-md shadow-black">
            </td>
            <td class="py-3 px-6 text-left">{{ report.reporterFullName }}</td>
            <td class="py-3 px-6 text-left">{{ report.Location }}</td>
            <td class="py-3 px-6 text-left">{{ report.Description }}</td>
            <td class="py-3 px-6 text-center">
              <span class="py-1 px-3 text-xs rounded-full bg-blue-200 text-blue-600">{{ report.ReportType }}</span>
            </td>
            <td class="py-3 px-6 text-center">
              <span :class="report.Status === 'Open' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'"
                class="py-1 px-3 text-xs rounded-full">
                {{ report.Status }}
              </span>
            </td>
            <td class="py-3 px-6 text-center">
              <div class="flex items-center justify-center space-x-2">
                <button class="flex items-center justify-center w-8 h-8 rounded-full hover:bg-blue-100"
                  @click="editingReport = report">
                  <span class="material-icons text-blue-500">edit</span>
                </button>
                <button class="flex items-center justify-center w-8 h-8 rounded-full hover:bg-red-100"
                  @click="deleteReport(report)">
                  <span class="material-icons text-red-500">delete</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center mt-6">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage <= 1"
        class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Previous
      </button>
      <span class="mx-4 text-lg font-semibold">Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="goToPage(currentPage + 1)" :disabled="currentPage >= totalPages"
        class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Next
      </button>
    </div>

    <!-- Edit Report Modal -->
    <div v-if="editingReport" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70">
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
        <button @click="editingReport = null" class="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          <span class="material-icons">close</span>
        </button>
        <h2 class="text-2xl font-bold mb-4">Edit Report</h2>
        <form @submit.prevent="updateReport" class="flex flex-col gap-4">
          <div>
            <label class="block text-gray-700 font-semibold mb-2" for="editDescription">Description</label>
            <input v-model="editingReport.Description" id="editDescription" type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-2" for="editLocation">Location</label>
            <input v-model="editingReport.Location" id="editLocation" type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-2" for="editStatus">Status</label>
            <select v-model="editingReport.Status" id="editStatus"
              class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm">
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div class="flex justify-end mt-4">
            <button type="button" @click="editingReport = null"
              class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ml-4">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import instance from '@/utils/axios';
import Swal from 'sweetalert2';

const reports = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const totalPages = ref(1);  // Initialize to 1 to avoid division by zero
const perPage = ref(5);
const editingReport = ref(null); // To hold the report being edited

instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

const fetchReports = async () => {
  try {
    const response = await instance.get(`/api/reports`, {
      params: {
        search: searchQuery.value,
        page: currentPage.value,
        pageSize: perPage.value
      }
    });

    reports.value = response.data.reports.map(report => ({
      ...report,
      photoUrl: report.Photo ? JSON.parse(report.Photo) : ['/default-image.jpg']
    }));
    totalPages.value = response.data.totalPages || 1;  // Default to 1 if not provided
  } catch (error) {
    console.error('Failed to fetch reports:', error);
    Swal.fire('Error', 'Could not fetch reports.', 'error');
  }
};

// Handle search input
const handleSearch = () => {
  currentPage.value = 1;  // Reset to the first page when the search query changes
  fetchReports();    // Fetch reports with the updated search query
};

// Pagination logic
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    fetchReports();  // Re-fetch reports based on the new page
  }
};

function getReportPhotoUrl(photoPath) {
  return photoPath ? `http://192.168.67.185:3000/${photoPath}` : '/default-profile.png';
}

async function updateReport() {
  const formData = new FormData();
  formData.append('ReportType', editingReport.value.ReportType);
  formData.append('Description', editingReport.value.Description);
  formData.append('Location', editingReport.value.Location);
  formData.append('Status', editingReport.value.Status);
  formData.append('PetID', editingReport.value.PetID || '');

  // Check if a new photo is being uploaded
  if (editingReport.value.newPhoto) {
    formData.append('Photo', editingReport.value.newPhoto);
  } else {
    // If no new photo, send existing photos as JSON
    const existingPhotos = editingReport.value.Photo;
    console.log('Existing Photos:', existingPhotos); // Debugging line
    formData.append('Photo', JSON.stringify(existingPhotos));
  }

  // Log the FormData content for debugging
  for (let pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  try {
    // Make the API call to update the report
    const response = await instance.put(`/admin/reports/${editingReport.value.ReportID}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    // Show success message
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Report updated successfully!',
    });

    // Update the local reports array with the updated report
    const index = reports.value.findIndex(r => r.ReportID === editingReport.value.ReportID);
    if (index !== -1) {
      reports.value.splice(index, 1, { ...editingReport.value, ...response.data }); // Update with response data if needed
    }

    // Reset the editing state
    editingReport.value = null;
  } catch (error) {
    // Show error message
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `Failed to update report: ${error.response ? error.response.data.message : error.message}`,
    });
    console.error('Failed to update report:', error.response ? error.response.data : error.message);
  }
}

async function deleteReport(report) {
  const confirmDelete = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  });

  if (confirmDelete.isConfirmed) {
    try {
      await instance.delete(`/api/reports/${report.ReportID}`);
      Swal.fire('Deleted!', 'Your report has been deleted.', 'success');
      fetchReports(); // Refresh the reports list
    } catch (error) {
      console.error('Failed to delete report:', error);
      Swal.fire('Error', 'Could not delete report.', 'error');
    }
  }
}

onMounted(fetchReports);
</script>