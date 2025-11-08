import { apiClient } from "./axios";
import type { IUser } from "@/types/user";

export const signUp = async (data: IUser) => {
  try {
    const user = await apiClient.post<IUser>(`/auth/signup`, data);
    return user;
  } catch (error) {
    console.error("Error SignUp:", error);
    throw error;
  }
};

export const signIn = async (data: IUser) => {
  try {
    const user = await apiClient.post<IUser>(`/auth/signin`, data);
    return user;
  } catch (error) {
    console.error("Error SignIn:", error);
    throw error;
  }
};
export const logout = async () => {
  try {
    await apiClient.post(`/auth/logout`);
  } catch (error) {
    console.error("Error Logout:", error);
    throw error;
  }
};