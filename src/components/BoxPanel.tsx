import React from "react";

type BoxPanelProps = {
  boxName?: React.ReactNode;
  bgColor?: string;
  page: React.ReactNode;
  actionName?: React.ReactNode;
};

export function BoxPanel({
  boxName, // default name
  bgColor = "bg-white", // white background
  page,
  actionName,
}: BoxPanelProps) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl shadow-2xl shadow-purple-300/30">
      {/* Header */}
      <div
        className={`bg-white flex items-center justify-between border-b-2 border-purple-300/40 p-6 backdrop-blur-sm`}
      >
        {boxName}
        
        {/* Render action only if onAction exists */}
        {actionName}
      </div>

      {/* Content Area */}
      <div className="w-full flex-1 overflow-auto bg-gradient-to-br from-blue-100 to-purple-100/50 transition-all">{page}</div>
    </div>
  );
}
