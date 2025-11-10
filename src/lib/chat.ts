import { apiClient } from "@/lib/axios";
import type { IGroupChat, IDirectChat } from "@/types/chat";

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
  username: string,
): Promise<IGroupChat> => {
  const response = await apiClient.post<IGroupChat>("/groupchat", {
    groupId,
    message,
    username,
  });
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

export const fetchDirectChatByUsers = async (
  username: string,
): Promise<IDirectChat[]> => {
  const response = await apiClient.get<IDirectChat[]>(
    `/directchat/user/${username}`,
  );
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
