"use client";

import { useState } from "react";

type LoginScreenProps = {
  onLogin: () => void;
};

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    // Simular proceso de login (1-2 segundos)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    onLogin();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 flex items-center justify-center">
      {/* Fondo con imagen de macOS */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=3840&auto=format&fit=crop')`,
        }}
      />
      
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Contenido del login */}
      <div className="relative z-10 w-full max-w-md px-8">
        {/* Avatar/Foto de perfil del usuario */}
        <div className="flex flex-col items-center">
          <button
            onClick={handleClick}
            disabled={isLoading}
            className="group relative transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-5xl font-bold text-white shadow-2xl ring-4 ring-white/20 group-hover:ring-white/40 transition-all">
              <span>M</span>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
              )}
            </div>
          </button>
          <p className="mt-4 text-white text-lg font-medium">Marwil</p>
          {isLoading && (
            <p className="mt-2 text-white/60 text-sm">Signing in...</p>
          )}
        </div>
      </div>

      {/* Indicadores del sistema */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 text-white/60 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span>Wi-Fi</span>
        </div>
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" viewBox="0 0 20 12" fill="currentColor">
            <rect x="1" y="3" width="14" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" />
            <rect x="15" y="5" width="1.5" height="2" rx="0.3" fill="currentColor" />
            <rect x="2" y="4" width="12" height="4" rx="0.5" fill="currentColor" />
          </svg>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}

