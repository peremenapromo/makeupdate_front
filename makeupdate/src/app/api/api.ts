import {
  setFavouriteLessonsList,
  setIsFavourite,
  setLessons,
  setProfile,
  setProfileDataLessons,
  setUserLessons,
  setUsersProfiles,
} from "app/service/lessons/lessonsSlice";
import {
  setCounter,
  setFollowers,
  setFollowing,
  setProfileData,
} from "app/service/profileCard/profileCardSlice";
import { setUserData } from "app/service/user/userSlice";
import {
  ICounter,
  IFollowers,
  IGetUserData,
  IGetUsersProfiles,
  ILesson,
  ILessonsState,
  IProfileData,
  IUsersProfiles,
} from "app/types/type";
import axios from "axios";
import { axiosWithRefreshToken } from "helpers/localStorage.helper";
import { toast } from "react-toastify";

export const baseURL = "https://api.lr45981.tw1.ru";
export const XUrl = "https://apix.lr45981.tw1.ru";
export const instance = axios.create({
  baseURL: "https://api.lr45981.tw1.ru/",
  headers: {
    Authorization: `Bearer` + localStorage.getItem("accessToken"),
    "Content-Type": "application/json",
    //
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

// Получение своего профиля
export const getDataUser = async (dispatch: any) => {
  try {
    const data = await axiosWithRefreshToken<IGetUserData>(
      `${baseURL}/api/v1/profile/my-profile/`,
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

// Получение чужого профиля
export const getDataUserProfile = async (
  dispatch: any,
  id: string | number,
) => {
  try {
    const data = await axiosWithRefreshToken<IProfileData>(
      `${baseURL}/api/v1/profiles/${id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    dispatch(setProfileData(data));
    dispatch(
      setProfileDataLessons({
        user_id: +id,
        profile: data,
      }),
    );
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
};
export const getDataUserProfileForLessons = async (
  dispatch: any,
  id: string | number,
) => {
  try {
    // Получаем данные профиля из API
    const response = await axios.get(
      `${baseURL}/api/v1/profiles/${id}/`,
    );

    // Извлекаем только поле `data` из ответа
    const profileData: IProfileData = response.data;

    // Диспатчим только полезные данные
    dispatch(setProfileData(profileData));

    dispatch(
      setProfileDataLessons({
        user_id: +id,
        profile: profileData,
      }),
    );
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
};
// Фоллоу
export const setIsFollow = async (id: string) => {
  try {
    await axiosWithRefreshToken<string>(
      `${baseURL}/api/v1/profile/${id}/follow/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    toast.success("Вы подписались!");
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
};
// Анфолоу
export const setIsUnFollow = async (id: string) => {
  try {
    await axiosWithRefreshToken<string>(
      `${baseURL}/api/v1/profile/${id}/unfollow/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    toast.success("Вы отписались!");
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
};
// Все фоловеры
export const getFollowers = async (dispatch: any, id: string) => {
  try {
    const data = await axiosWithRefreshToken<IFollowers>(
      `${baseURL}/api/v1/profile/${id}/followers/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    dispatch(setFollowers(data));
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
};

// Все подписки

export const getFollowing = async (dispatch: any, id: string) => {
  try {
    const data = await axiosWithRefreshToken<IFollowers>(
      `${baseURL}/api/v1/profile/${id}/following/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    dispatch(setFollowing(data));
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
};
// Получение уроков

export const getLessons = async (dispatch: any) => {
  try {
    const response = await axiosWithRefreshToken<ILessonsState>(
      `${XUrl}/api/v1/lessons/homepage/`,
    );
    // const data: ILessonsState = response.data;
    dispatch(setLessons(response));
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
};
export const getCounterProfile = async (
  dispatch: any,
  id: string,
) => {
  try {
    const data = await axiosWithRefreshToken<ICounter[]>(
      `${XUrl}/api/v1/counters/by-user-ids/?user_ids=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    dispatch(setCounter(data));
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
};
export const getUsersLessons = async (dispatch: any, id: string) => {
  try {
    const data = await axiosWithRefreshToken<ILessonsState>(
      `${XUrl}/api/v1/lessons/user/${id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    dispatch(setUserLessons(data));
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
};

export const addFavouriteLesson = async (
  dispatch: any,
  id: number,
) => {
  try {
    const data = await axiosWithRefreshToken<{ detail: string }>(
      `${XUrl}/api/v1/lesson/${id}/favorite/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    toast.success("Урок добавлен в избранное");

    dispatch(setIsFavourite(data));
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
};
export const deleteFavouriteLesson = async (id: number) => {
  try {
    await axiosWithRefreshToken<string>(
      `${XUrl}/api/v1/lesson/${id}/unfavorite/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    toast.success("Урок убран из избранного");
    // dispatch(setUserLessons(data));
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
};

export const getFavouriteLessonsList = async (dispatch: any) => {
  try {
    const data = await axiosWithRefreshToken<ILessonsState>(
      `${XUrl}/api/v1/lessons/favorites/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log("API data:", data);

    dispatch(setFavouriteLessonsList(data));
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
};
export const getUsersProfileList = async (
  dispatch: any,
  ids: string,
) => {
  try {
    const data = await axiosWithRefreshToken<IGetUsersProfiles[]>(
      `${baseURL}/api/v1/profiles/`,
      {
        params: { user_ids: ids },
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log(data);
    dispatch(setUsersProfiles(data));
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
};
