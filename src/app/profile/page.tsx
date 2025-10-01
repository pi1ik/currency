"use client";
import React, {
  lazy,
  useCallback,
  useMemo,
  useTransition,
  useState,
  useEffect,
} from "react";
import InfoCard from "../_components/InfoCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMarketCoinsList } from "@/store/slices/marketCoinsSlice";
import StoreProvider from "../_contexts/StoreProvider";
import ProfileCard from "../_components/ProfileCard";
import { IMarketCoin } from "../_types/types";
import useModal from "../_hooks/useModal";
import Modal from "../_components/Modal";
import Image from "next/image";

const MarketCard = lazy(() => import("../_components/MarketCard"));

export default function Profile() {
  const dispatch = useAppDispatch();
  const { coins, status: coinsStatus } = useAppSelector((state) => state.coins);
  const [date, setDate] = useState("00.00.00, 00:00:00");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const { isModalShowing: isShowing, toggle: toggleModal } = useModal();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchTerm(searchTerm), 1000);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const [sortOption, setSortOption] = useState<
    "nameAsc" | "nameDesc" | "priceAsc" | "priceDesc"
  >("nameAsc");

  const handleToggleFavorite = useCallback((id: string) => {
    startTransition(() => {
      setFavorites((prev) =>
        prev.includes(id)
          ? prev.filter((coinId) => coinId !== id)
          : [...prev, id]
      );
    });
  }, []);

  useEffect(() => {
    dispatch(fetchMarketCoinsList());
    setDate(new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" }));
    const storageFavs = window.localStorage.getItem("favorites");
    if (storageFavs) setFavorites(JSON.parse(storageFavs));
  }, [dispatch]);

  useEffect(() => {
    window.localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const favQuantity = useMemo(() => favorites.length, [favorites]);

  /// Фильтрация и сортировка
  const filteredAndSortedCoins = useMemo(() => {
    let result = coins;

    if (debouncedSearchTerm.trim()) {
      const term = debouncedSearchTerm.toLowerCase();
      result = result.filter(
        (coin) =>
          coin.name.toLowerCase().includes(term) ||
          coin.symbol.toLowerCase().includes(term)
      );
    }

    if (showFavoritesOnly) {
      result = result.filter((coin) => favorites.includes(coin.id));
    }

    switch (sortOption) {
      case "nameAsc":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameDesc":
        result = [...result].sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "priceAsc":
        result = [...result].sort((a, b) => a.current_price - b.current_price);
        break;
      case "priceDesc":
        result = [...result].sort((a, b) => b.current_price - a.current_price);
        break;
    }

    return result;
  }, [coins, debouncedSearchTerm, showFavoritesOnly, sortOption, favorites]);

  const renderedCoins = useMemo(
    () =>
      filteredAndSortedCoins.map((coin: IMarketCoin) => {
        const fav = favorites.includes(coin.id);
        return (
          <MarketCard
            coin={coin}
            key={coin.id}
            isFav={fav}
            onToggleFav={handleToggleFavorite}
          />
        );
      }),
    [filteredAndSortedCoins, favorites, handleToggleFavorite]
  );

  const infoTitle = "Эта страница использует CSR";
  const infoDescr = `Здесь отображены данные о самых популярных токенах, их можно добавлять в избранное, сортировать, реализован поиск по названию токена. Данные обновляются при каждом запросе. При нажатии на кнопку ОНЛАЙН КОНСУЛЬТАЦИЯ  открывается модальное окно с формой, принимающей текстовое сообщение и изображение. Лимит запросов - 30 запросов в минуту.`;
  const nothingDescr = (
    <p className="text-lg">По такому запросу ничего не найдено</p>
  );

  return (
    <StoreProvider>
      <div className="flex flex-col items-center w-full h-full">
        <Modal show={isShowing} onCloseButtonClick={toggleModal} />
        <InfoCard title={infoTitle} description={infoDescr} date={date} />
        <div className="w-full">
          <ProfileCard favQuantity={favQuantity} toggleModal={toggleModal} />
        </div>
        <div className="flex flex-col md:flex-row w-full max-w-4xl items-center justify-center gap-4 my-6 ">
          <div className="h-15 p-3 px-4 w-full md:w-2/3 rounded-full mx-auto shadow-custom-3-6 border-[2px] border-black/20">
            <input
              type="text"
              placeholder="Поиск по названию или символу"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-full w-full px-3 rounded-full focus-visible:outline focus-visible:outline-white/30"
            />
          </div>

          <div className="flex gap-10 md:gap-4">
            <label
              htmlFor="onlyfavorite"
              className="flex flex-col font-light items-center text-center text-nowrap gap-2 "
            >
              <div
                className={`flex items-center justify-center cursor-pointer rounded-lg w-10 h-10 border-[2px] border-black/20 ${
                  showFavoritesOnly
                    ? "shadow-custom-3-8-inset bg-black/10"
                    : "shadow-custom-3-8 shadow-custom-3-8-hover"
                }`}
              >
                {showFavoritesOnly ? "✔" : ""}
              </div>
              <input
                id="onlyfavorite"
                type="checkbox"
                checked={showFavoritesOnly}
                onChange={(e) => setShowFavoritesOnly(e.target.checked)}
                className="hidden"
              />
              Только избранное
            </label>

            <div className="flex shadow-custom-3-8 rounded-xl">
              {/* Сортировка по имени */}
              <div className="flex flex-col">
                <button
                  className={`p-2 w-10 h-10 border border-black/30 rounded-tl-lg transition-all cursor-pointer duration-200 active:bg-black/10 hover:bg-black/10 ${
                    sortOption === "nameAsc"
                      ? "shadow-custom-3-8-inset bg-black/20"
                      : ""
                  }`}
                  onClick={() => setSortOption("nameAsc")}
                >
                  <Image
                    src="/sort_name_decs.svg"
                    alt="sortName"
                    width={45}
                    height={45}
                    style={{ opacity: "0.7" }}
                  />
                </button>
                <button
                  className={`p-2 w-10 h-10 border border-black/30 rounded-bl-lg transition-all cursor-pointer duration-200 active:bg-black/10 hover:bg-black/10 ${
                    sortOption === "nameDesc"
                      ? "shadow-custom-3-8-inset bg-black/20"
                      : ""
                  }`}
                  onClick={() => setSortOption("nameDesc")}
                >
                  <Image
                    src="/sort_name_asc.svg"
                    alt="sortName"
                    width={45}
                    height={45}
                    style={{ opacity: "0.7" }}
                  />
                </button>
              </div>

              {/* Сортировка по цене */}
              <div className="flex flex-col">
                <button
                  className={`p-2 w-10 h-10 border border-black/30 rounded-tr-lg transition-all cursor-pointer duration-200 active:bg-black/10 hover:bg-black/10 ${
                    sortOption === "priceAsc"
                      ? "shadow-custom-3-8-inset bg-black/20"
                      : ""
                  }`}
                  onClick={() => setSortOption("priceAsc")}
                >
                  <Image
                    src="/sort_price_asc.svg"
                    alt="sortName"
                    width={45}
                    height={45}
                    style={{ opacity: "0.7" }}
                  />
                </button>
                <button
                  className={`p-2 w-10 h-10 border border-black/30 rounded-br-lg transition-all cursor-pointer duration-200 active:bg-black/10 hover:bg-black/10 ${
                    sortOption === "priceDesc"
                      ? "shadow-custom-3-8-inset bg-black/20"
                      : ""
                  }`}
                  onClick={() => setSortOption("priceDesc")}
                >
                  <Image
                    src="/sort_price_desc.svg"
                    alt="sortName"
                    width={45}
                    height={45}
                    style={{ opacity: "0.7" }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex  flex-col items-center gap-8 w-full lg:w-2/3 xl:w-2/3 min-h-[75svh]">
          {coinsStatus === "loaded"
            ? renderedCoins.length > 0
              ? renderedCoins
              : nothingDescr
            : "Loading..."}
        </div>
      </div>
    </StoreProvider>
  );
}
