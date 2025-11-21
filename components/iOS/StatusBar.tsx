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

  const getBatteryIcon = () => {
    if (batteryLevel === null) return null;
    
    if (isCharging) {
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.67 4H14V2c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4zm-1.06 9.24l-2.67 4.4c-.2.33-.67.33-.87 0l-2.67-4.4c-.2-.33.02-.74.43-.74h5.34c.41 0 .63.41.43.74z"/>
        </svg>
      );
    }

    const level = batteryLevel || 0;
    if (level > 75) {
      return "🔋";
    } else if (level > 50) {
      return "🔋";
    } else if (level > 25) {
      return "🔋";
    } else {
      return "🔋";
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 pt-safe pb-1.5 text-white text-[13px] font-semibold">
      <div className="flex items-center gap-1">
        <span>{formatTime(currentTime)}</span>
      </div>
      <div className="flex items-center gap-2">
        {/* Señal de red */}
        <svg className="w-[17px] h-[11px]" viewBox="0 0 24 16" fill="currentColor">
          <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.07 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
        </svg>
        {/* WiFi */}
        <svg className="w-[15px] h-[11px]" viewBox="0 0 24 16" fill="currentColor">
          <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.07 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
        </svg>
        {/* Batería */}
        {batteryLevel !== null && (
          <div className="flex items-center gap-1">
            <svg className="w-[24px] h-[11px]" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="1" y="3" width="18" height="6" rx="1" />
              <rect x="19" y="5" width="2" height="2" rx="0.5" />
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
              <svg className="w-3 h-3 absolute" viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 2L4 6h2v4l2-4H6V2z"/>
              </svg>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

