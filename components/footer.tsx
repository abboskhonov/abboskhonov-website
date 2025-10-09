import React from "react";
import { SiTelegram, SiX, SiInstagram, SiLinkedin } from "react-icons/si";
import { HiOutlineMail } from "react-icons/hi";
import { FiPaperclip } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="mt-12 py-6 pb-40">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <div>
          <span className="text-sm text-muted-foreground">
            © 2025 abboskhonov
          </span>
        </div>

        <div className="flex items-center gap-1 text-foreground/90">
          <a
            href="https://x.com/yourhandle"
            aria-label="X"
            className="p-1.5 rounded-full hover:bg-popover/60 transition-colors"
          >
            <SiX size={15} />
          </a>

          <a
            href="https://github.com/yourhandle"
            aria-label="GitHub"
            className="p-1.5 rounded-full hover:bg-popover/60 transition-colors"
          >
            <SiTelegram size={15} />
          </a>

          <a
            href="https://instagram.com/yourhandle"
            aria-label="Instagram"
            className="p-1.5 rounded-full hover:bg-popover/60 transition-colors"
          >
            <SiInstagram size={15} />
          </a>

          <a
            href="https://linkedin.com/in/yourhandle"
            aria-label="LinkedIn"
            className="p-1.5 rounded-full hover:bg-popover/60 transition-colors"
          >
            <SiLinkedin size={15} />
          </a>

          <a
            href="mailto:you@example.com"
            aria-label="Email"
            className="p-1.5 rounded-full hover:bg-popover/60 transition-colors"
          >
            <HiOutlineMail size={15} />
          </a>

          <a
            href="/resume.pdf"
            aria-label="Resume"
            className="p-1.5 rounded-full hover:bg-popover/60 transition-colors"
          >
            <FiPaperclip size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
