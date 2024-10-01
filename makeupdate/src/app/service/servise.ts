import { instance, instanceRegistration } from "../api/api";
import {
  IConfirm,
  IResponseUser,
  IResponseUserData,
  IUser,
  IUserData,
} from "../types/type";

export const AuthService = {
  async registration(
    userData: IUserData,
  ): Promise<IResponseUserData | undefined> {
    const { data } = await instanceRegistration.post<
      IUserData,
      { data: IResponseUserData }
    >("api/v1/auth/users/", userData);
    return data;
  },
  async login(userData: IUser): Promise<IResponseUser | undefined> {
    const { data } = await instance.post<IResponseUser>(
      "api/v1/token/",
      userData,
    );
    return data;
  },
};
export const confirmEmail = {
  async confirm(
    userData: IConfirm,
  ): Promise<IResponseUserData | undefined> {
    try {
      const response = await instance.post<IResponseUserData>(
        "api/v1/auth/users/activation/",
        userData,
      );
      if (response.status === 204) {
        return undefined;
      }
    } catch (error) {
      console.error("Ошибка при подтверждении:", error);
      return undefined; // Вернем undefined в случае ошибки
    }
  },
};
