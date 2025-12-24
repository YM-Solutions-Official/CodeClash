import { Zap, Clock, Award, Terminal, Wifi, Shield } from "lucide-react";

export const features = [
  {
    icon: Wifi,
    title: "Real-Time Sync",
    description:
      "See when your opponent joins or submits. Every action is synchronized instantly across the globe.",
    size: "large",
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    iconGradient: "from-blue-400 to-cyan-400",
  },
  {
    icon: Clock,
    title: "Timed Matches",
    description: "Fixed duration battles for fair competition.",
    size: "small",
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
    iconGradient: "from-violet-400 to-purple-400",
  },
  {
    icon: Award,
    title: "Instant Results",
    description: "Winner decided automatically based on correctness and speed.",
    size: "small",
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    iconGradient: "from-amber-400 to-orange-400",
  },
  {
    icon: Terminal,
    title: "Developer-First",
    description:
      "Clean UI, fast performance, distraction-free coding environment built for serious developers.",
    size: "large-half",
    gradient: "from-emerald-500/20 via-green-500/10 to-transparent",
    iconGradient: "from-emerald-400 to-green-400",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for speed with zero latency code execution.",
    size: "medium",
    gradient: "from-yellow-500/20 via-amber-500/10 to-transparent",
    iconGradient: "from-yellow-400 to-amber-400",
  },
  {
    icon: Shield,
    title: "Secure & Fair",
    description:
      "Anti-cheat systems ensure every match is fair and competitive.",
    size: "medium",
    gradient: "from-rose-500/20 via-pink-500/10 to-transparent",
    iconGradient: "from-rose-400 to-pink-400",
  },
];