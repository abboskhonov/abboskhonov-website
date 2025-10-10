import {
  TypescriptOriginal,
  NextjsOriginal,
  ReactOriginal,
  TailwindcssOriginal,
  MongodbOriginal,
  NodejsOriginal,
  ExpressOriginal,
} from "devicons-react";

const Skills = () => {
  const skills = [
    { name: "next.js", icon: <NextjsOriginal size={20} /> },
    { name: "typescript", icon: <TypescriptOriginal size={20} /> },
    { name: "react", icon: <ReactOriginal size={20} /> },
    { name: "tailwind", icon: <TailwindcssOriginal size={20} /> },
    { name: "node.js", icon: <NodejsOriginal size={20} /> },
    { name: "express", icon: <ExpressOriginal size={20} /> },
    { name: "mongodb", icon: <MongodbOriginal size={20} /> },
  ];

  return (
    <div className="mt-10 border-b border-border pb-6">
      <h1 className="text-lg font-medium mb-4 text-foreground">
        generally i be with:
      </h1>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex items-center gap-2 border border-border px-3 py-1.5 rounded-md text-sm text-foreground hover:bg-popover transition-colors"
          >
            {skill.icon}
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
