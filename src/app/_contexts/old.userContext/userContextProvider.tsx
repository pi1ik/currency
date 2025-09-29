"use client";
import React from "react";

import { UserContext } from "./userContext";

import type { IUserContextProvider } from "../../_types/types";

export const UserContextProvider: React.FC<IUserContextProvider> = ({
  children,
}) => {
  const [favoriteCoins, setFavoriteCoins] = React.useState<string[]>([]);
  const changeFavoriteCoins = (newCoinId: string) => {
    console.log("Устанавливаю");
    console.log(newCoinId);
    if (favoriteCoins.includes(newCoinId)) {
      const filteredFavoriteCoins = favoriteCoins.filter(
        (id) => id !== newCoinId
      );
      setFavoriteCoins(filteredFavoriteCoins);
    } else {
      const newFavoriteCoins = [...favoriteCoins, newCoinId];
      setFavoriteCoins(newFavoriteCoins);
    }
  };
  return (
    <UserContext.Provider value={{ favoriteCoins, changeFavoriteCoins }}>
      {children}
    </UserContext.Provider>
  );
};
