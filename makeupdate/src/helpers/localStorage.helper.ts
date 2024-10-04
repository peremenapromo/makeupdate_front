import { useDispatch } from "app/service/hooks/hooks";
import { IGetUserData } from "app/types/type";
import axios, { AxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode"; // Именованный импорт
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export async function getTokenFromLocalStorage(
  key: string,
): Promise<string> {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : "";
  } catch (error) {
    console.error("Error getting token from localStorage:", error);
    return "";
  }
}

export async function setTokenToLocalStorage(
  key: string,
  token: string,
): Promise<void> {
  try {
    localStorage.setItem(key, JSON.stringify(token));
  } catch (error) {
    console.error("Error setting token to localStorage:", error);
  }
}

export async function removeTokenFromLocalStorage(
  key: string,
): Promise<void> {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing token from localStorage:", error);
  }
}
export const getTokenExpiration = (token: string): string | null => {
  try {
    const decoded: { exp: number } = jwtDecode(token);
    const expirationTime = new Date(
      decoded.exp * 1000,
    ).toLocaleString(); // Преобразуем в читаемый формат
    return expirationTime;
  } catch (error) {
    console.error("Ошибка при декодировании токена:", error);
    return null;
  }
};

const refreshToken = async (): Promise<any> => {
  const refresh = localStorage.getItem("refreshToken");

  const { data } = await axios.post(
    "https://api.lr45981.tw1.ru/api/v1/token/refresh/",
    {
      refresh,
    },
  );

  return data.access;
};
export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: { exp: number } = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Ошибка при декодировании токена:", error);
    return true;
  }
};
export const logoutProfile = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
const getAccessToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");

export const checkTokens = (): boolean => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  if (accessToken && isTokenExpired(accessToken)) {
    if (refreshToken && isTokenExpired(refreshToken)) {
      return false; // logout
    } else {
      return true; // обновить токен
    }
  }
  return true; // все ок
};
export const axiosWithRefreshToken = async <T>(
  url: string,
  options?: AxiosRequestConfig,
): Promise<T> => {
  if (!checkTokens()) {
    console.log("Токены устарели,нужно зайти еще раз");

    logoutProfile();
    setTimeout(() => {
      toast.error("Токен авторизации устарел");
    }, 2000);
    return Promise.reject("Не удалось обновить токены");
  }

  // Добавляем заголовок авторизации
  const accessToken = getAccessToken();
  options = {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await axios(url, options);
    return response.data;
  } catch (error: any) {
    if (
      error.response?.status === 401 &&
      isTokenExpired(getAccessToken()!)
    ) {
      // Если токен истек, пробуем обновить токен
      const refresh = getRefreshToken();

      if (refresh && !isTokenExpired(refresh)) {
        try {
          const refreshData = await refreshToken();
          localStorage.setItem("accessToken", refreshData);

          // Пытаемся снова выполнить запрос с новым accessToken
          options.headers!.Authorization = `Bearer ${refreshData}`;
          const retryResponse = await axios(url, options);
          return retryResponse.data;
        } catch (refreshError) {
          console.error(
            "Ошибка при обновлении токена:",
            refreshError,
          );
          logoutProfile();
          // window.location.href = "/"; // Если обновление токена не удалось, перенаправляем на главную страницу

          return Promise.reject("Ошибка обновления токена");
        }
      } else {
        console.error("Рефреш токен устарел");
        toast.error("Токен авторизации отсутствует");
        // setTimeout(() => {
        //   window.location.href = "/";
        // }, 2000); // Если токенов нет
        return Promise.reject("Refresh token is expired or missing");
      }
    }

    throw error;
  }
};
