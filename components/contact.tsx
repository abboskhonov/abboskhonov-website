import Link from "next/link";
import { HiOutlineMail } from "react-icons/hi";
import { GiLightBulb } from "react-icons/gi";

const Contact = () => {
  return (
    <footer className="mt-12">
      <div className="max-w-3xl mx-auto text-muted-foreground space-y-6">
        <p className="text-sm leading-relaxed">
          if you're interested in collaborating on building some cool sh*ts,
          feel free to dm me on
          <Link
            href="https://abboskhonow.t.me"
            className="underline underline-offset-4 text-foreground ml-1"
          >
            telegram
          </Link>
          or drop me an
          <a
            href="mailto:abboskhonow@gmail.com"
            className="underline underline-offset-4 text-foreground ml-1"
          >
            email
          </a>
          . i will get back to you within 2 business days. i'm always open to
          new ideas and projects!
        </p>

        <p className="text-sm">
          I&apos;m built and maintained by
          <Link
            href="/"
            className="underline underline-offset-4 text-foreground ml-1"
          >
            abboskhonov
          </Link>
        </p>

        <div className="flex items-center justify-between text-sm">
          <div className="text-muted-foreground">
            built with{" "}
            <Link
              href="https://nextjs.org"
              className="underline text-foreground"
            >
              next.js
            </Link>
          </div>

          {/* <div className="flex items-center gap-2 text-muted-foreground">
            <GiLightBulb className="text-foreground/90" />
            <span className="text-muted-foreground">
              last updated 6th sep 2025
            </span>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Contact;
