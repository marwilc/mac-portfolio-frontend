"use client";

import { useState, useEffect, useRef } from "react";
import { AppConfig } from "@/lib/apps";

type DesktopIconProps = {
  app: AppConfig;
  onClick: () => void;
  position: { x: number; y: number };
  onPositionChange: (position: { x: number; y: number }) => void;
};

export default function DesktopIcon({ app, onClick, position, onPositionChange }: DesktopIconProps) {
  const iconRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const clickStartTimeRef = useRef(0);
  const clickStartPosRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);

  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Limitar dentro de los bordes del escritorio (considerando el tamaño del icono)
      const iconWidth = 80; // w-20 = 80px
      const iconHeight = 100; // altura aproximada del icono
      const maxX = window.innerWidth - iconWidth;
      const maxY = window.innerHeight - 100; // dejar espacio para el dock
      
      const boundedX = Math.max(0, Math.min(newX, maxX));
      const boundedY = Math.max(48, Math.min(newY, maxY)); // 48px para la top bar
      
      onPositionChange({ x: boundedX, y: boundedY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      isDraggingRef.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset, onPositionChange]);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Guardar tiempo y posición del click para distinguir entre click y drag
    clickStartTimeRef.current = Date.now();
    clickStartPosRef.current = { x: e.clientX, y: e.clientY };
    
    if (!iconRef.current) return;
    
    const rect = iconRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    // Iniciar arrastre después de un pequeño movimiento
    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (isDraggingRef.current) return;
      
      const moveDistance = Math.sqrt(
        Math.pow(moveEvent.clientX - clickStartPosRef.current.x, 2) + 
        Math.pow(moveEvent.clientY - clickStartPosRef.current.y, 2)
      );
      
      // Si se mueve más de 5px, iniciar arrastre
      if (moveDistance > 5) {
        setIsDragging(true);
        isDraggingRef.current = true;
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    // Limpiar listener después de un tiempo o cuando se suelte el mouse
    const cleanup = () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
    
    window.addEventListener("mouseup", cleanup, { once: true });
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) {
      // Si no estaba arrastrando, fue un click
      const clickDuration = Date.now() - clickStartTimeRef.current;
      const moveDistance = Math.sqrt(
        Math.pow(e.clientX - clickStartPosRef.current.x, 2) + 
        Math.pow(e.clientY - clickStartPosRef.current.y, 2)
      );

      // Si fue un click rápido y sin movimiento, ejecutar onClick
      if (clickDuration < 200 && moveDistance < 5) {
        onClick();
      }
    }
    
    setIsDragging(false);
    isDraggingRef.current = false;
  };

  return (
    <div
      ref={iconRef}
      className="absolute pointer-events-auto"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transition: isDragging ? "none" : "transform 0.1s ease-out",
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <button
        className="group flex flex-col items-center gap-1.5 w-20 p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-move active:cursor-grabbing"
        onDoubleClick={onClick}
      >
        <div className="flex h-16 w-16 items-center justify-center text-4xl transition-transform group-hover:scale-110 group-active:scale-95">
          {app.icon}
        </div>
        <span className="text-xs text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] text-center px-1 rounded group-hover:bg-white/20 transition-colors">
          {app.name}
        </span>
      </button>
    </div>
  );
}

