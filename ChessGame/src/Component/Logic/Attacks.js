const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

// s = store.getState().piecesPosition.value, color = 'W' or 'B'
export default function getAttackedSquares(s, color, ignoreSquare = null) {
    const attacked = new Set()
    const occupied = new Set()
    Object.values(s).forEach(arr => arr.forEach(sq => { if (sq) occupied.add(sq) }))
    if (ignoreSquare) occupied.delete(ignoreSquare)
        
    // marks the square as attacked, returns true only if it was empty (keep sliding)
    const add = (f, r) => {
        if (f < 0 || f > 7 || r < 1 || r > 8) return false
        const sq = `${files[f]}${r}`
        attacked.add(sq)
        return !occupied.has(sq)
    }

    const slide = (f, r, dx, dy) => {
        for (let i = 1; i <= 8; i++) {
            if (!add(f + dx * i, r + dy * i)) break
        }
    }

    const straight = (f, r) => { slide(f, r, 1, 0); slide(f, r, -1, 0); slide(f, r, 0, 1); slide(f, r, 0, -1) }
    const diagonal = (f, r) => { slide(f, r, 1, 1); slide(f, r, 1, -1); slide(f, r, -1, 1); slide(f, r, -1, -1) }

    for (const key in s) {
        if (key[0] != color) continue
        const type = key[5]   // K Q B N R P, same trick your reducer uses

        for (const sq of s[key]) {
            if (!sq) continue   // skip captured ('') slots
            const f = files.indexOf(sq[0])
            const r = Number(sq[1])

            if (type == 'R') straight(f, r)
            else if (type == 'B') diagonal(f, r)
            else if (type == 'Q') { straight(f, r); diagonal(f, r) }
            else if (type == 'N') {
                for (const [dx, dy] of [[1, 2], [2, 1], [-1, 2], [-2, 1], [1, -2], [2, -1], [-1, -2], [-2, -1]]) add(f + dx, r + dy)
            }
            else if (type == 'K') {
                for (let x = -1; x <= 1; x++)
                    for (let y = -1; y <= 1; y++)
                        if (x || y) add(f + x, r + y)
            }
            else if (type == 'P') {
                const dir = color == 'W' ? 1 : -1
                add(f - 1, r + dir)
                add(f + 1, r + dir)
            }
        }
    }
    return attacked   // Set of lowercase squares, e.g. 'd5'
}