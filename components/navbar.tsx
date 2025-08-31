"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; // hamburger + close icons

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  // { name: "Resume", href: "/resume" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 left-0 z-50 dark:bg-background bg-background">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo / Name */}
        <h1 className="text-2xl font-semibold  dark:text-white">
          abboskhonov
        </h1>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-8 font-medium">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`transition-colors ${
                  pathname === link.href
                    ? "text-black dark:text-white font-semibold"
                    : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-800 dark:text-gray-200"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu (absolute overlay instead of pushing content) */}
      {open && (
      <div className="md:hidden absolute top-full left-0 w-full shadow-md z-100 bg-white  dark:bg-background">
          <ul className="flex flex-col space-y-4 p-4 font-medium">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)} // close menu on click
                  className={`block transition-colors ${
                    pathname === link.href
                      ? "text-black dark:text-white font-semibold"
                      : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
