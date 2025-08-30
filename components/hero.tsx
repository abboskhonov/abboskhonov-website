import React from "react";
import Image from "next/image";
import Pfp from "@/public/pfp.jpg";
import { Button } from "@/components/ui/button"; // shadcn button
import Link from "next/link";

const Hero = () => {
  return (
    <div className="min-h-8xl max-w-6xl mx-auto mt-20 px-4">
      {/* Top row: Image + Name/Role */}
      <div className="flex flex-col items-center md:flex-row gap-8 md:items-center text-center md:text-left">
        <section>
          <Image
            src={Pfp}
            width={200}
            height={200}
            className="rounded-full mx-auto md:mx-0"
            alt="pfp"
          />
        </section>

        <section>
          <h1 className="text-4xl md:text-5xl font-bold">
            Abror Abboskhonov
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 mt-2 font-medium">
            Frontend Developer at Cognilabs
          </p>
        </section>
      </div>

      {/* Bio */}
      <section className="mt-6 max-w-3xl mx-auto md:mx-0 text-center md:text-left">
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
          I’m a passionate developer from Uzbekistan, building modern web apps
          with React, Next.js, and Tailwind. I love creating clean,
          user-friendly interfaces and exploring AI-powered platforms.
        </p>
      </section>

      {/* CTA buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 text-center md:text-left">
        <Button asChild variant="default" size="lg" className="px-8 font-semibold">
          <Link href="/#projects">View My Work</Link>
        </Button>

        <Button asChild variant="outline" size="lg" className="px-8 font-semibold">
          <Link href="/contact">Contact Me</Link>
        </Button>
      </div>
    </div>
  );
};

export default Hero;
