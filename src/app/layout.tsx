import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { SessionWrapper } from "@/components/session-wrapper";

import { authOptions } from "@/lib/auth";
import { MainNav } from "@/components/nav/main-nav";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
// import { ThemeProvider } from "@/components/theme-provider"
import { ThemeProvider } from "next-themes";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "DevCraft",
    template: "%s | DevCraft",
  },
  description: "A modern blog platform built with Next.js",
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
          {/* <SessionProvider session={session}> */}
          <SessionWrapper session={session}>
            <div className="relative flex min-h-screen flex-col">
              <MainNav />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </SessionWrapper>
          {/* </SessionProvider> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
