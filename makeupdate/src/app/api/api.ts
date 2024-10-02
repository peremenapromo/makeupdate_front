import axios from "axios";
import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
} from "../../helpers/localStorage.helper";
import { AuthService } from "app/service/servise";

export const instance = axios.create({
  baseURL: "https://api.lr45981.tw1.ru/",
  headers: {
    Authorization: `Bearer` + localStorage.getItem("accessToken"),
  },
});
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const instanceRegistration = axios.create({
  baseURL: "https://api.lr45981.tw1.ru/",
});




