import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTelegram,
  IconBrandX,
  IconExternalLink,
} from "@tabler/icons-react";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  links: FooterLink[];
  version?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  GitHub: <IconBrandGithub className="h-4 w-4" />,
  Telegram: <IconBrandTelegram className="h-4 w-4" />,
  LinkedIn: <IconBrandLinkedin className="h-4 w-4" />,
  X: <IconBrandX className="h-4 w-4" />,
};

export function Footer({ links, version = "v1.0.0" }: FooterProps) {
  return (
    <footer className="mx-auto max-w-prose border-t border-neutral-200 pt-12 transition-colors dark:border-neutral-800">
      <div className="mb-6 text-lg font-semibold text-neutral-900 transition-colors dark:text-neutral-100">
        Connect
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            {...(link.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
            className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-100 px-3 py-1.5 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
          >
            {iconMap[link.label] ?? <IconExternalLink className="h-4 w-4" />}
            {link.label}
          </a>
        ))}
      </div>
      <div className="mt-12 flex items-center justify-between text-sm text-neutral-300 transition-colors dark:text-neutral-700">
        <span>Version</span>
        <span>{version}</span>
      </div>
    </footer>
  );
}
