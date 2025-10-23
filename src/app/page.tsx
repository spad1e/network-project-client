"use client";
import LoginPanel from "@/components/LoginPanel";
import BoxPanel from "@/components/BoxPanel";
import Player from "@/components/Player";
import Group from "@/components/Group";
import Chat from "@/components/Chat";
import { useState } from "react";
import type { ChatBoxType } from "@/type";
import IdleChat from "@/components/IdleChat";
// import { cookies } from "next/headers"; // server-side cookies
import { redirect } from "next/navigation";
import { socket } from "@/connections/socket";

export default function HomePage() {
  const [chat, setChat] = useState<ChatBoxType | null>(null);
  const handleSetChat = (p: ChatBoxType) => {
    setChat(p);
  };
  // const token = cookies().get("token")?.value;
  // const test = "A"
  // if (test !== "A") {
  //   redirect("/login"); // force redirect if no token
  // }
  return (
    <div className="bg-creamy-white relative min-h-screen w-full">
      {/* Header */}
      <div className="bg-secondary-blue fixed top-0 left-0 flex h-[70px] w-full items-center justify-between px-6 text-2xl font-bold text-white">
        <h1 className="text-shadow-red-custom">Game Network</h1>
        <h1
          className="cursor-pointer hover:text-yellow-300"
          onClick={() => redirect("/login")}
        >
          Logout
        </h1>
      </div>

      {/* Grid panels */}
      <div className="order-1 grid h-full w-full grid-cols-1 grid-rows-3 gap-6 p-6 p-[90px] sm:max-h-[calc(100vh)] sm:grid-cols-2 sm:grid-rows-2">
        <div className="row-span-1 h-full">
          <BoxPanel
            boxName="Online Friend"
            bgColor="sea-blue"
            page={<Player setState={handleSetChat} />}
          />
        </div>
        <div className="order-3 row-span-1 h-full sm:order-2 sm:row-span-2">
          <BoxPanel
            boxName={chat ? `Chat - ${chat.name}` : "Chat"}
            bgColor="grass-green"
            page={chat ? <Chat chatId={chat.id} /> : <IdleChat />}
            actionName="Left Chat"
            onAction={() => {
              console.log("Test");
            }}
            activateActionIs={true}
          />
        </div>
        <div className="order-2 row-span-1 h-full sm:order-3">
          <BoxPanel
            boxName="Group"
            bgColor="sky-blue"
            page={<Group setState={handleSetChat} />}
            actionName="Join Group"
            onAction={() => {
              console.log("Test");
              socket.emit("join_group", chat!.id);
            }}
            activateActionIs={true}
          />
        </div>
      </div>
    </div>
  );
}
