import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

interface HeaderProps {
  name: string;
  title: string;
  company: string;
  companyHref: string;
  location: string;
}

function useLocalTime(offset: number) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const d = new Date();
      const utc = d.getTime() + d.getTimezoneOffset() * 60000;
      const local = new Date(utc + offset * 3600000);
      const h = String(local.getHours()).padStart(2, "0");
      const m = String(local.getMinutes()).padStart(2, "0");
      setTime(`${h}:${m}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [offset]);
  return time;
}

export function Header({ name, company, companyHref, location }: HeaderProps) {
  const time = useLocalTime(5);
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
        swe at{" "}
        <a
          href={companyHref}
          className="text-neutral-500 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-700 dark:text-neutral-500 dark:decoration-neutral-700 dark:hover:text-neutral-300"
        >
          {company}
        </a>
        {" · "}{location}
        {time && (
          <>
            {" · "}{time}
          </>
        )}
      </div>
    </header>
  );
}
