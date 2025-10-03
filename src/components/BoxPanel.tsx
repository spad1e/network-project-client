import React from "react";

type BoxPanelProps = {
  boxName?: string;
  bgColor?: string;
  page: React.ReactNode;
  actionName?: string;
  onAction?: () => void;
  activateActionIs: boolean;
};

export default function BoxPanel({
  boxName = "Box Panel", // default name
  bgColor = "sea-blue", // default color
  page,
  actionName = "Action",
  onAction,
  activateActionIs = false,
}: BoxPanelProps) {
  return (
    <div className="box-shadow-custom flex h-full w-full flex-col overflow-hidden rounded-[16px]">
      <div
        className={`justify-between bg-${bgColor} flex h-20 items-center border-b-2 border-b-black`}
      >
        <h1 className="mx-10 text-[26px] font-bold text-white">{boxName}</h1>

        {/* Render action only if onAction exists */}
        {activateActionIs && (
          <h1
            className="mx-10 cursor-pointer text-[26px] font-bold text-white transition-colors hover:text-yellow-300"
            onClick={onAction}
          >
            {actionName}
          </h1>
        )}
      </div>

      <div className="h-full w-full overflow-auto bg-white p-5">{page}</div>
    </div>
  );
}
