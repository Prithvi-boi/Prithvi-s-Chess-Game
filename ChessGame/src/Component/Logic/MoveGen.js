

export default function MoveGen(position, Selected_piece, MoveGenCallback) {
    let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    let Moves = []
    if (position) {
        let color = Selected_piece[0]
        let piece = Selected_piece[1]

        let posX = position[0]
        let posY = position[1]

        if (color == 'W') {
            switch (piece) {
                case 'P':
                    Moves.push(`${posX}${Number(posY) + 1}`)
                    Moves.push(`${posX}${Number(posY) + 2}`)
                    break;

                // Moves.push(`${letters[i]}${Number(posY) + i}`) -- diagonal
                case 'R':
                    for (let i = 0; i < letters.length; i++) {
                        if (letters[i] != posX) {
                            Moves.push(`${letters[i]}${Number(posY)}`)
                        }

                        if (Number(posY) != i + 1) {
                            Moves.push(`${posX}${i + 1}`)
                        }
                    }
                    break;

                case 'B':
                    let l = letters.indexOf(posX)
                    for (let i = 1; i <= 8; i++) {
                        if (letters[l - i] == undefined && letters[l + i] == undefined) { break }
                        
                        if (l-i >= 0 && Number(posY)-i > 0) {
                            Moves.push(`${letters[l - i]}${Number(posY) - i}`)
                        }
                        
                        if (l+i < 8 && Number(posY)+i <= 8 ) {
                            Moves.push(`${letters[l + i]}${Number(posY) + i}`)
                        }
                        
                        if (l-i >= 0 && Number(posY)+i <= 8 ) {
                            Moves.push(`${letters[l - i]}${Number(posY) + i}`)    
                        }

                        if (l+i < 8 && Number(posY)-i > 0) {
                            Moves.push(`${letters[l + i]}${Number(posY) - i}`)    
                        }

                        // console.log(Number(posY)+i, letters[l - i], '-' , );
                    }

                    break;

                default:
                    break;
            }
        } else {
            switch (piece) {
                case 'P':
                    Moves.push(`${posX}${Number(posY) - 1}`)
                    Moves.push(`${posX}${Number(posY) - 2}`)
                    break;

                default:
                    break;
            }
        }

    }
    MoveGenCallback(Moves)
}
