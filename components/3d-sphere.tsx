"use client"

import { useEffect, useRef } from "react"

export default function Sphere3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const rotation = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 400
    canvas.height = 400

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = 120

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mousePos.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    const animate = () => {
      // Update rotation based on mouse
      rotation.current.x += (mousePos.current.y * 0.5 - rotation.current.x) * 0.1
      rotation.current.y += (mousePos.current.x * 0.5 - rotation.current.y) * 0.1

      // Clear canvas with soft background
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw wireframe sphere
      ctx.strokeStyle = "rgba(59, 130, 246, 0.3)"
      ctx.lineWidth = 1

      const points = 16
      for (let lat = 0; lat < points; lat++) {
        for (let lon = 0; lon < points; lon++) {
          const lat1 = (lat * Math.PI) / points - Math.PI / 2 + rotation.current.x
          const lat2 = ((lat + 1) * Math.PI) / points - Math.PI / 2 + rotation.current.x
          const lon1 = (lon * 2 * Math.PI) / points + rotation.current.y
          const lon2 = ((lon + 1) * 2 * Math.PI) / points + rotation.current.y

          const x1 = centerX + radius * Math.cos(lat1) * Math.cos(lon1)
          const y1 = centerY + radius * Math.sin(lat1)
          const x2 = centerX + radius * Math.cos(lat2) * Math.cos(lon1)
          const y2 = centerY + radius * Math.sin(lat2)
          const x3 = centerX + radius * Math.cos(lat1) * Math.cos(lon2)
          const y3 = centerY + radius * Math.sin(lat1)

          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.stroke()

          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x3, y3)
          ctx.stroke()
        }
      }

      // Draw glowing center
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
      gradient.addColorStop(0, "rgba(59, 130, 246, 0.1)")
      gradient.addColorStop(1, "rgba(59, 130, 246, 0)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="flex justify-center items-center">
      <canvas
        ref={canvasRef}
        className="w-full max-w-md filter drop-shadow-lg"
        style={{ maxWidth: "400px", height: "auto" }}
      />
    </div>
  )
}
