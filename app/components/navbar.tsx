import React from "react";

const Navbar = () => {
  return (
    <nav className="transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo / Name */}
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Abboskhonov
        </h1>

        {/* Links */}
        <ul className="flex space-x-8 font-medium">
          <li className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer">
            Projects
          </li>
          <li className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer">
            Contact
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
