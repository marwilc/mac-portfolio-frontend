"use client";

import { useState } from "react";
import type { AppId } from "@/lib/apps";
import { APPS } from "@/lib/apps";
import type { UserApp } from "@/lib/userApps";
import { USER_APPS } from "@/lib/userApps";

type HomeScreenProps = {
  onAppOpen: (appId: AppId) => void;
  onUserAppOpen: (app: UserApp) => void;
};

export default function HomeScreen({ onAppOpen, onUserAppOpen }: HomeScreenProps) {
  const [showControlCenter, setShowControlCenter] = useState(false);
  const [swipeStart, setSwipeStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setSwipeStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (swipeStart === null) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - swipeStart;

    // Si desliza hacia abajo desde la parte superior, mostrar Control Center
    if (swipeStart < 50 && diff > 50) {
      setShowControlCenter(true);
    }
  };

  const handleTouchEnd = () => {
    setSwipeStart(null);
  };

  return (
    <div
      className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Wallpaper */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=3840&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
      </div>

      {/* Dynamic Island */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50 w-[126px] h-[37px] bg-black rounded-full flex items-center justify-center">
        <div className="flex items-center gap-2 px-4">
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
        </div>
      </div>

      {/* Campo de búsqueda */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 z-40 w-full max-w-sm px-6">
        <div className="bg-white/10 backdrop-blur-2xl rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl border border-white/20">
          <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar"
            className="flex-1 bg-transparent text-white placeholder-white/60 text-base outline-none"
          />
        </div>
      </div>

      {/* Grid de aplicaciones */}
      <div className="relative z-10 pt-32 pb-32 px-6 h-full overflow-y-auto">
        {/* Primera página de apps */}
        <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto">
          {APPS.map((app, index) => (
            <button
              key={app.id}
              onClick={() => onAppOpen(app.id)}
              className="flex flex-col items-center gap-1.5 active:scale-90 transition-all duration-150"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <div className="w-14 h-14 rounded-[22px] backdrop-blur-2xl shadow-xl flex items-center justify-center text-3xl transition-all duration-200 hover:scale-110">
                {app.icon}
              </div>
              <span className="text-white text-[11px] font-medium drop-shadow-md text-center leading-tight">
                {app.name}
              </span>
            </button>
          ))}
        </div>

        {/* Separador solo si hay apps de usuario */}
        {USER_APPS.length > 0 && (
          <>
            <div className="my-6 h-px bg-white/10 max-w-sm mx-auto" />
            {/* Aplicaciones de usuario */}
            <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto">
              {USER_APPS.map((app, index) => (
                <button
                  key={app.id}
                  onClick={() => onUserAppOpen(app)}
                  className="flex flex-col items-center gap-1.5 active:scale-90 transition-all duration-150"
                  style={{
                    animationDelay: `${(APPS.length + index) * 50}ms`,
                  }}
                >
                  <div className="w-14 h-14 rounded-[22px] backdrop-blur-2xl shadow-xl flex items-center justify-center text-3xl transition-all duration-200 hover:scale-110">
                    {app.icon}
                  </div>
                  <span className="text-white text-[11px] font-medium drop-shadow-md text-center leading-tight">
                    {app.name}
                  </span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Control Center */}
      {showControlCenter && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xl"
          onClick={() => setShowControlCenter(false)}
        >
          <div
            className="absolute top-0 left-0 right-0 bg-white/10 backdrop-blur-2xl border-b border-white/20 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-md mx-auto">
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* WiFi */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4">
                  <div className="text-white text-sm font-medium mb-2">Wi-Fi</div>
                  <div className="text-white/80 text-xs">Connected</div>
                </div>
                {/* Bluetooth */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4">
                  <div className="text-white text-sm font-medium mb-2">Bluetooth</div>
                  <div className="text-white/80 text-xs">On</div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4">
                <div className="text-white text-sm font-medium mb-2">Brightness</div>
                <div className="w-full h-1 bg-white/20 rounded-full">
                  <div className="w-3/4 h-full bg-white rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dock inferior estilo iOS */}
      <div className="fixed bottom-0 left-0 right-0 z-30 pb-safe">
        <div className="bg-white/5 backdrop-blur-3xl border-t border-white/10 px-4 py-3">
          <div className="flex items-center justify-center gap-6 max-w-sm mx-auto">
            {APPS.slice(0, 4).map((app) => (
              <button
                key={app.id}
                onClick={() => onAppOpen(app.id)}
                className="w-14 h-14 rounded-[22px] bg-white/10 backdrop-blur-xl flex items-center justify-center text-2xl active:scale-90 transition-all duration-150 hover:bg-white/20"
              >
                {app.icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

