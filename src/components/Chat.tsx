"use client";

import type { ChatTextType } from "@/types/type";
import { useEffect, useState } from "react";
import { Send, User } from "lucide-react";
import { InputBox } from "@/components/ui/inputbox";
import type { InputValue } from "@/types/input";
import { fetchChatByGroupId, createChat } from "@/lib/chat";
import type { IChat } from "@/types/chat";
import type { IGroup } from "@/types/group";
import { useManage } from "./context/ManageProvider";
import { socket } from "@/connections/socket";
import { useRef } from "react";

interface ChatProps {
  chat: IGroup;
  handleSubmit: (inputValue: InputValue<"text">) => Promise<void>;
}

export function Chat({ chat, handleSubmit }: ChatProps) {
  const [message, setMessage] = useState<IChat[]>([]);
  const { username, readNotification } = useManage();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit2 = async (
    inputValue: InputValue<"text">,
  ): Promise<void> => {
    await handleSubmit(inputValue);
    const created = await createChat(chat.id, inputValue, username);
    socket.emit("messageToServer", created, chat.id);
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
    const handleNewMessage = (new_message: IChat) => {
      if (new_message.groupId === chat.id) {
        setMessage((prev) => [...prev, new_message]);
      }
    };
    readNotification(chat.id);

    socket.on("messageToClient", handleNewMessage);
    return () => {
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
    <div className="chat-container">
      {/* Messages Area */}
      <div className="chat-messages-area" ref={scrollRef}>
        {message.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message-wrapper ${msg.username === username ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`chat-message-content ${msg.username === username ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* User Avatar */}
              <div className="chat-user-avatar">
                <User size={16} className="text-white" />
              </div>

              {/* Message Bubble */}
              <div
                className={`chat-message-bubble ${msg.username === username ? "own-message" : "other-message"}`}
              >
                <div className="chat-username">{msg.username}</div>
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
