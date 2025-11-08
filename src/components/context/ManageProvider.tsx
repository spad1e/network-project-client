"use client"
import { useContext, createContext, useState, useEffect, useRef} from "react"
import type { IGroup } from "@/types/group";
import { fetchGroupByUsername } from "@/lib/group";
import { getUserByToken } from "@/lib/user";
import { usePathname, useRouter } from "next/navigation";
import { connectSocket, getSocket } from "@/connections/socket";
import type { IUser } from "@/types/user";
import type { ICurrChat } from "@/types/chat";

interface ManageContextType {
  onlineUsers: IUser[];
  groupMap: Map<string, IGroup>;
  group: IGroup[];
  loadGroup: () => Promise<void>;
  getGroup: () => IGroup[];
  username: string;
  memUsername: (username: string) => void;
}

const ManageContext = createContext<ManageContextType|undefined>(undefined);



export function ManageProvider({
    children
}: {children: React.ReactNode}){
    const groupMapRef = useRef(new Map<string, IGroup>());
    const [group, setGroup] = useState<IGroup[]>([]);
    const [username, setUsername] = useState<string>("");
    const usernameRef = useRef<string>("");
    const currChatRef = useRef<ICurrChat | undefined>(undefined);
    const socket = getSocket();
    if(!socket.connected){
      connectSocket();
    }
    const [onlineUsers, setOnlineUsers] = useState<IUser[]>([]);
    const loadGroup = async() : Promise<void> =>{
        const data = await fetchGroupByUsername();
        groupMapRef.current.clear();
        data.map(item => {
          socket.emit("join_group", item.id);
          groupMapRef.current.set(item.id, item);
        })
        setGroup(Array.from(groupMapRef.current.values()));

    }
    const getGroup = () : IGroup[] => {
        return group;
    }
    const memUsername = (username: string) : void =>{
        setUsername(username);
        usernameRef.current = username;
    }

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
        const filtered = users.filter((u) => u.username !== usernameRef.current);
        console.log(users);

        setOnlineUsers(users);
      }
      console.log("Setting up online users listener");
      console.log(socket.id);
      socket.on("onlineUsers", handleOnlineUsers);
      return () => {
        socket.off("onlineUsers", handleOnlineUsers);
      };
    }, []);
    

    useEffect(() => {
      const init = async() : Promise<void> => {
        try{
            await loadGroup();
            const data = await getUserByToken();
            memUsername(data.username);
        } catch {
            redirectIfNotAllowed();
        }

      }
      init()
        .catch(
          (error) => console.error(error)
        )

    }, []); 

    return (
      <ManageContext.Provider
        value={{
          onlineUsers,
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

export function useManage(){
    const ctx = useContext(ManageContext);
    if (!ctx) {
        throw new Error("useFloatPanel must be used inside ManageProvider");
    }
    return ctx;
}