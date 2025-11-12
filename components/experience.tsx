  "use client";
  import React from "react";
  
  const experiences = [
    {
      company: "cognilabs",
      role: "lead frontend developer",
      duration: "may 2025 – present",
      description:
        "Led the frontend team and built CRMs, dashboards, and landing pages using Next.js, Shadcn UI, and Zustand.",

      current: true,
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
                    {exp.company}
                  </h3>
                  {exp.current && (
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  {exp.duration}
                </span>
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
