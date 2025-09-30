import { Metadata } from "next";
import StoreProvider from "../_contexts/StoreProvider";

export const metadata: Metadata = {
  title: "Профиль",
  description:
    "Смотри и добавляй в избранное криптовалюты, отслеживай их курс, а также получи уникальную возможность проконсультироваться с экспертами и инвестировать в действительно растущие криптовалюты!",
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <StoreProvider>{children}</StoreProvider>;
}
