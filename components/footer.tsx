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
            href="https://x.com/abboskhonow"
            aria-label="X"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-full hover:bg-popover/60 transition-colors"
          >
            <SiX size={15} />
          </a>

          <a
            href="https://t.me/abboskhonow"
            aria-label="Telegram"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-full hover:bg-popover/60 transition-colors"
          >
            <SiTelegram size={15} />
          </a>

          <a
            href="https://github.com/abboskhonov"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-full hover:bg-popover/60 transition-colors"
          >
            <SiGithub size={15} />
          </a>

          <a
            href="https://instagram.com/abboskhonow"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-full hover:bg-popover/60 transition-colors"
          >
            <SiInstagram size={15} />
          </a>

          <a
            href="https://linkedin.com/in/abboskhonov"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-full hover:bg-popover/60 transition-colors"
          >
            <SiLinkedin size={15} />
          </a>

          <a
            href="mailto:abboskhonow@gmail.com"
            aria-label="Email"
            target="_blank"
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
