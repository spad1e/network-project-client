import LoginPanel from "@/components/LoginPanel";
import BoxPanel from "@/components/BoxPanel";

export default function HomePage() {
  return (
    <div className="bg-creamy-white relative min-h-screen w-full">
      {/* Header */}
      <div className="bg-secondary-blue fixed top-0 left-0 flex h-[70px] w-full items-center px-6 text-2xl font-bold text-white">
        Spade
      </div>

      {/* Grid panels */}
      <div className="p-[90px] grid min-h-[calc(100vh-90px)] w-full grid-cols-2 grid-rows-2 gap-6 p-6">
        <div className="h-full">
          <BoxPanel
            boxName="Online Friend"
            bgColor="sea-blue"
            page={<LoginPanel />}
          />
        </div>
        <div className="row-span-2 h-full">
          <BoxPanel
            boxName="Chat"
            bgColor="grass-green"
            page={<LoginPanel />}
          />
        </div>
        <div className="h-full">
          <BoxPanel boxName="Group" bgColor="sky-blue" page={<LoginPanel />} />
        </div>
      </div>
    </div>
  );
}
