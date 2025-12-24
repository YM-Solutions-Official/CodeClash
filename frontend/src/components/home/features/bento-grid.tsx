import { motion } from "motion/react";
import { features } from "@/utils/data/home";

export default function BentoGrid() {
  function getGridSpan(size: string) {
    return size === "large"
      ? "lg:col-span-2 lg:row-span-2"
      : size === "large-half"
      ? "lg:col-span-2 lg:row-span-1"
      : size === "medium"
      ? "lg:col-span-2"
      : "lg:col-span-1";
  }
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[180px]">
      {features.map((feature, index) => {
        const gridSpan = getGridSpan(feature.size);

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={gridSpan}
          >
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="group relative h-full rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden cursor-pointer"
            >
              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/3 to-transparent skew-x-12" />
              </div>

              {/* Border glow on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute -inset-px rounded-2xl bg-linear-to-br from-primary/20 via-transparent to-accent/20" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full p-6 flex flex-col">
                {/* Icon with premium treatment */}
                <motion.div
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  className="relative mb-4"
                >
                  {/* Icon glow */}
                  <div
                    className={`absolute inset-0 w-12 h-12 rounded-xl bg-linear-to-br ${feature.iconGradient} blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
                  />

                  {/* Icon container */}
                  <div className="relative w-12 h-12 rounded-xl bg-secondary/50 border border-border/50 flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/10 transition-all duration-300">
                    <feature.icon
                      className={`w-5 h-5 text-muted-foreground group-hover:text-transparent group-hover:bg-linear-to-br group-hover:${feature.iconGradient} group-hover:bg-clip-text transition-colors duration-300`}
                      strokeWidth={1.5}
                    />
                    {/* Animated icon color */}
                    <feature.icon
                      className={`absolute w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-br ${feature.iconGradient} *:stroke-[url(#icon-gradient)]`}
                      style={{
                        stroke: `url(#gradient-${index})`,
                      }}
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* SVG gradient definitions */}
                  <svg className="absolute w-0 h-0">
                    <defs>
                      <linearGradient
                        id={`gradient-${index}`}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="hsl(var(--primary))" />
                        <stop offset="100%" stopColor="hsl(var(--accent))" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>

                {/* Text content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p
                    className={`text-sm text-muted-foreground leading-relaxed ${
                      feature.size === "large" ? "max-w-xs" : ""
                    }`}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Decorative elements for large cards */}
              {feature.size === "large" && (
                <>
                  <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-linear-to-br from-primary/5 to-accent/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-1/2 right-8 w-24 h-24 border border-border/20 rounded-full opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500" />
                </>
              )}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
