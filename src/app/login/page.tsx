"use client";
import {LoginPanel} from "@/components/LoginPanel";

export default function LoginPage() {
  return (
    <div className="mt-10 content-center h-screen w-full justify-center bg-gradient-to-b from-dark-blue via-primary-blue to-secondary-blue flex">
      <LoginPanel />
    </div>
  );
}
