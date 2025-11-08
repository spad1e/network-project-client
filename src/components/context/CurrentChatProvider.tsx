"use client"
import { createContext, useContext, useState, useRef } from "react";
import type { ChatTextType } from "@/types/type";
import type { IGroup } from "@/types/group";
import type { ICurrChat } from "@/types/chat";

interface CurrentChatContextType {
  currChat: ICurrChat | undefined;
  updateCurrChat: (c: ICurrChat | undefined) => void;
}

const CurrentChatContext = createContext<CurrentChatContextType|undefined>(undefined);

export function CurrentChatProvider({
    children
}: {children: React.ReactNode}){
    const [group_id, setGroup_id] = useState<number|null>(null);
    const [chat, setChat] = useState<ChatTextType[]>([]);
    const selectChat = async(group: number): Promise<void> => {
        setGroup_id(group);

    }
    const [currChat, setCurrChat] = useState<ICurrChat | undefined>(undefined);
    const currChatRef = useRef<ICurrChat | undefined>(undefined);
    const updateCurrChat = (c: ICurrChat | undefined) => {
      currChatRef.current = c;
      setCurrChat((prev) => {
        return c;
      });
    };
    return (
    <CurrentChatContext.Provider value={{currChat, updateCurrChat}}>
        {children}
    </CurrentChatContext.Provider>
    );
}

export function useCurrentChat(){
    const ctx = useContext(CurrentChatContext);
    if(!ctx){
        throw new Error("useuseCurrentChat must be used inside CurrentChatProvider");
    }
    return ctx;
}