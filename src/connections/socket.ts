"use client";

import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:3030");

socket.on("receive_message", (data: string) => {
  console.log("Received receive_message with data:", data);
});

export { socket };
