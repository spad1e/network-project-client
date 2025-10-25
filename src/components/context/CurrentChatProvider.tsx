"use client"
import { createContext, useContext, useState } from "react";
import type { ChatTextType } from "@/types/type";
import { create } from "domain";

interface CurrentChatContextType{
    group_id: number | null;
    chat: ChatTextType[];
    selectChat: (group: number) => Promise<void>;
    getChat: () => ChatTextType[];
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
    const getChat = (): ChatTextType[] => {
        return chat;
    }
    return (
    <CurrentChatContext.Provider value={{group_id, chat, selectChat, getChat}}>
        {children}
    </CurrentChatContext.Provider>
    );
}

export function useCurrentChat(){
    const ctx = useContext(CurrentChatContext);
    if(!ctx){
        throw new Error("useFloatPanel must be used inside FloatPanelProvider");
    }
    return ctx;
}