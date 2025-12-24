"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Play,
  Send,
  User,
  CheckCircle2,
  ChevronRight,
  Terminal,
  FileCode,
  Zap,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { GetRoomInfoRes } from "@/utils/types/room";
import { RoomAccessor } from "@/utils/accessors";
import toast from "react-hot-toast";
import { getSocket } from "@/lib/socket";

interface Problem {
  title: string;
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
}

const defaultCode = `function twoSum(nums, target) {
  // Write your solution here
  
}`;

export default function BattleArena() {
  const { roomId } = useParams<{ roomId: string }>();
  const router = useRouter();

  const [roomInfo, setRoomInfo] = useState<GetRoomInfoRes | null>(null);
  const [code, setCode] = useState(defaultCode);
  const [timeRemaining, setTimeRemaining] = useState(900);
  const [opponentStatus, setOpponentStatus] = useState<
    "typing" | "idle" | "submitted"
  >("typing");
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<"problem" | "output">("problem");

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const editorRef = useRef<any>(null);
  const roomAccessor = new RoomAccessor();
  const { getRoomInfo } = roomAccessor;

  useEffect(() => {
    async function getRoomData() {
      const response = await getRoomInfo(roomId);

      if (response.error) {
        toast.error(response.error);
        router.push("/join");
        return;
      }

      setRoomInfo(response);
    }

    getRoomData();
  }, [roomId]);

  useEffect(() => {
    if (!roomInfo?.startTime || !roomInfo?.duration) return;

    const interval = setInterval(() => {
      const time = Math.floor((Date.now() - roomInfo.startTime!) / 1000);
      const remaining = Math.max(0, roomInfo.duration! - time);
      setTimeRemaining(remaining);

      if (remaining === 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [roomInfo]);

  useEffect(() => {
    const socket = getSocket();

    socket.on("opponent_submitted", () => {
      setOpponentStatus("submitted");
    });

    return () => {
      socket.off("opponent_submitted");
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const runCode = () => {
    setIsRunning(true);
    setActiveTab("output");

    // Simulate running code
    setTimeout(() => {
      setOutput(`Running test cases...

Test 1: nums = [2,7,11,15], target = 9
Expected: [0,1]
Output: [0,1]
✓ Passed

Test 2: nums = [3,2,4], target = 6
Expected: [1,2]
Output: [1,2]
✓ Passed

All test cases passed!`);
      setIsRunning(false);
    }, 1500);
  };

  const submitCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setOutput(`Submitting solution...

Running all test cases...

Test 1: ✓ Passed (2ms)
Test 2: ✓ Passed (1ms)
Test 3: ✓ Passed (3ms)
Test 4: ✓ Passed (2ms)
Test 5: ✓ Passed (1ms)
...
Test 50: ✓ Passed (2ms)

🎉 All 50 test cases passed!
Runtime: 52ms (faster than 89%)
Memory: 42.1 MB (less than 67%)`);
      setIsRunning(false);
      setActiveTab("output");
    }, 2000);
  };

  const getTimerColor = () => {
    if (timeRemaining <= 60) return "text-red-500";
    if (timeRemaining <= 180) return "text-yellow-500";
    return "text-foreground";
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-500 bg-green-500/10 border-green-500/30";
      case "Medium":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/30";
      case "Hard":
        return "text-red-500 bg-red-500/10 border-red-500/30";
      default:
        return "";
    }
  };

  return (
    <div className="h-screen bg-background text-foreground flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-14 border-b border-border/50 bg-card/50 backdrop-blur-sm flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-lg">
            Code<span className="text-primary">Clash</span>
          </span>
          <div className="h-6 w-px bg-border/50" />
          <span className="text-sm text-muted-foreground font-mono">
            Room: {roomId}
          </span>
        </div>

        {/* Timer */}
        <motion.div
          className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border/50 ${getTimerColor()}`}
          animate={timeRemaining <= 60 ? { scale: [1, 1.02, 1] } : {}}
          transition={{
            duration: 0.5,
            repeat: timeRemaining <= 60 ? Infinity : 0,
          }}
        >
          <Clock className="w-4 h-4" />
          <span className="font-mono font-semibold text-lg">
            {formatTime(timeRemaining)}
          </span>
        </motion.div>

        {/* Opponent status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/30 border border-border/30">
            <User className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Opponent</span>
            <div className="flex items-center gap-1.5">
              {opponentStatus === "typing" && (
                <motion.div
                  className="flex gap-0.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-accent"
                      animate={{ y: [0, -3, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </motion.div>
              )}
              {opponentStatus === "submitted" && (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              )}
              {opponentStatus === "idle" && (
                <div className="w-2 h-2 rounded-full bg-muted-foreground/50" />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Problem panel */}
        <div className="w-[45%] border-r border-border/50 flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="h-12 border-b border-border/50 flex items-center px-4 gap-2 shrink-0">
            <button
              onClick={() => setActiveTab("problem")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "problem"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4" />
                Problem
              </div>
            </button>
            <button
              onClick={() => setActiveTab("output")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "output"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                Output
              </div>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              {activeTab === "problem" ? (
                <motion.div
                  key="problem"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-6 space-y-6"
                >
                  {/* Title */}
                  <div>
                    <h1 className="text-xl font-semibold">
                      {roomInfo?.problem.title}
                    </h1>
                  </div>

                  {/* Description */}
                  <div className="prose prose-invert prose-sm max-w-none">
                    <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                      {roomInfo?.problem.description}
                    </p>
                  </div>

                  {/* Examples */}
                  <div className="space-y-4">
                    {roomInfo?.problem.examples.map(
                      (example: any, idx: number) => (
                        <div
                          key={idx}
                          className="rounded-lg bg-secondary/30 border border-border/30 overflow-hidden"
                        >
                          <div className="px-4 py-2 bg-secondary/50 border-b border-border/30">
                            <span className="text-sm font-medium">
                              Example {idx + 1}
                            </span>
                          </div>
                          <div className="p-4 space-y-3 font-mono text-sm">
                            <div>
                              <span className="text-muted-foreground">
                                Input:{" "}
                              </span>
                              <span className="text-foreground">
                                {example.input}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Output:{" "}
                              </span>
                              <span className="text-accent">
                                {example.output}
                              </span>
                            </div>
                            {example.explanation && (
                              <div className="pt-2 border-t border-border/30">
                                <span className="text-muted-foreground text-xs">
                                  {example.explanation}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  {/* Constraints */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Constraints</h3>
                    <ul className="space-y-1">
                      {roomInfo?.problem.constraints.map(
                        (constraint: any, idx: number) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <ChevronRight className="w-4 h-4 mt-0.5 text-primary/50" />
                            <span className="font-mono">{constraint}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="output"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full"
                >
                  <div className="h-full p-4 font-mono text-sm">
                    {isRunning ? (
                      <div className="flex items-center gap-3">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <Zap className="w-4 h-4 text-primary" />
                        </motion.div>
                        <span className="text-muted-foreground">
                          Running...
                        </span>
                      </div>
                    ) : output ? (
                      <pre className="whitespace-pre-wrap text-muted-foreground">
                        {output}
                      </pre>
                    ) : (
                      <p className="text-muted-foreground/50">
                        Run your code to see output here
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Editor panel */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Language selector */}
          <div className="h-12 border-b border-border/50 flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/30 border border-border/30">
              <FileCode className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">JavaScript</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={runCode}
                disabled={isRunning}
                className="border-border/50"
              >
                <Play className="w-4 h-4 mr-1" />
                Run
              </Button>
              <Button
                size="sm"
                onClick={submitCode}
                disabled={isRunning}
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="w-4 h-4 mr-1" />
                Submit
              </Button>
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1">
            <Editor
              height="100%"
              language="javascript"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
              onMount={(editor) => {
                editorRef.current = editor;
              }}
              options={{
                fontSize: 14,
                fontFamily: "'JetBrains Mono', monospace",
                minimap: { enabled: false },
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 16 },
                renderLineHighlight: "all",
                cursorBlinking: "smooth",
                cursorSmoothCaretAnimation: "on",
                smoothScrolling: true,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
