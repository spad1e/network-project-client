"use client"
import { io, Socket } from "socket.io-client";


let socket: Socket | null = null;

export function getSocket(): Socket {
    if (socket) return socket;

    socket = io(
      process.env.NEXT_PUBLIC_API_BASE_URL,
      {
        autoConnect: false,
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 500,
        withCredentials: true,
      },
    );

    socket.on("connect", () => {
        console.log("socket connected", socket?.id);
    });
    socket.on("disconnect", (r) => {
        console.log("socket disconnected", r);
    });
    socket.on("connect_error", (err) => {
        console.error("socket connect error", err.message);
    });

    return socket;
}

export function connectSocket(): void {
    const s = getSocket();
    if (!s.connected) s.connect();
}

export function disconnectSocket(): void {
    if (socket?.connected) socket.disconnect();
}
