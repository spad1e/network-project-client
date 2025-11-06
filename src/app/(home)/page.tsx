"use client";
import { BoxPanel } from "@/components/BoxPanel";
import { Group } from "@/components/Group";
import { Chat } from "@/components/Chat";
import { Private } from "@/components/Private";
import { useState } from "react";
import { IdleChat } from "@/components/IdleChat";
import { useFloatPanel } from "@/components/context/FloatPanelProvider";
import type { InputValue } from "@/types/input";
import { JoinGroup } from "@/components/ui/joingroup";
import type { IGroup } from "@/types/group";
import { useManage } from "@/components/context/ManageProvider";

export default function HomePage() {
  const { showPanel, hidePanel } = useFloatPanel();
  const { updateCurrChat, currChat } = useManage();
  const handleSetChat = (p: IGroup) => {
    updateCurrChat(p);
  };
  const handleSubmit = (inputValue: InputValue<"text">): Promise<void> => {
    console.log(inputValue);
    return Promise.resolve();
  };
  return (
    <div className="relative min-h-screen w-full">
      {/* Grid panels */}
      <div className="order-1 grid h-full w-full grid-cols-1 grid-rows-3 gap-6 p-6 sm:max-h-[calc(100vh)] sm:grid-cols-2 sm:grid-rows-2">
        <div className="row-span-1 h-full">
          <BoxPanel
            boxName="Online Friend"
            bgColor="sea-blue"
            page={
              <Private
                setState={handleSetChat}
                currChat={currChat?.id ?? null}
              />
            }
            actionName="Left Chat"
            onAction={() => {
              console.log("Test");
            }}
            activateActionIs={false}
          />
        </div>
        <div className="order-3 row-span-1 h-full sm:order-2 sm:row-span-2">
          <BoxPanel
            boxName={currChat ? `${currChat.name}` : "Let's Chat"}
            bgColor="grass-green"
            page={
              currChat ? (
                <Chat chat={currChat} handleSubmit={handleSubmit} />
              ) : (
                <IdleChat />
              )
            }
            actionName="Left Chat"
            onAction={() => {
              updateCurrChat(undefined);
            }}
            activateActionIs={true}
          />
        </div>
        <div className="order-2 row-span-1 h-full sm:order-3">
          <BoxPanel
            boxName="Group"
            bgColor="sky-blue"
            page={
              <Group setState={handleSetChat} currChat={currChat?.id ?? null} />
            }
            actionName="Join Group"
            onAction={() => {
              showPanel(<JoinGroup />);
              console.log("Test");
              // socket.emit("join_group", chat!.id);
            }}
            activateActionIs={true}
          />
        </div>
      </div>
    </div>
  );
}
