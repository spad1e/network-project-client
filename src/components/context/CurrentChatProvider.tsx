"use client";
import { createContext, useContext, useState, useRef } from "react";
import type { ChatTextType } from "@/types/type";
import type { ICurrChat } from "@/types/chat";

interface CurrentChatContextType {
  currChat: ICurrChat | undefined;
  currChatRef: React.MutableRefObject<ICurrChat | undefined>;
  updateCurrChat: (c: ICurrChat | undefined) => void;
}

const CurrentChatContext = createContext<CurrentChatContextType | undefined>(
  undefined,
);

export function CurrentChatProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [currChat, setCurrChat] = useState<ICurrChat | undefined>(undefined);
  const currChatRef = useRef<ICurrChat | undefined>(undefined);
  const updateCurrChat = (c: ICurrChat | undefined) => {
    currChatRef.current = c;
    setCurrChat((prev) => {
      return c;
    });
  };
  return (
    <CurrentChatContext.Provider
      value={{ currChat, updateCurrChat, currChatRef }}
    >
      {children}
    </CurrentChatContext.Provider>
  );
}

export function useCurrentChat() {
  const ctx = useContext(CurrentChatContext);
  if (!ctx) {
    throw new Error(
      "useuseCurrentChat must be used inside CurrentChatProvider",
    );
  }
  return ctx;
}
