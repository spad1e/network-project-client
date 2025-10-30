import { apiClient } from "@/lib/axios";
import type { IChat } from "@/types/chat";

export const fetchChatByGroupId = async (groupId: string): Promise<IChat[]> => {
  const response = await apiClient.get<IChat[]>(`/chat/group/${groupId}`);
  return response.data;
};

export const fetchAllChats = async (): Promise<IChat[]> => {
  const response = await apiClient.get<IChat[]>("/chat");
  return response.data;
};

export const fetchChatById = async (id: string): Promise<IChat> => {
  const response = await apiClient.get<IChat>(`/chat/${id}`);
  return response.data;
};

export const createChat = async (
  groupId: string,
  message: string,
  username: string,
): Promise<IChat> => {
  const response = await apiClient.post<IChat>("/chat", {
    groupId,
    message,
    username,
  });
  return response.data;
};

export const updateChat = async (
  id: number,
  groupId: number,
): Promise<IChat> => {
  const response = await apiClient.put<IChat>(`/chat/${id}`, { groupId });
  return response.data;
};

export const deleteChat = async (id: number): Promise<void> => {
  await apiClient.delete(`/chat/${id}`);
};
