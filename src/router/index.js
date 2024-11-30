import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/user/HomeView.vue";
import FoundPet from "@/components/Lost And Found Items/FoundPet.vue";
import LostList from "@/components/Lost And Found Items/LostList.vue";
import FoundList from "@/components/Lost And Found Items/FoundList.vue";
import Reports from "@/components/Lost And Found Items/Reports.vue";
import FoundPetDetails from "@/components/Lost And Found Items/FoundPetDetails.vue";
import LostPetDetails from "@/components/Lost And Found Items/LostPetDetails.vue";
import PostDetail from "@/components/ForumItems/TopicDetail.vue";
import Navbar from "@/components/Navbar.vue";
import EmailVerification from '@/views/EmailVerification.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/navbar",
      name: "Navbar",
      component: Navbar,
    },
    {
      path: '/verify-email',
      name: 'EmailVerification',
      component: EmailVerification,
    },
    {
      path: "/foundpet",
      name: "foundpet",
      component: FoundPet,
    },
    {
      path: "/reports",
      name: "reports",
      component: Reports,
      meta: { requiresAuth: true }
    },
    {
      path: "/lostlist",
      name: "lostlist",
      component: LostList,
    },
    {
      path: "/foundlist",
      name: "foundlist",
      component: FoundList,
    },
    {
      path: "/foundpetdetails",
      name: "foundpetdetails",
      component: FoundPetDetails,
      meta: { requiresAuth: true }
    },
    {
      path: "/lostpetdetails/:id",
      name: "lostpetdetails",
      component: LostPetDetails,
      meta: { requiresAuth: true }
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/user/AboutView.vue"),
    },
    {
      path: "/lostpet",
      name: "lostpet",
      component: () => import("../components/Lost And Found Items/LostPet.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/managereports",
      name: "managereports",
      component: () => import("../components/UserProfileItems/ManageReports.vue"),
    },
    {
      path: "/browse",
      name: "browse",
      component: () => import("../views/user/BrowsePet.vue"),
    },
    {
      path: "/addpet",
      name: "addpet",
      component: () => import("../views/user/AddPet.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/lostandfound",
      name: "lostandfound",
      component: () => import("../views/user/LostFound.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/forum",
      name: "forum",
      component: () => import("../views/user/Forum.vue"),
      
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/auth/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/auth/Register.vue"),
    },
    {
      path: '/petdetails/:id',
      name: 'PetDetails',
      component: () => import("../components/PetDetails.vue"),
      props: true
    },
    {
      path: "/questions/:petId",
      name: "questions",
      component: () => import("../components/Questions.vue"),
      meta: { requiresAuth: true },
      props: true
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/user/Contact.vue"),
    },
    {
      path: "/donations",
      name: "donations",
      component: () => import("../views/user/Donations.vue"),
    },
    {
      path: "/ongoing",
      name: "ongoing",
      component: () => import("../components/Ongiong.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/general",
      name: "general",
      component: () => import("../components/ForumItems/General.vue"),
      meta: { requiresAuth: true }
     
    },
    {
      path: "/health",
      name: "health",
      component: () => import("../components/ForumItems/Health.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/training",
      name: "training",
      component: () => import("../components/ForumItems/Training.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/comment",
      name: "comment",
      component: () => import("../views/user/Comment.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: '/topic/:id', 
      name: 'PostDetail',
      component: PostDetail,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: "/profile",
      name: "Profile",
      component: () => import("../views/user/Profile.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/account",
      name: "account",
      component: () => import("../views/user/Profile/Account.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/summary",
      name: "Summary",
      component: () => import("../components/UserProfileItems/Summary.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/managepetlistings",
      name: "ManagePetListings",
      component: () => import("../components/UserProfileItems/ManagePetListings.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/manageposts",
      name: "ManagePosts",
      component: () => import("../components/UserProfileItems/ManagePosts.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/applicants",
      name: "AdoptionApplicants",
      component: () => import("../components/UserProfileItems/AdoptionApplicants.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/applicantformmodal",
      name: "ApplicationFormModal",
      component: () => import("../components/UserProfileItems/ApplicationFormModal.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/adminlayout",
      name: "AdminLayout",
      component: () => import("../views/admin/AdminLayout.vue"),
      meta: { showNavBar: false,requiresAuth: true, requiresAdmin: true },
      children: [
        {
          path: "/dashboard",
          name: "Dashboard",
          component: () => import("../views/admin/Dashboard.vue"),
          meta: { showNavBar: false, requiresAuth: true, requiresAdmin: true }
        },
        {
          path: "/petmanagement",
          name: "PetManagement",
          component: () => import("../views/admin/PetManagement.vue"),
          meta: { showNavBar: false, requiresAuth: true, requiresAdmin: true }
        },
        {
          path: "/usermanagement",
          name: "UserManagement",
          component: () => import("../views/admin/UserManagement.vue"),
          meta: { showNavBar: false, requiresAuth: true, requiresAdmin: true }
        },
        {
          path: "/applicationmanagement",
          name: "Pet Listings Management",
          component: () => import("../views/admin/ApplicationManagement.vue"),
          meta: { showNavBar: false, requiresAuth: true, requiresAdmin: true }
        },
        {
          path: "/appmanagement",
          name: "ApplicationManagement",
          component: () => import("../views/admin/ApplicationsManagement.vue"),
          meta: { showNavBar: false, requiresAuth: true, requiresAdmin: true }
        },
        {
          path: "/reportmanagement",
          name: "ReportManagement",
          component: () => import("../views/admin/ReportManagement.vue"),
          meta: { showNavBar: false, requiresAuth: true, requiresAdmin: true }
        },
        {
          path: "/forummanagement",
          name: "ForumManagement",
          component: () => import("../views/admin/ForumManagement.vue"),
          meta: { showNavBar: false, requiresAuth: true, requiresAdmin: true }
        },
        {
          path: "/donationsmanagement",
          name: "DonationsManagement",
          component: () => import("../views/admin/DonationsManagement.vue"),
          meta: { showNavBar: false, requiresAuth: true, requiresAdmin: true }
        },
        {
          path: "/commentsmanagement",
          name: "CommentsManagement",
          component: () => import("../views/admin/CommentsManagement.vue"),
          meta: { showNavBar: false, requiresAuth: true, requiresAdmin: true }
        },
      ],
    },
  ],
});

function isAuthenticated() {
  return localStorage.getItem("isLoggedIn") === "true";
}

function isAdmin() {
  return localStorage.getItem("userType") === "Admin";
}

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
  const isAuthRoute = to.name === 'login' || to.name === 'register';

  if (isAuthRoute && isAuthenticated()) {
    next({ name: 'browse' }); 
    return;
  }

  if (requiresAuth && !isAuthenticated()) {
    next({ name: 'login' });
    return;
  }

  if (requiresAdmin && !isAdmin()) {
    next({ name: 'browse' }); 
    return;
  }

  next(); t
});

export default router;
