import { createSlice } from "@reduxjs/toolkit";
import { setTimeOver } from "./Ingame.js";   // same folder as your other slices

const piecesPositionReducer = createSlice({
    name: 'piecesPosition',
    initialState: {
        value: {
            WhiteKing: ['e1'],
            WhiteQueen: ['d1'],
            WhiteBishop: ['c1', 'f1'],
            WhiteNight: ['b1', 'g1'],
            WhiteRook: ['a1', 'h1'],
            WhitePawn: ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'h2', 'g2'],

            BlackKing: ['e8'],
            BlackQueen: ['d8'],
            BlackBishop: ['c8', 'f8'],
            BlackNight: ['b8', 'g8'],
            BlackRook: ['a8', 'h8'],
            BlackPawn: ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'h7', 'g7'],
        },
        whiteCaptures: [],
        blackCaptures: [],
        castle: {
            White: {
                right: true,
                left: true
            },
            Black: {
                right: true,
                left: true
            },
        },
        gameOver: null,
        moves: 0,            // total moves played, moves % 2 = who is to move
        halfMove: 0,         // moves since the last pawn move or capture (for the 50-move rule)
        history: {},         // position key -> how many times it has happened
    },
    reducers: {
        changePosition: (state, action) => {
            const target = action.payload;
            if (state.moves === 0) state.history[positionKey(state)] = 1   // count the starting position too

            const isCapture = Object.values(state.value).some(arr => arr.includes(target[0].toLowerCase()))
            const isPawnMove = target[1][1][1] == 'P'
            state.moves += 1
            if (isCapture || isPawnMove) { state.halfMove = 0; state.history = {} }   // can never repeat after these
            else state.halfMove += 1

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
                    if (target[1][1][0] == 'W') {
                        state.whiteCaptures.push('B' + key[5]);
                    } else {
                        state.blackCaptures.push('W' + key[5])
                    }
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

            if (!state.value.WhiteRook.includes('a1')) state.castle.White.left = false
            if (!state.value.WhiteRook.includes('h1')) state.castle.White.right = false
            if (!state.value.BlackRook.includes('a8')) state.castle.Black.left = false
            if (!state.value.BlackRook.includes('h8')) state.castle.Black.right = false
        },

        handleCastle: (state, action) => {
            if (action.payload[1][1][1] != 'K') return

            const color = action.payload[1][1][0]
            const fromFile = action.payload[1][0][0]   // file the king left
            const rank = action.payload[1][0][1]
            const toFile = action.payload[0]           // file the king landed on
            const element = state.value[color == 'W' ? 'WhiteRook' : 'BlackRook']

            // rook jumps ONLY when the king moved two files from E
            if (fromFile == 'E' && toFile == 'C') { // Queen Side
                const j = element.indexOf(`a${rank}`)
                if (j !== -1) element[j] = `d${rank}`
            }
            if (fromFile == 'E' && toFile == 'G') { // king side
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
                if (key[0] == color && key[5] == piece) {
                    element.push(action.payload[1].toLowerCase())
                }
                if (key[0] == color && key[5] == 'P') {
                    let i = element.indexOf(action.payload[1].toLowerCase())
                    element[i] = ''
                }
            }
            state.history = {}
            recordAndCheck(state)
        },

        evaluateDraw: (state) => { recordAndCheck(state) },

        setGameOver: (state, action) => {
            if (state.gameOver) return
            state.gameOver = action.payload
        },

    },
    extraReducers: (builder) => {
        builder.addCase(setTimeOver, (state, action) => {
            if (state.gameOver) return                 // checkmate/draw already happened, keep it
            const loser = action.payload               // 'white' | 'black', whose clock hit 0
            state.gameOver = {
                winner: loser == 'white' ? 'black' : 'white',
                reason: 'Timeout',
            }
        })
    }
})


const isInsufficient = (value) => {
    const minors = []
    for (const key in value) {
        const type = key[5]                                   // K Q B N R P
        if (type == 'K') continue
        for (const sq of value[key]) {
            if (!sq) continue                                 // skip captured ('') slots
            if (type != 'B' && type != 'N') return false      // pawn, rook or queen can still mate
            minors.push({ type, color: ('abcdefgh'.indexOf(sq[0]) + Number(sq[1])) % 2 })
        }
    }
    if (minors.length <= 1) return true                       // K v K, K+B v K, K+N v K
    return minors.every(m => m.type == 'B' && m.color == minors[0].color)   // bishops, all on the same square color
}

// same position = same pieces on same squares + same castle rights + same side to move
const positionKey = (state) => {
    const pcs = []
    for (const key in state.value)
        for (const sq of state.value[key])
            if (sq) pcs.push(`${key[0]}${key[5]}${sq}`)
    const { White: w, Black: b } = state.castle
    return pcs.sort().join(',') + `|${w.left}${w.right}${b.left}${b.right}|${state.moves % 2}`
}

const recordAndCheck = (state) => {
    if (state.gameOver) return
    const k = positionKey(state)
    state.history[k] = (state.history[k] || 0) + 1

    if (isInsufficient(state.value))
        state.gameOver = { winner: 'draw', reason: 'Insufficient material' }
    else if (state.history[k] >= 3)
        state.gameOver = { winner: 'draw', reason: 'Threefold repetition' }
    else if (state.halfMove >= 100)
        state.gameOver = { winner: 'draw', reason: '50-move rule' }
}

export default piecesPositionReducer.reducer
export const { changePosition, handleCastle, handlePawnPromotion, evaluateDraw, setGameOver } = piecesPositionReducer.actions
