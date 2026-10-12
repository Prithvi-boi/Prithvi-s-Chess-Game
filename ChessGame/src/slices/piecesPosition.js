import { createSlice, current } from "@reduxjs/toolkit";

const piecesPositionReducer = createSlice({
    name: 'piecesPosition',
    initialState: {
        value: {
            WhiteKing: ['e1'],
            WhiteQueen: ['d1'],
            WhiteBishop: ['c1', 'f1'],
            WhiteKnight: ['b1', 'g1'],
            WhiteRook: ['a1', 'h1'],
            WhitePawn: ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'h2', 'g2'],

            BlackKing: ['e8'],
            BlackQueen: ['d8'],
            BlackBishop: ['c8', 'f8'],
            BlackKnight: ['b8', 'g8'],
            BlackRook: ['a8', 'h8'],
            BlackPawn: ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'h7', 'g7'],
        }
    },
    reducers: {
        changePosition: (state, action) => {
            const target = action.payload;

            for (const key in state.value) {
                const k = `${key[0]}${key[5]}`;
                const element = state.value[key];

                if (k === target[1][1]) {
                    const j = element.indexOf(
                        target[1][0].toLowerCase()
                    );
                    element[j] = target[0].toLowerCase()
                    break
                }
            }
        }
    }
})

export default piecesPositionReducer.reducer
export const { changePosition } = piecesPositionReducer.actions
