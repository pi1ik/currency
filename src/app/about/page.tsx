import Link from "next/link";
import { ICoinListItem } from "../_types/types";

async function getAboutCoins() {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/list`);
  const coins: ICoinListItem[] = await res.json();
  const aboutCoins = coins.filter((item) => {
    if (item.id === "bitcoin" || item.id === "ethereum") {
      console.log(item.id);
      return true;
    } else return false;
  });

  return aboutCoins;
}

export default async function AboutCoinsList() {
  console.log();
  const aboutCoins = await getAboutCoins();

  return (
    <ul>
      {aboutCoins.map((coin, i) => {
        return (
          <li key={i}>
            <Link href={`/about/${coin.id}`}>
              {coin.name}
              {coin.symbol}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
