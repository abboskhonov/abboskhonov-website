"use client";
import React from "react";

const experiences = [
  {
    company: "etamin",
    url: "https://etamin.digital",
    role: "frontend engineer",
    duration: "Nov 2025 – Present",
    description:
      "Contributing to the front-of-site experience with a focus on performance, accessibility, and motion design across marketing properties.",
    current: true,
  },
  {
    company: "cognilabs",
    url: "https://cognilabs.org",
    role: "frontend developer",
    duration: "May 2025 – Nov 2025 · 7 mo",
    description:
      "Built CRMs, dashboards, and landing pages using Next.js, Shadcn UI, and Zustand.",
    current: false,
  },
];

const Experience = () => {
  return (
    <section className="max-w-3xl mx-auto mt-16 border-b border-border pb-10">
      <h2 className="text-lg font-medium mb-6 text-foreground">experiences:</h2>

      <div className="space-y-10">
        {experiences.map((exp, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-foreground">
                  <a
                    href={exp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline underline-offset-4 decoration-muted-foreground transition-colors"
                  >
                    {exp.company}
                  </a>
                </h3>
                {exp.current && (
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                )}
              </div>
              <span className="text-sm text-muted-foreground">{exp.duration}</span>
            </div>

            <p className="italic text-muted-foreground text-sm">{exp.role}</p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
