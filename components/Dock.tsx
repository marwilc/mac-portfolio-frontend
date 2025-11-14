"use client";

import { useState } from "react";
import { APPS, AppConfig, AppId } from "@/lib/apps";

type DockProps = {
  openApps: AppId[];
  onToggleApp: (id: AppId) => void;
};

export default function Dock({ openApps, onToggleApp }: DockProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="fixed bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-end">
      <div className="flex gap-1.5 rounded-2xl bg-black/50 px-3 py-2 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        {APPS.map((app, index) => {
          const isOpen = openApps.includes(app.id);
          const distance = hoveredIndex !== null ? Math.abs(index - hoveredIndex) : null;
          
          // Calcular escala basada en la distancia
          let scale = 1;
          let translateY = 0;
          
          if (hoveredIndex !== null && distance !== null) {
            if (distance === 0) {
              // Icono con hover - máximo crecimiento
              scale = 1.5;
              translateY = -12;
            } else if (distance === 1) {
              // Iconos adyacentes - crecimiento medio
              scale = 1.2;
              translateY = -6;
            } else if (distance === 2) {
              // Iconos a 2 de distancia - crecimiento pequeño
              scale = 1.1;
              translateY = -3;
            }
          }
          
          return (
            <DockIcon
              key={app.id}
              app={app}
              isOpen={isOpen}
              onClick={() => onToggleApp(app.id)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              scale={scale}
              translateY={translateY}
            />
          );
        })}
      </div>
    </div>
  );
}

type DockIconProps = {
  app: AppConfig;
  isOpen: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  scale: number;
  translateY: number;
};

function DockIcon({ app, isOpen, onClick, onMouseEnter, onMouseLeave, scale, translateY }: DockIconProps) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="flex flex-col items-center gap-1 transition-transform"
    >
      <div 
        className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-xl shadow-lg transition-all duration-300 ease-out"
        style={{
          transform: `translateY(${translateY}px) scale(${scale})`,
        }}
      >
        <span className="transition-transform duration-300">{app.icon}</span>
      </div>
      {isOpen && (
        <span className="h-0.5 w-0.5 rounded-full bg-white/90 shadow-sm" aria-hidden />
      )}
    </button>
  );
}
