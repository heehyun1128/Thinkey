import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Thinkey",
  description: "Thinkey AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head><link rel="icon" href="/tlogo.jpg" /></head>
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
