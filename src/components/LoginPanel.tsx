export default function LoginPanel() {
  const characters = [
    { id: 1, name: "Warrior" },
    { id: 2, name: "Mage" },
    { id: 3, name: "Archer" },
    { id: 4, name: "Warrior" },
    { id: 5, name: "Mage" },
    { id: 6, name: "Archer" },
    { id: 7, name: "Warrior" },
    { id: 8, name: "Mage" },
    { id: 9, name: "Archer" },
    { id: 10, name: "Warrior" },
    { id: 11, name: "Mage" },
    { id: 12, name: "Archer" },
  ];

  return (
    <div className="bg-secondary-blue border-purple-sky box-border grid h-[646px] w-3/4 max-w-3xl grid-cols-1 grid-rows-7 justify-center rounded-[64px] border-3 p-10">
      {/* Title */}
      <h2 className="text-shadow-red-custom row-span-1 text-center text-6xl font-bold text-white">
        Create Character
      </h2>

      {/* Username input */}
      <div className="row-span-2 mx-auto w-full">
        <h2 className="mt-4 text-[32px] font-semibold text-white">Username</h2>
        <input
          type="text"
          className="mt-2 h-[72px] w-full rounded-lg border-3 border-black bg-white p-3 text-[32px] text-black focus:outline-none"
          placeholder="Enter your username"
        />
      </div>

      {/* Character list using grid */}
      <div className="row-span-2 w-full">
        <h2 className="text-[32px] font-semibold text-white">
          Choose Your Character
        </h2>
        <div className="mt-2 flex w-full grid-cols-4 gap-4 overflow-auto scrollbar-custom">
          {characters.map((char) => (
            <div
              key={char.id}
              className="mb-4 h-20 w-20 flex-shrink-0 rounded-full bg-white"
            ></div>
          ))}
        </div>
      </div>

      {/* Create button */}
      <button className="row-span-2 bg-purple-sky hover:bg-light-purple-sky mx-auto mt-4 h-[72px] w-[281px] rounded-[32px] border-3 border-black text-[32px] font-bold text-black shadow-slate-800 shadow-lg">
        Create
      </button>
    </div>
  );
}
