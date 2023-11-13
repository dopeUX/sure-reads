import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
import localFont from "@next/font/local";

const inter = Inter({ subsets: ["latin"] });

const Sen = localFont({
  src: [
    {
      path: "../../public/fonts/Sen-Regular.ttf",
      weight: "400",
    },
    {
      path: "../../public/fonts/Sen-Medium.ttf",
      weight: "500",
    },
  ],
  variable: "--font-sen",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${Sen.variable} font-sans`}>{children}</body>
    </html>
  );
}
