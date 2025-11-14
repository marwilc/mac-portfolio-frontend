"use client";

import { useState, useEffect } from "react";
import Dock from "./Dock";
import AppWindow from "./AppWindow";
import DesktopIcon from "./DesktopIcon";
import type { AppId } from "@/lib/apps";
import { APPS } from "@/lib/apps";

type WindowPosition = {
  x: number;
  y: number;
};

type WindowSize = {
  width: number;
  height: number;
};

export default function Desktop() {
  const [openApps, setOpenApps] = useState<AppId[]>(["finder"]);
  const [activeApp, setActiveApp] = useState<AppId>("finder");
  const [windowPositions, setWindowPositions] = useState<Record<AppId, WindowPosition>>({
    finder: { x: 0, y: 0 },
    about: { x: 0, y: 0 },
    projects: { x: 0, y: 0 },
    contact: { x: 0, y: 0 },
    apps: { x: 0, y: 0 },
  });
  const [windowSizes, setWindowSizes] = useState<Record<AppId, WindowSize>>({
    finder: { width: 0, height: 0 },
    about: { width: 0, height: 0 },
    projects: { width: 0, height: 0 },
    contact: { width: 0, height: 0 },
    apps: { width: 0, height: 0 },
  });
  const [windowOriginalSizes, setWindowOriginalSizes] = useState<Record<AppId, WindowSize>>({
    finder: { width: 0, height: 0 },
    about: { width: 0, height: 0 },
    projects: { width: 0, height: 0 },
    contact: { width: 0, height: 0 },
    apps: { width: 0, height: 0 },
  });
  const [isCompactMode, setIsCompactMode] = useState<Record<AppId, boolean>>({
    finder: false,
    about: false,
    projects: false,
    contact: false,
    apps: false,
  });
  const [fullscreenApps, setFullscreenApps] = useState<Set<AppId>>(new Set());
  const [minimizedApps, setMinimizedApps] = useState<Set<AppId>>(new Set());
  const [iconPositions, setIconPositions] = useState<Record<AppId, WindowPosition>>(() => {
    // Posiciones iniciales en columna vertical
    const initialPositions: Record<AppId, WindowPosition> = {} as Record<AppId, WindowPosition>;
    APPS.forEach((app, index) => {
      initialPositions[app.id] = { x: 24, y: 60 + index * 100 };
    });
    return initialPositions;
  });

  const toggleApp = (id: AppId) => {
    // Si la app está minimizada, restaurarla
    if (minimizedApps.has(id)) {
      setMinimizedApps((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      setActiveApp(id);
      return;
    }

    // Si la app está abierta, cerrarla
    if (openApps.includes(id)) {
      setOpenApps((prev) => prev.filter((a) => a !== id));
      if (activeApp === id && openApps.length > 1) {
        setActiveApp(openApps[0] as AppId);
      }
    } else {
      // Si la app está cerrada, abrirla
      setOpenApps((prev) => [...prev, id]);
      setActiveApp(id);
    }
  };

  const closeApp = (id: AppId) => {
    setOpenApps((prev) => prev.filter((a) => a !== id));
    // Limpiar fullscreen y minimized cuando se cierra la ventana
    setFullscreenApps((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
    setMinimizedApps((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
    if (activeApp === id && openApps.length > 1) {
      setActiveApp(openApps[0] as AppId);
    }
  };

  const handleWindowPositionChange = (id: AppId, position: WindowPosition) => {
    setWindowPositions((prev) => ({
      ...prev,
      [id]: position,
    }));
  };

  const handleWindowSizeChange = (id: AppId, size: WindowSize) => {
    setWindowSizes((prev) => ({
      ...prev,
      [id]: size,
    }));
    // Guardar el tamaño original si no está en modo compacto
    if (!isCompactMode[id] && size.width > 0 && size.height > 0) {
      setWindowOriginalSizes((prev) => ({
        ...prev,
        [id]: size,
      }));
    }
  };

  const toggleWindowCompact = (id: AppId) => {
    const currentSize = windowSizes[id];
    const originalSize = windowOriginalSizes[id];
    const isCurrentlyCompact = isCompactMode[id];

    if (isCurrentlyCompact) {
      // Expandir al tamaño original
      if (originalSize.width > 0 && originalSize.height > 0) {
        setWindowSizes((prev) => ({
          ...prev,
          [id]: originalSize,
        }));
      }
      setIsCompactMode((prev) => ({
        ...prev,
        [id]: false,
      }));
    } else {
      // Guardar tamaño actual como original si no existe
      if (currentSize.width > 0 && currentSize.height > 0) {
        if (originalSize.width === 0 || originalSize.height === 0) {
          setWindowOriginalSizes((prev) => ({
            ...prev,
            [id]: currentSize,
          }));
        }
        // Reducir a tamaño compacto (60% del tamaño original)
        const compactSize = {
          width: Math.max(400, Math.floor(currentSize.width * 0.6)),
          height: Math.max(300, Math.floor(currentSize.height * 0.6)),
        };
        setWindowSizes((prev) => ({
          ...prev,
          [id]: compactSize,
        }));
      } else {
        // Si no tiene tamaño, establecer uno compacto por defecto
        const defaultCompactSize = { width: 500, height: 400 };
        setWindowSizes((prev) => ({
          ...prev,
          [id]: defaultCompactSize,
        }));
        setWindowOriginalSizes((prev) => ({
          ...prev,
          [id]: { width: 800, height: 600 },
        }));
      }
      setIsCompactMode((prev) => ({
        ...prev,
        [id]: true,
      }));
    }
  };

  const toggleFullscreen = (id: AppId) => {
    setFullscreenApps((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleMinimize = (id: AppId) => {
    setMinimizedApps((prevMinimized) => {
      const newSet = new Set(prevMinimized);
      if (newSet.has(id)) {
        newSet.delete(id);
        setActiveApp(id);
      } else {
        newSet.add(id);
        // Si se minimiza una ventana en fullscreen, salir de fullscreen
        setFullscreenApps((prevFullscreen) => {
          if (prevFullscreen.has(id)) {
            const newFullscreenSet = new Set(prevFullscreen);
            newFullscreenSet.delete(id);
            return newFullscreenSet;
          }
          return prevFullscreen;
        });
        // Si se minimiza la ventana activa, activar otra si hay
        if (activeApp === id && openApps.length > 1) {
          const otherApp = openApps.find((app) => app !== id && !prevMinimized.has(app));
          if (otherApp) {
            setActiveApp(otherApp);
          }
        }
      }
      return newSet;
    });
  };

  // URL de imagen de fondo - puedes cambiar esto por una imagen local en /public
  const wallpaperUrl = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=3840&auto=format&fit=crop';
  // Alternativa: usar imagen local: '/macos-wallpaper.jpg'

  // Verificar si hay alguna ventana en fullscreen (excluyendo minimizadas)
  const hasFullscreen = Array.from(fullscreenApps).some(
    (id) => !minimizedApps.has(id)
  );

  // Hora actual
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [isCharging, setIsCharging] = useState(false);
  const [connectionType, setConnectionType] = useState<string>("wifi");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Detectar nivel de batería
  useEffect(() => {
    const getBattery = async () => {
      try {
        // @ts-expect-error - Battery API puede no estar en los tipos de TypeScript
        if (navigator.getBattery) {
          // @ts-expect-error - Battery API no está tipada en TypeScript
          const battery = await navigator.getBattery();
          
          const updateBattery = () => {
            setBatteryLevel(Math.round(battery.level * 100));
            setIsCharging(battery.charging);
          };

          updateBattery();
          battery.addEventListener('chargingchange', updateBattery);
          battery.addEventListener('levelchange', updateBattery);

          return () => {
            battery.removeEventListener('chargingchange', updateBattery);
            battery.removeEventListener('levelchange', updateBattery);
          };
        } else if ('getBattery' in navigator) {
          // Fallback para algunos navegadores
          // @ts-expect-error - Battery API no está tipada en TypeScript
          navigator.getBattery().then((battery: { level: number; charging: boolean; addEventListener: (event: string, callback: () => void) => void }) => {
            setBatteryLevel(Math.round(battery.level * 100));
            setIsCharging(battery.charging);
            
            battery.addEventListener('chargingchange', () => {
              setIsCharging(battery.charging);
            });
            battery.addEventListener('levelchange', () => {
              setBatteryLevel(Math.round(battery.level * 100));
            });
          });
        }
      } catch {
        // Si la API no está disponible, usar un valor simulado
        setBatteryLevel(100); // Valor por defecto
      }
    };

    getBattery();
  }, []);

  // Detectar tipo de conexión (WiFi o Ethernet)
  useEffect(() => {
    const detectConnectionType = () => {
      try {
        // @ts-expect-error - Network Information API puede no estar en los tipos de TypeScript
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        
        if (connection) {
          const type = connection.effectiveType || connection.type || 'unknown';
          
          // Mapear tipos de conexión
          if (type === 'ethernet' || type === 'wired') {
            setConnectionType('ethernet');
          } else if (type === 'wifi' || type === 'wlan') {
            setConnectionType('wifi');
          } else {
            // Por defecto, asumir WiFi si no se puede detectar
            setConnectionType('wifi');
          }

          // Escuchar cambios en la conexión
          connection.addEventListener('change', () => {
            const newType = connection.effectiveType || connection.type || 'unknown';
            if (newType === 'ethernet' || newType === 'wired') {
              setConnectionType('ethernet');
            } else if (newType === 'wifi' || newType === 'wlan') {
              setConnectionType('wifi');
            }
          });
        } else {
          // Si la API no está disponible, intentar detectar por otros medios
          // Por defecto, asumir WiFi
          setConnectionType('wifi');
        }
      } catch {
        // Si hay error, usar WiFi por defecto
        setConnectionType('wifi');
      }
    };

    detectConnectionType();
  }, []);

  // Formatear la hora
  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, "0");
    return `${displayHours}:${displayMinutes} ${ampm}`;
  };

  // Formatear la fecha
  const formatDate = (date: Date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const dayNum = date.getDate();
    const year = date.getFullYear();
    return `${day} · ${month} ${dayNum} · ${year}`;
  };

  // Obtener icono de batería basado en el nivel
  const getBatteryIcon = () => {
    if (batteryLevel === null) return null;
    
    const level = batteryLevel;
    const fillPercentage = Math.max(0, Math.min(100, level));
    const fillWidth = (fillPercentage / 100) * 12; // 12 es el ancho interno de la batería
    
    // Color basado en el nivel
    let batteryColor = "currentColor";
    if (level <= 20) batteryColor = "#ef4444"; // Rojo si está bajo
    else if (level <= 50) batteryColor = "#f59e0b"; // Amarillo si está medio
    
    return (
      <svg className="w-7 h-7 " viewBox="0 0 20 12" fill="none">
        {/* Contorno de la batería */}
        <rect x="1" y="3" width="14" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" />
        {/* Terminal de la batería */}
        <rect x="15" y="5" width="1.5" height="2" rx="0.3" fill="currentColor" />
        {/* Nivel de carga */}
        {fillPercentage > 0 && (
          <rect 
            x="2" 
            y="4" 
            width={fillWidth} 
            height="4" 
            rx="0.5" 
            fill={batteryColor}
          />
        )}
        {/* Icono de carga si está cargando */}
        {isCharging && (
          <path 
            d="M10 5.5 L8 7.5 L10 7.5 L10 9.5 L12 7.5 L10 7.5 Z" 
            fill="currentColor" 
            opacity="0.9"
          />
        )}
      </svg>
    );
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Fondo con imagen real de macOS (tema oscuro) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${wallpaperUrl})`,
        }}
      >
        {/* Overlay sutil para mejorar contraste y legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
      </div>
      
      {/* Fallback oscuro en caso de que la imagen no cargue */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 -z-10" />

      {/* Top bar estilo macOS 2025 (tema oscuro) - oculto en fullscreen */}
      {!hasFullscreen && (
        <div className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-1.5 text-xs text-white/90 bg-black/40 backdrop-blur-2xl border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="text-base font-medium"></span>
            <span className="font-medium">Marwil CampOS</span>
            {openApps.length > 0 && (
              <>
                <span className="text-white/40">·</span>
                <span className="font-medium text-white/80">
                  {APPS.find((app) => app.id === activeApp)?.name || ""}
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-5 text-white/80">
            <span className="flex items-center gap-1">
              {connectionType === 'ethernet' ? (
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3 1h10v8H5V6zm2 2v4h6V8H7z" />
                  <path d="M3 8h1v4H3V8zm13 0h1v4h-1V8z" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              )}
              {connectionType === 'ethernet' ? 'Ethernet' : 'Wi-Fi'}
            </span>
            {batteryLevel !== null && (
              <span className="flex items-center gap-1">
                {getBatteryIcon()}
                <span>{batteryLevel}%</span>
              </span>
            )}
            <span>{formatTime(currentTime)}</span>
            <span>{formatDate(currentTime)}</span>
          </div>
        </div>
      )}

      {/* Iconos del escritorio - ocultos en fullscreen */}
      {!hasFullscreen && (
        <div className="absolute inset-0 z-0 pointer-events-none">
        {APPS.map((app) => (
          <DesktopIcon
            key={app.id}
            app={app}
            onClick={() => toggleApp(app.id)}
            position={iconPositions[app.id]}
            onPositionChange={(pos) => {
              setIconPositions((prev) => ({
                ...prev,
                [app.id]: pos,
              }));
            }}
          />
        ))}
        </div>
      )}

      {/* Ventanas */}
      {openApps.includes("finder") && (
        <AppWindow
          title="Finder"
          onClose={() => closeApp("finder")}
          onFocus={() => setActiveApp("finder")}
          isActive={activeApp === "finder"}
          position={windowPositions.finder}
          onPositionChange={(pos) => handleWindowPositionChange("finder", pos)}
          size={windowSizes.finder}
          onSizeChange={(size) => handleWindowSizeChange("finder", size)}
          isFullscreen={fullscreenApps.has("finder")}
          onToggleFullscreen={() => toggleFullscreen("finder")}
          isMinimized={minimizedApps.has("finder")}
          onMinimize={() => toggleMinimize("finder")}
          onToggleCompact={() => toggleWindowCompact("finder")}
        >
          <p className="mb-2 text-gray-200">
            Welcome to <span className="font-semibold text-white">Marwil CampOS</span>.
          </p>
          <p className="text-gray-300">
            This is a macOS-like desktop built with Next.js and Tailwind.  
            You can turn each app into a section of your portfolio: About,
            Projects, Contact, etc.
          </p>
        </AppWindow>
      )}

      {openApps.includes("about") && (
        <AppWindow
          title="About Me"
          onClose={() => closeApp("about")}
          onFocus={() => setActiveApp("about")}
          isActive={activeApp === "about"}
          position={windowPositions.about}
          onPositionChange={(pos) => handleWindowPositionChange("about", pos)}
          size={windowSizes.about}
          onSizeChange={(size) => handleWindowSizeChange("about", size)}
          isFullscreen={fullscreenApps.has("about")}
          onToggleFullscreen={() => toggleFullscreen("about")}
          isMinimized={minimizedApps.has("about")}
          onMinimize={() => toggleMinimize("about")}
          onToggleCompact={() => toggleWindowCompact("about")}
        >
          <h2 className="text-lg font-semibold mb-2 text-white">Hi, I&apos;m Marwil 👋</h2>
          <p className="mb-2 text-gray-200">
            Senior Frontend Engineer focused on React, Next.js, Angular and
            Node/NestJS. I like turning complex products into clean, modern and
            high-performant UIs.
          </p>
          <p className="text-gray-300">
            7+ years building web and mobile apps, working with teams across
            LATAM and the US.
          </p>
        </AppWindow>
      )}

      {openApps.includes("projects") && (
        <AppWindow
          title="Projects"
          onClose={() => closeApp("projects")}
          onFocus={() => setActiveApp("projects")}
          isActive={activeApp === "projects"}
          position={windowPositions.projects}
          onPositionChange={(pos) => handleWindowPositionChange("projects", pos)}
          size={windowSizes.projects}
          onSizeChange={(size) => handleWindowSizeChange("projects", size)}
          isFullscreen={fullscreenApps.has("projects")}
          onToggleFullscreen={() => toggleFullscreen("projects")}
          isMinimized={minimizedApps.has("projects")}
          onMinimize={() => toggleMinimize("projects")}
          onToggleCompact={() => toggleWindowCompact("projects")}
        >
          <ul className="space-y-3">
            <li>
              <h3 className="font-semibold text-white">Task Manager (Next.js + NestJS)</h3>
              <p className="text-gray-300">
                Fullstack CRUD with auth, database and AI suggestions for task
                titles.
              </p>
            </li>
            <li>
              <h3 className="font-semibold text-white">Pynpon Mobile App</h3>
              <p className="text-gray-300">
                Ionic + Angular app with geolocation, real-time features and
                push notifications.
              </p>
            </li>
            <li>
              <h3 className="font-semibold text-white">Admin Dashboard UI</h3>
              <p className="text-gray-300">
                Modern analytics dashboard using React, Tailwind and charts.
              </p>
            </li>
          </ul>
        </AppWindow>
      )}

      {openApps.includes("contact") && (
        <AppWindow
          title="Contact"
          onClose={() => closeApp("contact")}
          onFocus={() => setActiveApp("contact")}
          isActive={activeApp === "contact"}
          position={windowPositions.contact}
          onPositionChange={(pos) => handleWindowPositionChange("contact", pos)}
          size={windowSizes.contact}
          onSizeChange={(size) => handleWindowSizeChange("contact", size)}
          isFullscreen={fullscreenApps.has("contact")}
          onToggleFullscreen={() => toggleFullscreen("contact")}
          isMinimized={minimizedApps.has("contact")}
          onMinimize={() => toggleMinimize("contact")}
          onToggleCompact={() => toggleWindowCompact("contact")}
        >
          <p className="mb-3 text-gray-200">
            Let&apos;s work together or just say hi 👋
          </p>
          <ul className="space-y-2">
            <li className="text-gray-200">
              Email:{" "}
              <a
                href="mailto:tu-email@correo.com"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                tu-email@correo.com
              </a>
            </li>
            <li className="text-gray-200">
              GitHub:{" "}
              <a
                href="https://github.com/tu-usuario"
                className="text-blue-400 hover:text-blue-300 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/tu-usuario
              </a>
            </li>
            <li className="text-gray-200">
              LinkedIn:{" "}
              <a
                href="https://linkedin.com/in/tu-usuario"
                className="text-blue-400 hover:text-blue-300 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/tu-usuario
              </a>
            </li>
          </ul>
        </AppWindow>
      )}

      {openApps.includes("apps") && (
        <AppWindow
          title="Applications"
          onClose={() => closeApp("apps")}
          onFocus={() => setActiveApp("apps")}
          isActive={activeApp === "apps"}
          position={windowPositions.apps}
          onPositionChange={(pos) => handleWindowPositionChange("apps", pos)}
          size={windowSizes.apps}
          onSizeChange={(size) => handleWindowSizeChange("apps", size)}
          isFullscreen={fullscreenApps.has("apps")}
          onToggleFullscreen={() => toggleFullscreen("apps")}
          isMinimized={minimizedApps.has("apps")}
          onMinimize={() => toggleMinimize("apps")}
          onToggleCompact={() => toggleWindowCompact("apps")}
        >
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6">
            {APPS.filter((app) => app.id !== "apps").map((app) => (
              <button
                key={app.id}
                onClick={() => {
                  toggleApp(app.id);
                  setActiveApp(app.id);
                }}
                className="relative flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-white/10 transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <div className="text-5xl mb-1">{app.icon}</div>
                <span className="text-xs text-gray-200 text-center font-medium">
                  {app.name}
                </span>
                {openApps.includes(app.id) && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500" />
                )}
              </button>
            ))}
          </div>
        </AppWindow>
      )}

      {/* Dock - oculto en fullscreen */}
      {!hasFullscreen && (
        <Dock openApps={openApps} onToggleApp={toggleApp} />
      )}
    </div>
  );
}
