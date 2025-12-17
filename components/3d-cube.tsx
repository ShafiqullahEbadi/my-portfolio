"use client";

import { useEffect, useRef } from "react";

export default function Cube3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const rotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 400;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const size = 100;

    // Cube vertices
    const vertices = [
      { x: -1, y: -1, z: -1 },
      { x: 1, y: -1, z: -1 },
      { x: 1, y: 1, z: -1 },
      { x: -1, y: 1, z: -1 },
      { x: -1, y: -1, z: 1 },
      { x: 1, y: -1, z: 1 },
      { x: 1, y: 1, z: 1 },
      { x: -1, y: 1, z: 1 },
    ];

    // Cube edges (connecting vertices)
    const edges = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0], // Back face
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 4], // Front face
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7], // Connecting lines
    ];

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      // Update rotation based on mouse
      rotation.current.x += (mousePos.current.y - rotation.current.x) * 0.05;
      rotation.current.y += (mousePos.current.x - rotation.current.y) * 0.05;

      // Auto rotation
      rotation.current.x += 0.002;
      rotation.current.y += 0.002;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Project and draw vertices
      const projectedVertices = vertices.map((v) => {
        // Rotate X
        let y =
          v.y * Math.cos(rotation.current.x) -
          v.z * Math.sin(rotation.current.x);
        let z =
          v.y * Math.sin(rotation.current.x) +
          v.z * Math.cos(rotation.current.x);
        let x = v.x;

        // Rotate Y
        let x2 =
          x * Math.cos(rotation.current.y) - z * Math.sin(rotation.current.y);
        let z2 =
          x * Math.sin(rotation.current.y) + z * Math.cos(rotation.current.y);

        // Perspective projection
        const scale = 400 / (400 + z2 * size);
        return {
          x: centerX + x2 * size * scale,
          y: centerY + y * size * scale,
        };
      });

      // Draw edges
      ctx.strokeStyle = "rgba(59, 130, 246, 0.6)";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Add glow effect
      ctx.shadowBlur = 15;
      ctx.shadowColor = "rgba(59, 130, 246, 0.5)";

      edges.forEach(([start, end]) => {
        ctx.beginPath();
        ctx.moveTo(projectedVertices[start].x, projectedVertices[start].y);
        ctx.lineTo(projectedVertices[end].x, projectedVertices[end].y);
        ctx.stroke();
      });

      // Draw vertices (dots)
      ctx.fillStyle = "rgba(147, 51, 234, 0.8)";
      projectedVertices.forEach((v) => {
        ctx.beginPath();
        ctx.arc(v.x, v.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="flex justify-center items-center">
      <canvas
        ref={canvasRef}
        className="w-full max-w-md filter drop-shadow-lg"
        style={{ maxWidth: "400px", height: "auto" }}
      />
    </div>
  );
}
