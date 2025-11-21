"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import Desktop from "@/components/Desktop";
import IosDesktop from "@/components/iOS/iOSDesktop";

export default function HomePage() {
  const isMobile = useIsMobile();

  // Mostrar iOS en móvil, macOS en desktop
  return isMobile ? <IosDesktop /> : <Desktop />;
}