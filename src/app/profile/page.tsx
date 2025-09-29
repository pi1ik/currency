"use client";

import React, { lazy } from "react";
import InfoCard from "../_components/InfoCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMarketCoinsList } from "@/store/slices/marketCoinsSlice";
import StoreProvider from "../_contexts/StoreProvider";
import ProfileCard from "../_components/ProfileCard";

const MarketCard = lazy(() => import("../_components/MarketCard"));

export default function Profile() {
  const dispatch = useAppDispatch();
  //   const router = useRouter();

  const { coins, status: coinsStatus } = useAppSelector((state) => state.coins);
  //   const [coins, setCoins] = React.useState<IMarketCoin[]>([]);
  const [date, setDate] = React.useState("00.00.00, 00:00:00");
  const [favorites, setFavorites] = React.useState<string[]>([]);
  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((coinId) => coinId !== id) : [...prev, id]
    );
  };

  React.useEffect(() => {
    dispatch(fetchMarketCoinsList());
    // axios
    //   .get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`)
    //   .then((res) => {
    //     const fetchedCoins = res.data;
    //     console.log(fetchedCoins);
    //     setCoins(fetchedCoins);
    //   })
    //   .catch((error) => {
    //     if (error.response) {
    //       console.log(error.response.data);
    //       console.log(error.response.status);
    //       console.log(error.response.headers);
    //     } else if (error.request) {
    //       console.log(error.request);
    //     } else {
    //       console.log("Error", error.message);
    //     }
    //     console.log(error.config);
    //   });
    setDate(new Date().toLocaleString());
    if (window.localStorage.getItem("favorites")) {
      const storageFavs = window.localStorage.getItem("favorites");
      const savedFavs = JSON.parse(storageFavs ?? "[]");
      setFavorites(savedFavs);
    }
  }, []);
  React.useEffect(() => {
    window.localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const infoTitle: string = "Эта страница использует CSR";
  const infoDescr = `Здесь отображены данные о самых популярных токенах, их можно добавлять в избранное, сортировать, реализован поиск по названию токена. Данные обновляются при каждом запросе. Лимит запросов - 30 запросов в минуту.`;
  return (
    <StoreProvider>
      <div className="w-full h-full">
        <InfoCard title={infoTitle} description={infoDescr} date={date} />

        <div className="grid w-full lg:grid-cols-2 gap-12">
          <div className="grid lg:order-2">
            <ProfileCard />
          </div>
          <div className="grid gap-8 lg:order-1">
            {coinsStatus === "loaded"
              ? coins.map((coin) => {
                  return (
                    <MarketCard
                      coin={coin}
                      key={coin.id}
                      isFav={favorites.includes(coin.id)}
                      onToggleFav={handleToggleFavorite}
                    />
                  );
                })
              : "loading..."}
          </div>
        </div>
      </div>
    </StoreProvider>
  );
}
