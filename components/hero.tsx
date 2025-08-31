"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Pfp from "@/public/pfp.jpg";
import { Button } from "@/components/ui/button"; // shadcn button
import Link from "next/link";
import NextjsLogo from "@/public/nextjs-logo.png";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="min-h-8xl max-w-6xl mx-auto mt-20 px-4">
      {/* Top row: Image + Name/Role */}
      <div className="flex flex-col items-center md:flex-row gap-8 md:items-center text-center md:text-left">
        <section 
          className={`transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Image
            src={Pfp}
            width={200}
            height={200}
            className="rounded-full mx-auto md:mx-0"
            alt="pfp"
          />
        </section>
      <section
  className={`transition-all duration-700 ease-out ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
  }`}
  style={{ transitionDelay: "200ms" }}
>
  <h1 className="text-4xl md:text-5xl font-bold flex items-center justify-center md:justify-start gap-3">
    Abror Abboskhonov
    <Image
      src={NextjsLogo}
      alt="Next.js"
      width={32}
      height={32}
      className="inline-block"
    />
  </h1>
  <p className="text-xl md:text-2xl text-gray-500 mt-2 font-medium">
    Frontend Developer at Cognilabs
  </p>
</section>

      </div>

      {/* Bio */}
      <section 
        className={`mt-6 max-w-3xl mx-auto md:mx-0 text-center md:text-left transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "400ms" }}
      >
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
          I'm a passionate developer from Uzbekistan, building modern web apps
          with React, Next.js, and Tailwind. I love creating clean,
          user-friendly interfaces and exploring AI-powered platforms.
        </p>
      </section>

      {/* CTA buttons */}
      <div 
        className={`mt-8 flex flex-col sm:flex-row gap-4 text-center md:text-left transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "600ms" }}
      >
        <Button asChild variant="default" size="lg" className="px-8 font-semibold">
          <Link href="/projects">View My Work</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="px-8 font-semibold">
          <Link href="/contact">Contact Me</Link>
        </Button>
      </div>
    </div>
  );
};

export default Hero;