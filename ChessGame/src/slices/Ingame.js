import { createSlice } from "@reduxjs/toolkit";

const inGame = createSlice({
    name: 'game',
    initialState: {
        switchTimer: false,
        whiteTimeOut: false,
        blackTimeOut: false,
    },
    reducers: {
        setSwitchTimer: (state) => {
            state.switchTimer = !state.switchTimer
        },

        setTimeOver: (state, actions) => {
            let color = actions.payload
            if (color == 'white') {
                state.whiteTimeOut = true
                console.log(state.whiteTimeOut, state.blackTimeOut, 'black wins')
            } else if (color == 'black') {
                state.blackTimeOut = true
                console.log(state.whiteTimeOut, state.blackTimeOut, 'white wins')
            }
        },
    }
})

export default inGame.reducer
export const { setSwitchTimer, setTimeOver } = inGame.actions