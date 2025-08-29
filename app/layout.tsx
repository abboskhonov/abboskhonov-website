import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abboskhonov Portfolio",
  description: "Minimalist portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body
        className="antialiased "
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        } }
      >
        {children}
      </body>
    </html>
  );
}
