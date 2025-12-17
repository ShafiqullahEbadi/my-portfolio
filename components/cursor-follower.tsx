"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export default function CursorFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const particles = useRef<Array<{ id: number; x: number; y: number }>>([])
  const nextId = useRef(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      setMousePosition({ x: clientX, y: clientY })

      // Create particles occasionally
      if (Math.random() > 0.8) {
        particles.current.push({
          id: nextId.current++,
          x: clientX + (Math.random() - 0.5) * 50,
          y: clientY + (Math.random() - 0.5) * 50,
        })

        // Keep only last 20 particles
        if (particles.current.length > 20) {
          particles.current.shift()
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0">
      {particles.current.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed w-1 h-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
          initial={{ opacity: 1, scale: 1, x: particle.x, y: particle.y }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}
    </div>
  )
}
