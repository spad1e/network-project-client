"use client";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Gamepad, Bell, User, LogOut, Users } from "lucide-react";
import { useFloatPanel } from "../context/FloatPanelProvider";
import { CreateGroup } from "./creategroup";
import { useState } from "react";
import { useManage } from "../context/ManageProvider";
import { useRealtimeNotification } from "../context/RealtimeNotificationProvider";
import { logout } from "@/lib/auth";

export function NavBar() {
  const { showPanel } = useFloatPanel();
  const [drop, setDrop] = useState<boolean>(false);
  const { username} = useManage();
  const router = useRouter();
  const pathname = usePathname();

  const logoutCallback = () => {
    router.push("/login");
    logout();
  };

          {/* Right Section - Navigation */}
          <div className="flex items-center gap-6">
            {/* Notification Bell */}
            {/* <div className="relative">
              <button
                className={`relative flex h-10 w-10 items-center justify-center rounded-xl text-white/80 transition-all duration-200 hover:text-white hover:scale-105 ${drop ? "bg-purple-500/30 text-white" : "hover:bg-white/10"}`}
                onClick={() => setDrop(!drop)}
              >
                <Bell size={24} />
                {notification.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {notification.length}
                  </span>
                )}
              </button>

              {drop && (
                <div className="absolute top-12 right-0 w-80 rounded-2xl border-2 border-purple-400/30 bg-gradient-to-br from-purple-900/95 to-blue-900/95 backdrop-blur-lg shadow-2xl shadow-purple-500/30">
                  <div className="flex items-center justify-between border-b-2 border-purple-400/20 p-4">
                    <h3 className="text-lg font-semibold text-white">
                      Notifications
                    </h3>
                    <span className="rounded-full bg-purple-500/30 px-2 py-1 text-sm text-purple-300">
                      {notification.length} new
                    </span>
                  </div>

                  <div className="max-h-64 overflow-y-auto">
                    {notification.length > 0 ? (
                      notification.map((noti) => (
                        <div
                          key={noti.id}
                          className="flex items-start gap-3 border-b-2 border-purple-400/10 p-3 transition-all hover:bg-white/5"
                          onClick={() => {
                            updateCurrChat(groupMap.get(noti.groupId));
                            readNotification(noti.id);
                            setDrop(false);
                          }}
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/30">
                            <User size={16} />
                          </div>
                          <div className="flex-1">
                            <div className="flex gap-2 items-end">
                              <p className="font-semibold text-white">
                                {groupMap.get(noti.groupId)?.name}
                              </p>
                              <p className="text-white text-sm">{noti.username}</p>
                            </div>

                            <p className="text-sm text-white/7">
                              {noti.message}
                            </p>
                          </div>

                          <p className="notification-message">{noti.message}</p>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2 p-6 text-center">
                        <Bell size={24} className="text-white/50" />
                        <p className="text-white/50">No notifications</p>
                      </div>
                    ))
                  ) : (
                    <div className="notification-empty">
                      <Bell size={24} className="text-white/50" />
                      <p className="text-white/50">No notifications</p>
                    </div>
                  )}
                </div>
              )}
            </div> */}

            {/* Create Group Button */}
            <button
              className="flex items-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 font-semibold text-white transition-all duration-200 hover:from-purple-600 hover:to-pink-600 hover:scale-105 hover:shadow-lg"
              onClick={() => showPanel(<CreateGroup />)}
            >
              <Users size={20} className="mr-2" />
              Create Group
            </button>

            {/* Logout Button */}
            <button
              className="flex items-center rounded-xl border-2 border-white/30 bg-white/10 px-4 py-2 font-semibold text-white transition-all duration-200 hover:border-white/50 hover:bg-white/20 hover:scale-105"
              onClick={async() => {
                await logout();
                router.push("/login")}}
            >
              <LogOut size={20} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
