import { configureStore } from "@reduxjs/toolkit";
import gameModeReducer from "./slices/setGameMode";

export const store = configureStore({
    reducer: {
        gameMode: gameModeReducer
    }
})