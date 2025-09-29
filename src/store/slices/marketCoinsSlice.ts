import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { IMarketCoin } from "@/app/_types/types";
// import { IInitialStateFront } from "../../app/_types/types";

export const fetchMarketCoinsList = createAsyncThunk(
  "fetchAllCoinsList",
  async () => {
    const res = await axios.get("/coins/markets?vs_currency=usd");
    return res.data as IMarketCoin[];
  }
);

interface IInitialMarketCoinsState {
  coins: IMarketCoin[];
  status: "loading" | "loaded" | "error";
}

const initialState = {
  coins: [],
  status: "loading",
} satisfies IInitialMarketCoinsState as IInitialMarketCoinsState;

const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //Получение всех валют

      .addCase(fetchMarketCoinsList.pending, (state) => {
        state.coins = [];
        state.status = "loading";
      })
      .addCase(fetchMarketCoinsList.fulfilled, (state, action) => {
        state.coins = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchMarketCoinsList.rejected, (state) => {
        state.coins = [];
        state.status = "error";
      });
  },
});

export const coinsReducer = coinsSlice.reducer;
