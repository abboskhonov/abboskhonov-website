"use client";
import React from "react";
import { Calendar, Building2 } from "lucide-react";
import Image from "next/image";
import CognilabsLogo from '@/public/cognilabs.jpg';

const experiences = [
  {
    role: "Frontend Developer",
    company: "Cognilabs",
    duration: "05.2025 – Present",
    description:
      "Leading frontend development with Next.js, Shadcn, Zustand, and i18n. Built integrations and admin dashboards.",
    current: true,
    logo: CognilabsLogo,
  }
];

const Experience = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="mb-12">
        <h2 className="text-3xl font-semibold tracking-tight mb-2">Experience</h2>
        <p className="text-muted-foreground">My professional journey and key projects</p>
      </div>

      <div className="space-y-6">
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            className="group relative bg-card border rounded-lg p-6 hover:shadow-md transition-all duration-200"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold">{exp.role}</h3>
                  {exp.current && (
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  )}
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-2">
                    {exp.logo ? (
                      <Image 
                        src={exp.logo} 
                        alt={`${exp.company} logo`}
                        width={20}
                        height={20}
                        className="rounded-sm"
                      />
                    ) : (
                      <Building2 className="h-4 w-4" />
                    )}
                    <span>{exp.company}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{exp.duration}</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;