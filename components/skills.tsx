import React from "react";
import { Code2, Layout, Database, Cpu } from "lucide-react";

const skills = [
  { name: "React / Next.js", icon: <Layout className="w-6 h-6" /> },
  { name: "TypeScript / JavaScript", icon: <Code2 className="w-6 h-6" /> },
  { name: "Tailwind / Shadcn UI", icon: <Layout className="w-6 h-6" /> },
  { name: "Node.js / Express", icon: <Cpu className="w-6 h-6" /> },
  { name: "MongoDB / MySQL", icon: <Database className="w-6 h-6" /> },
  { name: "FastAPI / Django", icon: <Cpu className="w-6 h-6" /> },
];

const Skills = () => {
  return (
    <section className="max-w-6xl mx-auto mt-24 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
        {skills.map((skill, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition"
          >
            <div className="text-indigo-500">{skill.icon}</div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
