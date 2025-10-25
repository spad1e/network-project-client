"use client";

import type { ChatTextType } from "@/type";
import { useEffect, useState } from "react";
import { socket } from "@/connections/socket";

export default function Chat({ chatId }: { chatId: number }) {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [transport, setTransport] = useState<string | null>(null);
  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }
    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);
      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }
    function onDisconnect() {
      setIsConnected(false);
      setTransport(null);
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
  return (
    <div>
      <p>Status: {isConnected ? "connected" : "disconnected"}</p>
      <p>Transport: {transport}</p>
      <div className="my-2 flex gap-2">
        <input
          id="messageInput"
          type="text"
          placeholder="Type your message"
          className="flex-1 rounded border px-2 py-1"
        />
        <button
          onClick={() => {
            const input = document.getElementById(
              "messageInput",
            ) as HTMLInputElement | null;
            const text = input?.value ?? "";
            if (!text.trim()) return;
            socket.emit("send_message", text, chatId);
            if (input) input.value = "";
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
  // const messages: ChatTextType[] = [
  //   { status: "own", id: 1, text: "Hello!", sender: "Alice" },
  //   { status: "other", id: 2, text: "Hi there!", sender: "Bob" },
  //   { status: "event", id: 3, text: "Alice joined the chat", sender: "System" },
  //   { status: "own", id: 4, text: "How are you?", sender: "Alice" },
  //   { status: "other", id: 5, text: "I'm good, thanks!", sender: "Bob" },
  //   { status: "own", id: 6, text: "Great to hear!", sender: "Alice" },
  //   { status: "event", id: 7, text: "Bob left the chat", sender: "System" },
  //   { status: "other", id: 8, text: "See you later!", sender: "Bob" },
  //   { status: "own", id: 9, text: "Bye!", sender: "Alice" },
  //   { status: "event", id: 10, text: "Alice left the chat", sender: "System" },
  // ];
  // return (
  //   <div className="h-full">
  //     {messages.map((msg) => (
  //       <div
  //         key={msg.id}
  //         className={`m-2 flex ${msg.status === "own" ? "justify-end" : msg.status === "other" ? "justify-start" : "justify-center"}`}
  //       >
  //         <div
  //           className={`${msg.status === "own" ? "flex-row-reverse" : "flex-row"} flex`}
  //         >
  //           {msg.status !== "event" && (
  //             <div className="m-2 aspect-square h-10 w-10 rounded-full bg-amber-600" />
  //           )}
  //           <div
  //             className={`h-auto rounded-lg p-4 ${msg.status === "own" ? "bg-lime-400 text-white" : msg.status === "other" ? "bg-gray-300 text-black" : "bg-transparent text-red-400"}`}
  //           >
  //             {msg.status !== "event" && (
  //               <div className="mb-1 text-sm font-bold">{msg.sender}</div>
  //             )}
  //             <div>{msg.text}</div>
  //           </div>
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // );
}
