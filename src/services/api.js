import axios from 'axios';
// Base configuration for axios
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Add request interceptor to include the token
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshAuthToken();
        const newToken = localStorage.getItem('accessToken');
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        // Handle token refresh failure (e.g., redirect to login)
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

async function refreshAuthToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  const response = await api.post('/users/refresh-token', { refreshToken });
  localStorage.setItem('accessToken', response.data.accessToken);
}

export default api;
