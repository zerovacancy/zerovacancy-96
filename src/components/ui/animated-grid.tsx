
"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface AnimatedGridProps {
  direction?: "right" | "left" | "up" | "down" | "diagonal"
  speed?: number
  borderColor?: string
  squareSize?: number
  hoverFillColor?: string
  className?: string
}

export function AnimatedGrid({
  direction = "right",
  speed = 1,
  borderColor = "#333",
  squareSize = 40,
  hoverFillColor = "#222",
  className,
}: AnimatedGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)
  const totalOffsetRef = useRef({ x: 0, y: 0 })
  const [hoveredSquare, setHoveredSquare] = useState<{
    x: number
    y: number
  } | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.style.background = "#060606"

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      
      ctx.scale(dpr, dpr)
      
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
    }

    const drawGrid = (timestamp: number) => {
      if (!canvas || !ctx) return
      
      // Calculate delta time for smooth animation
      const deltaTime = timestamp - lastTimeRef.current
      lastTimeRef.current = timestamp
      
      // Update total offset based on direction and speed
      const effectiveSpeed = (speed * deltaTime) / 16 // Normalize to 60fps

      switch (direction) {
        case "right":
          totalOffsetRef.current.x -= effectiveSpeed
          break
        case "left":
          totalOffsetRef.current.x += effectiveSpeed
          break
        case "up":
          totalOffsetRef.current.y += effectiveSpeed
          break
        case "down":
          totalOffsetRef.current.y -= effectiveSpeed
          break
        case "diagonal":
          totalOffsetRef.current.x -= effectiveSpeed
          totalOffsetRef.current.y -= effectiveSpeed
          break
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Calculate grid position
      const offsetX = totalOffsetRef.current.x % squareSize
      const offsetY = totalOffsetRef.current.y % squareSize

      // Set up drawing styles
      ctx.lineWidth = 1
      ctx.strokeStyle = borderColor

      // Draw grid
      const width = canvas.width / window.devicePixelRatio
      const height = canvas.height / window.devicePixelRatio

      for (let x = -squareSize + offsetX; x < width + squareSize; x += squareSize) {
        for (let y = -squareSize + offsetY; y < height + squareSize; y += squareSize) {
          if (
            hoveredSquare &&
            Math.floor(x / squareSize) === hoveredSquare.x &&
            Math.floor(y / squareSize) === hoveredSquare.y
          ) {
            ctx.fillStyle = hoverFillColor
            ctx.fillRect(x, y, squareSize, squareSize)
          }

          ctx.beginPath()
          ctx.rect(x, y, squareSize, squareSize)
          ctx.stroke()
        }
      }

      // Add vignette effect
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / 2,
      )
      gradient.addColorStop(0, "rgba(6, 6, 6, 0)")
      gradient.addColorStop(1, "#060606")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Request next frame
      requestRef.current = requestAnimationFrame(drawGrid)
    }

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = event.clientX - rect.left
      const mouseY = event.clientY - rect.top
      
      const hoveredSquareX = Math.floor((mouseX - (totalOffsetRef.current.x % squareSize)) / squareSize)
      const hoveredSquareY = Math.floor((mouseY - (totalOffsetRef.current.y % squareSize)) / squareSize)

      setHoveredSquare({ x: hoveredSquareX, y: hoveredSquareY })
    }

    const handleMouseLeave = () => {
      setHoveredSquare(null)
    }

    // Event listeners
    window.addEventListener("resize", resizeCanvas)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    // Initial setup
    resizeCanvas()
    requestRef.current = requestAnimationFrame(drawGrid)

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [direction, speed, borderColor, hoverFillColor, squareSize])

  return (
    <canvas
      ref={canvasRef}
      className={cn("w-full h-full border-none block", className)}
    />
  )
}
