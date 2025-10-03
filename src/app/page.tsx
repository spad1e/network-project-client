"use client";
import LoginPanel from "@/components/LoginPanel";
import BoxPanel from "@/components/BoxPanel";
import Player from "@/components/Player";
import Group from "@/components/Group";
import Chat from "@/components/Chat";

export default function HomePage() {
  return (
    <div className="bg-creamy-white relative min-h-screen w-full">
      {/* Header */}
      <div className="bg-secondary-blue fixed top-0 left-0 flex h-[70px] w-full items-center px-6 text-2xl font-bold text-white">
        Spade
      </div>

      {/* Grid panels */}
      <div className="order-1 grid h-full sm:max-h-[calc(100vh)] w-full grid-cols-1 sm:grid-cols-2 grid-rows-3 sm:grid-rows-2 gap-6 p-6 p-[90px]">
        <div className="row-span-1 h-full">
          <BoxPanel
            boxName="Online Friend"
            bgColor="sea-blue"
            page={<Player />}
          />
        </div>
        <div className="order-3 sm:order-2 row-span-1 sm:row-span-2 h-full">
          <BoxPanel 
            boxName="Chat" 
            bgColor="grass-green" 
            page={<Chat/>}
            actionName="Left Chat"
            onAction={() => {
              console.log("Test");
            }}
            activateActionIs={true}
          />
        </div>
        <div className="order-2 sm:order-3 row-span-1 h-full">
          <BoxPanel
            boxName="Group"
            bgColor="sky-blue"
            page={<Group />}
            actionName="Join Group"
            onAction={() => {
              console.log("Test");
            }}
            activateActionIs={true}
          />
        </div>
      </div>
    </div>
  );
}
