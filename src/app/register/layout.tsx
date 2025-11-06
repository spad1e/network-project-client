import "@/styles/globals.css";

import React from "react";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={geist.className}>
      <body className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 pt-20">
        {children}
      </body>
    </html>
  );
}
