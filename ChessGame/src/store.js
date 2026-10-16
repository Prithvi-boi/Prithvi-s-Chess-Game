import { configureStore } from "@reduxjs/toolkit";
import gameModeReducer from "./slices/setGameMode";
import piecesPositionReducer from './slices/piecesPosition'
import moveTrackerSlice from './slices/moveTracker'

export const store = configureStore({
    reducer: {
        gameMode: gameModeReducer,
        piecesPosition: piecesPositionReducer,
        moveTracker : moveTrackerSlice
    }
})