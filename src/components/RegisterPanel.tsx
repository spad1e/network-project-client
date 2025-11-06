"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { User, Lock, Sword, Wand2, Crosshair, Loader } from "lucide-react";
import { signUp } from "@/lib/auth";

export function RegisterPanel() {
  const router = useRouter();
  const [select, setSelect] = useState<number>(0);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const characters = [
    {
      id: 1,
      name: "Warrior",
      icon: Sword,
      color: "from-red-500 to-orange-500",
    },
    { id: 2, name: "Mage", icon: Wand2, color: "from-blue-500 to-purple-500" },
    {
      id: 3,
      name: "Archer",
      icon: Crosshair,
      color: "from-green-500 to-teal-500",
    },
    {
      id: 4,
      name: "Warrior",
      icon: Sword,
      color: "from-red-500 to-orange-500",
    },
    { id: 5, name: "Mage", icon: Wand2, color: "from-blue-500 to-purple-500" },
    {
      id: 6,
      name: "Archer",
      icon: Crosshair,
      color: "from-green-500 to-teal-500",
    },
    {
      id: 7,
      name: "Warrior",
      icon: Sword,
      color: "from-red-500 to-orange-500",
    },
    { id: 8, name: "Mage", icon: Wand2, color: "from-blue-500 to-purple-500" },
    {
      id: 9,
      name: "Archer",
      icon: Crosshair,
      color: "from-green-500 to-teal-500",
    },
    {
      id: 10,
      name: "Warrior",
      icon: Sword,
      color: "from-red-500 to-orange-500",
    },
  ];

  const handleRegister = async () => {
    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    if (!select) {
      setError("Please select a character");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await signUp({ username, icon_id: select, password });
      router.push("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex h-[850px] w-11/12 max-w-5xl flex-col items-center justify-center gap-6 rounded-3xl border-2 border-purple-400/30 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-8 shadow-2xl shadow-purple-500/20">
      {/* Header */}
      <div className="text-center">
        <h2 className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-5xl font-bold text-transparent drop-shadow-lg">
          Create Your Account
        </h2>
      </div>

      {/* Error Message */}
      {error && (
        <div className="w-full max-w-md rounded-lg bg-red-500/20 p-3">
          <p className="text-center text-red-300">{error}</p>
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
            placeholder="Choose your hero name"
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
            placeholder="Create your secret code"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Character Selection */}
      <div className="w-full max-w-4xl">
        <label className="mb-4 block text-center text-2xl font-bold text-white">
          Choose Your Class
        </label>
        <div className="grid grid-cols-5 gap-4">
          {characters.map((char) => {
            const IconComponent = char.icon;
            return (
              <div
                key={char.id}
                className={`character-card group relative cursor-pointer transition-all duration-300 ${
                  select === char.id
                    ? "scale-105 border-purple-400 shadow-lg shadow-purple-500/50"
                    : "hover:scale-102 hover:border-purple-300/50"
                }`}
                onClick={() => {
                  if (!isLoading) {
                    setSelect(char.id);
                    setError("");
                  }
                }}
              >
                <div
                  className={`character-icon bg-gradient-to-br ${char.color}`}
                >
                  <IconComponent size={32} className="text-white" />
                </div>
                {select === char.id && (
                  <div className="selected-indicator"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Create Button */}
      <button
        className="mt-6 flex h-16 w-80 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-xl font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-purple-600 hover:to-pink-600 hover:shadow-xl disabled:cursor-not-allowed disabled:from-gray-600 disabled:to-gray-600"
        onClick={handleRegister}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader className="mr-2 animate-spin" size={20} />
            Creating Account...
          </>
        ) : (
          "Create Hero"
        )}
      </button>

      {/* Login Link */}
      <div className="mt-2 text-center">
        <button
          className="text-white/70 underline transition-all hover:text-white/90 hover:no-underline"
          onClick={() => router.push("/login")}
          disabled={isLoading}
        >
          Already have a account? Sign in here
        </button>
      </div>
    </div>
  );
}
