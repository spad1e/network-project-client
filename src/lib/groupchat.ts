import { apiClient } from "@/lib/axios";
import type { IGroupChat } from "@/types/groupchat";

export const fetchGroupChatByGroupId = async (
  groupId: string,
): Promise<IGroupChat[]> => {
  const response = await apiClient.get<IGroupChat[]>(
    `/groupchat/group/${groupId}`,
  );
  return response.data;
};

export const fetchAllGroupChats = async (): Promise<IGroupChat[]> => {
  const response = await apiClient.get<IGroupChat[]>("/groupchat");
  return response.data;
};

export const fetchGroupChatById = async (id: string): Promise<IGroupChat> => {
  const response = await apiClient.get<IGroupChat>(`/groupchat/${id}`);
  return response.data;
};

export const createGroupChat = async (
  groupId: string,
  message: string,
): Promise<IGroupChat> => {
  const response = await apiClient.post<IGroupChat>("/groupchat", {
    groupId,
    message,
  });
  return response.data;
};

export const updateGroupChat = async (
  id: number,
  groupId: number,
): Promise<IGroupChat> => {
  const response = await apiClient.put<IGroupChat>(`/groupchat/${id}`, {
    groupId,
  });
  return response.data;
};

export const deleteGroupChat = async (id: number): Promise<void> => {
  await apiClient.delete(`/groupchat/${id}`);
};
