"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFavoritesStore } from "@/store/favorites";

export default function Navbar() {
  const pathname = usePathname();
  const favorites = useFavoritesStore((s) => s.favorites);

  const links = [
    { href: "/", label: "Characters" },
    { href: "/favorites", label: `Favorites (${favorites.length})` },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur border-b border-green-500/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🌀</span>
          <span className="font-bold text-green-400 text-lg tracking-tight">
            Rick & Morty
          </span>
        </Link>
        <div className="flex items-center gap-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === href
                  ? "bg-green-500/20 text-green-400"
                  : "text-gray-400 hover:text-green-400 hover:bg-green-500/10"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
