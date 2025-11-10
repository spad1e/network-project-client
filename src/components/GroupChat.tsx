"use client";

import type { ChatTextType } from "@/types/type";
import { useEffect, useState } from "react";
import { Send, User } from "lucide-react";
import { InputBox } from "@/components/ui/inputbox";
import type { InputValue } from "@/types/input";
import { fetchGroupChatByGroupId, createGroupChat } from "@/lib/chat";
import type { IGroupChat } from "@/types/chat";
import type { IGroup } from "@/types/group";
import { useManage } from "./context/ManageProvider";
import { socket } from "@/connections/socket";
import { useRef } from "react";
import { IconComponent } from "./IconComponenet";

interface ChatProps {
  chat: IGroup;
  handleSubmit: (inputValue: InputValue<"text">) => Promise<void>;
}

export function GroupChat({ chat, handleSubmit }: ChatProps) {
  const [message, setMessage] = useState<IGroupChat[]>([]);
  const { username, userMap } = useManage();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  // const socket = getSocket();
  // if (!socket.connected) {
  //   connectSocket();
  // }

  const handleSubmit2 = async (
    inputValue: InputValue<"text">,
  ): Promise<void> => {
    await handleSubmit(inputValue);
    const created = await createGroupChat(chat.id, inputValue, username);
    socket.emit("groupMessageToServer", created, chat.id);
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
    const handleNewMessage = (new_message: IGroupChat) => {
      if (new_message.groupId === chat.id) {
        setMessage((prev) => [...prev, new_message]);
      }
    };

    socket.on("groupMessageToClient", handleNewMessage);
    return () => {
      socket.off("groupMessageToClient", handleNewMessage);
    };
  }, [chat]);

  useEffect(() => {
    fetchGroupChatByGroupId(chat.id)
      .then((fetch_data) => setMessage(fetch_data))
      .catch((error) => console.error(error));
  }, [chat]);

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50/30">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4" ref={scrollRef}>
        {message.map((msg) => (
          <div
            key={msg.id}
            className={`mb-4 flex ${msg.username === username ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`flex max-w-[70%] items-start gap-3 ${msg.username === username ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* User Avatar */}
              <div className="flex-shrink-0r flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-md">
                {/* <User size={16} className="text-white" /> */}
                <IconComponent icon_id={userMap.get(msg.username)?.user.icon_id || 0} size={16} />
              </div>

              {/* Message Bubble */}
              <div
                className={`rounded-2xl p-4 shadow-sm ${msg.username === username ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white" : "border border-gray-200 bg-white text-gray-800"}`}
              >
                <div className="mb-1 text-sm font-semibold">{msg.username}</div>
                <div className="text-base">
                  {msg.message}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200/50 bg-white/80 p-4 backdrop-blur-sm">
        <InputBox
          type_box={"text"}
          handleSubmit={handleSubmit2}
          Button={SendButton}
        />
      </div>
    </div>
  );
}
