"use client"
import { useContext, createContext, useState, useEffect } from "react"
import type { IGroup } from "@/types/group";
import { fetchGroupByUsername } from "@/lib/group";
import { getUserByToken } from "@/lib/user";
import { usePathname, useRouter } from "next/navigation";

interface ManageContextType{
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
    const [group, setGroup] = useState<IGroup[]>([]);
    const [username, setUsername] = useState<string>("");
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
    const pathname = usePathname();
    const router = useRouter();
    const redirectIfNotAllowed = () => {
      const allowed = ["/login", "/register"];
      if (!allowed.includes(pathname)) {
        router.push("/login");
      }
    };
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

    }, []); 
    return (
      <ManageContext.Provider
        value={{ group, loadGroup, getGroup, username, memUsername }}
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