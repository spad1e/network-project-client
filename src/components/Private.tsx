import type { ChatBoxType } from "@/types/type";
import type { IGroup } from "@/types/group";
import { useManage } from "./context/ManageProvider";
import { useEffect, useState } from "react";
import type { ICurrChat } from "@/types/chat";
type PrivateProps = {
  setState: (p: ICurrChat) => void;
  currChat: string | null;
  type: "direct" | "group" | "";
};

export function Private({
  setState,
  currChat,
  type
}: PrivateProps) {
  const {group, loadGroup, onlineUsers} = useManage();
 
  return (
    <div className="grid h-fit grid-cols-4 place-items-center">
      {onlineUsers.map((p) => (
        <div 
        key = {p.username} 
        className="flex flex-col items-center justify-center gap-2">
          <button
            className={`m-2 aspect-square h-8 rounded-full transition-all md:h-12 lg:h-16 ${
              currChat === p.username && type == "group"
                ? "scale-110 bg-blue-950"
                : "bg-blue-800 hover:scale-105 hover:bg-blue-900"
            }`}
            onClick={() =>
              setState({ id: p.username, type: "direct", name: p.username } as ICurrChat)
            }
          ></button>
          <h2 className="text-extrabold">{p.username}</h2>
        </div>
      ))}
    </div>
  );
}
