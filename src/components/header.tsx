// src/components/Header.tsx
"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600">
          DevCraft
        </Link>
        <nav className="space-x-6 text-sm font-medium text-gray-700">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/posts">Blog</Link>
          <Link href="/login">Login</Link>
        </nav>
      </div>
    </header>
  );
}
