"use client";

import { useEffect } from "react";
import type { AppId } from "@/lib/apps";
import { APPS } from "@/lib/apps";
import type { UserApp } from "@/lib/userApps";

type iOSAppProps = {
  appId?: AppId;
  userApp?: UserApp;
  onClose: () => void;
};

export default function IosApp({ appId, userApp, onClose }: iOSAppProps) {
  useEffect(() => {
    // Prevenir scroll del body cuando la app está abierta
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

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
              <p className="text-white/70">
                7+ years building web and mobile apps, working with teams across LATAM and the US.
              </p>
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
                  <h3 className="text-xl font-semibold text-white mb-2">Task Manager (Next.js + NestJS)</h3>
                  <p className="text-white/80">
                    Fullstack CRUD with auth, database and AI suggestions for task titles.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Pynpon Mobile App</h3>
                  <p className="text-white/80">
                    Ionic + Angular app with geolocation, real-time features and push notifications.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Admin Dashboard UI</h3>
                  <p className="text-white/80">
                    Responsive admin dashboard template with data visualization and user management features.
                  </p>
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
                  href="mailto:tu-email@correo.com"
                  className="block bg-white/10 backdrop-blur-xl rounded-2xl p-4 text-white hover:bg-white/20 transition-colors"
                >
                  <div className="font-semibold">Email</div>
                  <div className="text-white/80">tu-email@correo.com</div>
                </a>
                <a
                  href="https://github.com/tu-usuario"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/10 backdrop-blur-xl rounded-2xl p-4 text-white hover:bg-white/20 transition-colors"
                >
                  <div className="font-semibold">GitHub</div>
                  <div className="text-white/80">github.com/tu-usuario</div>
                </a>
                <a
                  href="https://linkedin.com/in/tu-usuario"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/10 backdrop-blur-xl rounded-2xl p-4 text-white hover:bg-white/20 transition-colors"
                >
                  <div className="font-semibold">LinkedIn</div>
                  <div className="text-white/80">linkedin.com/in/tu-usuario</div>
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
                href="/resume.pdf"
                download
                className="px-8 py-4 bg-white text-gray-900 rounded-2xl font-semibold text-lg hover:bg-white/90 transition-colors text-center"
              >
                Download PDF
              </a>
              <a
                href="/resume.pdf"
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
    <div className="fixed inset-0 z-40 bg-gradient-to-br from-gray-900 via-gray-800 to-black animate-fade-in">
      {/* Status bar superior */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 pt-safe pb-2 text-white text-xs">
        <div className="flex items-center gap-1">
          <span>{new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: false })}</span>
        </div>
        <button
          onClick={onClose}
          className="px-5 py-1.5 bg-white/20 backdrop-blur-xl rounded-full text-white text-sm font-semibold active:scale-95 transition-transform"
        >
          Done
        </button>
      </div>

      {/* Contenido de la app */}
      <div className="pt-16 h-full overflow-hidden">
        {renderContent()}
      </div>

      {/* Indicador de swipe para cerrar estilo iOS */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-white/40 rounded-full" />
    </div>
  );
}

