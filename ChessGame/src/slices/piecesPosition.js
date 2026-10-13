import { createSlice, current } from "@reduxjs/toolkit";

const piecesPositionReducer = createSlice({
    name: 'piecesPosition',
    initialState: {
        value: {
            WhiteKing: ['e1'],
            WhiteQueen: ['d1'],
            WhiteBishop: ['c1', 'f1'],
            WhiteNight: ['b1', 'g1'],
            WhiteRook: ['a1', 'h1'],
            WhitePawn: ['a7', 'b2', 'c2', 'd2', 'e2', 'f2', 'h2', 'g2'],

            BlackKing: ['e8'],
            BlackQueen: ['d8'],
            BlackBishop: ['c8', 'f8'],
            BlackNight: ['b8', 'g8'],
            BlackRook: ['b6', 'h8'],
            BlackPawn: ['b5', 'b7', 'c7', 'd7', 'e7', 'f7', 'h7', 'g7'],
        },
        castle: {
            White: {
                right: true,
                left: true
            },
            Black: {
                right: true,
                left: true
            },
        }
    },
    reducers: {
        changePosition: (state, action) => {
            const target = action.payload;
            // Castle Logic
            if (target[1][1][1] == 'R') {
                let key = target[1][1][0] == 'W' ? 'WhiteRook' : 'BlackRook'
                let c = target[1][1][0] == 'W' ? state.castle.White : state.castle.Black
                const element = state.value[key];
                let j = target[1][0].toLowerCase()
                if (element.includes(j)) {
                    const i = element.indexOf(j);
                    if (i == 0) c.left = false
                    if (i == 1) c.right = false
                }

            }


            // En Passant Capture
            if (target[1][1][1] == 'P') {
                let key = target[1][1][0] == 'W' ? 'BlackPawn' : 'WhitePawn'
                const element = state.value[key];

                const fileChanged = target[0][0].toLowerCase() != target[1][0][0].toLowerCase()
                const destEmpty = !Object.values(state.value).some(arr => arr.includes(target[0].toLowerCase()))

                if (!element.includes(target[0].toLowerCase()) && fileChanged && destEmpty) {
                    let n = target[1][1][0] == 'W' ? Number(target[0][1]) - 1 : Number(target[0][1]) + 1
                    let i = `${target[0][0]}${n}`.toLowerCase()

                    if (element.includes(i)) {
                        const j = element.indexOf(i);
                        element[j] = ''
                    }
                }
            }


            for (const key in state.value) {
                const element = state.value[key];
                if (element.includes(target[0].toLowerCase())) {
                    const j = element.indexOf(target[0].toLowerCase());
                    element[j] = ''
                }
            }


            for (const key in state.value) {
                const k = `${key[0]}${key[5]}`;
                const element = state.value[key];

                if (k === target[1][1]) {
                    const j = element.indexOf(target[1][0].toLowerCase());
                    element[j] = target[0].toLowerCase()
                    break
                }
            }
        },

        handleCastle: (state, action) => {
            if (action.payload[1][1][1] != 'K') return

            const color = action.payload[1][1][0]
            const fromFile = action.payload[1][0][0]   // file the king left
            const rank = action.payload[1][0][1]
            const toFile = action.payload[0]           // file the king landed on
            const element = state.value[color == 'W' ? 'WhiteRook' : 'BlackRook']

            // rook jumps ONLY when the king moved two files from E
            if (fromFile == 'E' && toFile == 'C') {
                const j = element.indexOf(`a${rank}`)
                if (j !== -1) element[j] = `d${rank}`
            }
            if (fromFile == 'E' && toFile == 'G') {
                const j = element.indexOf(`h${rank}`)
                if (j !== -1) element[j] = `f${rank}`
            }

            // any king move loses both castle rights
            const c = color == 'W' ? state.castle.White : state.castle.Black
            c.left = false
            c.right = false
        },

        handlePawnPromotion: (state, action) => {            
            let color = action.payload[0][0]
            let piece = action.payload[0][1]
            for (const key in state.value) {                
                const element = state.value[key];
                if (key[0] == color && key[5] == piece){
                   element.push(action.payload[1].toLowerCase()) 
                }
                if (key[0] == color && key[5] == 'P') {
                    let i = element.indexOf(action.payload[1].toLowerCase())
                    element[i] = ''
                }
            }
        }
    }
})

export default piecesPositionReducer.reducer
export const { changePosition, handleCastle, handlePawnPromotion } = piecesPositionReducer.actions
