import { ThemeToggle } from "@/components/theme-toggle";

interface HeaderProps {
  name: string;
  title: string;
  location: string;
}

export function Header({ name, title, location }: HeaderProps) {
  return (
    <header className="mx-auto mb-20 max-w-prose">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="text-xl font-semibold text-neutral-900 transition-colors dark:text-neutral-100">
            {name}
          </div>
          <div className="text-neutral-500 transition-colors dark:text-neutral-500">
            {title}
          </div>
        </div>
        <ThemeToggle />
      </div>
      <div className="text-neutral-400 transition-colors dark:text-neutral-600">
        {location}
      </div>
    </header>
  );
}
