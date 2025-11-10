import { socket } from "@/connections/socket";
import { apiClient } from "./axios";
import type { IUserSignIn, IUser } from "@/types/user";

export const signUp = async (data: IUser) => {
  try {
    const user = await apiClient.post<IUser>(`/auth/signup`, data);
    return user;
  } catch (error) {
    console.error("Error SignUp:", error);
    throw error;
  }
};

export const signIn = async (data: IUserSignIn) => {
  try {
    const user = await apiClient.post<IUserSignIn>(`/auth/signin`, data);
    socket.connect();
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
