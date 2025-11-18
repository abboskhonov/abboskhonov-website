import Link from "next/link";

const Hero = () => {
  return (
    <div className="space-y-4 text-foreground/60 leading-relaxed mt-20">
      <p>
        hey, i’m abror. i build things for the web and try to make them look and feel right.
      </p>

      <p>
        i work at{" "}
        <Link
          href="https://etamin.digital"
          target="_blank"
          className="underline underline-offset-4 hover:text-foreground transition-colors mr-0.5"
        >
          etamin
        </Link>
        , mostly using next.js and typescript.
      </p>

      <p>
        when i’m not coding, i’m usually reading, testing out new ideas, or just learning something random.
      </p>
    </div>
  );
};

export default Hero;
