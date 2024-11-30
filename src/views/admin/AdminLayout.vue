<template>
  <div class="flex h-screen overflow-hidden bg-gray-50">
    <!-- Sidebar -->
    <aside
      :class="[ 
        'fixed inset-0 z-30 bg-gray-100 shadow-black p-4 lg:relative lg:translate-x-0 lg:w-66 shadow-md',
        drawerOpen ? 'translate-x-0' : '-translate-x-full',
      ]"
      class="transition-transform duration-300"
      @click.away="drawerOpen = false"
    >
      <button
        @click="toggleDrawer"
        class="text-2xl lg:hidden absolute top-4 right-4 text-black focus:outline-none"
      >
        ✕
      </button>
      <div class="flex items-center justify-center mb-12 mt-6">
        <h1 class="ml-4 text-2xl font-bold text-black tracking-wider">
          Admin Panel
        </h1>
      </div>
      <nav>
        <ul>
          <li v-for="item in menuItems" :key="item.title" class="mb-6">
            <RouterLink
              v-if="!item.submenu"
              :to="item.path"
              class="shadow shadow-black flex items-center gap-4 text-lg font-medium text-black px-4 py-3 rounded-lg hover:bg-orange-600 hover:shadow-md hover:shadow-black transition-all duration-300"
              exact-active-class="bg-orange-600 shadow-md shadow-black"
            >
              <span class="material-icons text-2xl">{{ item.icon }}</span>
              <span>{{ item.title }}</span>
            </RouterLink>
            <div v-else>
              <button
                @click="item.open = !item.open"
                class="flex items-center gap-4 text-lg font-medium text-black px-4 py-3 rounded-lg hover:bg-orange-600 hover:shadow-md hover:shadow-black transition-all duration-300 w-full text-left"
              >
                <span class="material-icons text-2xl">{{ item.icon }}</span>
                <span>{{ item.title }}</span>
                <span class="material-icons">{{ item.open ? 'expand_less' : 'expand_more' }}</span>
              </button>
              <ul v-show="item.open" class="pl-6">
                <li v-for="subItem in item.submenu" :key="subItem.title">
                  <RouterLink
                    :to="subItem.path"
                    class="flex items-center gap-4 text-lg font-medium text-black px-4 py-3 rounded-lg hover:bg-orange-400 hover:shadow-md hover:shadow-black transition-all duration-300"
                    exact-active-class="text-blue-600"
                  >
                    <span class="material-icons text-lg">{{ subItem.icon }}</span>
                    <span>{{ subItem.title }}</span>
                  </RouterLink>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <RouterLink
          to="/"
          class="shadow-md shadow-black flex items-center justify-center bg-blue-500 text-white text-lg font-semibold py-3 px-4 rounded-full hover:bg-blue-700 hover:shadow-md transition-all duration-300"
        >
          <span class="material-icons mr-2">home</span>
          Go to Page
        </RouterLink>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <header
        class="flex items-center justify-between bg-white px-6 py-4 mb-2 shadow-md shadow-black"
      >
        <button
          @click="toggleDrawer"
          class="text-3xl lg:hidden text-black focus:outline-none"
        >
          ☰
        </button>
        <div class="flex items-center gap-4">
          <img
            src="/cphlogo.png"
            alt="CPH Logo"
            class="w-10 h-10 rounded-full border-2 border-black"
          />
          <h2 class="text-2xl font-extrabold italic text-black tracking-wide">
            CPH: Admin Dashboard
          </h2>
        </div>
        <div class="flex items-center">
          <button
            @click="confirmLogout"
            class="shadow-black flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full font-medium shadow-md hover:bg-red-700 hover:shadow-md transition duration-300"
          >
            <span class="material-icons">exit_to_app</span>
            Logout
          </button>
          <img
            src="/ad.png"
            alt="Admin Avatar"
            class="w-12 h-12 rounded-full ml-4 border-2 border-white shadow-lg bg-white shadow-md shadow-black"
          />
        </div>
      </header>

      <!-- Main Section -->
      <main class="flex-1 overflow-auto p-6 bg-slate-00">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { useAuthStore } from "@/stores/auth";

const drawerOpen = ref(false);
const router = useRouter();
const authStore = useAuthStore();
const menuItems = ref([
  { title: "Dashboard", path: "/dashboard", icon: "dashboard" },
  { title: "User Management", path: "/usermanagement", icon: "people" },
  { title: "Pet Management", path: "/petmanagement", icon: "pets" },
  {
    title: "Application Management",
    icon: "assignment",
    submenu: [
      { title: "View Applications", path: "/appmanagement", icon: "visibility" },
      { title: "Manage Applications", path: "/applicationmanagement", icon: "manage_accounts" },
    ],
  },
  { title: "Reports", path: "/reportmanagement", icon: "report" },
  { title: "Forums", path: "/forummanagement", icon: "forum" },
  { title: "Comments", path: "/commentsmanagement", icon: "comment" },
  // { title: "Donations", path: "/donationsmanagement", icon: "monetization_on" },
]);

function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value;
}

const logout = async () => {
  localStorage.clear();
  authStore.isLoggedIn = false;
  await Swal.fire({
    title: "Logged Out!",
    text: "Your session has been closed.",
    icon: "success",
    confirmButtonColor: "#3085d6",
  });
  router.push("/login");
  location.reload();
};

const confirmLogout = async () => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You will be logged out of your account!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, log me out!",
  });
  if (result.isConfirmed) {
    logout();
  }
};
</script>

<style scoped>
.material-icons {
  font-size: 1.8rem;
}
</style>