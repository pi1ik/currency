import InfoCard from "@/app/_components/InfoCard";
import { ISingleCoin } from "@/app/_types/types";
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  return [{ aboutCoinId: "bitcoin" }, { id: "ethereum" }];
}

async function getAboutCoin(params: Promise<{ aboutCoinId: string }>) {
  const coinId = (await params).aboutCoinId;
  const fetchedCoin = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}`
  );
  const aboutCoin: ISingleCoin = await fetchedCoin.json();
  const date = new Date().toLocaleString("ru-RU", {
    timeZone: "Europe/Moscow",
  });

  return { aboutCoin, date };
}

export default async function Post({
  params,
}: {
  params: Promise<{ aboutCoinId: string }>;
}) {
  const { aboutCoin, date } = await getAboutCoin(params);

  const infoTitle = "Эта страница использует SSG.";
  const infoDescr =
    "Все данные были сгенерированы в момент сборки проекта и не обновляются при перезагрузках.";

  return (
    <div className="w-full">
      <InfoCard title={infoTitle} description={infoDescr} date={date} />
      <h1 className="text-3xl uppercase font-extralight text-center mb-7">
        {aboutCoin.name}{" "}
        <span className="text-2xl text-white/70">
          {" "}
          {aboutCoin.symbol.toUpperCase()}
        </span>
      </h1>
      <div className="w-full flex justify-center mb-7 ">
        <div className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 relative p-3 sm:p-4 w-2/3 sm:w-full object-contain relative rounded-full shadow-[inset_5px_5px_10px_rgba(0,0,0,0.25),inset_-5px_-5px_10px_rgba(255,255,255,0.07)]">
          <Image
            src={aboutCoin.image.large}
            alt={aboutCoin.name}
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

      <div className="w-full">
        <h3 className="text-lg uppercase font-light text-left w-full text-white/70">
          genesis date:
          <span className="text-white font-normal">
            {" "}
            {aboutCoin.genesis_date}
          </span>
        </h3>
        <h3 className="text-lg uppercase font-light text-left w-full text-white/70">
          hashing algorithm:
          <span className="text-white font-normal">
            {" "}
            {aboutCoin.hashing_algorithm}
          </span>
        </h3>
        <h3 className="text-lg uppercase font-light text-left w-full text-white/70">
          Website:
          <Link
            href={aboutCoin.links.homepage[0]}
            target="_blank"
            className="text-white font-normal no-underline hover:underline"
          >
            {" "}
            {aboutCoin.name}
          </Link>
        </h3>
        <p className="indent-8 font-light mt-5">{aboutCoin.description.en}</p>
      </div>
    </div>
  );
}
