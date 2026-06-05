import { IconExternalLink } from "@tabler/icons-react";

interface BioLink {
  label: string;
  href: string;
}

interface HeroProps {
  bio: React.ReactNode;
  socialLinks: BioLink[];
}

export function Hero({ bio, socialLinks }: HeroProps) {
  return (
    <section className="mx-auto mb-20 max-w-prose">
      <div className="space-y-5 text-neutral-600 transition-colors dark:text-neutral-400">
        {bio}
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-4 text-neutral-500 transition-colors dark:text-neutral-500">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-neutral-800 dark:hover:text-neutral-200"
          >
            <IconExternalLink className="h-4 w-4" />
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
