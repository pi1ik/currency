import Link from "next/link";
import { ICoinListItem } from "../_types/types";
import InfoCard from "../_components/InfoCard";

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
  const infoTitle = "Это список страниц с SSG";
  const infoDescr =
    "Страницы по ссылкам 'Узнать больше о криптовалютах' используют SSG, перейдите по ссылкам ниже, чтобы посмотреть их";

  return (
    <div>
      <InfoCard title={infoTitle} description={infoDescr} />

      <div className="flex flex-col gap-3">
        <h2 className="text-xl uppercase font-extralight text-center">
          Узнать больше о криптовалютах:
        </h2>
        <ul className="flex justify-center gap-20">
          {aboutCoins.map((coin, i) => {
            return (
              <li key={i}>
                <Link
                  href={`/about/${coin.id}`}
                  className="p-2 px-5 rounded-lg uppercase font-normal block w-fit no-underline hover:underline shadow-[3px_3px_8px_rgba(0,0,0,0.3),-3px_-3px_8px_rgba(255,255,255,0.07)] active:shadow-[inset_3px_3px_8px_rgba(0,0,0,0.3),inset_-3px_-3px_8px_rgba(255,255,255,0.07)] active:bg-black/10 hover:shadow-[inset_3px_3px_8px_rgba(0,0,0,0.3),inset_-3px_-3px_8px_rgba(255,255,255,0.07)]"
                >
                  {coin.name}{" "}
                  <span className="text-sm uppercase text-white/70">
                    {coin.symbol}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <h1 className="text-2xl uppercase font-extralight text-center mt-7">
          The History of Digital Assets: From Concept to Global Phenomenon
        </h1>

        <h2 className="uppercase text-lg mt-5 indent-8">
          Ideas and Foundations
        </h2>
        <p className="indent-8 font-extralight mt-2">
          The story of digital assets began long before the launch of Bitcoin.
          As early as the 1980s and 1990s, cryptographers and digital pioneers
          explored the idea of creating electronic money that would be
          independent of banks and governments. Early projects such as DigiCash,
          e-gold, and HashCash laid the groundwork for what would eventually
          become the cryptocurrency industry. However, these early attempts
          faced technological limitations and regulatory challenges.
        </p>

        <h2 className="uppercase text-lg mt-5 indent-8">
          A Revolution: The Birth of Bitcoin
        </h2>
        <p className="indent-8 font-extralight">
          The true turning point came in 2008, when a mysterious developer under
          the pseudonym Satoshi Nakamoto published a whitepaper describing a new
          form of digital currency: Bitcoin. In January 2009, the first
          block—known as the genesis block—was mined, marking the beginning of
          the first truly decentralized cryptocurrency.
        </p>
        <p className="indent-8 font-extralight">
          Bitcoin introduced a revolutionary solution to the problem of double
          spending without relying on a third party, using a technology called
          blockchain—a secure, distributed ledger that has since become the
          foundation of the entire crypto ecosystem.
        </p>

        <h2 className="uppercase text-lg mt-5 indent-8">
          Ecosystem Growth: Altcoins and Innovation
        </h2>
        <p className="indent-8 font-extralight">
          Following Bitcoin’s success, other cryptocurrencies—known as
          altcoins—began to emerge. Some were simple variations of Bitcoin’s
          code, while others introduced unique features and improvements.
          Notable early projects include Litecoin (2011), Ripple (2012), and
          Ethereum (2015).
        </p>
        <p className="indent-8 font-extralight">
          Ethereum was a major breakthrough, introducing the concept of smart
          contracts—self-executing programs that run on the blockchain. This
          paved the way for decentralized applications (dApps), decentralized
          finance (DeFi), non-fungible tokens (NFTs), and a wide range of other
          digital assets.
        </p>

        <h2 className="uppercase text-lg mt-5 indent-8">
          Cryptocurrencies Today
        </h2>
        <p className="indent-8 font-extralight">
          Today, cryptocurrencies are far more than just digital money—they
          represent an entire financial and technological ecosystem. They are
          used for cross-border payments, value storage, investment, transparent
          record-keeping, digital rights management, and even gaming.
        </p>
        <p className="indent-8 font-extralight">
          With each passing year, the technology continues to mature.
          Regulations are developing, major companies and financial institutions
          are exploring blockchain applications, and millions of people around
          the world are becoming users and investors in digital assets.
        </p>

        <h2 className="uppercase text-lg mt-5 indent-8">Conclusion</h2>
        <p className="indent-8 font-extralight">
          The history of cryptocurrencies is a story of innovation, freedom, and
          decentralization. From early concepts to global platforms, the
          industry has evolved rapidly in just a few decades—and it&apos;s clear
          that this is only the beginning.
        </p>
      </div>
    </div>
  );
}
