import { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface Experience {
  company: string;
  title: string;
  period: string;
  description: string;
  stack: string;
  logo?: string;
}

interface ExperienceProps {
  items: Experience[];
}

export function Experience({ items }: ExperienceProps) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="mb-20">
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
        <div className="shrink-0 lg:w-40">
          <h2 className="text-lg font-semibold text-neutral-900 transition-colors dark:text-neutral-100">
            Experience
          </h2>
        </div>
        <div className="flex-1">
          <div className="divide-y divide-neutral-200 transition-colors dark:divide-neutral-800">
            {items.map((exp, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={exp.company}>
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    className="flex w-full items-start justify-between py-4 text-left transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      {exp.logo && (
                        <img
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          className="mt-0.5 h-5 w-5 rounded object-contain"
                        />
                      )}
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-neutral-800 transition-colors dark:text-neutral-300">
                          {exp.company}
                        </span>
                        <span className="text-sm text-neutral-500 transition-colors dark:text-neutral-500">
                          {exp.title}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-400 transition-colors dark:text-neutral-600">
                      <span>{exp.period}</span>
                      <IconChevronDown
                        className={cn(
                          "h-4 w-4 shrink-0 transition-transform duration-200",
                          isOpen && "rotate-180"
                        )}
                      />
                    </div>
                  </button>
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-out",
                      isOpen ? "max-h-96 pb-4 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <p className="text-neutral-600 transition-colors dark:text-neutral-400">
                      {exp.description}
                    </p>
                    <p className="mt-2 text-sm text-neutral-400 transition-colors dark:text-neutral-600">
                      {exp.stack}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
