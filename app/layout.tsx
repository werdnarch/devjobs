import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, useThemeContext } from "./Hooks/useThemeProvider";

export const metadata: Metadata = {
  title: "DevJobs Board",
  description:
    "dev jobs app to fetch and display different job offerings from companies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`h-screen antialiased`}>{children}</body>
    </html>
  );
}
