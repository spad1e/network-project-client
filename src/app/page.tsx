"use client";
import LoginPanel from "@/components/LoginPanel";
import BoxPanel from "@/components/BoxPanel";
import Player from "@/components/Player";
import Group from "@/components/Group";
import Chat from "@/components/Chat";

export default function HomePage() {
  const handleAction = () => {
    console.log("Action clicked!");
  };
  return (
    <div className="bg-creamy-white relative min-h-screen w-full">
      {/* Header */}
      <div className="bg-secondary-blue fixed top-0 left-0 flex h-[70px] w-full items-center px-6 text-2xl font-bold text-white">
        Spade
      </div>

      {/* Grid panels */}
      <div className="grid max-h-[calc(100vh)] w-full grid-cols-2 grid-rows-2 gap-6 p-6 p-[90px]">
        <div className="h-full">
          <BoxPanel
            boxName="Online Friend"
            bgColor="sea-blue"
            page={<Player />}
          />
        </div>
        <div className="row-span-2 h-full">
          <BoxPanel 
            boxName="Chat" 
            bgColor="grass-green" 
            page={<Chat/>} />
        </div>
        <div className="h-full">
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
