"use client";

import { ReactNode, useRef, useState, useEffect } from "react";

type AppWindowProps = {
  title: string;
  children: ReactNode;
  onClose: () => void;
  onFocus: () => void;
  isActive?: boolean;
  position?: { x: number; y: number };
  onPositionChange?: (position: { x: number; y: number }) => void;
  size?: { width: number; height: number };
  onSizeChange?: (size: { width: number; height: number }) => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  isMinimized?: boolean;
  onMinimize?: () => void;
  onToggleCompact?: () => void;
};

export default function AppWindow({
  title,
  children,
  onClose,
  onFocus,
  isActive,
  position = { x: 0, y: 0 },
  onPositionChange,
  size = { width: 0, height: 0 },
  onSizeChange,
  isFullscreen = false,
  onToggleFullscreen,
  isMinimized = false,
  onMinimize,
  onToggleCompact,
}: AppWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string>("");
  const [resizeStart, setResizeStart] = useState({ 
    mouseX: 0, 
    mouseY: 0, 
    startX: 0, 
    startY: 0, 
    width: 0, 
    height: 0 
  });
  const titleBarClickStartRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  useEffect(() => {
    if (!isDragging && !isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing && onSizeChange && windowRef.current) {
        const deltaX = e.clientX - resizeStart.mouseX;
        const deltaY = e.clientY - resizeStart.mouseY;
        
        let newWidth = resizeStart.width;
        let newHeight = resizeStart.height;
        let newX = resizeStart.startX;
        let newY = resizeStart.startY;

        const minWidth = 400;
        const minHeight = 300;

        if (resizeDirection.includes("e")) {
          newWidth = Math.max(minWidth, resizeStart.width + deltaX);
        }
        if (resizeDirection.includes("w")) {
          newWidth = Math.max(minWidth, resizeStart.width - deltaX);
          newX = resizeStart.startX + deltaX;
        }
        if (resizeDirection.includes("s")) {
          newHeight = Math.max(minHeight, resizeStart.height + deltaY);
        }
        if (resizeDirection.includes("n")) {
          newHeight = Math.max(minHeight, resizeStart.height - deltaY);
          newY = resizeStart.startY + deltaY;
        }

        // Limitar dentro de la pantalla
        const maxWidth = window.innerWidth - newX;
        const maxHeight = window.innerHeight - newY;
        newWidth = Math.min(newWidth, maxWidth);
        newHeight = Math.min(newHeight, maxHeight);
        
        // Asegurar que no se salga de los límites
        if (newX + newWidth > window.innerWidth) {
          newWidth = window.innerWidth - newX;
        }
        if (newY + newHeight > window.innerHeight) {
          newHeight = window.innerHeight - newY;
        }
        if (newX < 0) {
          newWidth += newX;
          newX = 0;
        }
        if (newY < 0) {
          newHeight += newY;
          newY = 0;
        }

        onSizeChange({ width: Math.max(minWidth, newWidth), height: Math.max(minHeight, newHeight) });
        if (onPositionChange && (resizeDirection.includes("w") || resizeDirection.includes("n"))) {
          onPositionChange({ x: Math.max(0, newX), y: Math.max(0, newY) });
        }
      } else if (isDragging && onPositionChange) {
        const newX = e.clientX - dragOffsetRef.current.x;
        const newY = e.clientY - dragOffsetRef.current.y;
        
        const currentWidth = size.width || windowRef.current?.offsetWidth || 0;
        const currentHeight = size.height || windowRef.current?.offsetHeight || 0;
        const maxX = window.innerWidth - currentWidth;
        const maxY = window.innerHeight - currentHeight;
        
        const boundedX = Math.max(0, Math.min(newX, maxX));
        const boundedY = Math.max(0, Math.min(newY, maxY));
        
        onPositionChange({ x: boundedX, y: boundedY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      isDraggingRef.current = false;
      setIsResizing(false);
      setResizeDirection("");
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, resizeDirection, resizeStart, onPositionChange, onSizeChange, position, size]);

  const handleTitleBarDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // No permitir doble clic en fullscreen
    if (isFullscreen) return;
    
    // Alternar entre tamaño compacto y expandido
    if (onToggleCompact) {
      onToggleCompact();
    }
  };

  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    // Solo activar la ventana, sin arrastre
    onFocus();
  };

  const handleFullscreenClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFullscreen) {
      onToggleFullscreen();
    }
  };

  const handleMinimizeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onMinimize) {
      onMinimize();
    }
  };

  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    if (!windowRef.current || !onSizeChange) return;
    
    onFocus();
    const rect = windowRef.current.getBoundingClientRect();
    const currentX = position.x || rect.left;
    const currentY = position.y || rect.top;
    
    setResizeStart({
      mouseX: e.clientX,
      mouseY: e.clientY,
      startX: currentX,
      startY: currentY,
      width: rect.width,
      height: rect.height,
    });
    setResizeDirection(direction);
    setIsResizing(true);
  };

  const handleWindowClick = (e: React.MouseEvent) => {
    // Solo activar si no se está haciendo click en un botón, en un área de resize, o en la barra de título
    const target = e.target as HTMLElement;
    const isButton = target.closest('button');
    const isResizeHandle = target.closest('[class*="cursor-nwse-resize"], [class*="cursor-nesw-resize"], [class*="cursor-ns-resize"], [class*="cursor-ew-resize"]');
    const isTitleBar = target.closest('[class*="border-b"]') && target.closest('[class*="bg-gray-800"]');
    
    // Si no es un botón, ni un handle de resize, ni la barra de título, activar la ventana
    // (La barra de título ya tiene su propio handler que llama a onFocus)
    if (!isButton && !isResizeHandle && !isTitleBar) {
      onFocus();
    }
  };

  // Determinar si la ventana está posicionada o debe estar centrada
  const isPositioned = position.x !== 0 || position.y !== 0;
  const hasCustomSize = size.width > 0 && size.height > 0;

  // Si está minimizada, ocultar la ventana
  if (isMinimized) {
    return null;
  }

  // Calcular estilos dinámicos
  const windowStyle: React.CSSProperties = isFullscreen
    ? {
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        transform: "none",
      }
    : hasCustomSize
    ? {
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        transform: "none",
      }
    : {
        left: isPositioned ? `${position.x}px` : "50%",
        top: isPositioned ? `${position.y}px` : "20%",
        transform: isPositioned ? "none" : "translateX(-50%)",
      };

  return (
    <div
      ref={windowRef}
      className={`group fixed ${
        isFullscreen
          ? "rounded-none"
          : hasCustomSize
          ? "rounded-2xl"
          : "w-[90%] max-w-3xl rounded-2xl"
      } border border-white/20 bg-gray-900/95 backdrop-blur-2xl ${
        isFullscreen ? "" : "shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
      } ${
        isDragging || isResizing ? "transition-none" : "transition-all"
      } ${
        isActive ? "scale-100 opacity-100 z-20" : "opacity-100 z-10"
      }`}
      style={windowStyle}
      onMouseDown={handleWindowClick}
    >
      {/* Barra superior tipo macOS 2025 (tema oscuro) - área de arrastre */}
      {title && (
        <div
          onMouseDown={(e) => {
            e.stopPropagation();
            handleTitleBarMouseDown(e);
          }}
          onDoubleClick={handleTitleBarDoubleClick}
          className={`flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-gray-800/50 ${
            isFullscreen ? "rounded-none" : "rounded-t-2xl"
          } select-none`}
        >
        <div className="flex gap-2">
          <button
            aria-label="Close"
            onClick={onClose}
            className="h-3 w-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
          />
          <button
            aria-label="Minimize"
            onClick={handleMinimizeClick}
            className="h-3 w-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
          />
          <button
            aria-label="Toggle Fullscreen"
            onClick={handleFullscreenClick}
            className="h-3 w-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
          />
        </div>
        <span className="text-sm font-medium text-white/90">{title}</span>
        <div className="w-12" />
      </div>
      )}

      {/* Contenido */}
      <div
        className={`${title ? "p-6" : "p-0"} overflow-auto text-sm text-gray-100 ${
          title
            ? isFullscreen
              ? "h-[calc(100vh-3rem)]"
              : hasCustomSize
              ? "h-[calc(100%-3rem)]"
              : "max-h-[60vh]"
            : "h-full"
        }`}
      >
        {children}
      </div>

      {/* Resize handles - mostrar si tiene tamaño personalizado o si está posicionada */}
      {!isFullscreen && (hasCustomSize || isPositioned) && (
        <>
          {/* Esquinas */}
          <div
            onMouseDown={(e) => handleResizeStart(e, "nw")}
            className="absolute top-0 left-0 w-3 h-3 cursor-nwse-resize z-20"
          />
          <div
            onMouseDown={(e) => handleResizeStart(e, "ne")}
            className="absolute top-0 right-0 w-3 h-3 cursor-nesw-resize z-20"
          />
          <div
            onMouseDown={(e) => handleResizeStart(e, "sw")}
            className="absolute bottom-0 left-0 w-3 h-3 cursor-nesw-resize z-20"
          />
          <div
            onMouseDown={(e) => handleResizeStart(e, "se")}
            className="absolute bottom-0 right-0 w-3 h-3 cursor-nwse-resize z-20"
          />
          {/* Bordes */}
          <div
            onMouseDown={(e) => handleResizeStart(e, "n")}
            className="absolute top-0 left-3 right-3 h-1 cursor-ns-resize z-20"
          />
          <div
            onMouseDown={(e) => handleResizeStart(e, "s")}
            className="absolute bottom-0 left-3 right-3 h-1 cursor-ns-resize z-20"
          />
          <div
            onMouseDown={(e) => handleResizeStart(e, "w")}
            className="absolute left-0 top-3 bottom-3 w-1 cursor-ew-resize z-20"
          />
          <div
            onMouseDown={(e) => handleResizeStart(e, "e")}
            className="absolute right-0 top-3 bottom-3 w-1 cursor-ew-resize z-20"
          />
        </>
      )}
    </div>
  );
}
