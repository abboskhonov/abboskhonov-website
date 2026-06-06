import { ThemeToggle } from "@/components/theme-toggle";

interface HeaderProps {
  name: string;
  title: string;
  company: string;
  companyHref: string;
  location: string;
}

export function Header({ name, title, company, companyHref, location }: HeaderProps) {
  return (
    <header className="mx-auto mb-8 max-w-prose">
      <div className="mb-2 flex items-start justify-between gap-4">
        <div>
          <div className="text-4xl font-bold text-neutral-900 transition-colors dark:text-neutral-100">
            {name}
          </div>
        </div>
        <ThemeToggle />
      </div>
      <div className="text-neutral-400 transition-colors dark:text-neutral-600">
        {title} at{" "}
        <a
          href={companyHref}
          className="text-neutral-500 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-700 dark:text-neutral-500 dark:decoration-neutral-700 dark:hover:text-neutral-300"
        >
          {company}
        </a>
        {" · "}{location}
      </div>
    </header>
  );
}
