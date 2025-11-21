"use client";

import { useState, useRef, useEffect } from "react";
import type { AppId } from "@/lib/apps";
import { APPS } from "@/lib/apps";
import type { UserApp } from "@/lib/userApps";
import { USER_APPS } from "@/lib/userApps";

type HomeScreenProps = {
  onAppOpen: (appId: AppId) => void;
  onUserAppOpen: (app: UserApp) => void;
};

// Simulación de datos de Spotify
const SPOTIFY_TRACK = {
  title: "Blinding Lights",
  artist: "The Weeknd",
  audioUrl: "/The_Weeknd_-_Blinding_Lights_(mp3.pm).mp3",
};

export default function HomeScreen({ onAppOpen, onUserAppOpen }: HomeScreenProps) {
  const [showControlCenter, setShowControlCenter] = useState(false);
  const [swipeStart, setSwipeStart] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Inicializar el audio
  useEffect(() => {
    if (typeof window !== "undefined") {
      const audio = new Audio(SPOTIFY_TRACK.audioUrl);
      audio.loop = true;
      audio.volume = 0.5; // Volumen al 50%
      audio.preload = "auto";
      audioRef.current = audio;

      // Sincronizar el estado de reproducción con el audio
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleEnded = () => setIsPlaying(false);
      const handleError = (e: ErrorEvent) => {
        console.error("Error loading audio:", e);
        setIsPlaying(false);
      };

      audio.addEventListener("play", handlePlay);
      audio.addEventListener("pause", handlePause);
      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("error", handleError);

      // Intentar cargar el audio
      try {
        audio.load();
      } catch (error) {
        console.error("Error loading audio:", error);
      }

      return () => {
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("error", handleError);
        audio.pause();
        audio.src = "";
      };
    }
  }, []);

  // Controlar la reproducción
  const togglePlayPause = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          await audioRef.current.play();
        }
      } catch (error) {
        console.error("Error playing audio:", error);
        // Si falla por políticas del navegador, el usuario necesitará interactuar primero
        alert("Please interact with the page first to play audio (browser autoplay policy)");
      }
    }
  };

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
      <div
        className={`absolute top-2 left-1/2 -translate-x-1/2 z-50 bg-black rounded-full transition-all duration-300 ${
          isExpanded
            ? "w-[90%] max-w-sm h-16 px-4"
            : "w-[126px] h-[37px]"
        } flex items-center justify-center cursor-pointer`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <div className="flex items-center gap-3 w-full">
            {/* Album Art */}
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
            </div>
            
            {/* Track Info */}
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm font-semibold truncate">
                {SPOTIFY_TRACK.title}
              </div>
              <div className="text-white/70 text-xs truncate">
                {SPOTIFY_TRACK.artist}
              </div>
            </div>
            
            {/* Controls */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlayPause();
                }}
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center active:bg-white/30 transition-colors"
              >
                {isPlaying ? (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(false);
                }}
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center active:bg-white/30 transition-colors"
              >
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-4">
            {/* Spotify Icon */}
            <div className="w-5 h-5 rounded bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
            </div>
            
            {/* Animated equalizer bars when playing */}
            {isPlaying && (
              <div className="flex items-end gap-0.5 h-3">
                <div className="w-0.5 bg-green-500 rounded-full equalizer-bar-1"></div>
                <div className="w-0.5 bg-green-500 rounded-full equalizer-bar-2"></div>
                <div className="w-0.5 bg-green-500 rounded-full equalizer-bar-3"></div>
                <div className="w-0.5 bg-green-500 rounded-full equalizer-bar-4"></div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Campo de búsqueda */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 z-40 w-full max-w-sm px-6">
        <div className="bg-white/10 backdrop-blur-2xl rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl border border-white/20">
          <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
                    placeholder="Search"
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

