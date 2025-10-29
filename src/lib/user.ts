import { apiClient } from "@/lib/axios";
import type { IUser } from "@/types/user";
import type { IGroup } from "@/types/group";

export const fetchUsers = async (): Promise<IUser[]> => {
  const response = await apiClient.get<IUser[]>("/user");
  return response.data;
};

export const fetchUserByUsername = async (
  username: string,
): Promise<IUser[]> => {
  try {
    const response = await apiClient.get<IUser[]>(`/user/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users by username:", error);
    throw error;
  }
};

export const createUser = async (
  username: string,
  password: string,
): Promise<IUser> => {
  const response = await apiClient.post<IUser>("/user", {
    username,
    password,
  });
  return response.data;
};

export const deleteUser = async (username: string): Promise<void> => {
  await apiClient.delete(`/user/${username}`);
};

export const updateUser = async (
  username: string,
  name: string,
): Promise<IUser> => {
  const response = await apiClient.put<IUser>(`/user/${username}`, { name });
  return response.data;
};

export const joinGroup = async (
  username: string,
  groupId: string,
): Promise<IGroup> => {
  const response = await apiClient.post<IGroup>(`/user/joingroup/${username}`, {
    groupId,
  });
  return response.data;
};

export const leaveGroup = async (
  username: string,
  groupId: string,
): Promise<IGroup> => {
  const response = await apiClient.post<IGroup>(
    `/user/leavegroup/${username}`,
    {
      groupId,
    },
  );
  return response.data;
};
export const getUserByToken = async () : Promise<IUser> => {
  const response = await apiClient.get<IUser>(
    '/user/token'
  )
  console.log(response.data)
  return response.data;
}
