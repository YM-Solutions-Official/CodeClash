"use client";
import { Button } from "@/components/ui/button";
import { getSocket } from "@/lib/socket";
import { RoomAccessor } from "@/utils/accessors";
import { GetRoomInfoRes, MatchStartedRes } from "@/utils/types/room";
import {
  ArrowLeft,
  Check,
  Clock,
  Copy,
  Swords,
  Users,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Waiting() {
  const [copied, setCopied] = useState(false);
  const [roomInfo, setRoomInfo] = useState<GetRoomInfoRes | null>(null);
  const [isCreator, setIsCreator] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const router = useRouter();
  const { roomId } = useParams<{ roomId: string }>();
  const roomAccessor = new RoomAccessor();
  const { getRoomInfo, startMatch } = roomAccessor;

  useEffect(() => {
    async function getRoomData() {
      const response = await getRoomInfo(roomId);

      if (response.error) {
        toast.error(response.error);
        return;
      }
      setRoomInfo(response);

      const creatorId = localStorage.getItem("room_creator");
      if (creatorId === response.creatorId) setIsCreator(true);
    }

    getRoomData();
  }, [roomId]);

  useEffect(() => {
    const socket = getSocket();

    socket.on("user_joined", (userId: string) => {
      setRoomInfo((prev) => {
        if (!prev) return prev;
        if (prev?.users?.includes(userId)) return prev;

        return {
          ...prev,
          users: [...prev.users!, userId],
        };
      });
    });

    socket.on("match_started", (data: MatchStartedRes) => {
      const { startTime } = data;
      const interval = setInterval(() => {
        const remaining = Math.ceil((startTime - Date.now()) / 1000);

        if (remaining <= 0) {
          clearInterval(interval);
          router.push("/battle/" + roomId);
        } else {
          setCountdown(remaining);
        }
      }, 200);
    });

    return () => {
      socket.off("user_joined");
      socket.off("match_started");
    };
  }, []);

  const copyRoomCode = async () => {
    if (roomInfo?.roomCode) {
      await navigator.clipboard.writeText(roomInfo.roomCode);
      setCopied(true);
      toast.success("Copied!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleStartMatch = () => {
    startMatch(roomId);
  };

  const activeUsers = roomInfo?.users?.filter(Boolean);
  const canStart = activeUsers?.length === 2;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 spotlight opacity-30" />
      <div
        className="fixed inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <AnimatePresence>
        {countdown !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-xl flex items-center justify-center"
          >
            <motion.div
              key={countdown}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              className="text-center"
            >
              {countdown && countdown > 0 ? (
                <span className="text-9xl font-bold bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  {countdown}
                </span>
              ) : (
                <div className="flex items-center gap-4">
                  <Swords className="w-16 h-16 text-accent" />
                  <span className="text-6xl font-bold text-foreground">
                    CLASH!
                  </span>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Leave
          </Button>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {roomInfo?.duration! / 60} min match
            </span>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex items-center justify-center px-6 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-lg text-center"
          >
            {/* Room code card */}
            <div className="relative mb-12">
              <div className="absolute -inset-1 bg-linear-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-xl opacity-50" />

              <div className="relative glass-strong rounded-2xl p-8 border border-border/50">
                <p className="text-sm text-muted-foreground mb-3">Room Code</p>

                <div className="flex items-center justify-center gap-4">
                  <span className="text-4xl font-mono font-bold tracking-[0.3em] text-foreground">
                    {roomInfo?.roomCode}
                  </span>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={copyRoomCode}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground mt-4">
                  Share this code with your opponent
                </p>
              </div>
            </div>

            {/* Players section */}
            <div className="mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Users className="w-5 h-5 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Players ({activeUsers?.length ?? 0}/2)
                </span>
              </div>

              <div className="flex items-center justify-center gap-8">
                {/* Player 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center">
                    <span className="text-2xl font-semibold text-primary">
                      {activeUsers && activeUsers[0]?.charAt(0)}
                    </span>
                  </div>
                  <span className="text-sm font-medium">
                    {activeUsers && activeUsers[0]}
                  </span>
                  {isCreator && (
                    <span className="text-xs text-primary">Creator</span>
                  )}
                </motion.div>

                {/* VS */}
                <div className="flex flex-col items-center gap-2">
                  <motion.div
                    animate={{
                      scale: activeUsers?.length! >= 2 ? [1, 1.1, 1] : 1,
                      opacity: activeUsers?.length! >= 2 ? 1 : 0.3,
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: activeUsers?.length! >= 2 ? Infinity : 0,
                      repeatDelay: 1,
                    }}
                    className="w-12 h-12 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center"
                  >
                    <Swords className="w-5 h-5 text-accent" />
                  </motion.div>
                  <span className="text-xs text-muted-foreground font-medium">
                    VS
                  </span>
                </div>

                {/* Player 2 */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{
                    opacity: activeUsers?.length! >= 2 ? 1 : 0.3,
                    x: 0,
                  }}
                  className="flex flex-col items-center gap-3"
                >
                  <div
                    className={`w-20 h-20 rounded-2xl border flex items-center justify-center ${
                      activeUsers?.length! >= 2
                        ? "bg-linear-to-br from-accent/20 to-accent/5 border-accent/30"
                        : "bg-secondary/20 border-border/30 border-dashed"
                    }`}
                  >
                    {activeUsers?.length! >= 2 ? (
                      <span className="text-2xl font-semibold text-accent">
                        {activeUsers![1]?.charAt(0)}
                      </span>
                    ) : (
                      <motion.div
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Users className="w-8 h-8 text-muted-foreground/50" />
                      </motion.div>
                    )}
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {activeUsers?.length! >= 2 ? activeUsers![1] : "Waiting..."}
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Start button */}
            <AnimatePresence mode="wait">
              {canStart && isCreator ? (
                <motion.div
                  key="start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Button
                    onClick={handleStartMatch}
                    className="h-14 px-12 bg-linear-to-r from-primary to-accent hover:opacity-90 text-primary-foreground rounded-xl font-medium text-lg shadow-lg"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Start Match
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="waiting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-3"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Zap className="w-5 h-5 text-primary" />
                  </motion.div>
                  <span className="text-muted-foreground">
                    {activeUsers?.length! < 2
                      ? "Waiting for opponent to join..."
                      : "Waiting for creator to start..."}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
