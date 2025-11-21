import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marwil CampOS · macOS 2025 Style",
  description: "Portfolio as a macOS 2025 desktop by Marwil Campos.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Marwil CampOS",
  },
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen w-screen overflow-hidden antialiased">
        {children}
      </body>
    </html>
  );
}