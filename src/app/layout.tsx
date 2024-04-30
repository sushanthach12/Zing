import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import ToastProvider from "@/components/providers/toast-provider";
import AuthProvider from "@/components/providers/auth-provider";
import ActiveStatus from "@/components/active-status";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zing",
  description: "Zing is a lightning-fast and fun way to connect with friends and family in real-time.  Our instant messaging platform lets you exchange messages, share photos and videos, and stay connected anytime, anywhere",
  abstract: "Connect instantly, share everything.",
  keywords: ["instant messaging", "chat", "photos", "videos", "friends", "family"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ToastProvider />
          <ActiveStatus />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
