import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to append Authorization header automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle unauthenticated flushes
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Redirect to login if in browser
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (username, password) => {
    const response = await API.post("/auth/login", { username, password });
    return response.data;
  },
  register: async (username, email, password, fullName) => {
    const response = await API.post("/auth/register", { username, email, password, fullName });
    return response.data;
  },
};

export const productAPI = {
  getProducts: async (categoryName) => {
    const url = categoryName && categoryName !== "All"
      ? `/products/category/${categoryName}` // backend mapping or query filters
      : "/products";
    const response = await API.get(url);
    return response.data;
  },
  getCategories: async () => {
    const response = await API.get("/categories");
    return response.data;
  },
};

export default API;
