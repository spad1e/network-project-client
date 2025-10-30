"use client";
import { BoxPanel } from "@/components/BoxPanel";
import { Group } from "@/components/Group";
import { Chat } from "@/components/Chat";
import { Private } from "@/components/Private";
import { InputGroup } from "@/components/ui/input-group";
import { useState } from "react";
import type { ChatBoxType } from "@/types/type";
import { IdleChat } from "@/components/IdleChat";
// import { cookies } from "next/headers"; // server-side cookies
import { redirect } from "next/navigation";
// import { socket } from "@/connections/socket";
import FloatPanel from "@/components/ui/floatpanel";
import { useFloatPanel } from "@/components/context/FloatPanelProvider";
import type { InputType } from "@/types/input";
import type { InputValue } from "@/types/input";
import { JoinGroup } from "@/components/ui/joingroup";
import type { IGroup } from "@/types/group";
// import { InputGroup } from "@/components/ui/input-group";

export default function HomePage() {
  const { showPanel, hidePanel } = useFloatPanel();
  const [chat, setChat] = useState<IGroup | null>(null);
  const handleSetChat = (p: IGroup) => {
    setChat(p);
  };
  const handleSubmit = (inputValue: InputValue<"text">): Promise<void> => {
    console.log(inputValue);
    return Promise.resolve();
  };
  // const token = cookies().get("token")?.value;
  // const test = "A"
  // if (test !== "A") {
  //   redirect("/login"); // force redirect if no token
  // }
  const component = <h1>Hello</h1>;
  return (
    <div className="relative min-h-screen w-full">
      {/* Grid panels */}
      <div className="order-1 grid h-full w-full grid-cols-1 grid-rows-3 gap-6 p-6 sm:max-h-[calc(100vh)] sm:grid-cols-2 sm:grid-rows-2">
        {/* <div className="row-span-1 h-full">
          <BoxPanel
            boxName="Online Friend"
            bgColor="sea-blue"
            page={<Private setState={handleSetChat} />}
            actionName="Left Chat"
            onAction={() => {
              console.log("Test");
            }}
            activateActionIs={false}
          />
        </div> */}
        <div className="order-3 row-span-1 h-full sm:order-2 sm:row-span-2">
          <BoxPanel
            boxName={chat ? `Chat - ${chat.name}` : "Chat"}
            bgColor="grass-green"
            page={
              chat ? (
                <Chat chat={chat} handleSubmit={handleSubmit} />
              ) : (
                <IdleChat />
              )
            }
            actionName="Left Chat"
            onAction={() => {
              setChat(null);
            }}
            activateActionIs={true}
          />
        </div>
        <div className="order-2 row-span-1 h-full sm:order-3">
          <BoxPanel
            boxName="Group"
            bgColor="sky-blue"
            page={
              <Group setState={handleSetChat} currChat={chat?.id ?? null} />
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
