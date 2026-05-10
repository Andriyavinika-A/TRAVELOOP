import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Traveloop – AI-Powered Travel Planning",
  description: "Plan smarter trips with AI-generated itineraries, budget optimization, and collaborative sharing.",
  keywords: "travel planning, AI itinerary, trip planner, travel app",
  openGraph: {
    title: "Traveloop – AI-Powered Travel Planning",
    description: "Plan smarter trips with AI-generated itineraries",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="mesh-bg" />
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
