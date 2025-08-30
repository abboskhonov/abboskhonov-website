import React from "react";
import Navbar from "../../components/navbar";
import Skills from "@/components/skills";

const AboutPage = () => {
  return (
    <>
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-20 space-y-24">
        {/* Bio */}
        <section className="text-lg text-black dark:text-gray-300 leading-relaxed">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Who Am I
          </h1>

          <p className="mb-4">
            I&apos;m a passionate full-stack developer from Uzbekistan who loves
            building modern, responsive web applications. At just 15 years old,
            I&apos;ve already gained professional experience as a frontend developer
            at{" "}
            <span className="font-semibold text-foreground">Cognilabs</span>.
          </p>

          <p className="mb-4">
            My journey in web development started with curiosity about how
            websites work and grew into a passion for creating digital
            experiences that solve real problems. I specialize in React and
            Next.js, focusing on clean code, performance, and user experience.
          </p>

          <p>
            Outside of coding, I explore AI, experiment with frameworks, and
            stay curious about emerging technologies.
          </p>
        </section>

        {/* Skills */}
        <Skills />
      </main>
    </>
  );
};

export default AboutPage;
