import { apiService } from "./apiService";

export const authService = {
  login: async (username, password) => {
    const data = await apiService.post("/auth/signin", { username, password });
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
    }
    return data;
  },

  register: async (username, email, password, roles) => {
    return apiService.post("/auth/signup", {
      username,
      email,
      password,
      roles: roles ? [roles] : ["user"],
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getCurrentUser: () => {
    try {
      const userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    } catch (e) {
      return null;
    }
  },
};
