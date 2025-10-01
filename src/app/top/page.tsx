import Link from "next/link";
import InfoCard from "../_components/InfoCard";
import { IMarketCoin } from "../_types/types";
import Image from "next/image";

async function getTopCoins() {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`
  );
  const coins: IMarketCoin[] = await res.json();
  const topCoins = coins.filter((item) => {
    if (
      item.id === "bitcoin" ||
      item.id === "ethereum" ||
      item.id === "tether" ||
      item.id === "litecoin" ||
      item.id === "the-open-network" ||
      item.id === "solana" ||
      item.id === "dogecoin" ||
      item.id === "monero" ||
      item.id === "stellar" ||
      item.id === "hyperliquid"
    ) {
      return true;
    } else return false;
  });

  return topCoins;
}

export default async function TopCoinsList() {
  const topCoins = await getTopCoins();
  const infoTitle = "Это список страниц с SSR";
  const infoDescr =
    "Страницы из списка Топ-10 используют SSR, перейдите по ссылкам ниже";
  return (
    <div>
      <InfoCard title={infoTitle} description={infoDescr} />
      <h1 className="text-3xl uppercase font-extralight text-center mb-7">
        Топ-10 токенов
      </h1>
      <div className="">
        <ul className="flex flex-col items-center gap-5 w-full">
          {topCoins.map((coin, i) => {
            return (
              <li key={i} className="w-full flex justify-center">
                <Link
                  href={`/top/${coin.id}`}
                  className="w-full md:w-2/3 lg:w-1/2 flex flex justify-center items-center gap-5 p-2 px-10 rounded-xl uppercase font-normal text-xs xs:text-xs sm:text-sm md:text-base block w-fit no-underline shadow-custom-3-8 shadow-custom-3-8-hover active:bg-black/10 hover:bg-black/7"
                >
                  <h2 className="font-extralight text-center no-underline">
                    {i + 1}
                  </h2>
                  <div className="p-3 rounded-full size-25 shadow-img-wrapper">
                    <Image
                      src={coin.image}
                      alt={coin.name}
                      width={60}
                      height={60}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        borderRadius: "100%",
                      }}
                      className="shadow-img"
                    />
                  </div>

                  <span className="">
                    {coin.name}{" "}
                    <span className="text-sm uppercase text-white/70">
                      {coin.symbol}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
