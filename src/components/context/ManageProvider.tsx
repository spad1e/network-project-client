"use client"
import { useContext, createContext, useState, useEffect } from "react"
import type { IGroup } from "@/types/group";
import { fetchGroupByUsername } from "@/lib/group";
import { getUserByToken } from "@/lib/user";
import { usePathname, useRouter } from "next/navigation";
import type { IChat } from "@/types/chat";
import { socket } from "@/connections/socket";

interface ManageContextType {
  group: IGroup[];
  loadGroup: () => Promise<void>;
  getGroup: () => IGroup[];
  username: string;
  memUsername: (username: string) => void;
  readNotification: (c: string) => void;
  notification: IChat[];
}

const ManageContext = createContext<ManageContextType|undefined>(undefined);



export function ManageProvider({
    children
}: {children: React.ReactNode}){
    const noti = new Map<string, IChat>;
    const [group, setGroup] = useState<IGroup[]>([]);
    const [username, setUsername] = useState<string>("");
    const [notification, setNotification] = useState<IChat[]>([]);
    const loadGroup = async() : Promise<void> =>{
        const data = await fetchGroupByUsername();
        setGroup(data);
    }
    const getGroup = () : IGroup[] => {
        return group;
    }
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
        const filter = notification.filter(
          (item) => item.groupId !== c.groupId,
        );
        filter.push(c)
        console.log(c);
        setNotification( filter);
        
      };
    
      socket.on("messageToClient", handleNotification);
      return () => {
        socket.off("messageToClient", handleNotification);
      };
    }, []);
    useEffect(() => {
      const init = async() => {
        try{
            loadGroup();
            const data = await getUserByToken();
            console.log(data)
            memUsername(data.username);
        } catch {
            redirectIfNotAllowed();
        }

      }
      init();

    }, [pathname]); 
    return (
      <ManageContext.Provider
        value={{
          group,
          loadGroup,
          getGroup,
          username,
          memUsername,
          readNotification,
          notification
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