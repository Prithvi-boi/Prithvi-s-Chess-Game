import { createSlice } from "@reduxjs/toolkit";

const gameModeReducer = createSlice({
    name: 'gameMode',
    initialState: {
        value: 'rapid',
        playas: 'white',
        switchPlay: false,
        switchColor: 'white',
        names:{
            player1: 'player 1',
            player2: 'player 2'
        }
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
        setswitchBoard: (state) => {
            state.switchColor = state.switchColor == 'white' ? 'black' : 'white'
        },
        setPlayerName: (state,action) => {
            const [index, name] = action.payload
            const key = index == 1 ? 'player1' : 'player2'
            state.names[key] = name.trim()
        },
        switchPlayers:(state) => {
            [state.names.player2, state.names.player1] = [state.names.player1, state.names.player2]
        }
    }
})

export default gameModeReducer.reducer
export const { setGameMode, setPlayAs, setSwitchPlay, setswitchBoard, setPlayerName, switchPlayers } = gameModeReducer.actions