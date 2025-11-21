import { FINDER_CONTENT } from "@/lib/appContent";

type FinderContentProps = {
  variant?: "desktop" | "mobile";
};

export default function FinderContent({ variant = "desktop" }: FinderContentProps) {
  const isMobile = variant === "mobile";

  if (isMobile) {
    return (
      <div className="p-6 h-full overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-4">
            {FINDER_CONTENT.title} <span className="text-blue-400">{FINDER_CONTENT.titleHighlight}</span>
          </h1>
          <p className="text-white/80 text-lg mb-4">{FINDER_CONTENT.description}</p>
        </div>
      </div>
    );
  }

  // Desktop variant
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2 text-white">
        {FINDER_CONTENT.title} <span className="text-blue-400">{FINDER_CONTENT.titleHighlight}</span>
      </h1>
      <p className="text-gray-200">{FINDER_CONTENT.description}</p>
    </div>
  );
}

