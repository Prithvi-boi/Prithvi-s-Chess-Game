

export default function MoveGen(position, Selected_piece, MoveGenCallback) {
    let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    let Moves = []
    let killables = []
    const WhitePositions = {
        WhiteKing: ['e1'],
        WhiteQueen: ['d4'],
        WhiteBishop: ['c3', 'f1'],
        WhiteKnight: ['b1', 'g1'],
        WhiteRook: ['a1', 'h1'],
        WhitePawn: ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'h2', 'g2']
    }

    const BlackPositions = {
        BlackKing: ['e8'],
        BlackQueen: ['d8'],
        BlackBishop: ['c8', 'f8'],
        BlackKnight: ['b8', 'g8'],
        BlackRook: ['a8', 'h8'],
        BlackPawn: ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'h7', 'g7'],
    }

    const InsertMoves = (letter, number, canCapture = true) => {
        if (number > 8 || number < 1 || letter == undefined) return false   // off board
        let value = `${letter}${number}`

        for (const key in WhitePositions) {
            if (WhitePositions[key].includes(value.toLowerCase())) return false   // own piece: blocked
        }
        for (const key in BlackPositions) {
            if (BlackPositions[key].includes(value.toLowerCase())) {
                if (canCapture) killables.push(value)
                return false   // enemy piece: can capture it, but blocked after it
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

        if (piece == 'P') {
            const dir = color == 'W' ? 1 : -1
            const startRank = color == 'W' ? '2' : '7'
            if (InsertMoves(posX, Number(posY) + dir, false)) {
                if (posY == startRank) InsertMoves(posX, Number(posY) + 2 * dir, false)
            }
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

            case 'K':
                for (let x = -1; x <= 1; x++) {
                    for (let y = -1; y <= 1; y++) {
                        if (x === 0 && y === 0) continue;
                        InsertMoves(letters[l + x], Number(posY) + y
                        );
                    }
                }
                break;

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
