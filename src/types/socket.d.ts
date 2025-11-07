import { IUser } from "@/types/user";
import type { IGroupChat } from "./chat";

export interface ServerToClientEvents {
  groupMessageToClient: (data: IGroupChat) => void;
  directMessageToClient: (data: IDirectChat) => void;
  onlineUsers: (users: Partial<IUser>[]) => void;
}

export interface ClientToServerEvents {
  joinGroup: (id: string) => void;
  leaveGroup: (id: string) => void;
  groupMessageToServer: (data: IGroupChat, room: string) => void;
  directMessageToServer: (data: IDirectChat, username: string) => void;
}
