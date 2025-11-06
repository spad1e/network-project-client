"use client"
import { useContext, createContext, useState, useEffect, useRef} from "react"
import type { IGroup } from "@/types/group";
import { fetchGroupByUsername } from "@/lib/group";
import { getUserByToken } from "@/lib/user";
import { usePathname, useRouter } from "next/navigation";
import type { IChat } from "@/types/chat";
import { socket } from "@/connections/socket";

interface ManageContextType {
  groupMap: Map<string, IGroup>;
  group: IGroup[];
  loadGroup: () => Promise<void>;
  getGroup: () => IGroup[];
  username: string;
  memUsername: (username: string) => void;
  readNotification: (c: string) => void;
  notification: IChat[];
  currChat: IGroup | undefined;
  updateCurrChat: (c: IGroup | undefined) => void;
}

const ManageContext = createContext<ManageContextType|undefined>(undefined);



export function ManageProvider({
    children
}: {children: React.ReactNode}){
    const noti = new Map<string, IChat>;
    const groupMapRef = useRef(new Map<string, IGroup>());
    const [group, setGroup] = useState<IGroup[]>([]);
    const [username, setUsername] = useState<string>("");
    const [notification, setNotification] = useState<IChat[]>([]);
    const [currChat, setCurrChat] = useState<IGroup | undefined>(undefined);
    const currChatRef = useRef<IGroup|undefined>(undefined);
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
   const updateCurrChat = (c: IGroup | undefined) => {
     currChatRef.current = c;
     setCurrChat((prev) => {
       return c;
     });
   };
    const memUsername = (username: string) : void =>{
        setUsername(username);
    }
    const readNotification = (c: string): void =>{
      noti.delete(c);
      const filter = notification.filter((item) => item.groupId !== c);
      setNotification(filter);
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
      const handleNotification = (c: IChat): void => {
        noti.set(c.groupId, c);
        if (c.groupId !== currChatRef.current?.id) {
          setNotification((prev) => {
            const filtered = prev.filter((item) => item.groupId !== c.groupId);
            return [...filtered, c];
          });
        }
        
        
      };
    
      socket.on("messageToClient", handleNotification);
      return () => {
        socket.off("messageToClient", handleNotification);
      };
    }, []);
    useEffect(() => {
      console.log("WHYYY");
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