"use client"

import { motion } from "framer-motion"

export default function FloatingBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Blob 1 - Blue */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-400 to-blue-300 dark:from-blue-500 dark:to-blue-400 filter blur-3xl opacity-20 dark:opacity-10"
        animate={{
          y: [0, 50, 0],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{ top: "10%", right: "10%" }}
      />

      {/* Blob 2 - Purple */}
      <motion.div
        className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-purple-400 to-purple-300 dark:from-purple-500 dark:to-purple-400 filter blur-3xl opacity-15 dark:opacity-8"
        animate={{
          y: [0, -40, 0],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{ bottom: "20%", left: "5%" }}
      />

      {/* Blob 3 - Yellow accent */}
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-yellow-300 to-orange-300 dark:from-yellow-600 dark:to-orange-600 filter blur-3xl opacity-10 dark:opacity-5"
        animate={{
          y: [0, 30, 0],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{ top: "50%", right: "5%" }}
      />
    </div>
  )
}
