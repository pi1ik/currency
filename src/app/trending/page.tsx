import React from "react";
import { ITrending } from "../_types/types";
import TrendingCard from "../_components/TrendingCard";
import InfoCard from "../_components/InfoCard";

export const revalidate = 300; // 5 минут

export default async function Trends() {
  const res = await fetch("https://api.coingecko.com/api/v3/search/trending");

  const { coins: trendingCoins, nfts: trendingNfts }: ITrending =
    await res.json();

  const date = new Date().toLocaleString("ru-RU", {
    timeZone: "Europe/Moscow",
  });

  const infoTitle: string = "Эта страница использует ISR";
  const infoDescr = `Здесь отображены данные о самых популярных токенах и NFT-коллекциях за последние 24 часа. Страница ревалидируется раз в 30 минут(для удобства проверки механизма). Если с времени последнего обновления, указанного ниже прошло более 30 минут, обновите страницу, свежие данные уже подгружены`;

  return (
    <div>
      <InfoCard title={infoTitle} description={infoDescr} date={date} />
      <h2 className="uppercase font-extralight text-4xl text-center mb-[40px]">
        Трендовые токены
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {trendingCoins.map((coin) => {
          return <TrendingCard cardItem={coin} key={coin.item.id} />;
        })}
      </div>
      <h2 className="uppercase font-extralight text-4xl text-center mt-[100px] mb-[40px]">
        Трендовые NFT
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {trendingNfts.map((nft) => {
          return <TrendingCard cardItem={nft} key={nft.id} />;
        })}
      </div>
    </div>
  );
}

