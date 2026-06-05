interface Experience {
  company: string;
  title: string;
  period: string;
  description: string;
  stack: string;
}

interface ExperienceProps {
  items: Experience[];
}

export function Experience({ items }: ExperienceProps) {
  return (
    <section className="mx-auto mb-20 max-w-prose">
      <h2 className="mb-8 text-lg font-semibold text-neutral-900 transition-colors dark:text-neutral-100">
        Experience
      </h2>
      <div className="space-y-10">
        {items.map((exp) => (
          <div key={exp.company}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-medium text-neutral-800 transition-colors dark:text-neutral-300">
                {exp.company}
              </span>
              <span className="text-neutral-500 transition-colors dark:text-neutral-500">
                {exp.title}
              </span>
            </div>
            <div className="mt-1 text-sm text-neutral-400 transition-colors dark:text-neutral-600">
              {exp.period}
            </div>
            <p className="mt-3 text-neutral-600 transition-colors dark:text-neutral-400">
              {exp.description}
            </p>
            <p className="mt-2 text-sm text-neutral-400 transition-colors dark:text-neutral-600">
              {exp.stack}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
