import Image from "next/image";
import { MarketCardProps } from "../_types/types";
import React from "react";

export default function MarketCard({
  coin,
  isFav,
  onToggleFav,
}: MarketCardProps) {
  return (
    <div className="flex gap-[20px]  box-border p-5 relative rounded-xl shadow-[7px_7px_15px_rgba(0,0,0,0.25),-7px_-7px_15px_rgba(255,255,255,0.07)]">
      <button
        onClick={() => onToggleFav(coin.id)}
        className={`absolute right-5 flex justify-center items-center rounded-lg w-[40px] h-[40px] ${
          isFav
            ? "shadow-[inset_3px_3px_8px_rgba(0,0,0,0.3),inset_-2px_-2px_5px_rgba(255,255,255,0.07)]"
            : "shadow-[2px_2px_5px_rgba(0,0,0,0.3),-3px_-3px_8px_rgba(255,255,255,0.07)]"
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
      <div className="relative object-contain rounded-full w-1/4 h-fit p-4 shadow-[inset_3px_3px_7px_rgba(0,0,0,0.25),inset_-3px_-3px_7px_rgba(255,255,255,0.07)]">
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
            boxShadow:
              "3px 3px 8px rgba(0,0,0,0.25), -3px -3px 8px rgba(255,255,255,0.07)",
          }}
        />
      </div>
      <div
        className="text-xl font-extralight"
        style={{ width: "calc(100% / 4 * 3 - 65px)" }}
      >
        <h3>
          {coin.name}{" "}
          <span className="uppercase text-white/70">{coin.symbol}</span>
          <span className="text-2xl uppercase font-light text-left ml-[20px]">
            ${coin.current_price.toLocaleString("en-de")}{" "}
            {coin.price_change_24h > 0 ? (
              <span className="text-green-500">⬆︎</span>
            ) : (
              <span className="text-red-500">⬇</span>
            )}
          </span>
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
