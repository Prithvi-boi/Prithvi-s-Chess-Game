import { createSlice } from "@reduxjs/toolkit";

const moveTrackerSlice = createSlice({
    name: 'moveTracker',
    initialState: {
        whiteMoves: [],
        blackMoves: []
    },
    reducers: {
        addMove: (state, action) => {

        }
    }
})

export default moveTrackerSlice.reducer
export const { addMove } = moveTrackerSlice.actions