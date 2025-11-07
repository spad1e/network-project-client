"use client";
import { useContext, createContext, useState, useEffect, useRef } from "react";
import type { IGroup } from "@/types/group";
import { fetchGroupByUsername } from "@/lib/group";
import { getUserByToken } from "@/lib/user";
import { usePathname, useRouter } from "next/navigation";
import type { IGroupChat, IDirectChat } from "@/types/chat";
import type { IUser } from "@/types/user";
import { socket } from "@/connections/socket";

interface ManageContextType {
  groupMap: Map<string, IGroup>;
  group: IGroup[];
  loadGroup: () => Promise<void>;
  getGroup: () => IGroup[];
  username: string;
  memUsername: (username: string) => void;
  readNotification: (c: string) => void;
  notification: (IDirectChat | IGroupChat)[];
  currChat: IGroup | undefined;
  updateCurrChat: (c: IGroup | undefined) => void;
  onlineUsers: Partial<IUser>[];
  currReceiver: Partial<IUser> | undefined;
  updateCurrReceiver: (u: Partial<IUser> | undefined) => void;
}

const ManageContext = createContext<ManageContextType | undefined>(undefined);

export function ManageProvider({ children }: { children: React.ReactNode }) {
  const noti = new Map<string, IGroupChat | IDirectChat>();
  const groupMapRef = useRef(new Map<string, IGroup>());
  const [group, setGroup] = useState<IGroup[]>([]);
  const [username, setUsername] = useState<string>("");
  const [notification, setNotification] = useState<
    (IGroupChat | IDirectChat)[]
  >([]);
  const [currChat, setCurrChat] = useState<IGroup | undefined>(undefined);
  const [currReceiver, setCurrReceiver] = useState<Partial<IUser> | undefined>(
    undefined,
  );
  const currChatRef = useRef<IGroup | undefined>(undefined);
  const currReceiverRef = useRef<Partial<IUser> | undefined>(undefined);
  const loadGroup = async (): Promise<void> => {
    const data = await fetchGroupByUsername();
    groupMapRef.current.clear();
    data.map((item) => {
      groupMapRef.current.set(item.id, item);
    });
    setGroup(Array.from(groupMapRef.current.values()));
  };
  const getGroup = (): IGroup[] => {
    return group;
  };
  const updateCurrChat = (c: IGroup | undefined) => {
    currChatRef.current = c;
    setCurrChat((prev) => {
      return c;
    });
  };
  const updateCurrReceiver = (u: Partial<IUser> | undefined) => {
    currReceiverRef.current = u;
    setCurrReceiver((prev) => {
      return u;
    });
  };
  const memUsername = (username: string): void => {
    setUsername(username);
  };
  const readNotification = (c: string): void => {
    // noti.delete(c);
    // const filter = notification.filter((item) => item.groupId !== c);
    // setNotification(filter);
  };
  const pathname = usePathname();
  const router = useRouter();
  const redirectIfNotAllowed = () => {
    const allowed = ["/login", "/register"];
    if (!allowed.includes(pathname)) {
      router.push("/login");
    }
  };

  useEffect(() => {
    const handleNotification = (c: IGroupChat | IDirectChat): void => {
      // noti.set(c.groupId, c);
      // if (c.groupId !== currChatRef.current?.id) {
      //   setNotification((prev) => {
      //     const filtered = prev.filter((item) => item.groupId !== c.groupId);
      //     return [...filtered, c];
      //   });
      // }
    };

    socket.on("groupMessageToClient", handleNotification);
    socket.on("directMessageToClient", handleNotification);
    return () => {
      socket.off("groupMessageToClient", handleNotification);
      socket.off("directMessageToClient", handleNotification);
    };
  }, []);
  useEffect(() => {
    const init = async (): Promise<void> => {
      try {
        await loadGroup();
        const data = await getUserByToken();
        memUsername(data.username);
      } catch {
        redirectIfNotAllowed();
      }
    };
    init().catch((error) => console.error(error));
  }, []);

  const [onlineUsers, setOnlineUsers] = useState<Partial<IUser>[]>([]);
  useEffect(() => {
    if (socket.connected) return;
    socket.connect();
    socket.on("onlineUsers", (data: Partial<IUser>[]) => {
      setOnlineUsers(data);
      console.log("Online Users:", data);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <ManageContext.Provider
      value={{
        groupMap: groupMapRef.current,
        group,
        loadGroup,
        getGroup,
        username,
        memUsername,
        readNotification,
        notification,
        updateCurrChat,
        currChat,
        onlineUsers,
        currReceiver,
        updateCurrReceiver,
      }}
    >
      {children}
    </ManageContext.Provider>
  );
}

export function useManage() {
  const ctx = useContext(ManageContext);
  if (!ctx) {
    throw new Error("useFloatPanel must be used inside ManageProvider");
  }
  return ctx;
}
