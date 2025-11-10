"use client";
import { useContext, createContext, useState, useEffect, useRef } from "react";
import type { IGroup } from "@/types/group";
import { fetchGroupByUsername } from "@/lib/group";
import { getUserByToken, fetchUsers } from "@/lib/user";
import { usePathname, useRouter } from "next/navigation";
import { socket } from "@/connections/socket";
import type { IUser } from "@/types/user";
import type { ICurrChat } from "@/types/chat";
import { set } from "zod/v4";

interface ManageContextType {
  onlineUsers: { user: IUser; online: boolean }[];
  userMap: Map<string, { user: IUser; online: boolean }>;
  groupMap: Map<string, IGroup>;
  group: IGroup[];
  loadGroup: () => Promise<void>;
  getGroup: () => IGroup[];
  username: string;
  memUsername: (username: string) => void;
}

const ManageContext = createContext<ManageContextType | undefined>(undefined);

export function ManageProvider({ children }: { children: React.ReactNode }) {
  const groupMapRef = useRef(new Map<string, IGroup>());
  const [group, setGroup] = useState<IGroup[]>([]);
  const [username, setUsername] = useState<string>("");
  const usernameRef = useRef<string>("");
  const userRef = useRef<IUser[]>([]);
  const userMapRef = useRef(
    new Map<string, { user: IUser; online: boolean }>(),
  );
  // const socket = getSocket();
  // if(!socket.connected){
  //   connectSocket();
  // }
  const [onlineUsers, setOnlineUsers] = useState<
    { user: IUser; online: boolean }[]
  >([]);
  const loadGroup = async (): Promise<void> => {
    const data = await fetchGroupByUsername();
    groupMapRef.current.clear();
    data.map((item) => {
      socket.emit("joinGroup", item.id);
      groupMapRef.current.set(item.id, item);
    });
    setGroup(Array.from(groupMapRef.current.values()));
  };
  const getGroup = (): IGroup[] => {
    return group;
  };
  const memUsername = (username: string): void => {
    setUsername(username);
    usernameRef.current = username;
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
    const handleOnlineUsers = (users: IUser[]) => {
      Array.from(userMapRef.current.keys()).map((u: string) => {
        const temp = userMapRef.current.get(u);
        if (!temp) return;
        userMapRef.current.set(u, { user: temp.user, online: false });
      });
      users.filter((u) => {
        userMapRef.current.set(u.username, { user: u, online: true });
      });
      const all_user = Array.from(userMapRef.current.values())
        .map((u) => (u.user.username !== usernameRef.current ? u : undefined))
        .filter((u): u is { user: IUser; online: boolean } => u !== undefined)
        .sort((a, b) =>
          a.online === b.online
            ? a.user.username.localeCompare(b.user.username)
            : a.online
              ? -1
              : 1,
        );

      setOnlineUsers(all_user);
    };
    const init = async (): Promise<void> => {
      try {
        await loadGroup();

        const data = await getUserByToken();
        memUsername(data.username);
        const users = await fetchUsers();
        userRef.current = users;
        users.map((u) => {
          userMapRef.current.set(u.username, { user: u, online: false });
        });
      } catch {
        redirectIfNotAllowed();
      }
    };
    init()
      .then(() => {
        if (socket.connected) return;

        socket.on("onlineUsers", handleOnlineUsers);

        socket.connect();
        return () => {
          socket.disconnect();
        };
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <ManageContext.Provider
      value={{
        onlineUsers,
        userMap: userMapRef.current,
        groupMap: groupMapRef.current,
        group,
        loadGroup,
        getGroup,
        username,
        memUsername,
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
