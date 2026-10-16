import { createSlice } from "@reduxjs/toolkit";

const moveTrackerSlice = createSlice({
    name: 'moveTracker',
    initialState: {
        whiteMoves: [],
        blackMoves: []
    },
    reducers: {
        trackMove: (state, action) => {
            const [move, symbol, capture] = action.payload
            const [color, piece] = [symbol[0], symbol[1]]
            const currentArry = color == 'W' ? state.whiteMoves : state.blackMoves

            if (capture) {
                currentArry.push(piece == 'P' ? move : piece + 'x' + move)
            } else {
                currentArry.push(piece == 'P' ? move : piece + move)
            }

        },

        markCheck: (state, action) => { 
            const list = action.payload == 'W' ? state.whiteMoves : state.blackMoves
            const i = list.length - 1
            if (i >= 0 && !list[i].endsWith('+')) list[i] += '+'
        },

        markCheckMate: (state, action) => { 
            const list = action.payload == 'W' ? state.whiteMoves : state.blackMoves
            const i = list.length - 1
            if (i >= 0 && list[i].endsWith('+')) list[i] = list[i].slice(0, -1)
            if (i >= 0 && !list[i].endsWith('#')) list[i] += '#'
        }
    }
})

export default moveTrackerSlice.reducer
export const { trackMove, markCheck, markCheckMate } = moveTrackerSlice.actions