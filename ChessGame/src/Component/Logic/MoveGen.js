

export default function MoveGen(position, Selected_piece, MoveGenCallback) {
    let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    let Moves = []
    const InsertMoves = (letter, number) => {
        if (number > 8 || number < 1) {
            return
        }
        if (letter == undefined) {
            return
        }

        Moves.push(`${letter}${number}`)
    }
    if (position) {
        let color = Selected_piece[0]
        let piece = Selected_piece[1]

        let posX = position[0]
        let posY = position[1]
        let l = letters.indexOf(posX)

        // Pawn Moves
        if (color == 'W' && piece == 'P') {
            Moves.push(`${posX}${Number(posY) + 1}`)
            Moves.push(`${posX}${Number(posY) + 2}`)
        }
        else if (color == 'B' && piece == 'P') {
            Moves.push(`${posX}${Number(posY) - 1}`)
            Moves.push(`${posX}${Number(posY) - 2}`)
        }

        // Other pieces Moves
        switch (piece) {
            case 'R':
                for (let i = 0; i < letters.length; i++) {
                    if (letters[i] != posX) { InsertMoves(letters[i], Number(posY)) }
                    if (Number(posY) != i + 1) { InsertMoves(posX, i + 1) }
                }
                break;

            case 'B':
                for (let i = 1; i <= 8; i++) {
                    InsertMoves(letters[l - i], Number(posY) - i)
                    InsertMoves(letters[l + i], Number(posY) + i)
                    InsertMoves(letters[l - i], Number(posY) + i)
                    InsertMoves(letters[l + i], Number(posY) - i)
                }
                break;

            case 'Q':
                for (let i = 0; i < letters.length; i++) {
                    if (letters[i] != posX) { InsertMoves(letters[i], Number(posY)) }
                    if (Number(posY) != i + 1) { InsertMoves(posX, i + 1) }
                }

                for (let i = 1; i <= 8; i++) {
                    InsertMoves(letters[l - i], Number(posY) - i)
                    InsertMoves(letters[l + i], Number(posY) + i)
                    InsertMoves(letters[l - i], Number(posY) + i)
                    InsertMoves(letters[l + i], Number(posY) - i)
                }
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
    MoveGenCallback(Moves)
}
