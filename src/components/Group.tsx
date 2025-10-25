import type { ChatBoxType } from "@/types/type";
type GroupProps = {
  setState: (p: ChatBoxType) => void;
  currChat: number|null;
};

export function Group({
  setState,
  currChat
}: GroupProps) {
  const group = [
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

  return (
    <div className="grid h-fit grid-cols-4 place-items-center">
      {group.map((p) => (
        <button
          key={p.id}
          className={`m-2 aspect-square h-8 rounded-full transition-all md:h-12 lg:h-16 ${
            currChat === p.id
              ? "bg-blue-950 scale-110"
              : "bg-blue-800 hover:scale-105 hover:bg-blue-900"
          }`}
          onClick={() => setState(p)}
        ></button>
      ))}
    </div>
  );
}
