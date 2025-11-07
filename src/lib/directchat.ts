import { apiClient } from "@/lib/axios";
import type { IDirectChat } from "@/types/directchat";

export const fetchDirectChatByUsers = async (
  username: string,
): Promise<IDirectChat[]> => {
  const response = await apiClient.get<IDirectChat[]>(
    `/directchat/user/${username}`,
  );
  return response.data;
};

export const fetchAllDirectChats = async (): Promise<IDirectChat[]> => {
  const response = await apiClient.get<IDirectChat[]>("/directchat");
  return response.data;
};

export const fetchDirectChatById = async (id: string): Promise<IDirectChat> => {
  const response = await apiClient.get<IDirectChat>(`/directchat/${id}`);
  return response.data;
};

export const createDirectChat = async (
  receiver: string,
  message: string,
): Promise<IDirectChat> => {
  const response = await apiClient.post<IDirectChat>("/directchat", {
    receiver,
    message,
  });
  return response.data;
};

export const updateChat = async (
  id: number,
  groupId: number,
): Promise<IDirectChat> => {
  const response = await apiClient.put<IDirectChat>(`/directchat/${id}`, {
    groupId,
  });
  return response.data;
};

export const deleteDirectChat = async (id: number): Promise<void> => {
  await apiClient.delete(`/directchat/${id}`);
};
