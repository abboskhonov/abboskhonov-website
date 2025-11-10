import React from "react";
import {
  SiTelegram,
  SiX,
  SiInstagram,
  SiLinkedin,
  SiGithub,
} from "react-icons/si";
import { HiOutlineMail } from "react-icons/hi";
import { FiPaperclip } from "react-icons/fi";

const Footer = () => {
  const links = [
    { icon: <SiX size={15} />, url: "https://x.com/abboskhonow", label: "X" },
    { icon: <SiTelegram size={15} />, url: "https://t.me/abboskhonow", label: "Telegram" },
    { icon: <SiGithub size={15} />, url: "https://github.com/abboskhonov", label: "GitHub" },
    { icon: <SiInstagram size={15} />, url: "https://instagram.com/abboskhonow", label: "Instagram" },
    { icon: <SiLinkedin size={15} />, url: "https://linkedin.com/in/abboskhonov", label: "LinkedIn" },
    { icon: <HiOutlineMail size={15} />, url: "mailto:abboskhonow@gmail.com", label: "Email" },
    { icon: <FiPaperclip size={15} />, url: "/resume.pdf", label: "Resume" },
  ];

  return (
    <footer className="mt-12 py-6 pb-40">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <div>
          <span className="text-sm text-muted-foreground">
            © 2025 abboskhonov
          </span>
        </div>

        <div className="flex items-center gap-1 text-foreground/90">
          {links.map((link, idx) => (
            <div key={idx} className="relative group">
              <a
                href={link.url}
                aria-label={link.label}
                target={link.url.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="p-1.5 rounded-full hover:bg-popover/60 transition-colors flex items-center justify-center"
              >
                {link.icon}
              </a>

              {/* Tooltip */}
              <span
                className="
                  absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                  opacity-0 scale-90 translate-y-2
                  group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-[-4px]
                  bg-popover text-xs text-foreground px-2 py-1 rounded-md border border-border whitespace-nowrap
                  transition-all duration-300 ease-out pointer-events-none
                "
              >
                {link.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
