"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { User } from "lucide-react";
export function LoginPanel() {
  const router = useRouter();
  const [select, setSelect] = useState<number|null>(null);
  const characters = [
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
    { id: 13, name: "Mage" },
    { id: 14, name: "Archer" },
    { id: 15, name: "Mage" },
    { id: 16, name: "Archer" },
    { id: 17, name: "Mage" },
    { id: 18, name: "Archer" },
    { id: 19, name: "Mage" },
    { id: 20, name: "Archer" },
  ];

  return (
    <div className="bg-secondary-blue border-purple-sky box-border h-[646px] grid-cols-1 grid-rows-7 p-10 mx-auto flex w-11/12 max-w-3xl flex-col items-center justify-center rounded-[40px] border-4 gap-4">
      <h2 className="text-shadow-red-custom row-span-1 text-center text-6xl font-bold text-white">
        Create Character
      </h2>

      <div className="row-span-2 mx-auto w-full">
        <h2 className="text-[24px] font-semibold text-white">Username</h2>
        <div className="relative">
          <User
            className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
            size={30}
          />
          <input
            type="text"
            className="h-12 w-full rounded-3xl border-3 bg-white p-3 px-12 text-[20px] text-gray-400 focus:outline-none"
            placeholder="Enter your username"
          />
        </div>
      </div>

      {/* Character list using grid */}
      <div className="row-span-2 w-full">
        <h2 className="text-[24px] font-semibold text-white">
          Choose Your Character
        </h2>
        <div className="grid-flow-col scrollbar-custom grid w-full grid-rows-2 gap-4 overflow-auto">
          {characters.map((char) => (
            <div
              key={char.id}
              className={`row-span-1 mb-4 h-24 w-24 flex-shrink-0 rounded-3xl transition-all flex flex-col items-center justify-center
                ${select===char.id ? "bg-white/40 ":"bg-white/20 hover:bg-white/30"}`}
              onClick={() =>{
                setSelect(char.id);
              }}
            >

              <div className="w-3/4 aspect-square bg-white/80 rounded-full">

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create button */}
      <button
        className="bg-purple-sky/60 hover:bg-purple-sky/80 active:bg-purple-sky row-span-2 mx-auto mt-4 h-[72px] w-[281px] rounded-[28px] text-[32px] font-bold text-black shadow-lg shadow-slate-800 transition-all"
        onClick={() => router.push("/")}
      >
        Create
      </button>
    </div>
  );
}
