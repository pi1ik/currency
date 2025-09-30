import Image from "next/image";
import { MarketCardProps } from "../_types/types";
import React, { memo } from "react";

function MarketCard({ coin, isFav, onToggleFav }: MarketCardProps) {
  return (
    <div className="flex flex-col items-center sm:flex-row gap-[20px] w-full box-border p-5 relative rounded-xl shadow-[7px_7px_15px_rgba(0,0,0,0.25),-7px_-7px_15px_rgba(255,255,255,0.07)] border-[2px] border-black/20">
      <button
        onClick={() => onToggleFav(coin.id)}
        className={`absolute cursor-pointer top-5 right-5 flex justify-center items-center border-[2px] border-black/20 rounded-lg w-[40px] h-[40px] ${
          isFav
            ? "shadow-custom-3-8-inset"
            : "shadow-custom-3-8 shadow-custom-3-8-hover"
        }`}
        onMouseEnter={() => {
          if (!isFav) {
            const heart = document.querySelector(
              `#${coin.id}-heart`
            ) as HTMLImageElement;
            heart.src = "/heart_filled.svg";
          }
        }}
        onMouseLeave={() => {
          if (!isFav) {
            const heart = document.querySelector(
              `#${coin.id}-heart`
            ) as HTMLImageElement;
            heart.src = "/heart.svg";
          }
        }}
      >
        {isFav ? (
          <Image
            src="/heart_filled.svg"
            alt="избранное"
            width={24}
            height={24}
          />
        ) : (
          <Image
            id={`${coin.id}-heart`}
            src="/heart.svg"
            alt="избранное"
            width={24}
            height={24}
          />
        )}
      </button>
      <div className="relative object-contain rounded-full w-1/2 sm:w-1/4 lg:w-1/5 h-fit p-4 border-[2px] border-black/20 shadow-img-wrapper">
        <Image
          src={coin.image}
          alt="изображение токена"
          width={100}
          height={100}
          style={{
            objectFit: "fill",
            width: "100%",
            position: "static",
            borderRadius: "100%",
          }}
          className="shadow-img border-[2px] border-black/20"
        />
      </div>
      <div className="text-xl font-extralight w-full sm:w-2/3">
        <h3>
          {coin.name}{" "}
          <span className="uppercase text-white/70">{coin.symbol} </span>
          <p className="text-2xl uppercase font-light text-left ">
            ${coin.current_price.toLocaleString("en-de")}{" "}
            {coin.price_change_24h > 0 ? (
              <span className="text-green-500">⬆︎</span>
            ) : (
              <span className="text-red-500">⬇</span>
            )}
          </p>
        </h3>

        <div className="mt-[20px]">
          <h3 className="text-sm uppercase font-light text-left w-full text-white/70 mb-[3px]">
            Market cap:{" "}
            <span className="text-white">
              ${coin.market_cap.toLocaleString("en-de")}
            </span>
          </h3>
          <h3 className="text-sm uppercase font-light text-left w-full text-white/70">
            24 Hour Trading Vol:{" "}
            <span className="text-white">
              ${coin.total_volume.toLocaleString("en-de")}
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
}
export default memo(MarketCard);
