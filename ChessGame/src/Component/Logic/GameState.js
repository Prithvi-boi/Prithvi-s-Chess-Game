import { store } from '../../store'
import MoveGen from './MoveGen.js'

export default function hasLegalMove(color, lastMove) {
    const s = store.getState().piecesPosition.value

    for (const key in s) {
        if (key[0] != color) continue
        const type = key[5]                      // K Q B N R P, same trick as before

        for (const sq of s[key]) {
            if (!sq) continue                    // skip captured ('') slots

            let found = false
            MoveGen(sq.toUpperCase(), `${color}${type}`, (moves, kills) => {
                if (moves.length || kills.length) found = true
            }, lastMove)

            if (found) return true               // one legal move is enough
        }
    }
    return false
}