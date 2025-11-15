import {
  User,
  Sword,
  Wand2,
  Crosshair,
  Shield,
  Axe,
  Hammer,
  Flame,
  Zap,
  Skull,
  Heart,
  Brain,
  Sparkles,
} from "lucide-react";

interface IconComponentProps {
  icon_id?: number;
  size?: number;
}

const iconMap: Record<
  number,
  {
    gradient: string;
    Icon: React.ComponentType<{ size?: number; className?: string }>;
  }
> = {
  1: { gradient: "from-red-500 to-orange-500", Icon: Sword },
  2: { gradient: "from-blue-500 to-purple-500", Icon: Wand2 },
  3: { gradient: "from-green-500 to-teal-500", Icon: Crosshair },
  4: { gradient: "from-emerald-500 to-lime-500", Icon: Shield },
  5: { gradient: "from-fuchsia-500 to-pink-500", Icon: Axe },
  6: { gradient: "from-indigo-500 to-cyan-500", Icon: Hammer },
  7: { gradient: "from-amber-500 to-yellow-500", Icon: Flame },
  8: { gradient: "from-sky-500 to-blue-600", Icon: Zap },
  9: { gradient: "from-gray-700 to-gray-500", Icon: Skull },
  10: { gradient: "from-rose-500 to-pink-500", Icon: Heart },
  11: { gradient: "from-purple-600 to-violet-400", Icon: Brain },
  12: { gradient: "from-purple-400 to-blue-400", Icon: Sparkles },
};

export function IconComponent({ icon_id, size = 32 }: IconComponentProps) {
  const conf = iconMap[icon_id ?? -1] ?? {
    gradient: "from-purple-500 to-blue-500",
    Icon: User,
  };

  return (
    <div
      className={`flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br ${conf.gradient} shadow-lg`}
    >
      <conf.Icon size={size} className="text-white" />
    </div>
  );
}
