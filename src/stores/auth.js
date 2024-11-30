// src/stores/auth.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: !!localStorage.getItem('token'),
    user: null,
    isAuthenticated: false,
  }),
  actions: {
    logIn(token) {
        localStorage.setItem('token', token);
        this.isLoggedIn = true;
      },
    logOut() {
      localStorage.removeItem('token');
      this.isLoggedIn = false;
    },
    checkLogin() {
      this.isLoggedIn = !!localStorage.getItem('token');
    },
    setUser(user) {
      this.user = user;
      this.isAuthenticated = !!user;
    },

    clearUser() {
      this.user = null;
      this.isAuthenticated = false;
    },
  },

  getters: {
    getUserId: (state) => state.user?.id,
    getIsAuthenticated: (state) => state.isAuthenticated,
  },
});
