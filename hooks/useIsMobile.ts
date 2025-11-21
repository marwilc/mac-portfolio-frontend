"use client";

import { useState, useEffect } from "react";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Detectar por ancho de pantalla
      const isMobileWidth = window.innerWidth < 768;
      
      // Detectar por user agent
      const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      
      setIsMobile(isMobileWidth || isMobileUserAgent);
    };

    // Verificar al montar
    checkMobile();

    // Escuchar cambios de tamaño
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return isMobile;
}

