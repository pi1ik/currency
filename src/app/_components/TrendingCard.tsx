import Image from "next/image";
import { isNft, TrendingCardProps } from "../_types/types";

export default function TrendingCard({ cardItem }: TrendingCardProps) {
  const src = isNft(cardItem) ? cardItem.thumb : cardItem.item.large;
  const name = isNft(cardItem) ? cardItem.name : cardItem.item.name;
  const symb = isNft(cardItem) ? "" : cardItem.item.symbol;
  const priceLabel = isNft(cardItem) ? "Average price:" : "price:";
  const price = isNft(cardItem)
    ? cardItem.data.h24_average_sale_price
    : `${cardItem.item.data.price.toFixed(2)}$`;
  const priceChange = isNft(cardItem)
    ? cardItem.floor_price_24h_percentage_change
    : cardItem.item.data.price_change_percentage_24h.usd;
  const cardDescr = isNft(cardItem) ? (
    <>
      <h3 className="text-xs uppercase font-light text-left w-full text-white/70 mb-[10px]">
        24h volume: {cardItem.data.h24_volume}
      </h3>
    </>
  ) : (
    <>
      <h3 className="text-xs uppercase font-light text-left w-full text-white/70 mb-[10px]">
        Market cap: {cardItem.item.data.market_cap}
      </h3>
      <h3 className="text-xs uppercase font-light text-left w-full text-white/70 mb-[10px]">
        Total volume:
        <span className="text-white">{cardItem.item.data.total_volume}</span>
      </h3>
    </>
  );
  const sparkline = isNft(cardItem)
    ? cardItem.data.sparkline
    : cardItem.item.data.sparkline;

  return (
    <div className="flex flex-col max-h-min gap-[20px] items-center box-border p-8 relative rounded-xl shadow-[7px_7px_15px_rgba(0,0,0,0.25),-7px_-7px_15px_rgba(255,255,255,0.07)]">
      <div className="relative p-5 sm:p-7 w-2/3 sm:w-full object-contain relative rounded-full shadow-[inset_5px_5px_10px_rgba(0,0,0,0.25),inset_-5px_-5px_10px_rgba(255,255,255,0.07)] border-[2px] border-black/20">
        <div className="relative object-contain rounded-full">
          <Image
            src={src}
            alt="изображение токена"
            width={100}
            height={100}
            style={{
              objectFit: "fill",
              width: "100%",
              position: "static",
              borderRadius: "100%",
              boxShadow:
                "3px 3px 8px rgba(0,0,0,0.25), -3px -3px 8px rgba(255,255,255,0.07)",
            }}
            className="shadow-img border-[2px] border-black/20"
          />
        </div>
      </div>
      <h2 className="uppercase font-extralight text-xl text-center">{name}</h2>
      <h3 className="text-md uppercase font-extralight text-right w-full">
        {symb} {priceLabel} <br />
        <span className="text-2xl font-light">
          {price}{" "}
          {priceChange > 0 ? (
            <span className="text-green-500">⬆︎</span>
          ) : (
            <span className="text-red-500">⬇</span>
          )}
        </span>
      </h3>

      <div className="relative object-contain w-full">
        {cardDescr}
        <h3 className="text-xs uppercase font-light text-left w-full text-white/70 mb-[10px]">
          Last 7 Days:
        </h3>
        <Image
          src={sparkline}
          alt="график"
          width={100}
          height={100}
          style={{
            objectFit: "fill",
            width: "100%",
            position: "static",
          }}
        />
      </div>
    </div>
  );
}
