"use client";

import { useState, useEffect } from "react";

export default function StatusBar() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [isCharging, setIsCharging] = useState(false);

  useEffect(() => {
    // Actualizar hora cada segundo
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Detectar batería
    const getBattery = async () => {
      try {
        // @ts-expect-error - Battery API puede no estar en los tipos
        const battery = await navigator.getBattery();
        setBatteryLevel(Math.round(battery.level * 100));
        setIsCharging(battery.charging);

        battery.addEventListener("chargingchange", () => {
          setIsCharging(battery.charging);
        });

        battery.addEventListener("levelchange", () => {
          setBatteryLevel(Math.round(battery.level * 100));
        });
      } catch {
        // Si la API no está disponible, no mostrar batería
        setBatteryLevel(null);
      }
    };

    getBattery();

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    });
  };


  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 pt-safe pb-1.5 text-white text-[13px] font-semibold pointer-events-none">
      <div className="flex items-center gap-1 pointer-events-auto">
        <span className="select-none">{formatTime(currentTime)}</span>
      </div>
      <div className="flex items-center gap-2 pointer-events-auto">
        {/* WiFi/Signal - Icono estilo iOS */}
        <svg className="w-[17px] h-[12px]" viewBox="0 0 17 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 0.5C4.5 0.5 1.5 3.5 1.5 7.5" />
          <path d="M8.5 3c-2 0-3.5 1.5-3.5 3.5" />
          <path d="M8.5 5.5c-0.8 0-1.2 0.8-1.2 1.2" />
          <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" />
        </svg>
        {/* Batería */}
        {batteryLevel !== null && (
          <div className="flex items-center gap-0.5 relative">
            <svg className="w-[24px] h-[12px]" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.2">
              <rect x="1" y="3" width="18" height="6" rx="1.2" />
              <rect x="19" y="5" width="2" height="2" rx="0.4" fill="currentColor" />
              <rect 
                x="2.5" 
                y="4.5" 
                width={Math.max(0, (batteryLevel / 100) * 15)} 
                height="3" 
                rx="0.5" 
                fill="currentColor"
              />
            </svg>
            {isCharging && (
              <svg className="w-2.5 h-2.5 absolute left-[4px] top-[2px]" viewBox="0 0 8 8" fill="currentColor">
                <path d="M4 1L2.5 4h1.5v3l1.5-3H4V1z"/>
              </svg>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

