"use client";



const skills = [
  // Languages
  "JavaScript",
  "Python",
  "TypeScript",

  // Frontend
  "React.js",
  "Next.js",
  "Tailwind CSS",
  "Zustand",
  "React Query",

  // Backend & APIs
  "Node.js",
  "Express",

  // Databases
  "MongoDB",
  "PostgreSQL",

  // Auth & Backend-as-a-Service
  "Supabase",
  "Clerk",
  "OAuth",
  "JWT",
];

export default function Skills() {
  return (
    <section className="py-20 text-center">
      {/* Heading */}
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">
          Skills & Technologies
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          A collection of tools and technologies I use to design, build, and deliver modern web applications.
        </p>
      </div>

      {/* Skills Cloud */}
      <ul
        role="list"
        className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto px-4"
        aria-label="Technical skills"
      >
        {skills.map((skill, index) => (
          <li
            key={skill}
            style={{ animationDelay: `${index * 80}ms` }}
            className="px-5 py-2 rounded-full bg-muted/60 dark:bg-muted/40 border border-border/50 text-sm font-medium flex items-center gap-2 shadow-sm hover:shadow-lg hover:border-primary/50 hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary dark:hover:text-primary-foreground transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 opacity-95 hover:opacity-100 group"
          >
            {/* <Code2 className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 text-primary/70" /> */}
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}