export default function Player() {
    const player = [
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
      { id: 13, name: "Archer" },
      { id: 14, name: "Warrior" },
      { id: 15, name: "Mage" },
      { id: 16, name: "Archer" },
        { id: 17, name: "Warrior" },
        { id: 18, name: "Mage" },
        { id: 19, name: "Archer" },
        { id: 20, name: "Warrior" },
        { id: 21, name: "Mage" },
        { id: 22, name: "Archer" },
    ];

    return (
      <div className="grid h-fit grid-cols-4 place-items-center">
        {player.map((p) => (
          <div
            key={p.id}
            className="m-2 aspect-square h-8 md:h-12 lg:h-16 rounded-full bg-amber-600"
          ></div>
        ))}
      </div>
    );
}