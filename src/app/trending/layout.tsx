import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Тренды",
  description:
    "Смотри самые популярные токены и NFT-коллекции за последние 24 часа!",
};

export default function TrendingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
