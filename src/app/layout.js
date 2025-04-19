import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BITians - Social Media Platform for BIT Mesra",
  description: "A dedicated social media platform for BIT Mesra, Ranchi, optimized for college-specific interactions and features.",
  keywords: ["BIT Mesra", "social media", "college", "students", "campus", "university", "education"],
  authors: [{ name: "BITians Team" }],
  creator: "BITians Team",
  publisher: "BITians",
  openGraph: {
    title: "BITians - Social Media Platform for BIT Mesra",
    description: "A dedicated social media platform for BIT Mesra, Ranchi, optimized for college-specific interactions and features.",
    url: "https://bitians.vercel.app",
    siteName: "BITians",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BITians - Social Media Platform for BIT Mesra",
    description: "A dedicated social media platform for BIT Mesra, Ranchi, optimized for college-specific interactions and features.",
    creator: "@bitians",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,0..200" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
