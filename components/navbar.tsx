"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
      {/* Logo */}
      <Link href="/" className="font-semibold text-3xl">
        abboskhonov
      </Link>

      {/* Links + Theme toggle */}
      <div className="flex items-center justify-start md:justify-end gap-4 sm:gap-7">
        <Link href="/blog">blog</Link>
        <Link href="/projects">projects</Link>

        <button
          aria-label="Toggle theme"
          onClick={toggleTheme}
          className="inline-flex items-center justify-center h-8 w-8 rounded-md border-none p-1"
        >
          {mounted ? (
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <mask id="half-mask">
                  <rect x="0" y="0" width="24" height="24" fill="white" />
                  <rect x="12" y="0" width="12" height="24" fill="black" />
                </mask>
              </defs>
              <circle
                cx="12"
                cy="12"
                r="9"
                fill="currentColor"
                mask="url(#half-mask)"
              />
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeOpacity="0.9"
                fill="none"
              />
            </svg>
          ) : (
            <span className="h-5 w-5 block" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
