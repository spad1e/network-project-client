import type { ChatBoxType } from "@/types/type";
import type { IGroup } from "@/types/group";
import { useManage } from "./context/ManageProvider";
import { useEffect, useState } from "react";
import type { ICurrChat } from "@/types/chat";
type GroupProps = {
  setState: (p: ICurrChat) => void;
  currChat: string | null;
  type: "direct" | "group" | "";
};

export function Group({
  setState,
  currChat,
  type
}: GroupProps) {
  const {group, loadGroup} = useManage();
  const [currgroup, setCurrgroup] = useState<IGroup[]>([]);

  
  useEffect(() => {
      setCurrgroup(group);
    }, [group]);

  return (
    <div className="grid h-fit grid-cols-4 place-items-center">
      {currgroup.map((p) => (
        <div
          key={p.id}
          className="flex flex-col items-center justify-center gap-2"
        >
          <button
            className={`m-2 aspect-square h-8 rounded-full transition-all md:h-12 lg:h-16 ${
              currChat === p.id && type == "group"
                ? "scale-110 bg-blue-950"
                : "bg-blue-800 hover:scale-105 hover:bg-blue-900"
            }`}
            onClick={() =>
              setState({ id: p.id, type: "group", name: p.name } as ICurrChat)
            }
          ></button>
          <h2 className="text-extrabold">{p.name}</h2>
        </div>
      ))}
    </div>
  );
}
