export interface IGroupChat {
  id: string;
  username: string;
  message: string;
  groupId: string;
  createdAt: Date;
}
export interface IDirectChat {
  id: string;
  sender: string;
  receiver: string;
  message: string;
  createdAt: Date;
}
export interface INotification {
  id: string;
  message: string;
  sender: string;
  type: "group" | "direct";
  groupId?: string;
  createdAt: Date;
}
export interface ICurrChat {
  id: string;
  name: string;
  type: "group" | "direct";
}