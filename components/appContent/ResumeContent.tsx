import { RESUME_CONTENT } from "@/lib/appContent";

type ResumeContentProps = {
  variant?: "desktop" | "mobile";
};

export default function ResumeContent({ variant = "desktop" }: ResumeContentProps) {
  const isMobile = variant === "mobile";

  if (isMobile) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-6 p-6">
        <div className="text-8xl mb-4">{RESUME_CONTENT.icon}</div>
        <h1 className="text-3xl font-bold text-white mb-2">{RESUME_CONTENT.title}</h1>
        <p className="text-white/80 text-center max-w-md mb-6">{RESUME_CONTENT.description}</p>
        <div className="flex flex-col gap-4">
          <a
            href={RESUME_CONTENT.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white text-gray-900 rounded-2xl font-semibold text-lg hover:bg-white/90 transition-colors text-center"
          >
            Download PDF
          </a>
          <a
            href={RESUME_CONTENT.viewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white/20 backdrop-blur-xl text-white rounded-2xl font-semibold text-lg hover:bg-white/30 transition-colors text-center"
          >
            View Online
          </a>
        </div>
      </div>
    );
  }

  // Desktop variant
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-6xl">{RESUME_CONTENT.icon}</div>
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-white mb-3">{RESUME_CONTENT.title}</h2>
        <p className="text-gray-300 mb-6 max-w-md">{RESUME_CONTENT.description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={RESUME_CONTENT.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>Download PDF</span>
          </a>
          <a
            href={RESUME_CONTENT.viewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span>View Online</span>
          </a>
        </div>
      </div>
    </div>
  );
}

