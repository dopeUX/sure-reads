import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
import "./globalStyles/globalStyles.css";
import localFont from "@next/font/local";
import { ReduxProvider } from "./store/Provider";
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
    {
      path: "../../public/fonts/Sen-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "../../public/fonts/Sen-Bold.ttf",
      weight: "700",
    },
    {
      path: "../../public/fonts/Sen-ExtraBold.ttf",
      weight: "800",
    },
  ],
  variable: "--font-sen",
});

export const metadata: Metadata = {
  title: "Sure reads.",
  description: "Ecommerce Book App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${Sen.variable} font-sans`}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
