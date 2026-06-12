import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTelegram,
  IconBrandX,
  IconCalendar,
  IconExternalLink,
  IconMail,
} from "@tabler/icons-react";

interface BioLink {
  label: string;
  href: string;
}

interface HeroProps {
  bio: React.ReactNode;
  socialLinks: BioLink[];
}

const iconMap: Record<string, React.ReactNode> = {
  GitHub: <IconBrandGithub className="h-4 w-4" />,
  Telegram: <IconBrandTelegram className="h-4 w-4" />,
  LinkedIn: <IconBrandLinkedin className="h-4 w-4" />,
  X: <IconBrandX className="h-4 w-4" />,
  Email: <IconMail className="h-4 w-4" />,
  "Book a call": <IconCalendar className="h-4 w-4" />,
};

export function Hero({ bio, socialLinks }: HeroProps) {
  return (
    <section className="mx-auto mb-20 max-w-prose">
      <div className="space-y-5 text-neutral-600 transition-colors dark:text-neutral-400">
        {bio}
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-2">
        {socialLinks.map((link) => (
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
    </section>
  );
}
