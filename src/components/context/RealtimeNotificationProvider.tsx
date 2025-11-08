"use client";
import type { IDirectChat, IGroupChat, INotification } from "@/types/chat";
import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { connectSocket, getSocket } from "@/connections/socket";

interface RealtimeNotificationContextType {
  notification: INotification[];
  addNotification: (c: INotification) => void;
  readNotification: (id: string) => void;
}
export const RealtimeNotificationContext = createContext<RealtimeNotificationContextType | undefined>(undefined);

export function RealtimeNotificationProvider({ children }: { children: React.ReactNode }) {
    const [notification, setNotification] = useState<INotification[]>([]);
    const socket = getSocket();
    if (!socket.connected) {
        connectSocket();
    }
    const addNotification = (c: INotification) => {
        setNotification((prev) => {
        const exists = prev.find((item) => (item.id === c.id && item.type === c.type));
        if (exists) {
            return prev;
        }
        return [...prev, c];
        });
        setTimeout(() => {
        setNotification((prev) => prev.filter((item) => (item.id !== c.id || item.type !== c.type)));
      }, 5000); // Remove after 5 seconds
    };
    const removeNotification = (id: string) => {
        setNotification((prev) => prev.filter((item) => item.id !== id));
    };

    const readNotification = (c: string): void => {
        removeNotification(c);
    };
    useEffect(() => {
        const handler = (c: IGroupChat) => {
            addNotification({id:c.id, message: c.message, sender: c.username, type: "group", groupId: c.groupId, createdAt: new Date()});
        };
        socket.on("groupMessageToClient", handler);
        return () => {
            socket.off("groupMessageToClient", handler);
        };
    }, []);
    useEffect(() => {
        const handler = (c: IDirectChat) => {
            addNotification({id:c.id, message: c.message, sender: c.sender, type: "direct", createdAt: new Date()});
        };
        socket.on("directMessageToClient", handler);
        return () => {
            socket.off("directMessageToClient", handler);
        };
    }, []);

    return (
        <RealtimeNotificationContext.Provider value={{ notification, addNotification, readNotification }}>
            {children}
        </RealtimeNotificationContext.Provider>
    );
}
export function useRealtimeNotification() {
    const context = useContext(RealtimeNotificationContext);
    if (!context) {
        throw new Error("useRealtimeNotification must be used within a RealtimeNotificationProvider");
    }
    return context;
}