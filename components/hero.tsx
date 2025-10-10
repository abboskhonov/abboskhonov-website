import Link from "next/link";

const Hero = () => {
  return (
    <div className="space-y-4 text-foreground/60 leading-relaxed mt-20">
      <p>i&apos;m a 16-year-old developer based in Uzbekistan.</p>

      <p>
        currently, a frontend developer at{" "}
        <Link
          href="https://cognilabs.uz"
          className="underline underline-offset-4 hover:text-foreground transition-colors mr-0.5"
        >
          cognilabs
        </Link>
        , working on web apps and ui systems with next.js and typescript.
      </p>

      <p>
        in my spare time, i enjoy reading, building side projects, exploring ai
        tools, and learning new technologies.
      </p>
    </div>
  );
};

export default Hero;
