import { configureStore } from "@reduxjs/toolkit";
import gameModeReducer from "./slices/setGameMode";
import piecesPositionReducer from './slices/piecesPosition'

export const store = configureStore({
    reducer: {
        gameMode: gameModeReducer,
        piecesPosition: piecesPositionReducer
    }
})