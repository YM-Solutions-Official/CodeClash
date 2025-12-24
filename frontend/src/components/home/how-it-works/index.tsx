'use client';
import { motion } from "motion/react";
import { Plus, FileCode, Zap } from "lucide-react";

const steps = [
  {
    icon: Plus,
    title: "Create or Join a Room",
    description: "Start a private coding match instantly.",
  },
  {
    icon: FileCode,
    title: "Solve the Same Problem",
    description: "Both players receive the same challenge.",
  },
  {
    icon: Zap,
    title: "Race in Real-Time",
    description: "Live sync, timer, and instant results.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-32 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-secondary/20 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4 block">
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold text-foreground tracking-tight">
            How it Works
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative group text-center"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px">
                    <div className="w-full h-full bg-linear-to-r from-border to-transparent" />
                  </div>
                )}

                {/* Step Number */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-foreground/5 border border-border/50 text-xs font-medium text-muted-foreground mb-6"
                >
                  {index + 1}
                </motion.div>

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-secondary/50 border border-border/50 mb-6 group-hover:border-primary/30 group-hover:shadow-lg transition-all duration-300"
                >
                  <step.icon className="h-8 w-8 text-foreground/70 group-hover:text-primary transition-colors" />
                </motion.div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
