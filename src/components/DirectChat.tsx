"use client";

import type { ChatTextType } from "@/types/type";
import { useEffect, useState } from "react";
import { Send, User } from "lucide-react";
import { InputBox } from "@/components/ui/inputbox";
import type { InputValue } from "@/types/input";
import { fetchDirectChatByUsers, createDirectChat } from "@/lib/directchat";
import type { IDirectChat } from "@/types/chat";
import type { IUser } from "@/types/user";
import { useManage } from "./context/ManageProvider";
import { socket } from "@/connections/socket";
import { useRef } from "react";

interface ChatProps {
  receiver: Partial<IUser>;
  handleSubmit: (inputValue: InputValue<"text">) => Promise<void>;
}

export function DirectChat({ receiver, handleSubmit }: ChatProps) {
  const [message, setMessage] = useState<IDirectChat[]>([]);
  const { username, readNotification } = useManage();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit2 = async (
    inputValue: InputValue<"text">,
  ): Promise<void> => {
    await handleSubmit(inputValue);
    if (!receiver.username) return;
    const created = await createDirectChat(receiver.username, inputValue);
    socket.emit("directMessageToServer", created, receiver.username);
    setMessage([...message, created]);
  };

  const SendButton = ({
    onClick,
    inputValue,
  }: {
    onClick?: () => void;
    inputValue?: string;
  }) => (
    <button onClick={onClick}>
      <Send
        size={40}
        className={`rounded-lg p-2 text-white ${inputValue == "" ? "bg-blue-200" : "cursor-pointer bg-blue-800 transition-all hover:bg-blue-900 active:bg-blue-950"}`}
      />
    </button>
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [message]);

  useEffect(() => {
    const handleNewMessage = (new_message: IDirectChat) => {
      console.log(new_message);
      if (new_message.sender === receiver!.username) {
        console.log("called set message");
        setMessage((prev) => [...prev, new_message]);
      }
    };
    if (!receiver.username) return;
    readNotification(receiver.username);

    socket.on("directMessageToClient", handleNewMessage);
    return () => {
      socket.off("directMessageToClient", handleNewMessage);
    };
  }, [receiver]);

  useEffect(() => {
    if (!receiver.username) return;
    fetchDirectChatByUsers(receiver!.username)
      .then((fetch_data) => setMessage(fetch_data))
      .catch((error) => console.error(error));
  }, [receiver]);

  return (
    <div className="chat-container">
      {/* Messages Area */}
      <div className="chat-messages-area" ref={scrollRef}>
        {message.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message-wrapper ${msg.sender === username ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`chat-message-content ${msg.sender === username ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* User Avatar */}
              <div className="chat-user-avatar">
                <User size={16} className="text-white" />
              </div>

              {/* Message Bubble */}
              <div
                className={`chat-message-bubble ${msg.sender === username ? "own-message" : "other-message"}`}
              >
                <div className="chat-username">{msg.sender}</div>
                <div className="chat-text">{msg.message}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="chat-input-area">
        <InputBox
          type_box={"text"}
          handleSubmit={handleSubmit2}
          Button={SendButton}
        />
      </div>
    </div>
  );
}
