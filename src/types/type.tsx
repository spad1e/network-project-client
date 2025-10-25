type ChatBoxType = {
  id: number;
  name: string;
};

type ChatTextType = {
  status: "own" | "other" | "event";
  id: number;
  text: string;
  sender: string;
};

export type { ChatBoxType, ChatTextType };