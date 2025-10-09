import React from "react";
import Navbar from "../components/navbar";
import Hero from "../components/hero";
import Skills from "@/components/skills";
import Experience from "@/components/experience";
import Footer from "@/components/footer";
import Contact from "@/components/contact";
import GitContribution from "@/components/git-contribution";

const Page = () => {
  return (
    <main className="mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-xl sm:max-w-2xl lg:max-w-3xl">
      <Navbar />
      <div className="space-y-8 sm:space-y-12">
        <Hero />
        <Skills />
        <Experience />
        <GitContribution />
        <Contact />
        <Footer />
      </div>
    </main>
  );
};

export default Page;
