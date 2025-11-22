"use client";

import { useEffect, useState, useRef } from "react";
import type { AppId } from "@/lib/apps";
import { APPS } from "@/lib/apps";
import type { UserApp } from "@/lib/userApps";
import { USER_APPS } from "@/lib/userApps";
import AboutContent from "../appContent/AboutContent";
import ProjectsContent from "../appContent/ProjectsContent";
import ContactContent from "../appContent/ContactContent";
import ResumeContent from "../appContent/ResumeContent";
import FinderContent from "../appContent/FinderContent";

// Componente para la vista de Launchpad en mobile
function LaunchpadMobileView({ onUserAppOpen }: { onUserAppOpen?: (app: UserApp) => void }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredApps = USER_APPS.filter((app) =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Search bar */}
      <div className="absolute top-4 left-0 right-0 z-10 px-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search applications"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-10 bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
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

      {/* Applications grid */}
      <div className="h-full pt-20 pb-24 px-6 overflow-y-auto">
        {filteredApps.length > 0 ? (
          <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
            {filteredApps.map((app, index) => (
              <button
                key={app.id}
                onClick={() => {
                  if (onUserAppOpen) {
                    onUserAppOpen(app);
                  }
                }}
                className="group flex flex-col items-center gap-2 p-4 rounded-2xl active:bg-white/10 transition-all duration-200 active:scale-95"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div className="relative">
                  <div className="text-6xl mb-1 transition-transform duration-200 group-active:scale-110">
                    {app.icon}
                  </div>
                  {/* Glow effect on active */}
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-active:opacity-100 transition-opacity duration-200" />
                </div>
                <span className="text-xs text-gray-200 text-center font-medium drop-shadow-lg leading-tight">
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

type iOSAppProps = {
  appId?: AppId;
  userApp?: UserApp;
  onClose: () => void;
  onUserAppOpen?: (app: UserApp) => void;
};

export default function IosApp({ appId, userApp, onClose, onUserAppOpen }: iOSAppProps) {
  const [swipeStart, setSwipeStart] = useState<{ y: number; time: number } | null>(null);
  const [swipeDistance, setSwipeDistance] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevenir scroll del body cuando la app está abierta
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    // Solo iniciar el gesto si comienza cerca del borde inferior (últimos 100px)
    if (touch.clientY > window.innerHeight - 100) {
      setSwipeStart({
        y: touch.clientY,
        time: Date.now(),
      });
      setSwipeDistance(0);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!swipeStart) return;
    
    const touch = e.touches[0];
    const distance = swipeStart.y - touch.clientY; // Distancia hacia arriba (positiva)
    
    // Solo permitir movimiento hacia arriba
    if (distance > 0) {
      setSwipeDistance(distance);
      // Prevenir scroll mientras se hace el gesto
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    if (!swipeStart) return;

    const swipeDuration = Date.now() - swipeStart.time;
    const swipeSpeed = swipeDistance / swipeDuration; // píxeles por milisegundo
    const threshold = 100; // Distancia mínima en píxeles
    const speedThreshold = 0.3; // Velocidad mínima

    // Cerrar si se deslizó lo suficiente o con suficiente velocidad
    if (swipeDistance > threshold || (swipeDistance > 50 && swipeSpeed > speedThreshold)) {
      onClose();
    }

    // Resetear el estado
    setSwipeStart(null);
    setSwipeDistance(0);
  };

  const app = appId ? APPS.find((a) => a.id === appId) : null;
  const title = app?.name || userApp?.name || "App";

  const renderContent = () => {
    if (userApp) {
      return (
        <div className="flex flex-col items-center justify-center h-full gap-6 p-6">
          <div className="text-8xl mb-4">{userApp.icon}</div>
          <h1 className="text-3xl font-bold text-white mb-2">{userApp.name}</h1>
          <p className="text-white/80 text-center max-w-md mb-4">{userApp.description}</p>
          {userApp.technologies && userApp.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {userApp.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-white/20 backdrop-blur-xl text-white rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
          <a
            href={userApp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white text-gray-900 rounded-2xl font-semibold text-lg hover:bg-white/90 transition-colors"
          >
            Visit application
          </a>
        </div>
      );
    }

    switch (appId) {
      case "finder":
        return <FinderContent variant="mobile" />;
      case "about":
        return <AboutContent variant="mobile" />;
      case "projects":
        return <ProjectsContent variant="mobile" />;
      case "contact":
        return <ContactContent variant="mobile" />;
      case "resume":
        return <ResumeContent variant="mobile" />;
      case "apps":
        return <LaunchpadMobileView onUserAppOpen={onUserAppOpen} />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-white/80">App content</p>
          </div>
        );
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-40 bg-gradient-to-br from-gray-900 via-gray-800 to-black animate-fade-in"
      style={{
        transform: swipeDistance > 0 ? `translateY(-${swipeDistance}px)` : "translateY(0)",
        transition: swipeStart ? "none" : "transform 0.3s ease-out",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Contenido de la app */}
      <div className="pt-16 pb-24 h-full overflow-hidden">
        {renderContent()}
      </div>

      {/* Indicador de swipe para cerrar estilo iOS - pegado abajo */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-white/40 rounded-full z-[60]" />
    </div>
  );
}

