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
  bgColor = "bg-white", // white background
  page,
  actionName = "Action",
  onAction,
  activateActionIs = false,
}: BoxPanelProps) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl shadow-2xl shadow-purple-300/30">
      {/* Header */}
      <div
        className={`bg-white flex items-center justify-between border-b-2 border-purple-300/40 p-6 backdrop-blur-sm`}
      >
        <h1 className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-2xl font-bold text-transparent drop-shadow-md">
          {boxName}
        </h1>

        {/* Render action only if onAction exists */}
        {activateActionIs && (
          <button className="rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 font-semibold text-white transition-all duration-200 hover:from-purple-600 hover:to-blue-600 hover:scale-105 hover:shadow-lg active:from-purple-700 active:to-blue-700" onClick={onAction}>
            {actionName}
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="w-full flex-1 overflow-auto bg-gradient-to-br from-blue-100 to-purple-100/50 transition-all">{page}</div>
    </div>
  );
}
