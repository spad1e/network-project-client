import type { ChatBoxType } from "@/types/type";
import type { IGroup } from "@/types/group";
import type { IUser } from "@/types/user";
import { useManage } from "@/components/context/ManageProvider";
import { useEffect, useState } from "react";
type PrivateProps = {
  setState: (p: Partial<IUser>) => void;
};

export function Private({ setState }: PrivateProps) {
  const { onlineUsers, currReceiver } = useManage();
  const [selectedUser, setSelectedUser] = useState<IUser>();

  return (
    <div className="grid h-fit grid-cols-4 place-items-center">
      {onlineUsers.map((p) => (
        <button
          key={p.username}
          className={`m-2 aspect-square h-8 rounded-full transition-all md:h-12 lg:h-16 ${
            selectedUser?.username === p.username
              ? "scale-110 bg-blue-950"
              : "bg-blue-800 hover:scale-105 hover:bg-blue-900"
          }`}
          onClick={() => setState(p)}
        ></button>
      ))}
    </div>
  );
}
