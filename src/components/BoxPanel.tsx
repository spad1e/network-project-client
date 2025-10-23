import React from "react";

type BoxPanelProps = {
  boxName?: string;
  bgColor?: string;
  page: React.ReactNode;
  actionName?: string;
  onAction?: () => void;
  activateActionIs: boolean;
};

export function BoxPanel({
  boxName = "Box Panel", // default name
  bgColor = "sea-blue", // default color
  page,
  actionName = "Action",
  onAction,
  activateActionIs = false,
}: BoxPanelProps) {
  return (
    <div className="max-h-100 sm:max-h-200 shadow-lg flex h-full w-full flex-col overflow-hidden rounded-[16px]">
      <div
        className="bg-sea-blue flex items-center border-b-2 shadow-blue-950 shadow-lg"
      >
        <h1 className="mx-10 text-[26px] font-bold text-white drop-shadow-md h-20 items-center flex">
          {boxName}
          </h1>

        {/* Render action only if onAction exists */}
        {activateActionIs && (
          <h1
            className="mr-5 ml-auto rounded-lg bg-white/20 px-4 py-1 text-sm font-medium transition-all hover:bg-white/30 hover:scale-105 active:bg-white/50"
            onClick={onAction}
          >
            {actionName}
          </h1>
        )}
      </div>

      <div className="scrollbar-custom-home h-full w-full bg-blue-100 p-6 transition-all">
        {page}
      </div>
    </div>
  );
}
