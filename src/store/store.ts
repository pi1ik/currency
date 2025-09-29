import { configureStore } from "@reduxjs/toolkit";
import { coinsReducer } from "./slices/marketCoinsSlice";
// import { interiorDoorsReducer } from "./slices/interiorDoor";
// import { frontDoorsReducer } from "./slices/frontDoor";
// import { authReducer } from "./slices/auth";

export const makeStore = () => {
  return configureStore({
    reducer: {
      coins: coinsReducer,
      //   interiorDoors: interiorDoorsReducer,
      //   auth: authReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
