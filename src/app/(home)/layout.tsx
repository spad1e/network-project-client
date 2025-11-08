import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { NavBar } from "@/components/ui/navbar";
import { FloatPanelProvider } from "@/components/context/FloatPanelProvider";
import { CurrentChatProvider } from "@/components/context/CurrentChatProvider";
import { ManageProvider } from "@/components/context/ManageProvider";
import { RealtimeNotificationProvider } from "@/components/context/RealtimeNotificationProvider";
import { ToastNotification } from "@/components/ui/toastnotification";

export const metadata: Metadata = {
  title: "Network Adventure - Multiplayer Game",
  description:
    "Embark on an epic multiplayer adventure in our network-based RPG game",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  keywords: ["multiplayer", "rpg", "network game", "adventure", "online game"],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.className}>
      <body className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 pt-20">
        <ManageProvider>
            <FloatPanelProvider>
              <CurrentChatProvider>
                 <RealtimeNotificationProvider>
                {children}
                <NavBar /> 
                <ToastNotification />
                </RealtimeNotificationProvider>
              </CurrentChatProvider>
            </FloatPanelProvider>
         
        </ManageProvider>
      </body>
    </html>
  );
}
