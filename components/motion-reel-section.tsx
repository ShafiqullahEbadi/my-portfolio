"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Play } from "lucide-react"

export function MotionReelSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <span className="text-sm font-medium text-accent-bright tracking-widest uppercase mb-4 block">Showreel</span>
          <h2 className="text-4xl md:text-6xl font-bold">Motion Reel 2024</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative aspect-video rounded-3xl overflow-hidden glass-card cursor-pointer group"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{
              backgroundImage: `url('/cinematic-motion-graphics-showreel.jpg')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

          <motion.div className="absolute inset-0 flex items-center justify-center" whileHover={{ scale: 1.1 }}>
            <div className="w-20 h-20 rounded-full bg-accent-bright/90 backdrop-blur-sm flex items-center justify-center group-hover:bg-accent-bright transition-colors">
              <Play className="w-8 h-8 text-background ml-1" fill="currentColor" />
            </div>
          </motion.div>

          <div className="absolute bottom-8 left-8 right-8">
            <p className="text-lg text-foreground/90 font-medium">A compilation of my best work from 2024</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
