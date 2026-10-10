import White_Pawn from '../../Assets/Default Chess Pieces/White_Pawn.svg?react'
import White_King from '../../Assets/Default Chess Pieces/White_King.svg?react'
import White_Queen from '../../Assets/Default Chess Pieces/White_Queen.svg?react'
import White_Bishop from '../../Assets/Default Chess Pieces/White_Bishop.svg?react'
import White_Knight from '../../Assets/Default Chess Pieces/White_Knight.svg?react'
import White_Rook from '../../Assets/Default Chess Pieces/White_Rook.svg?react'

import Black_Pawn from '../../Assets/Default Chess Pieces/Black_Pawn.svg?react'
import Black_King from '../../Assets/Default Chess Pieces/Black_King.svg?react'
import Black_Queen from '../../Assets/Default Chess Pieces/Black_Queen.svg?react'
import Black_Bishop from '../../Assets/Default Chess Pieces/Black_Bishop.svg?react'
import Black_Knight from '../../Assets/Default Chess Pieces/Black_Rook-1.svg?react'
import Black_Rook from '../../Assets/Default Chess Pieces/Black_Rook.svg?react'

export default function DefaultPieces({ elmt }) {
    const pieceSize = 'h-[10vw] w-full'
    const piecesPosition = {
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
    elmt = elmt.toLowerCase()
    return (
        <>
            {piecesPosition.WhitePawn.includes(elmt) && <White_Pawn id={'WP'} className={pieceSize} />}
            {piecesPosition.WhiteKing.includes(elmt) && <White_King id={'WK'} className={pieceSize} />}
            {piecesPosition.WhiteQueen.includes(elmt) && <White_Queen id={'WQ'} className={pieceSize} />}
            {piecesPosition.WhiteKnight.includes(elmt) && <White_Knight id={'WN'} className={pieceSize} />}
            {piecesPosition.WhiteBishop.includes(elmt) && <White_Bishop id={'WB'} className={pieceSize} />}
            {piecesPosition.WhiteRook.includes(elmt) && <White_Rook id={'WR'} className={pieceSize} />}

            {piecesPosition.BlackPawn.includes(elmt) && <Black_Pawn id={'BP'} className={pieceSize} />}
            {piecesPosition.BlackKing.includes(elmt) && <Black_King id={'BK'} className={pieceSize} />}
            {piecesPosition.BlackQueen.includes(elmt) && <Black_Queen id={'BQ'}  className={pieceSize} />}
            {piecesPosition.BlackKnight.includes(elmt) && <Black_Knight id={'BN'}  className={pieceSize} />}
            {piecesPosition.BlackBishop.includes(elmt) && <Black_Bishop id={'BB'}  className={pieceSize} />}
            {piecesPosition.BlackRook.includes(elmt) && <Black_Rook id={'BR'}  className={pieceSize} />}
        </>
    )
}
