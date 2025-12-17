"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion } from "framer-motion"

interface MagneticButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: "primary" | "secondary"
}

export default function MagneticButton({
  children,
  onClick,
  className = "",
  variant = "primary",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const distance = Math.hypot(e.clientX - (rect.left + centerX), e.clientY - (rect.top + centerY))

    const maxDistance = 100
    if (distance < maxDistance) {
      const force = 1 - distance / maxDistance
      setPosition({
        x: (e.clientX - (rect.left + centerX)) * force * 0.3,
        y: (e.clientY - (rect.top + centerY)) * force * 0.3,
      })
    }
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const baseClasses = "px-8 py-3 rounded-lg font-medium transition-all duration-200 cursor-pointer"
  const variantClasses =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl"
      : "bg-white dark:bg-slate-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-300 dark:border-slate-600"

  return (
    <motion.div
      ref={ref}
      className={`${baseClasses} ${variantClasses} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
