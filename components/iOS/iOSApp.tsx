"use client";

import { useEffect, useState, useRef } from "react";
import type { AppId } from "@/lib/apps";
import { APPS } from "@/lib/apps";
import type { UserApp } from "@/lib/userApps";

type iOSAppProps = {
  appId?: AppId;
  userApp?: UserApp;
  onClose: () => void;
};

export default function IosApp({ appId, userApp, onClose }: iOSAppProps) {
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
            Visitar aplicación
          </a>
        </div>
      );
    }

    switch (appId) {
      case "finder":
        return (
          <div className="p-6 h-full overflow-y-auto">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-3xl font-bold text-white mb-4">
                Welcome to <span className="text-blue-400">Marwil CampOS</span>
              </h1>
              <p className="text-white/80 text-lg mb-4">
                This is a macOS-like desktop built with Next.js and Tailwind. You can turn each app into a section of your portfolio: About, Projects, Contact, etc.
              </p>
            </div>
          </div>
        );
      case "about":
        return (
          <div className="p-6 h-full overflow-y-auto">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-3xl font-bold text-white mb-4">Hi, I&apos;m Marwil 👋</h1>
              <p className="text-white/80 text-lg mb-4">
                Senior Frontend Engineer focused on React, Next.js, Angular and Node/NestJS. I like turning complex products into clean, modern and high-performant UIs.
              </p>
              <p className="text-white/70 mb-6">
                7+ years building web and mobile apps, working with teams across LATAM and the US.
              </p>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-4">
                <h2 className="text-xl font-semibold text-white mb-3">💼 Professional Experience</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-white mb-2">SURA CL</h3>
                    <p className="text-white/80 text-sm mb-2">
                      Worked on multiple features for the AFP Capital application, including withdrawal flows and other critical financial functionalities. Contributed to building robust and user-friendly interfaces for pension management.
                    </p>
                    <a
                      href="https://www.afpcapital.cl/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-sm font-medium inline-flex items-center gap-1"
                    >
                      Ver AFP Capital →
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <h2 className="text-xl font-semibold text-white mb-3">🔗 Connect</h2>
                <div className="space-y-3">
                  <a
                    href="https://www.linkedin.com/in/marwilc/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-base font-medium inline-flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                  <div>
                    <a
                      href="https://github.com/marwilc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-base font-medium inline-flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "projects":
        return (
          <div className="p-6 h-full overflow-y-auto">
            <div className="max-w-2xl mx-auto space-y-6">
              <h1 className="text-3xl font-bold text-white mb-6">Projects</h1>
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Pynpon 🛒</h3>
                  <p className="text-white/80">
                    Digital business platform for publishing products, services and much more. A comprehensive marketplace solution for businesses to showcase and manage their offerings.
                  </p>
                  <a
                    href="https://pynpon.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-blue-400 hover:text-blue-300 text-sm font-medium"
                  >
                    Visitar proyecto →
                  </a>
                </div>
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Documents Web App ☁️</h3>
                  <p className="text-white/80">
                    Cloud storage platform similar to Google Drive with a built-in document editor module like Google Docs. Store and manage your files in the cloud with collaborative editing capabilities.
                  </p>
                  <a
                    href="https://www.marwilc.xyz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-blue-400 hover:text-blue-300 text-sm font-medium"
                  >
                    Visitar proyecto →
                  </a>
                </div>
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Movies App 🎬</h3>
                  <p className="text-white/80">
                    Mobile application to display movie listings and information. Built with Ionic and Capacitor, integrated with a movies API to show current releases, ratings, and movie details.
                  </p>
                  <a
                    href="https://marwilc.github.io/ionic-movies-app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-blue-400 hover:text-blue-300 text-sm font-medium"
                  >
                    Visitar proyecto →
                  </a>
                </div>
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Photosgram 📸</h3>
                  <p className="text-white/80">
                    Instagram-like social media application built with Ionic and Angular. Features photo sharing, user profiles, and social interactions. Backend powered by a custom NestJS API.
                  </p>
                  <a
                    href="https://marwilc.github.io/ionic-photosgram-app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-blue-400 hover:text-blue-300 text-sm font-medium"
                  >
                    Visitar proyecto →
                  </a>
                </div>
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Solutionsary 🏭</h3>
                  <p className="text-white/80">
                    Landing page for an industrial supplies and services company. Showcases services, maintenance solutions, and commercial partnerships. Built with vanilla HTML, JavaScript and CSS.
                  </p>
                  <a
                    href="https://solutionsary.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-blue-400 hover:text-blue-300 text-sm font-medium"
                  >
                    Visitar proyecto →
                  </a>
                </div>
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Corporación CDT 🏢</h3>
                  <p className="text-white/80">
                    Landing page for an industrial supplies and engineering services company. Features company values, mission, vision, services, and commercial partnerships. Built with vanilla HTML, JavaScript and CSS.
                  </p>
                  <a
                    href="https://corporacioncdt.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-blue-400 hover:text-blue-300 text-sm font-medium"
                  >
                    Visitar proyecto →
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      case "contact":
        return (
          <div className="p-6 h-full overflow-y-auto">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-3xl font-bold text-white mb-6">Contact</h1>
              <p className="text-white/80 text-lg mb-6">
                Let&apos;s work together or just say hi 👋
              </p>
              <div className="space-y-4">
                <a
                  href="mailto:marwilcampos@gmail.com"
                  className="block bg-white/10 backdrop-blur-xl rounded-2xl p-4 text-white hover:bg-white/20 transition-colors"
                >
                  <div className="font-semibold">Email</div>
                  <div className="text-white/80">marwilcampos@gmail.com</div>
                </a>
                <a
                  href="https://github.com/marwilc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/10 backdrop-blur-xl rounded-2xl p-4 text-white hover:bg-white/20 transition-colors"
                >
                  <div className="font-semibold">GitHub</div>
                  <div className="text-white/80">github.com/marwilc</div>
                </a>
                <a
                  href="https://www.linkedin.com/in/marwilc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/10 backdrop-blur-xl rounded-2xl p-4 text-white hover:bg-white/20 transition-colors"
                >
                  <div className="font-semibold">LinkedIn</div>
                  <div className="text-white/80">linkedin.com/in/marwilc</div>
                </a>
              </div>
            </div>
          </div>
        );
      case "resume":
        return (
          <div className="flex flex-col items-center justify-center h-full gap-6 p-6">
            <div className="text-8xl mb-4">📄</div>
            <h1 className="text-3xl font-bold text-white mb-2">My Resume</h1>
            <p className="text-white/80 text-center max-w-md mb-6">
              Download or view my resume/CV to learn more about my experience, skills, and qualifications.
            </p>
            <div className="flex flex-col gap-4">
              <a
                href="https://drive.google.com/uc?export=download&id=1dIHxrrd_YIpd0A7X5Jmn2zj3TqrN--uj"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-gray-900 rounded-2xl font-semibold text-lg hover:bg-white/90 transition-colors text-center"
              >
                Download PDF
              </a>
              <a
                href="https://drive.google.com/file/d/1dIHxrrd_YIpd0A7X5Jmn2zj3TqrN--uj/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white/20 backdrop-blur-xl text-white rounded-2xl font-semibold text-lg hover:bg-white/30 transition-colors text-center"
              >
                View Online
              </a>
            </div>
          </div>
        );
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

