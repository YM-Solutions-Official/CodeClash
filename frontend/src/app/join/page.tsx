"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Users, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { RoomAccessor } from "@/utils/accessors";
import toast from "react-hot-toast";

const JoinRoom = () => {
  const [roomCode, setRoomCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const router = useRouter();
  const roomAccessor = new RoomAccessor();
  const { joinRoom } = roomAccessor;

  const handleJoinRoom = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (!roomCode.trim()) return;

      setIsJoining(true);
      const response = await joinRoom(roomCode);
      router.push("/waiting/" + response.roomId);
    } catch (error: any) {
      toast.error(error);
    }
  };

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

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </header>

        {/* Main content */}
        <main className="flex-1 flex items-center justify-center px-6 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            {/* Card */}
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-linear-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-xl opacity-50" />

              <div className="relative glass-strong rounded-2xl p-8 border border-border/50">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 rounded-2xl bg-linear-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center mx-auto mb-6"
                >
                  <Users className="w-8 h-8 text-primary" />
                </motion.div>

                {/* Title */}
                <h1 className="text-2xl font-semibold text-center mb-2">
                  Join a Room
                </h1>
                <p className="text-muted-foreground text-center mb-8">
                  Enter the room code shared by your opponent
                </p>

                {/* Form */}
                <form onSubmit={handleJoinRoom} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Room Code
                    </label>
                    <Input
                      value={roomCode}
                      onChange={(e) =>
                        setRoomCode(e.target.value.toUpperCase())
                      }
                      placeholder="Enter 6-digit code"
                      className="h-14 text-center text-2xl font-mono tracking-[0.5em] bg-background/50 border-border/50 focus:border-primary/50 uppercase"
                      maxLength={6}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={roomCode.length < 4 || isJoining}
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium"
                  >
                    {isJoining ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Zap className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      "Join Room"
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default JoinRoom;
