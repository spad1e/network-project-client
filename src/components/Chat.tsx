export default function Chat(){

    const messages = [
        { status: "own", id: 1, text: "Hello!", sender: "Alice" },
        { status: "other", id: 2, text: "Hi there!", sender: "Bob" },
        { status: "event", id: 3, text: "Alice joined the chat", sender: "System" },
        { status: "own", id: 4, text: "How are you?", sender: "Alice" },
        { status: "other", id: 5, text: "I'm good, thanks!", sender: "Bob" },
        { status: "own", id: 6, text: "Great to hear!", sender: "Alice" },
        { status: "event", id: 7, text: "Bob left the chat", sender: "System" },
        { status: "other", id: 8, text: "See you later!", sender: "Bob" },
    ]
    return (
      <div className="h-full overflow-auto p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.status === "own" ? "justify-end" : msg.status === "other" ? "justify-start" : "justify-center"}`}
          >
            <div className={`${msg.status === "own" ? "flex-row-reverse" : "flex-row"} flex`}>
              {msg.status !== "event" && (
                <div className="m-2 aspect-square h-1/4 max-h-20 rounded-full bg-amber-600">

                </div>
              )}
              <div
                className={`h-fit rounded-lg p-4 ${msg.status === "own" ? "bg-lime-400 text-white" : msg.status === "other" ? "bg-gray-300 text-black" : "bg-transparent text-red-400"}`}
              >
                {msg.status !== "event" && (
                  <div className="mb-2 font-bold">{msg.sender}</div>
                )}
                <div>{msg.text}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
}