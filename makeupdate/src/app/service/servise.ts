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
  async confirm(userData: IConfirm): Promise<any | undefined> {
    const response = await instanceRegistration.post<any>(
      "api/v1/auth/users/activation/",
      userData,
    );
    return response;
  },
  async resend(): Promise<void> {
    const email = localStorage.getItem("email");

    if (!email) {
      throw new Error("Email не найден в localStorage");
    }
    await instanceRegistration.post(
      "api/v1/auth/users/resend_activation/",
      { email },
    );
  },
};
