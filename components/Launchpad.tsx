"use client";

import { useState, useEffect } from "react";
import { USER_APPS, type UserApp } from "@/lib/userApps";

type LaunchpadProps = {
  onAppClick: (app: UserApp) => void;
  onClose: () => void;
};

export default function Launchpad({ onAppClick, onClose }: LaunchpadProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const filteredApps = USER_APPS.filter((app) =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Solo cerrar si se hace click en el fondo, no en los iconos o la barra de búsqueda
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="h-full w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden"
      onClick={handleBackgroundClick}
    >
      {/* Barra de búsqueda estilo macOS */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 w-full max-w-md px-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 pl-10 bg-black/40 backdrop-blur-xl border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            autoFocus
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Grid de aplicaciones */}
      <div 
        className="h-full pt-24 pb-8 px-8 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {filteredApps.length > 0 ? (
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-8 max-w-7xl mx-auto">
            {filteredApps.map((app, index) => (
              <button
                key={app.id}
                onClick={() => onAppClick(app)}
                className="group flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div className="relative">
                  <div className="text-7xl mb-2 transition-transform duration-300 group-hover:scale-110">
                    {app.icon}
                  </div>
                  {/* Efecto de brillo al hover */}
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <span className="text-sm text-gray-200 text-center font-medium drop-shadow-lg">
                  {app.name}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <svg
              className="w-16 h-16 mb-4 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <p className="text-lg">No applications found</p>
          </div>
        )}
      </div>
    </div>
  );
}

