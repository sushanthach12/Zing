import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zing",
  description: "Zing is a lightning-fast and fun way to connect with friends and family in real-time.  Our instant messaging platform lets you exchange messages, share photos and videos, and stay connected anytime, anywhere",
  abstract:"Connect instantly, share everything.",
  keywords: ["instant messaging", "chat", "photos", "videos", "friends", "family"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}