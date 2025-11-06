"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { User, Lock, Loader, Gamepad } from "lucide-react";
import { signIn } from "@/lib/auth";
import { useManage } from "./context/ManageProvider";

export function LoginPanel() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { memUsername } = useManage();

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const data = await signIn({ username, password });
      memUsername(username);
      console.log(data);
      router.push("/");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex h-[600px] w-11/12 max-w-4xl flex-col items-center justify-center gap-6 rounded-3xl border-2 border-purple-400/30 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-8 shadow-2xl shadow-purple-500/20">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 bg-clip-text text-center text-5xl font-bold text-transparent drop-shadow-lg">
        <Gamepad
          size={80}
          className="bg-clip-text text-5xl font-bold text-white drop-shadow-lg"
        />
        <h2 className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-5xl font-bold text-transparent drop-shadow-lg">
          Network Chat
        </h2>
      </div>

      {/* Error Message */}
      {error ? (
        <div className="w-full max-w-md rounded-lg bg-red-500/20 p-3">
          <p className="text-center text-red-300">{error}</p>
        </div>
      ) : (
        <div className="w-full max-w-md rounded-lg p-3">
          <p className="text-center text-white">Welcome to Network Chat</p>
        </div>
      )}

      {/* Username Field */}
      <div className="w-full max-w-md">
        <label className="mb-2 block text-lg font-medium text-white">
          Username
        </label>
        <div className="relative">
          <User
            className="absolute top-1/2 left-4 -translate-y-1/2 text-purple-300"
            size={24}
          />
          <input
            type="text"
            className="w-full rounded-2xl border-2 border-purple-300/30 bg-white/10 p-4 pl-12 text-lg text-white placeholder:text-white/60 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 focus:outline-none"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="w-full max-w-md">
        <label className="mb-2 block text-lg font-medium text-white">
          Password
        </label>
        <div className="relative">
          <Lock
            className="absolute top-1/2 left-4 -translate-y-1/2 text-purple-300"
            size={24}
          />
          <input
            type="password"
            className="w-full rounded-2xl border-2 border-purple-300/30 bg-white/10 p-4 pl-12 text-lg text-white placeholder:text-white/60 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 focus:outline-none"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Login Button */}
      <button
        className="mt-4 flex h-16 w-80 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-xl font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-purple-600 hover:to-pink-600 hover:shadow-xl disabled:cursor-not-allowed disabled:from-gray-600 disabled:to-gray-600"
        onClick={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader className="mr-2 animate-spin" size={20} />
            Signing In...
          </>
        ) : (
          "Sign In"
        )}
      </button>

      {/* Register Link */}
      <div className="mt-2 text-center">
        <button
          className="text-white/70 underline transition-all hover:text-white/90 hover:no-underline"
          onClick={() => router.push("/register")}
          disabled={isLoading}
        >
          Don't have an account? Register here
        </button>
      </div>
    </div>
  );
}
