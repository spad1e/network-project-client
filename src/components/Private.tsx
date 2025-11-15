import { useManage } from "./context/ManageProvider";
import type { ICurrChat } from "@/types/chat";
import { IconComponent } from "./IconComponenet";
type PrivateProps = {
  setState: (p: ICurrChat) => void;
  currChat: string | null;
  type: "direct" | "group" | "";
};

export function Private({ setState, currChat, type }: PrivateProps) {
  const { onlineUsers } = useManage();

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {onlineUsers.map((p) => {
        const isActive = currChat === p.user.username && type === "direct";


        return (
          <div
            key={p.user.username}
            className="group/tile flex flex-col items-center gap-2"
          >
            <button
              title={p.user.username}
              aria-label={`Open group ${p.user.username}`}
              aria-pressed={isActive}
              className={[
                "relative grid aspect-square place-items-center rounded-full",
                "mt-2 h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14",
                // "bg-gradient-to-br from-indigo-500 to-purple-600 text-white",
                "transition-all duration-200",
                isActive
                  ? "scale-105 shadow-xl ring-2 ring-purple-400"
                  : "hover:scale-105 hover:shadow-lg focus:scale-105",
              ].join(" ")}
              onClick={() =>
                setState({
                  id: p.user.username,
                  type: "direct",
                  name: p.user.username,
                } as ICurrChat)
              }
            >
              {/* <span className="text-base font-bold select-none sm:text-lg lg:text-xl">
                {initial}
              </span> */}

              {/* subtle inner glow */}
              {/* <span className="pointer-events-none absolute inset-0 rounded-full bg-white/10 opacity-0 transition-opacity group-hover/tile:opacity-100" /> */}

              {/* online indicator */}
              {p.online && (
                <span
                  className="pointer-events-none absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 shadow-sm ring-2 ring-white sm:h-3.5 sm:w-3.5"
                  aria-hidden="true"
                />
              )}

              <IconComponent icon_id={p.user.icon_id} size={32} />
            </button>

            <h2
              className={[
                "max-w-[9rem] truncate text-center text-sm",
                isActive ? "font-semibold text-white" : "text-white/80",
              ].join(" ")}
            >
              {p.user.username}
            </h2>
          </div>
        );
      })}
    </div>
  );
}
