export type UserApp = {
  id: string;
  name: string;
  icon: string;
  description: string;
  url: string;
  technologies?: string[];
};

export const USER_APPS: UserApp[] = [
  {
    id: "task-manager",
    name: "Task Manager",
    icon: "✅",
    description: "Fullstack CRUD application with authentication, database integration, and AI-powered task title suggestions.",
    url: "https://example.com/task-manager",
    technologies: ["Next.js", "NestJS", "PostgreSQL", "OpenAI"],
  },
  {
    id: "pynpon",
    name: "Pynpon Mobile",
    icon: "📱",
    description: "Ionic + Angular mobile application with geolocation, real-time features, and push notifications.",
    url: "https://example.com/pynpon",
    technologies: ["Ionic", "Angular", "Firebase"],
  },
  {
    id: "admin-dashboard",
    name: "Admin Dashboard",
    icon: "📊",
    description: "Modern analytics dashboard built with React, Tailwind CSS, and interactive charts.",
    url: "https://example.com/admin-dashboard",
    technologies: ["React", "Tailwind CSS", "Chart.js"],
  },
  {
    id: "marwilc",
    name: "Documents Web App",
    icon: "☁️",
    description: "Cloud storage platform similar to Google Drive with a built-in document editor module like Google Docs. Store and manage your files in the cloud with collaborative editing capabilities.",
    url: "https://www.marwilc.xyz/",
    technologies: ["Angular", "NestJS", "PostgreSQL", "WebSockets"],
  },
];

