"use client";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Gamepad } from "lucide-react";
import { useFloatPanel } from "../context/FloatPanelProvider";
import { CreateGroup } from "./creategroup";
export function NavBar() {
  const {showPanel, hidePanel}= useFloatPanel();
  
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
