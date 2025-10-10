'use client '
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
        <div className="animate-fade-in-up">
          <Hero />
        </div>
        <div className="animate-fade-in-up delay-200">
          <Skills />
        </div>
        <div className="animate-fade-in-up delay-400">
          <Experience />
        </div>
        <div className="animate-fade-in-up delay-600">
          <GitContribution />
        </div>
        <div className="animate-fade-in-up delay-800">
          <Contact />
        </div>
        <div className="animate-fade-in-up delay-1000">
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default Page;