"use client";

import { useState, useEffect } from "react";
import HomeScreen from "./HomeScreen";
import IosApp from "./iOSApp";
import StatusBar from "./StatusBar";
import BootScreen from "../BootScreen";
import LoginScreen from "../LoginScreen";
import type { AppId } from "@/lib/apps";
import type { UserApp } from "@/lib/userApps";

export default function IosDesktop() {
  const [openApp, setOpenApp] = useState<AppId | null>(null);
  const [openUserApp, setOpenUserApp] = useState<UserApp | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isBooting, setIsBooting] = useState(true);

  const handleLogin = () => {
    localStorage.setItem("macOS_loggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("macOS_loggedIn");
    setOpenApp(null);
    setOpenUserApp(null);
    setIsLoggedIn(false);
  };

  const handleBootComplete = () => {
    setIsBooting(false);
  };

  useEffect(() => {
    setIsMounted(true);
    const hasLoggedIn = localStorage.getItem("macOS_loggedIn") === "true";
    setIsLoggedIn(hasLoggedIn);
    
    if (hasLoggedIn) {
      setTimeout(() => {
        setIsBooting(false);
      }, 500);
    }
  }, []);

  // Mostrar pantalla de boot solo si no hay sesión iniciada
  if (isBooting && isMounted && !isLoggedIn) {
    return <BootScreen onComplete={handleBootComplete} />;
  }

  // Si hay sesión iniciada, mostrar pantalla negra mientras carga
  if (isBooting && isMounted && isLoggedIn) {
    return <div className="fixed inset-0 z-[200] bg-black" />;
  }

  // Mostrar pantalla de login si no está logueado
  if (isMounted && !isLoggedIn && !isBooting) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const handleAppOpen = (appId: AppId) => {
    setOpenApp(appId);
    setOpenUserApp(null);
  };

  const handleUserAppOpen = (app: UserApp) => {
    setOpenUserApp(app);
    setOpenApp(null);
  };

  const handleAppClose = () => {
    setOpenApp(null);
    setOpenUserApp(null);
  };

  // Si hay una app abierta, mostrar solo la app
  if (openApp || openUserApp) {
    return (
      <>
        <StatusBar />
        <IosApp
          appId={openApp || undefined}
          userApp={openUserApp || undefined}
          onClose={handleAppClose}
        />
      </>
    );
  }

  // Mostrar Home Screen
  return (
    <>
      <StatusBar />
      <HomeScreen onAppOpen={handleAppOpen} onUserAppOpen={handleUserAppOpen} />
    </>
  );
}

