import { store } from '../../store'
import getAttackedSquares from './Attacks.js'

export default function MoveGen(position, Selected_piece, MoveGenCallback, lastMove) {
    let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    let Moves = []
    let killables = []

    const s = (store.getState()).piecesPosition.value
    const castle = (store.getState()).piecesPosition.castle

    const WhitePositions = Object.fromEntries(
        Object.entries(s).filter(([key]) => key.startsWith("White"))
    );

    const BlackPositions = Object.fromEntries(
        Object.entries(s).filter(([key]) => key.startsWith("Black"))
    );

    const InsertMoves = (letter, number, canCapture = true) => {
        if (number > 8 || number < 1 || letter == undefined) return false   // off board
        let value = `${letter}${number}`
        if (Selected_piece[0] == 'W') {
            for (const key in WhitePositions) {
                if (WhitePositions[key].includes(value.toLowerCase())) return false   // own piece: blocked
            }
            for (const key in BlackPositions) {
                if (BlackPositions[key].includes(value.toLowerCase())) {
                    if (canCapture) killables.push(value)
                    return false   // enemy piece: can capture it, but blocked after it
                }
            }
        } else {
            for (const key in BlackPositions) {
                if (BlackPositions[key].includes(value.toLowerCase())) return false   // own piece: blocked
            }
            for (const key in WhitePositions) {
                if (WhitePositions[key].includes(value.toLowerCase())) {
                    if (canCapture) killables.push(value)
                    return false   // enemy piece: can capture it, but blocked after it
                }
            }
        }
        Moves.push(value)
        return true   // empty: keep going
    }

    if (position) {
        const slide = (dx, dy) => {
            for (let i = 1; i <= 8; i++) {
                // "Calling a function runs it fully (push included), and the if just reads the true/false it hands back."
                let result = InsertMoves(letters[l + dx * i], Number(posY) + dy * i)  // push happens HERE
                if (!result) {
                    break
                }
            }
        }
        let color = Selected_piece[0]
        let piece = Selected_piece[1]

        let posX = position[0]
        let posY = position[1]
        let l = letters.indexOf(posX)

        const checkPawnCapture = (letter, number, color) => {
            if (letter == undefined || number < 1 || number > 8) return   // off board
            let value = `${letter}${number}`
            const enemy = color == 'W' ? BlackPositions : WhitePositions
            for (const key in enemy) {
                if (enemy[key].includes(value.toLowerCase())) {
                    killables.push(value)   // enemy is there, so it can be captured
                    return
                }
            }
        }

        const checkEnPassant = (letter, rank, color, dir) => {
            if (letter == undefined) return   // off board
            const reqRank = color == 'W' ? 5 : 4
            if (rank != reqRank) return       // pawn must be on its 5th rank

            const pawnKey = color == 'W' ? 'BlackPawn' : 'WhitePawn'
            const enemy = color == 'W' ? BlackPositions : WhitePositions
            const value = `${letter}${rank}`          // the neighbor square
            const captureSquare = `${letter}${rank + dir}`   // where our pawn lands

            const justJumped =
                lastMove &&
                lastMove.piece[1] == 'P' &&
                lastMove.to.toUpperCase() == value.toUpperCase() &&
                Math.abs(Number(lastMove.from[1]) - Number(lastMove.to[1])) == 2

            if (justJumped && enemy[pawnKey].includes(value.toLowerCase())) {
                killables.push(captureSquare)
            }
        }

        if (piece == 'P') {
            const dir = color == 'W' ? 1 : -1 // direction
            const startRank = color == 'W' ? '2' : '7'
            if (InsertMoves(posX, Number(posY) + dir, false)) {
                if (posY == startRank) InsertMoves(posX, Number(posY) + 2 * dir, false)
            }

            checkPawnCapture(letters[l - 1], Number(posY) + dir, color)
            checkPawnCapture(letters[l + 1], Number(posY) + dir, color)
            checkEnPassant(letters[l - 1], Number(posY), color, dir)
            checkEnPassant(letters[l + 1], Number(posY), color, dir)
        }



        // Other pieces Moves
        switch (piece) {
            case 'R':
                slide(1, 0); slide(-1, 0); slide(0, 1); slide(0, -1)
                break;

            case 'B':
                slide(1, 1); slide(1, -1); slide(-1, 1); slide(-1, -1)
                break;

            case 'Q':
                slide(1, 0); slide(-1, 0); slide(0, 1); slide(0, -1)
                slide(1, 1); slide(1, -1); slide(-1, 1); slide(-1, -1)
                break;

            case 'K': {
                const enemyColor = color == 'W' ? 'B' : 'W'
                const enemyAttacks = getAttackedSquares(s, enemyColor, position.toLowerCase())
                const side = color == 'W' ? castle.White : castle.Black
                const rank = Number(posY)
                const occupied = (sq) => Object.values(s).some(arr => arr.includes(sq.toLowerCase()))
                const attacked = (sq) => enemyAttacks.has(sq.toLowerCase())
                const inCheck = attacked(position)

                // castling: king not in check, squares between empty, king's path not attacked
                if (!inCheck) {
                    if (side.right && !occupied(`F${rank}`) && !occupied(`G${rank}`)
                        && !attacked(`F${rank}`) && !attacked(`G${rank}`)) {
                        InsertMoves(letters[l + 2], rank, false)
                    }
                    if (side.left && !occupied(`B${rank}`) && !occupied(`C${rank}`) && !occupied(`D${rank}`)
                        && !attacked(`D${rank}`) && !attacked(`C${rank}`)) {
                        InsertMoves(letters[l - 2], rank, false)
                    }
                }

                // normal king steps
                for (let x = -1; x <= 1; x++) {
                    for (let y = -1; y <= 1; y++) {
                        if (x === 0 && y === 0) continue
                        InsertMoves(letters[l + x], Number(posY) + y)
                    }
                }

                // king can't step onto an attacked square
                Moves = Moves.filter(sq => !attacked(sq))
                killables = killables.filter(sq => !attacked(sq))
                break;
            }

            case 'N':
                let j = 2
                for (let i = 1; i <= 2; i++) {
                    InsertMoves(letters[l - i], Number(posY) + j)
                    InsertMoves(letters[l - i], Number(posY) - j)
                    InsertMoves(letters[l + i], Number(posY) + j)
                    InsertMoves(letters[l + i], Number(posY) - j)
                    j = j - 1
                }
                break;

            default:
                break;
        }
    }

    MoveGenCallback(Moves, killables)
}