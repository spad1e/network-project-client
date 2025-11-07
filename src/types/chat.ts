export interface IDirectChat {
  id: string;
  sender: string;
  receiver: string;
  message: string;
  createdAt: string;
}
export interface IGroupChat {
  id: string;
  username: string;
  message: string;
  groupId: string;
  createdAt: string;
}
