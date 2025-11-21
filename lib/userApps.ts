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
    id: "pynpon",
    name: "Pynpon",
    icon: "🛒",
    description: "Digital business platform for publishing products, services and much more. A comprehensive marketplace solution for businesses to showcase and manage their offerings.",
    url: "https://pynpon.com/",
    technologies: ["Angular", "NestJS", "PostgreSQL"],
  },
  {
    id: "marwilc",
    name: "Documents Web App",
    icon: "☁️",
    description: "Cloud storage platform similar to Google Drive with a built-in document editor module like Google Docs. Store and manage your files in the cloud with collaborative editing capabilities.",
    url: "https://www.marwilc.xyz/",
    technologies: ["Angular", "NestJS", "PostgreSQL", "WebSockets"],
  },
  {
    id: "ionic-movies",
    name: "Movies App",
    icon: "🎬",
    description: "Mobile application to display movie listings and information. Built with Ionic and Capacitor, integrated with a movies API to show current releases, ratings, and movie details.",
    url: "https://marwilc.github.io/ionic-movies-app",
    technologies: ["Ionic", "Capacitor", "Angular", "Movies API"],
  },
  {
    id: "ionic-photosgram",
    name: "Photosgram",
    icon: "📸",
    description: "Instagram-like social media application built with Ionic and Angular. Features photo sharing, user profiles, and social interactions. Backend powered by a custom NestJS API.",
    url: "https://marwilc.github.io/ionic-photosgram-app",
    technologies: ["Ionic", "Angular", "NestJS", "Custom API"],
  },
  {
    id: "solutionsary",
    name: "Solutionsary",
    icon: "🏭",
    description: "Landing page for an industrial supplies and services company. Showcases services, maintenance solutions, and commercial partnerships. Built with vanilla HTML, JavaScript and CSS.",
    url: "https://solutionsary.com/",
    technologies: ["HTML", "JavaScript", "CSS", "Vanilla JS"],
  },
  {
    id: "corporacion-cdt",
    name: "Corporación CDT",
    icon: "🏢",
    description: "Landing page for an industrial supplies and engineering services company. Features company values, mission, vision, services, and commercial partnerships. Built with vanilla HTML, JavaScript and CSS.",
    url: "https://corporacioncdt.com/",
    technologies: ["HTML", "JavaScript", "CSS", "Vanilla JS"],
  },
];

