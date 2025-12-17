"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
}

export default function GlobalClickEffect() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const nextId = useRef(0);

  const colors = ["bg-blue-400", "bg-purple-500", "bg-pink-500", "bg-cyan-400"];

  const handleInteraction = (clientX: number, clientY: number) => {
    const newParticles: Particle[] = [];
    const particleCount = 8; // Number of particles per tap

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: nextId.current++,
        x: clientX,
        y: clientY,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    setParticles((prev) => [...prev, ...newParticles]);

    // Cleanup particles after animation
    setTimeout(() => {
      setParticles((prev) =>
        prev.filter((p) => !newParticles.find((np) => np.id === p.id))
      );
    }, 1000);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      handleInteraction(e.clientX, e.clientY);
    };

    const handleTouch = (e: TouchEvent) => {
      // Use the first touch point
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handleInteraction(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener("click", handleClick);
    window.addEventListener("touchstart", handleTouch);

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("touchstart", handleTouch);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute w-3 h-3 rounded-full ${particle.color} blur-[1px]`}
            initial={{
              x: particle.x,
              y: particle.y,
              scale: 0,
              opacity: 1,
            }}
            animate={{
              x: particle.x + (Math.random() - 0.5) * 200,
              y: particle.y + (Math.random() - 0.5) * 200,
              scale: [0, 1.5, 0],
              opacity: 0,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
