import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Тестовое задание Next.js",
  description: "Разные виды рендеринга на каждой странице",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <Header />

        <main className="font-sans flex flex-col items-center justify-start min-h-screen p-8 mt-15 pb-20 gap-16 sm:p-20 lg:px-[8vw] xl:px-[12vw]">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
