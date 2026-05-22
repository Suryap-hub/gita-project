import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Gita Mentor AI — Ancient Wisdom, Modern Life",
  description:
    "An AI-powered spiritual mentor chatbot guided by the timeless wisdom of the Bhagavad Gita. Get personalized guidance for modern life challenges.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Ambient background orbs */}
        <div className="ambient-orb orb-1" />
        <div className="ambient-orb orb-2" />
        <div className="ambient-orb orb-3" />

        <Navbar />
        <main style={{ position: "relative", zIndex: 1 }}>{children}</main>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "rgba(26, 26, 46, 0.9)",
              color: "#f0f0f5",
              border: "1px solid rgba(99, 102, 241, 0.2)",
              backdropFilter: "blur(12px)",
            },
          }}
        />
      </body>
    </html>
  );
}
