import { apiClient } from "@/lib/axios";
import { type IGroup } from "@/types/group";
import { type IUser } from "@/types/user";

export const fetchGroups = async (): Promise<IGroup[]> => {
  const response = await apiClient.get<IGroup[]>("/group");
  return response.data;
};

export const fetchGroupByUsername = async (): Promise<IGroup[]> => {
  try {
    const response = await apiClient.get<IGroup[]>(`/group/user`);
    return response.data;
  } catch (error) {
    console.error("Error fetching groups by username:", error);
    throw error;
  }
};

export const createGroup = async (name: string): Promise<IGroup> => {
  const response = await apiClient.post<IGroup>(
    "/group",
    {
      name,
    },
    { withCredentials: true },
  );
  return response.data;
};

export const deleteGroup = async (id: string): Promise<void> => {
  await apiClient.delete(`/group/${id}`);
};

export const updateGroup = async (
  id: number,
  name: string,
): Promise<IGroup> => {
  const response = await apiClient.put<IGroup>(`/group/${id}`, { name });
  return response.data;
};

export const fetchGroupMembersById = async (id: string): Promise<IUser[]> => {
  try {
    const response = await apiClient.get<IUser[]>(`/group/member/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching groups member by id:", error);
    throw error;
  }
};