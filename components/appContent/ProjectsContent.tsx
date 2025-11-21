import { USER_APPS } from "@/lib/userApps";

type ProjectsContentProps = {
  variant?: "desktop" | "mobile";
};

export default function ProjectsContent({ variant = "desktop" }: ProjectsContentProps) {
  const isMobile = variant === "mobile";

  if (isMobile) {
    return (
      <div className="p-6 h-full overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-white mb-6">Projects</h1>
          <div className="space-y-4">
            {USER_APPS.map((project) => (
              <div key={project.id} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {project.name} {project.icon}
                </h3>
                <p className="text-white/80">{project.description}</p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-blue-400 hover:text-blue-300 text-sm font-medium"
                >
                  Visit project →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Desktop variant
  return (
    <ul className="space-y-3">
      {USER_APPS.map((project) => (
        <li key={project.id}>
          <h3 className="font-semibold text-white">
            {project.name} {project.icon}
          </h3>
          <p className="text-gray-300">{project.description}</p>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 text-sm font-medium mt-1 inline-block"
          >
            Visitar proyecto →
          </a>
        </li>
      ))}
    </ul>
  );
}

