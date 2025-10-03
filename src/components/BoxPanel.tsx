type BoxPanelProps = {
  boxName?: string;
  bgColor?: string;
  page: React.ReactNode;
};

export default function BoxPanel({
  boxName = "Box Panel", // default name
  bgColor = "sea-blue", // default color
  page
}: BoxPanelProps) {
  return (
    <div className="box-shadow-custom flex h-full w-full flex-col overflow-hidden rounded-[16px]">
      <div className={`bg-${bgColor} h-20 border-b-2 border-b-black`}>
        <h1 className="mx-10 mt-5 text-[26px] font-bold text-white">
          {boxName}
        </h1>
      </div>
      <div className="h-full w-full overflow-auto bg-white p-5">{page}</div>
    </div>
  );
}
