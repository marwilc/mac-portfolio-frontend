import { CONTACT_CONTENT } from "@/lib/appContent";

type ContactContentProps = {
  variant?: "desktop" | "mobile";
};

export default function ContactContent({ variant = "desktop" }: ContactContentProps) {
  const isMobile = variant === "mobile";

  if (isMobile) {
    return (
      <div className="p-6 h-full overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-6">{CONTACT_CONTENT.title}</h1>
          <p className="text-white/80 text-lg mb-6">{CONTACT_CONTENT.subtitle}</p>
          <div className="space-y-4">
            {CONTACT_CONTENT.items.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target={item.type === "Email" ? undefined : "_blank"}
                rel={item.type === "Email" ? undefined : "noopener noreferrer"}
                className="block bg-white/10 backdrop-blur-xl rounded-2xl p-4 text-white hover:bg-white/20 transition-colors"
              >
                <div className="font-semibold">{item.type}</div>
                <div className="text-white/80">{item.value}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Desktop variant
  return (
    <>
      <p className="mb-3 text-gray-200">{CONTACT_CONTENT.subtitle}</p>
      <ul className="space-y-2">
        {CONTACT_CONTENT.items.map((item, index) => (
          <li key={index} className="text-gray-200">
            {item.type}:{" "}
            <a
              href={item.url}
              target={item.type === "Email" ? undefined : "_blank"}
              rel={item.type === "Email" ? undefined : "noopener noreferrer"}
              className="text-blue-400 hover:text-blue-300 underline"
            >
              {item.value}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

