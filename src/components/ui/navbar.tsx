"use client";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Gamepad, Bell, User, LogOut, Users } from "lucide-react";
import { useFloatPanel } from "../context/FloatPanelProvider";
import { CreateGroup } from "./creategroup";
import { useState } from "react";
import { useManage } from "../context/ManageProvider";

export function NavBar() {
  const { showPanel, hidePanel } = useFloatPanel();
  const [drop, setDrop] = useState<boolean>(false);
  const { notification, username, updateCurrChat, groupMap} = useManage();
  const router = useRouter();
  const pathname = usePathname();

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
            {/* Notification Bell */}
            <div className="relative">
              <button
                className={`nav-icon-button ${drop ? "bg-purple-500/30 text-white" : "hover:bg-white/10"}`}
                onClick={() => setDrop(!drop)}
              >
                <Bell size={24} />
                {notification.length > 0 && (
                  <span className="notification-badge">
                    {notification.length}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {drop && (
                <div className="notification-dropdown">
                  <div className="notification-header">
                    <h3 className="text-lg font-semibold text-white">
                      Notifications
                    </h3>
                    <span className="notification-count">
                      {notification.length} new
                    </span>
                  </div>

                  <div className="notification-list">
                    {notification.length > 0 ? (
                      notification.map((noti) => (
                        <div
                          key={noti.id}
                          className="notification-item"
                          onClick={() => {
                            updateCurrChat(groupMap.get(noti.groupId));
                            setDrop(false);
                          }}
                        >
                          <div className="notification-avatar">
                            <User size={16} />
                          </div>
                          <div className="notification-content">
                            <div className="flex gap-2 items-end">
                              <p className="notification-username">
                                {groupMap.get(noti.groupId)?.name}
                              </p>
                              <p className="text-white text-sm">{noti.username}</p>
                            </div>

                            <p className="notification-message">
                              {noti.message}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="notification-empty">
                        <Bell size={24} className="text-white/50" />
                        <p className="text-white/50">No notifications</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Create Group Button */}
            <button
              className="nav-button-primary"
              onClick={() => showPanel(<CreateGroup />)}
            >
              <Users size={20} className="mr-2" />
              Create Group
            </button>

            {/* Logout Button */}
            <button
              className="nav-button-secondary"
              onClick={() => router.push("/login")}
            >
              <LogOut size={20} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </>
    );

}
