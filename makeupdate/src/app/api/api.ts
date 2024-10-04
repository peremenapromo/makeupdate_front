import { useDispatch } from "app/service/hooks/hooks";
import { setUserData } from "app/service/user/userSlice";
import { IGetUserData } from "app/types/type";
import axios from "axios";
import { axiosWithRefreshToken } from "helpers/localStorage.helper";

export const instance = axios.create({
  baseURL: "https://api.lr45981.tw1.ru/",
  headers: {
    Authorization: `Bearer` + localStorage.getItem("accessToken"),
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods":
      "GET,PUT,POST,DELETE,PATCH,OPTIONS",
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
export const getDataUser = async (dispatch: any) => {
  try {
    const data = await axiosWithRefreshToken<IGetUserData>(
      "https://api.lr45981.tw1.ru/api/v1/profile/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    dispatch(setUserData(data));
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
};
