import {
  TypescriptOriginal,
  NextjsOriginal,
  ReactOriginal,
  TailwindcssOriginal,
  MongodbOriginal,
  NodejsOriginal,
  ExpressOriginal,
} from "devicons-react";
import Link from "next/link";

const Skills = () => {
  const skills = [
    {
      name: "next.js",
      icon: <NextjsOriginal size={20} />,
      url: "https://nextjs.org",
      desc: "react framework for production-grade apps",
    },
    {
      name: "typescript",
      icon: <TypescriptOriginal size={20} />,
      url: "https://www.typescriptlang.org",
      desc: "type-safe javascript for scalable development",
    },
    {
      name: "react",
      icon: <ReactOriginal size={20} />,
      url: "https://react.dev",
      desc: "component-based ui library by facebook",
    },
    {
      name: "tailwind",
      icon: <TailwindcssOriginal size={20} />,
      url: "https://tailwindcss.com",
      desc: "utility-first css framework for modern ui",
    },
    {
      name: "node.js",
      icon: <NodejsOriginal size={20} />,
      url: "https://nodejs.org",
      desc: "server-side javascript runtime",
    },
    {
      name: "express",
      icon: <ExpressOriginal size={20} />,
      url: "https://expressjs.com",
      desc: "minimal and flexible node.js web framework",
    },
    {
      name: "mongodb",
      icon: <MongodbOriginal size={20} />,
      url: "https://www.mongodb.com",
      desc: "document-oriented nosql database",
    },
  ];

  return (
    <div className="mt-10 border-b border-border pb-6">
      <h1 className="text-lg font-medium mb-4 text-foreground">
        generally i be with:
      </h1>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <Link
            key={skill.name}
            href={skill.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-2 border border-border px-3 py-1.5 rounded-md text-sm text-foreground hover:bg-popover transition-colors"
          >
            {skill.icon}
            <span>{skill.name}</span>

            {/* Tooltip */}
            <span
              className="
                absolute bottom-full left-1/2 -translate-x-1/2 mb-2 
                opacity-0 scale-90 translate-y-2
                group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-[-4px]
                bg-popover text-xs text-foreground px-2 py-1 rounded-md border border-border whitespace-nowrap
                transition-all duration-300 ease-out pointer-events-none
              "
            >
              {skill.desc}
            </span>

          </Link>
        ))}
      </div>
    </div>
  );
};

export default Skills;
