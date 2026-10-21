import { createSlice } from "@reduxjs/toolkit";

const gameModeReducer = createSlice({
    name: 'gameMode',
    initialState: {
        value: 'rapid',
        playas: 'white',
        switchPlay: false
    },
    reducers:{
        setGameMode: (state,action) => {
            state.value = action.payload
        },
        setPlayAs: (state,action) => {
            state.playas = action.payload
        },
        setSwitchPlay: (state) => {
            state.switchPlay = !state.switchPlay
        }
    }
})

export default gameModeReducer.reducer
export const { setGameMode, setPlayAs, setSwitchPlay } = gameModeReducer.actions