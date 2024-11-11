import axios from "axios";
import { getToken } from "../utils/auth";

// const API_BASE_URL = "http://localhost:8010";
const API_BASE_URL = `https://substring-tree-backend.onrender.com`;

axios.interceptors.request.use(
  (config: any) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export const signup = async (data: any) => {
  return axios.post(`${API_BASE_URL}/api/user/signup`, {
    ...data,
    role: "user",
  });
};

export const login = async (data: any) => {
  return axios.post(`${API_BASE_URL}/api/user/login`, data);
};

export const calculateSubstring = async (input: string) => {
  return axios.post(`${API_BASE_URL}/api/user/output/substring`, { input });
};

export const calculateBinaryTree = async (treeData: any) => {
  return axios.post(`${API_BASE_URL}/api/user/output/binarytree`, {
    tree: treeData.split(",").map((item: any) => {
      if (item === "null") {
        return null; // Convert the string "null" to actual null
      }
      const num = Number(item);
      return isNaN(num) ? undefined : num; // Convert to number or return undefined if not a valid number
    }),
  });
};
