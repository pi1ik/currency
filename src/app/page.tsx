// import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import { fetchAllCoinsList } from "@/store/slices/coinsSlice";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Home() {
  // const dispatch = useAppDispatch();

  // const { coinsList } = useAppSelector((state) => state.coins);

  // React.useEffect(() => {
  //   // dispatch(fetchAllCoinsList());
  //   // fetchCoinsList();
  // }, []);

  // React.useEffect(() => {
  //   console.log(coinsList.items);
  // }, [coinsList]);

  const links = [
    { label: "Профиль (CSR)", href: "/profile" },
    { label: "Топ-10(SSR)", href: "/top" },
    { label: "Информация (SSG)", href: "/about" },
    { label: "Тренды (ISR)", href: "/trending" },
  ];

  return (
    <div
      className="flex flex-col md:flex-row gap-15 w-full min-h-[60svh] items-center justify-center sm:items-start"
      style={{ alignItems: "center" }}
    >
      <h1 className="text-4xl uppercase font-extralight text-left mt-7 w-full md:w-1/2">
        Добро пожаловать! <br />
        <span className="text-3xl font-thin">
          Этот сайт - демонстрация видов рендеринга в Next.js.
        </span>
      </h1>
      <div className="flex flex-col w-full md:w-1/3 gap-5">
        {links.map((link, i) => {
          return (
            <Link
              key={i}
              href={link.href}
              className="p-2 px-2 md:p-2 md:px-6 w-full text-sm xs:text-base sm:text-lg md:text-lg rounded-lg uppercase font-extralight block shadow-custom-3-8 shadow-custom-3-8-hover border-[2px] border-black/20 active:bg-black/10 w-1/5 md:w-fit h-fit text-center"
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
