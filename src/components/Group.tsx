import type { IGroup } from "@/types/group";
import { useManage } from "./context/ManageProvider";
import { useEffect, useState } from "react";
import type { ICurrChat } from "@/types/chat";

type GroupProps = {
  setState: (p: ICurrChat) => void;
  currChat: string | null;
  type: "direct" | "group" | "";
};

export function Group({ setState, currChat, type }: GroupProps) {
  const { group } = useManage();
  const [currgroup, setCurrgroup] = useState<IGroup[]>([]);

  useEffect(() => {
    setCurrgroup(group);
  }, [group]);

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {currgroup.map((p) => {
        const isActive = currChat === p.id && type === "group";
        const initial =
          (p.name?.trim?.().charAt(0).toUpperCase() as string) || "G";

        return (
          <div
            key={p.id}
            className="group/tile flex flex-col items-center gap-2"
          >
            <button
              title={p.name}
              aria-label={`Open group ${p.name}`}
              aria-pressed={isActive}
              className={[
                "relative grid aspect-square place-items-center rounded-full",
                "h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 mt-2",
                "bg-gradient-to-br from-indigo-500 to-purple-600 text-white",
                "transition-all duration-200",
                isActive
                  ? "scale-105 shadow-xl ring-2 ring-purple-400"
                  : "hover:scale-105 hover:shadow-lg focus:scale-105",
              ].join(" ")}
              onClick={() =>
                setState({ id: p.id, type: "group", name: p.name } as ICurrChat)
              }
            >
              <span className="text-base font-bold select-none sm:text-lg lg:text-xl">
                {initial}
              </span>

              {/* subtle inner glow */}
              <span className="pointer-events-none absolute inset-0 rounded-full bg-white/10 opacity-0 transition-opacity group-hover/tile:opacity-100" />
            </button>

            <h2
              className={[
                "max-w-[9rem] truncate text-center text-sm",
                isActive ? "font-semibold text-white" : "text-white/80",
              ].join(" ")}
            >
              {p.name}
            </h2>
          </div>
        );
      })}
    </div>
  );
}
