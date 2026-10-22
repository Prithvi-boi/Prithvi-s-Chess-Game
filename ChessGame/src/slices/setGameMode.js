import { createSlice } from "@reduxjs/toolkit";

const gameModeReducer = createSlice({
    name: 'gameMode',
    initialState: {
        value: 'rapid',
        playas: 'white',
        switchPlay: false,
        switchTimer: false,
        switchColor: 'white'
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
        },
        setSwitchTimer: (state) => {
            state.switchTimer = !state.switchTimer
        },
        setswitchBoard: (state) => {
            state.switchColor = state.switchColor == 'white' ? 'black' : 'white'
        }
    }
})

export default gameModeReducer.reducer
export const { setGameMode, setPlayAs, setSwitchPlay, setswitchBoard, setSwitchTimer } = gameModeReducer.actions