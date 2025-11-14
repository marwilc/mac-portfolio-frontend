export type AppId = "finder" | "about" | "projects" | "contact" | "apps";

export type AppConfig = {
  id: AppId;
  name: string;
  icon: string; // puedes cambiar luego a SVGs
};

export const APPS: AppConfig[] = [
  { id: "finder", name: "Finder", icon: "📁" },
  { id: "about", name: "About Me", icon: "👤" },
  { id: "projects", name: "Projects", icon: "💻" },
  { id: "contact", name: "Contact", icon: "✉️" },
  { id: "apps", name: "Applications", icon: "🚀" },
];