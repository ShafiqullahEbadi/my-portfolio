"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Reel {
  title: string;
  reel: string;
}

export function MotionReelSection({ data: reel }: { data: Reel | null }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  if (!reel) return null;

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400 tracking-widest uppercase mb-4 block">
            Showreel
          </span>
          <h2 className="text-4xl md:text-6xl font-bold">{reel.title}</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative aspect-video rounded-3xl overflow-hidden glass-card group shadow-2xl"
        >
          <video
            src={reel.reel}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

          <div className="absolute bottom-8 left-8 right-8">
            <p className="text-lg text-white font-medium">{reel.title}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
