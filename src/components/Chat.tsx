"use client";

import type { ChatTextType } from "@/types/type";
import { useEffect, useState } from "react";
// import { socket } from "@/connections/socket";
import type { S } from "node_modules/tailwindcss/dist/types-WlZgYgM8.mjs";
import { InputBox } from "@/components/ui/inputbox";
import type { InputType } from "@/types/input";
import type { InputValue } from "@/types/input";
import { fetchChatByGroupId, createChat } from "@/lib/chat";
import type { IChat } from "@/types/chat";
import type { IGroup } from "@/types/group";
import { useManage } from "./context/ManageProvider";
import { socket } from "@/connections/socket";
interface ChatProps {
  chat: IGroup;
  handleSubmit: (inputValue: InputValue<"text">) => Promise<void>;
}

export function Chat({ chat, handleSubmit }: ChatProps) {
  const [message, setMessage] = useState<IChat[]>([]);
  const {username} = useManage();
  const handleSubmit2 = async (
    inputValue: InputValue<"text">,
  ): Promise<void> => {
    await handleSubmit(inputValue);
    console.log("Send")
    const created = await createChat(chat.id, inputValue, username);
    socket.emit("messageToServer", created, chat.id)
    setMessage([...message, created])
  };

  const handleNewMessage = (new_message: IChat) => {
    console.log("IDK");
      console.log("New message received:", new_message);
      setMessage([...message, new_message]);
    };
  useEffect(() => {
    const handleNewMessage = (new_message: IChat) => {
      if (new_message.groupId === chat.id) {
        setMessage((prev) => [...prev, new_message]);
      }
    };

    socket.on("messageToClient", handleNewMessage);
    console.log("Emmm")
    return () => {
      console.log("No")
      socket.off("messageToClient", handleNewMessage);
    };
  }, [chat]);

  useEffect(() => {
    const fetch_chat = async () => {
      const fetch_data = await fetchChatByGroupId(chat.id);
      setMessage(fetch_data);
    };
    fetch_chat();
  }, [chat]);
  return (
    <div className="relative h-full">
      <div className="absolute bottom-20 w-full">
        <InputBox type_box={"text"} handleSubmit={handleSubmit2} />
      </div>

      <div className="h-full overflow-auto">
        {message.map((msg) => (
          <div
            key={msg.id}
            className={`m-2 flex ${msg.username === username ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`${msg.username === username ? "flex-row-reverse" : "flex-row"} flex`}
            >
              <div className="m-2 aspect-square h-10 w-10 rounded-full bg-amber-600" />
              <div
                className={`h-auto rounded-lg p-4 ${msg.username === username ? "bg-lime-400 text-white" : "bg-gray-300 text-black"}`}
              >
                <div className="mb-1 text-sm font-bold">{msg.username}</div>
                <div>{msg.message}</div>
              </div>
            </div>
          </div>
        ))}
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
