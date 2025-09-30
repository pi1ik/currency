import InfoCard from "@/app/_components/InfoCard";
import { ISingleCoin } from "@/app/_types/types";
import Image from "next/image";
import Link from "next/link";

async function getTopCoin(params: Promise<{ topCoinId: string }>) {
  const coinId = (await params).topCoinId;
  const fetchedCoin = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}`,
    { cache: "no-store" }
  );
  const topCoin: ISingleCoin = await fetchedCoin.json();
  const date = new Date().toLocaleString();

  return { topCoin, date };
}

export default async function Post({
  params,
}: {
  params: Promise<{ topCoinId: string }>;
}) {
  const { topCoin, date } = await getTopCoin(params);

  const infoTitle = "Эта страница использует SSR.";
  const infoDescr =
    "Все данные были сгенерированы в момент запроса к серверу, данные обновляются при перезагрузке страницы";

  return (
    <div className="flex flex-col gap-8 w-full">
      <InfoCard title={infoTitle} description={infoDescr} date={date} />
      <h1 className="text-3xl uppercase font-extralight text-center">
        {topCoin.name}{" "}
        <span className="text-2xl text-white/70">
          {" "}
          {topCoin.symbol.toUpperCase()}
        </span>
      </h1>

      <div className="w-full flex justify-center">
        <div className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 relative p-3 sm:p-4 w-2/3 sm:w-full object-contain relative rounded-full shadow-[inset_5px_5px_10px_rgba(0,0,0,0.25),inset_-5px_-5px_10px_rgba(255,255,255,0.07)]">
          <Image
            src={topCoin.image.large}
            alt={topCoin.name}
            width={200}
            height={200}
            style={{
              width: "100%",
              borderRadius: "100%",
              boxShadow:
                "3px 3px 8px rgba(0,0,0,0.25), -3px -3px 8px rgba(255,255,255,0.07)",
            }}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex gap-2 items-end">
          <h2 className=" text-2xl uppercase font-light text-left w-fit text-white">
            Current price:
          </h2>
          <span className="text-3xl uppercase font-normal text-left ml-[20px]">
            ${topCoin.market_data.current_price.usd.toLocaleString("en-de")}{" "}
            {topCoin.market_data.price_change_percentage_24h > 0 ? (
              <span className="text-green-500">⬆︎</span>
            ) : (
              <span className="text-red-500">⬇</span>
            )}
          </span>
        </div>
        <h3 className="block text-lg uppercase font-light text-left w-fit text-white/70">
          last updated:
          <span className="text-white font-normal">
            {" "}
            {new Date(topCoin.last_updated).toLocaleString()}
          </span>
        </h3>
      </div>

      <div className="w-full flex gap-15 mt-5">
        <div>
          <h2 className="text-2xl uppercase font-light text-left w-full text-white mb-3">
            Market data:{" "}
          </h2>
          <h3 className="text-lg uppercase font-light text-left w-full text-white/70">
            Market cap:
            <span className="text-white font-normal">
              {" "}
              {"$"}
              {topCoin.market_data.market_cap.usd.toLocaleString("en-de")}
            </span>
          </h3>
          <h3 className="text-lg uppercase font-light text-left w-full text-white/70">
            Total volume:
            <span className="text-white font-normal">
              {" "}
              {"$"}
              {topCoin.market_data.total_volume.usd.toLocaleString("en-de")}
            </span>
          </h3>
          <h3 className="text-lg uppercase font-light text-left w-full text-white/70">
            All-Time High:
            <span className="text-white font-normal">
              {" "}
              {"$"}
              {topCoin.market_data.ath.usd.toLocaleString("en-de")}
            </span>
          </h3>
          <h3 className="text-lg uppercase font-light text-left w-full text-white/70">
            All-Time High date:
            <span className="text-white font-normal">
              {" "}
              {new Date(topCoin.market_data.ath_date.usd).toLocaleDateString()}
            </span>
          </h3>
          <h3 className="text-lg uppercase font-light text-left w-full text-white/70">
            All-Time Low:
            <span className="text-white font-normal">
              {" "}
              {"$"}
              {topCoin.market_data.atl.usd.toLocaleString("en-de")}
            </span>
          </h3>
          <h3 className="text-lg uppercase font-light text-left w-full text-white/70">
            All-Time Low date:
            <span className="text-white font-normal">
              {" "}
              {new Date(topCoin.market_data.atl_date.usd).toLocaleDateString()}
            </span>
          </h3>
        </div>
        <div>
          <h2 className="text-2xl uppercase font-light text-left w-full text-white mb-3">
            General:{" "}
          </h2>
          <h3 className="text-lg uppercase font-light text-left w-full text-white/70">
            genesis date:
            <span className="text-white font-normal">
              {" "}
              {topCoin.genesis_date ? topCoin.genesis_date : "-"}
            </span>
          </h3>
          <h3 className="text-lg uppercase font-light text-left w-full text-white/70">
            hashing algorithm:
            <span className="text-white font-normal">
              {" "}
              {topCoin.hashing_algorithm ? topCoin.hashing_algorithm : "-"}
            </span>
          </h3>
          <h3 className="text-lg uppercase font-light text-left w-full text-white/70">
            Website:
            <Link
              href={topCoin.links.homepage[0]}
              target="_blank"
              className="text-white font-normal no-underline hover:underline"
            >
              {" "}
              {topCoin.links.homepage[0] ? topCoin.name : "-"}
            </Link>
          </h3>
        </div>
      </div>

      <p className="indent-8 font-light mt-5">{topCoin.description.en}</p>
    </div>
  );
}
