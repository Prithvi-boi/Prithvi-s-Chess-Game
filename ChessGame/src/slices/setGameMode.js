import { createSlice } from "@reduxjs/toolkit";

const gameModeReducer = createSlice({
    name: 'gameMode',
    initialState: {
        value: 'rapid',
        playas: 'white'
    },
    reducers:{
        setGameMode: (state,action) => {
            state.value = action.payload
        },
        setPlayAs: (state,action) => {
            state.playas = action.payload
        }
    }
})

export default gameModeReducer.reducer
export const { setGameMode, setPlayAs } = gameModeReducer.actions