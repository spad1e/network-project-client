import type { ChatBoxType } from "@/types/type";
import type { IGroup } from "@/types/group";
import { useManage } from "./context/ManageProvider";
import { useEffect, useState } from "react";
type GroupProps = {
  setState: (p: IGroup) => void;
  currChat: string|null;
};

export function Group({
  setState,
  currChat
}: GroupProps) {
  const {group, loadGroup} = useManage();
  const [currgroup, setCurrgroup] = useState<IGroup[]>([]);
  const mock_group = [
    { id: 1, name: "Warrior" },
    { id: 2, name: "Mage" },
    { id: 3, name: "Archer" },
    { id: 4, name: "Warrior" },
    { id: 5, name: "Mage" },
    { id: 6, name: "Archer" },
    { id: 7, name: "Warrior" },
    { id: 8, name: "Mage" },
    { id: 9, name: "Archer" },
    { id: 10, name: "Warrior" },
    { id: 11, name: "Mage" },
    { id: 12, name: "Archer" },
  ];
  
  useEffect(() => {
      setCurrgroup(group);
    }, [group]);

  return (
    <div className="grid h-fit grid-cols-4 place-items-center">
      {currgroup.map((p) => (
        <button
          key={p.id}
          className={`m-2 aspect-square h-8 rounded-full transition-all md:h-12 lg:h-16 ${
            currChat === p.id
              ? "scale-110 bg-blue-950"
              : "bg-blue-800 hover:scale-105 hover:bg-blue-900"
          }`}
          onClick={() => setState(p)}
        ></button>
      ))}
    </div>
  );
}
