"use client"
import { useContext, useState, createContext } from "react";
import FloatPanel from "../ui/floatpanel";

interface FloatPanelContextType{
    showPanel: (panel: React.ReactNode)=>void;
    hidePanel: () => void;
}

const FloatPanelContext = createContext<FloatPanelContextType|undefined>(undefined);

export function FloatPanelProvider({
    children
}: {children: React.ReactNode}){

    const [content, setContent] = useState<React.ReactNode|null>(null);
    const showPanel = (c: React.ReactNode) => setContent(c);
    const hidePanel = () => setContent(null);

    return (
      <FloatPanelContext.Provider value={{ showPanel, hidePanel }}>
        {content && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="relative w-96 rounded-2xl bg-white p-6 shadow-lg">
              <button
                onClick={hidePanel}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
              {content}
            </div>
          </div>
        )}
        {children}
      </FloatPanelContext.Provider>
    );
}

export function useFloatPanel(){
  const floatPanel = useContext(FloatPanelContext);
  if (!floatPanel){
    throw new Error("useFloatPanel must be used inside FloatPanelProvider");
  }
  return floatPanel
}