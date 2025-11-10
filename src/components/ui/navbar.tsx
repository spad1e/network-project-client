"use client";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Gamepad, Bell, User, LogOut, Users } from "lucide-react";
import { useFloatPanel } from "../context/FloatPanelProvider";
import { CreateGroup } from "./creategroup";
import { useManage } from "../context/ManageProvider";
import { logout } from "@/lib/auth";

export function NavBar() {
  const { showPanel } = useFloatPanel();
  const { username } = useManage();
  const router = useRouter();

  return (
    <>
      <div className="h-20" />
      <div className="fixed top-0 left-0 z-50 flex h-20 w-full items-center justify-between border-b-2 border-purple-400/30 bg-gradient-to-r from-purple-900/90 to-blue-900/90 px-8 shadow-2xl shadow-purple-500/20 backdrop-blur-md">
        {/* Left Section - Logo */}
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
            <Gamepad size={28} className="text-white" />
          </div>
          <div>
            <h1 className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-2xl font-bold text-transparent">
              Network Adventure
            </h1>
            {username && (
              <p className="text-sm text-white/70">Welcome, {username}</p>
            )}
          </div>
        </div>

        {/* Right Section - Navigation */}
        <div className="flex items-center gap-6">


          {/* Create Group Button */}
          <button
            className="flex items-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 font-semibold text-white transition-all duration-200 hover:scale-105 hover:from-purple-600 hover:to-pink-600 hover:shadow-lg"
            onClick={() => showPanel(<CreateGroup />)}
          >
            <Users size={20} className="mr-2" />
            Create Group
          </button>

          {/* Logout Button */}
          <button
            className="flex items-center rounded-xl border-2 border-white/30 bg-white/10 px-4 py-2 font-semibold text-white transition-all duration-200 hover:scale-105 hover:border-white/50 hover:bg-white/20"
            onClick={async () => {
              await logout();
              router.push("/login");
            }}
          >
            <LogOut size={20} className="mr-2" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
