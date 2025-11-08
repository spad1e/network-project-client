"use client";
import { BoxPanel } from "@/components/BoxPanel";
import { Group } from "@/components/Group";
import { GroupChat } from "@/components/GroupChat";
import { Private } from "@/components/Private";
import { useState } from "react";
import { IdleChat } from "@/components/IdleChat";
import { useFloatPanel } from "@/components/context/FloatPanelProvider";
import type { InputValue } from "@/types/input";
import { JoinGroup } from "@/components/ui/joingroup";
import type { IGroup } from "@/types/group";
import { useManage } from "@/components/context/ManageProvider";
import { useCurrentChat } from "@/components/context/CurrentChatProvider";
import { DirecChat } from "@/components/DirectChat";
import type { ICurrChat } from "@/types/chat";
import { useRealtimeNotification } from "@/components/context/RealtimeNotificationProvider";

export default function HomePage() {
  const { showPanel } = useFloatPanel();
  const {updateCurrChat, currChat} = useCurrentChat();
  const {readNotification, map_notification} = useRealtimeNotification();

  const handleSubmit = (inputValue: InputValue<"text">): Promise<void> => {
    return Promise.resolve();
  };
  const handleUpdateCurrChat = (c: ICurrChat | undefined): Promise<void> => {
    updateCurrChat(c);
    if(c && map_notification.get(JSON.stringify({id: c.id, type: c.type}))){
        readNotification(
          map_notification.get(JSON.stringify({ id: c.id, type: c.type }))!.id,
        );
      // }
      
    }
    return Promise.resolve();
    
  }
  const component = <h1>Hello</h1>;
  return (
    <div className="relative h-screen w-full">
      {/* Grid panels */}
      <div className="order-1 grid h-full w-full grid-cols-1 grid-rows-3 gap-6 p-6 sm:max-h-[calc(100vh)] sm:grid-cols-2 sm:grid-rows-2">
        <div className="row-span-1 h-full">
          <BoxPanel
            boxName="Online Friend"
            bgColor="sea-blue"
            page={
              <Private
                setState={handleUpdateCurrChat}
                currChat={currChat?.id ?? null}
                type={currChat?.type || ""}
              />
            }
            actionName="Left Chat"
            onAction={() => {
            }}
            activateActionIs={false}
          />
        </div>
        <div className="order-3 row-span-1 h-full sm:order-2 sm:row-span-2">
          <BoxPanel
            boxName={currChat ? `${currChat.name}` : "Let's Chat"}
            bgColor="grass-green"
            page={
              currChat && currChat.type == "group" ? (
                <GroupChat
                  chat={{ id: currChat.id, name: currChat.name } as IGroup}
                  handleSubmit={handleSubmit}
                />
              ) : currChat && currChat.type == "direct" ? (
                <DirecChat
                  chat={{ id: currChat.name, name: currChat.name } as IGroup}
                  handleSubmit={handleSubmit}
                />
              ) : (
                <IdleChat />
              )
            }
            actionName="Left Chat"
            onAction={() => {
              handleUpdateCurrChat(undefined);
            }}
            activateActionIs={true}
          />
        </div>
        <div className="order-2 row-span-1 h-full sm:order-3">
          <BoxPanel
            boxName="Group"
            bgColor="sky-blue"
            page={
              <Group
                setState={handleUpdateCurrChat}
                currChat={currChat?.id ?? null}
                type={currChat?.type || ""}
              />
            }
            actionName="Join Group"
            onAction={() => {
              showPanel(<JoinGroup />);
              // socket.emit("join_group", chat!.id);
            }}
            activateActionIs={true}
          />
        </div>
      </div>
    </div>
  );
}
