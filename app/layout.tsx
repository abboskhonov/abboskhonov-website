import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import QueryProvider from "@/components/query-provider";

export const metadata: Metadata = {
  title: "Abboskhonov Portfolio",
  description: "Minimalist portfolio showcasing projects, skills, and experience of Abror Abboskhonov, a passionate full-stack developer.",
  keywords: [
    "Abboskhonov",
    "Abror Abboskhonov",
    "Portfolio",
    "Frontend Developer",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Shadcn",
    "JavaScript",
    "TypeScript",
    "Web Developer",
    "Uzbekistan",
  ],
  authors: [{ name: "Abror Abboskhonov", url: "https://abboskhonov.uz" }],
  creator: "Abror Abboskhonov",
  publisher: "Abboskhonov",

  openGraph: {
    title: "Abboskhonov Portfolio",
    description: "Explore the work, projects, and experience of Abror Abboskhonov — frontend & full-stack developer.",
    url: "https://abboskhonov.uz",
    siteName: "Abboskhonov Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://abboskhonov.uz/og-image.jpg", // ⚡ Replace with actual OG image
        width: 1200,
        height: 630,
        alt: "Abboskhonov Portfolio Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Abboskhonov Portfolio",
    description: "Minimalist portfolio of Abror Abboskhonov — developer from Uzbekistan.",
    creator: "@abboskhonow", // ⚡ Replace if you have Twitter
    images: ["https://abboskhonov.uz/og-image.png"],
  },

  icons: {
    icon: "/favico.png",
    shortcut: "/favicon-16x16.jpg",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  metadataBase: new URL("https://abboskhonov.uz"),
  alternates: {
    canonical: "https://abboskhonov.uz",
    languages: {
      "en-US": "https://abboskhonov.uz",
      
    },
  },
  category: "Portfolio",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased font-sans ${montserrat.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
          {children}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
