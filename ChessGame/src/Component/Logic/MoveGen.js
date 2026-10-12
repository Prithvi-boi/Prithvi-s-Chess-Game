

export default function MoveGen(position, Selected_piece, MoveGenCallback) {
    let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    let Moves = []
    const InsertMoves = (letter, number) => {
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
                    if (letters[l - i] == undefined && letters[l + i] == undefined) { break }
                    if (l - i >= 0 && Number(posY) - i > 0) { InsertMoves(letters[l - i], Number(posY) - i) }
                    if (l + i < 8 && Number(posY) + i <= 8) { InsertMoves(letters[l + i], Number(posY) + i) }
                    if (l - i >= 0 && Number(posY) + i <= 8) { InsertMoves(letters[l - i], Number(posY) + i) }
                    if (l + i < 8 && Number(posY) - i > 0) { InsertMoves(letters[l + i], Number(posY) - i) }
                }
                break;

            case 'Q':
                for (let i = 0; i < letters.length; i++) {
                    if (letters[i] != posX) { InsertMoves(letters[i], Number(posY)) }
                    if (Number(posY) != i + 1) { InsertMoves(posX, i + 1) }
                }

                for (let i = 1; i <= 8; i++) {
                    if (letters[l - i] == undefined && letters[l + i] == undefined) { break }
                    if (l - i >= 0 && Number(posY) - i > 0) { InsertMoves(letters[l - i], Number(posY) - i) }
                    if (l + i < 8 && Number(posY) + i <= 8) { InsertMoves(letters[l + i], Number(posY) + i) }
                    if (l - i >= 0 && Number(posY) + i <= 8) { InsertMoves(letters[l - i], Number(posY) + i) }
                    if (l + i < 8 && Number(posY) - i > 0) { InsertMoves(letters[l + i], Number(posY) - i) }
                }
                break;

            default:
                break;
        }
    }
    MoveGenCallback(Moves)
}
