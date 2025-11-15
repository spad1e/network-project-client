import { useManage } from "../context/ManageProvider";
import { joinGroup } from "@/lib/user";
import { useFloatPanel } from "../context/FloatPanelProvider";
import { socket } from "@/connections/socket";
export function JoinGroup() {
  const { loadGroup, groupMap} = useManage();
  const currgroup = Array.from(groupMap.values())
    .filter((v) => v && v.join === false)
   .map((v) => v.group);
  const { hidePanel } = useFloatPanel();

  const handleSubmit = async(
    inputValue: string,
  ): Promise<void> => {
    try{
      console.log("JOIN GROUP ID:", inputValue);
      const group = await joinGroup(inputValue);
      socket.emit("joinGroup", group.id);
      await loadGroup();
      hidePanel();
      return Promise.resolve();
    }catch (error) {
      console.error("Error joining group:", error);
    }
    
  };
  return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {currgroup.map((p) => {
            const initial =
              (p.name?.trim?.().charAt(0).toUpperCase()) || "G";
    
            return (
              <div
                key={p.id}
                className="group/tile flex flex-col items-center gap-2"
                onClick={async () => {
                  try{
                    await handleSubmit(p.id);
                  }catch (error) {
                    console.error("Error joining group:", error);
                  }
                }}
              >
                <button
                  title={p.name}
                  aria-label={`Open group ${p.name}`}
                  className={[
                    "relative grid aspect-square place-items-center rounded-full",
                    "mt-2 h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14",
                    "bg-gradient-to-br from-indigo-500 to-purple-600 text-white",
                    "transition-all duration-200",
                  ].join(" ")}
                >
                  <span className="text-base font-bold select-none sm:text-lg lg:text-xl">
                    {initial}
                  </span>

                  {/* subtle inner glow */}
                  <span className="pointer-events-none absolute inset-0 rounded-full bg-white/10 opacity-0 transition-opacity group-hover/tile:opacity-100" />
                </button>

                <h2
                  className={["max-w-[9rem] truncate text-center text-sm"].join(
                    " ",
                  )}
                >
                  {p.name}
                </h2>
              </div>
            );
          })}
        </div>

  );
}
