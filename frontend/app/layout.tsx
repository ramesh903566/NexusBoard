import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { NavigationDrawer } from "@/components/NavigationDrawer";
import { TopAppBar } from "@/components/TopAppBar";
import { BottomNavBar } from "@/components/BottomNavBar";
import AuthProvider from "@/components/AuthProvider";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NexusBoard — Unified Personal Analytics",
  description:
    "Aggregate, normalize, and contextualize your multi-dimensional digital footprint across Coding, Productivity, Social, and Career pillars.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="text-on-surface font-sans antialiased h-screen overflow-hidden flex">
        <AuthProvider>
          {/* Desktop Sidebar */}
          <NavigationDrawer />

          {/* Main Content */}
          <div className="flex-1 flex flex-col h-full overflow-hidden relative">
            <TopAppBar />
            <main className="flex-1 overflow-y-auto pb-32 md:pb-0">
              {children}
            </main>
          </div>

          {/* Mobile Bottom Nav */}
          <BottomNavBar />
        </AuthProvider>
      </body>
    </html>
  );
}
