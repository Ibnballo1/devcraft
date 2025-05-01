import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth/next";
import { SessionWrapper } from "@/components/session-wrapper";

import { authOptions } from "@/lib/auth";
import { MainNav } from "@/components/nav/main-nav";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "DevCraft",
    template: "%s | DevCraft",
  },
  description:
    "DevCraft is a modern, developer-first blog platform focused on everything web development — from front-end frameworks to backend architectures, tooling, deployment strategies, and emerging tech trends. Built with Next.js and powered by a sleek, minimal UI, DevCraft delivers insightful content, tutorials, and best practices for web developers at all levels.",
  keywords: ["blog", "nextjs", "react", "typescript"],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionWrapper session={session}>
            <div className="relative flex min-h-screen flex-col">
              <MainNav />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </SessionWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
