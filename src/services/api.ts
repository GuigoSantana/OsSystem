import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

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
