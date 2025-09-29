"use client";
import { createContext } from "react";

import type { IUserContext } from "../../_types/types";

const initialUserContext = {
  favoriteCoins: [],
  changeFavoriteCoins: () => {},
};

export const UserContext = createContext<IUserContext>(initialUserContext);
