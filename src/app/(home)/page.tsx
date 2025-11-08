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

export default function HomePage() {
  const { showPanel } = useFloatPanel();
  const {updateCurrChat, currChat} = useCurrentChat();
  const handleSubmit = (inputValue: InputValue<"text">): Promise<void> => {
    console.log(inputValue);
    return Promise.resolve();
  };
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
                setState={updateCurrChat}
                currChat={currChat?.id ?? null}
                type={currChat?.type || ""}
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
                <GroupChat chat={{id: currChat.id, name: currChat.name} as IGroup} handleSubmit={handleSubmit} />
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
              <Group
                setState={updateCurrChat}
                currChat={currChat?.id ?? null}
                type={currChat?.type || ""}
              />
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
