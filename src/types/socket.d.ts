import { IUser } from "@/types/user";

export interface ServerToClientEvents {
  // messageToClient: (data: IChat) => void;
  onlineUsers: (users: Partial<IUser>[]) => void;
}

export interface ClientToServerEvents {
  joinGroup: (id: string) => void;
  leaveGroup: (id: string) => void;
  // messageToServer: (data: IChat, room: string) => void;
}
