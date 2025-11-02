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
          <button className="box-panel-action-button" onClick={onAction}>
            {actionName}
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="box-panel-content">{page}</div>
    </div>
  );
}
