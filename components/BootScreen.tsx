"use client";

import { useState, useEffect, useRef } from "react";

type BootScreenProps = {
  onComplete: () => void;
};

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayedRef = useRef(false);

  // Manejar interacción del usuario (click en cualquier parte)
  const handleInteraction = () => {
    if (!hasPlayedRef.current && audioRef.current) {
      audioRef.current.play().then(() => {
        hasPlayedRef.current = true;
      }).catch(() => {
        // Silenciar errores
      });
    }
  };

  useEffect(() => {
    // Función para reproducir el sonido
    const playStartupSound = async () => {
      if (hasPlayedRef.current) return; // Evitar reproducir múltiples veces
      
      try {
        if (!audioRef.current) {
          const audioUrl = "/macos-startup.mp3";
          const audio = new Audio(audioUrl);
          audio.volume = 0.7; // Aumentar volumen
          audio.preload = "auto";
          
          // Pre-cargar el audio
          audio.load();
          
          audioRef.current = audio;
        }

        if (audioRef.current) {
          // Resetear el audio al inicio si ya se reprodujo
          if (audioRef.current.currentTime > 0) {
            audioRef.current.currentTime = 0;
          }
          
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            await playPromise;
            hasPlayedRef.current = true;
          }
        }
      } catch (error) {
        // Si falla la reproducción automática, esperar a la interacción del usuario
        // El audio se reproducirá cuando el usuario interactúe
      }
    };

    // Cargar el audio inmediatamente
    const audioUrl = "/macos-startup.mp3";
    const audio = new Audio(audioUrl);
    audio.volume = 0.7;
    audio.preload = "auto";
    audio.load();
    audioRef.current = audio;

    // Intentar reproducir el sonido automáticamente después de un pequeño delay
    // para dar tiempo a que el navegador permita la reproducción
    const tryPlay = setTimeout(() => {
      playStartupSound();
    }, 100);

    // También intentar reproducir cuando el usuario interactúe con la página
    const handleUserInteraction = () => {
      if (!hasPlayedRef.current) {
        playStartupSound();
      }
    };

    // Agregar listeners para interacción del usuario
    document.addEventListener("click", handleUserInteraction, { once: true });
    document.addEventListener("touchstart", handleUserInteraction, { once: true });
    document.addEventListener("keydown", handleUserInteraction, { once: true });

    // Simular el proceso de arranque de macOS
    const duration = 3000; // 3 segundos
    const interval = 50; // Actualizar cada 50ms
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(timer);
          // Esperar un poco más antes de completar
          setTimeout(() => {
            setShowLogo(false);
            setTimeout(() => {
              onComplete();
            }, 300);
          }, 200);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => {
      clearTimeout(tryPlay);
      clearInterval(timer);
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
      // Limpiar el audio si el componente se desmonta
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [onComplete]);

  return (
    <div 
      className="fixed inset-0 z-[200] bg-black flex items-center justify-center cursor-pointer"
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
    >
      {/* Logo de Apple centrado */}
      {showLogo && (
        <div className="flex flex-col items-center gap-8 animate-fade-in">
          <div className="text-white text-9xl font-light select-none">
            
          </div>
          
          {/* Barra de progreso */}
          <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-75 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
      
      {/* Animación de fade out */}
      {!showLogo && (
        <div className="absolute inset-0 bg-black animate-fade-out" />
      )}
    </div>
  );
}

