"use client";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Gamepad, Bell, User} from "lucide-react";
import { useFloatPanel } from "../context/FloatPanelProvider";
import { CreateGroup } from "./creategroup";
import { useState } from "react";
import { useManage } from "../context/ManageProvider";
export function NavBar() {
  const {showPanel, hidePanel}= useFloatPanel();
  const [drop, setDrop] = useState<boolean>(false);
  const {notification} = useManage();
  const router = useRouter();
  const pathname = usePathname();
  
  if (pathname !== "/login" && pathname !== "/register")
    return (
      <>
        <div className="h-20" />
        <div className="bg-secondary-blue fixed top-0 left-0 flex h-[60px] w-full items-center justify-between px-6 text-2xl font-bold text-white">
          <div className="text-shadow-custom flex items-center gap-3">
            <Gamepad size={50} className="shadow-2xl" />
            <h1>Game Network</h1>
          </div>
          <div className="text-shadow-custom flex items-center gap-3">
            <div className="relative h-full w-fit">
              {drop && (
                <div className="absolute top-6 left-4 flex w-40 flex-col rounded-2xl bg-white/70 shadow-lg">
                  {notification.map((noti) => (
                    <div
                      key={noti.id}
                      className="h-fit w-full border-b-2 border-black px-2 text-lg text-black"
                    >
                      <h1 className="font-light">{noti.username}</h1>
                      <h1 className="font-light">{noti.message}</h1>
                    </div>
                  ))}
                </div>
              )}

              <Bell
                size={30}
                className={`relative mr-5 ml-auto transition-all hover:scale-105 hover:text-white/80 active:text-white/60 ${drop === true ? "scale-120 rounded-full bg-white/40 p-1 text-black" : "scale-100"}`}
                onClick={() => {
                  setDrop(!drop);
                }}
              />
            </div>
            <User
              size={30}
              className= "relative mr-5 ml-auto transition-all hover:scale-105 hover:text-white/80 active:text-white/60"
            />

            <h1
              className="mr-5 ml-auto cursor-pointer rounded-lg bg-white/20 px-4 py-1 text-sm font-medium transition-all hover:scale-105 hover:bg-white/30 active:bg-white/50"
              onClick={() => {
                showPanel(<CreateGroup />);
              }}
            >
              Create Group
            </h1>
            <h1
              className="mr-5 ml-auto cursor-pointer rounded-lg bg-white/20 px-4 py-1 text-sm font-medium transition-all hover:scale-105 hover:bg-white/30 active:bg-white/50"
              onClick={() => {
                router.push("/login");
              }}
            >
              Logout
            </h1>
          </div>
        </div>
      </>
    );

  return;
}
