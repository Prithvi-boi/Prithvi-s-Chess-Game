import { createSlice } from "@reduxjs/toolkit";

const moveTrackerSlice = createSlice({
    name: 'moveTracker',
    initialState: {
        whiteMoves: [],
        blackMoves: []
    },
    reducers: {
        addMove: (state, action) => {
            const [move, symbol] = action.payload
            const [color, piece] = [symbol[0], symbol[1]]
            if (color == 'W') {
                state.whiteMoves.push(move)
            }
            else{
                state.blackMoves.push(move)
            }
        }
    }
})

export default moveTrackerSlice.reducer
export const { addMove } = moveTrackerSlice.actions