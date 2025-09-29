// import type { Metadata } from "next";
import { Metadata } from "next";
import StoreProvider from "../_contexts/StoreProvider";
import { UserContextProvider } from "../_contexts/old.userContext/userContextProvider";

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
  return (
    <StoreProvider>
      <UserContextProvider>
        {/* <a href="/help" className="text-blue-600 underline">
          Нужна помощь? Layout
        </a> */}
        {children}
      </UserContextProvider>
    </StoreProvider>
  );
}
