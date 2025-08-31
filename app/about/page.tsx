import React from "react";
import Navbar from "../../components/navbar";
import Skills from "@/components/skills";
import Experience from "@/components/experience";

const AboutPage = () => {
  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-20 space-y-0">
        {/* Bio */}
        <section className="text-lg text-black dark:text-gray-300 leading-relaxed">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Me
          </h1>

          <p className="mb-4">
            I&apos;m a 16-year-old frontend developer from Uzbekistan, passionate about building modern, responsive web apps. I specialize in <span className="font-semibold text-foreground">React</span> and <span className="font-semibold text-foreground">Next.js</span>, focusing on clean code, performance, and user experience.
          </p>

          <p className="mb-4">
            My journey began with curiosity about how websites work, which quickly turned into a passion for creating digital experiences that solve real problems. I enjoy experimenting with new frameworks and technologies, and I&apos;m always learning.
          </p>

          <p>
            Beyond coding, I explore AI, stay updated on tech trends, and love turning ideas into interactive web experiences.
          </p>
        </section>

        {/* Skills */}
        <Skills />
       
      </main>
    </>
  );
};

export default AboutPage;
