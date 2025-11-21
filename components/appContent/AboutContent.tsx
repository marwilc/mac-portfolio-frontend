import { ABOUT_CONTENT } from "@/lib/appContent";

type AboutContentProps = {
  variant?: "desktop" | "mobile";
};

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const renderIcon = (iconType: string, className: string) => {
  switch (iconType) {
    case "linkedin":
      return <LinkedInIcon className={className} />;
    case "github":
      return <GitHubIcon className={className} />;
    default:
      return null;
  }
};

export default function AboutContent({ variant = "desktop" }: AboutContentProps) {
  const isMobile = variant === "mobile";

  if (isMobile) {
    return (
      <div className="p-6 h-full overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-4">{ABOUT_CONTENT.title}</h1>
          <p className="text-white/80 text-lg mb-4">{ABOUT_CONTENT.description}</p>
          <p className="text-white/70 mb-6">{ABOUT_CONTENT.experience}</p>
          
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-4">
            <h2 className="text-xl font-semibold text-white mb-3">{ABOUT_CONTENT.professionalExperience.title}</h2>
            <div className="space-y-4">
              {ABOUT_CONTENT.professionalExperience.items.map((item, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-white mb-2">{item.company}</h3>
                  <p className="text-white/80 text-sm mb-2">{item.description}</p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium inline-flex items-center gap-1"
                  >
                    {item.linkText} →
                  </a>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-3">{ABOUT_CONTENT.connect.title}</h2>
            <div className="space-y-3">
              {ABOUT_CONTENT.connect.links.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-base font-medium inline-flex items-center gap-2"
                >
                  {renderIcon(link.iconType, "w-5 h-5")}
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop variant
  return (
    <>
      <h2 className="text-lg font-semibold mb-2 text-white">{ABOUT_CONTENT.title}</h2>
      <p className="mb-2 text-gray-200">{ABOUT_CONTENT.description}</p>
      <p className="mb-4 text-gray-300">{ABOUT_CONTENT.experience}</p>
      
      <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10 mb-4">
        <h3 className="font-semibold text-white mb-3">{ABOUT_CONTENT.professionalExperience.title}</h3>
        <div className="space-y-3">
          {ABOUT_CONTENT.professionalExperience.items.map((item, index) => (
            <div key={index}>
              <h4 className="font-semibold text-white text-sm mb-1">{item.company}</h4>
              <p className="text-gray-200 text-sm mb-2">{item.description}</p>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-xs font-medium"
              >
                {item.linkText}
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
        <h3 className="font-semibold text-white mb-3">{ABOUT_CONTENT.connect.title}</h3>
        <div className="space-y-2">
          {ABOUT_CONTENT.connect.links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-sm font-medium inline-flex items-center gap-2"
            >
              {renderIcon(link.iconType, "w-4 h-4")}
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

