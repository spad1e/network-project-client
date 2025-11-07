import React from "react";

type BoxPanelProps = {
  boxName?: string;
  boxSubtitle?: string;
  bgColor?: string;
  page: React.ReactNode;
  actionName?: string;
  onAction?: () => void;
  activateActionIs: boolean;
  displaySubtitle?: boolean;
};

export function BoxPanel({
  boxName = "Box Panel", // default name
  boxSubtitle = "Box subtitle",
  bgColor = "bg-white", // white background
  page,
  actionName = "Action",
  onAction,
  activateActionIs = false,
  displaySubtitle = false,
}: BoxPanelProps) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl shadow-2xl shadow-purple-300/30">
      {/* Header */}
      <div
        className={`flex items-center justify-between border-b-2 border-purple-300/40 bg-white p-6 backdrop-blur-sm`}
      >
        <div className="flex flex-col gap-2">
          <h1 className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-2xl font-bold text-transparent drop-shadow-md">
            {boxName}
          </h1>
          {displaySubtitle && (
            <h1 className="text-s text-gray bg-clip-text font-bold">
              {boxSubtitle}
            </h1>
          )}
        </div>

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
