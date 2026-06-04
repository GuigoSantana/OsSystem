import axios from "axios";
import useAuthStore from "../stores/useAuthStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3333",
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().setLogoutUser();
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use((config) => {
  const tokenStorage = localStorage.getItem("auth-storage");

  if (tokenStorage) {
    try {
      const token = JSON.parse(tokenStorage).state.token;
      config.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      console.log("Erro ao ler token do cache", error);
    }
  }
  return config;
});

export default api;
