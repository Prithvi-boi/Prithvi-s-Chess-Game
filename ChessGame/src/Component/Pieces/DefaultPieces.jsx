import { useSelector, useDispatch } from 'react-redux'

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

export default function DefaultPieces({ elmt, PromotionFlag = false, PromotionPiece = {color: null , file: null, PromotionCallback: ()=>{}} }) {
    const pieceSize = 'h-[10vw] w-full lg:h-full md:h-full'
    const piecesPosition = useSelector(state => state.piecesPosition.value)
    const {color , file, PromotionCallback} = PromotionPiece
    return ( 
        <>
            {PromotionFlag == false ?
                <>
                    {piecesPosition.WhitePawn.includes(elmt) && <White_Pawn id={'WP'} className={pieceSize} />}
                    {piecesPosition.WhiteKing.includes(elmt) && <White_King id={'WK'} className={pieceSize} />}
                    {piecesPosition.WhiteQueen.includes(elmt) && <White_Queen id={'WQ'} className={pieceSize} />}
                    {piecesPosition.WhiteNight.includes(elmt) && <White_Knight id={'WN'} className={pieceSize} />}
                    {piecesPosition.WhiteBishop.includes(elmt) && <White_Bishop id={'WB'} className={pieceSize} />}
                    {piecesPosition.WhiteRook.includes(elmt) && <White_Rook id={'WR'} className={pieceSize} />}

                    {piecesPosition.BlackPawn.includes(elmt) && <Black_Pawn id={'BP'} className={pieceSize} />}
                    {piecesPosition.BlackKing.includes(elmt) && <Black_King id={'BK'} className={pieceSize} />}
                    {piecesPosition.BlackQueen.includes(elmt) && <Black_Queen id={'BQ'} className={pieceSize} />}
                    {piecesPosition.BlackNight.includes(elmt) && <Black_Knight id={'BN'} className={pieceSize} />}
                    {piecesPosition.BlackBishop.includes(elmt) && <Black_Bishop id={'BB'} className={pieceSize} />}
                    {piecesPosition.BlackRook.includes(elmt) && <Black_Rook id={'BR'} className={pieceSize} />}
                </>
                :
                <>
                    <PawnPromotion color={color} file={file} PromotionCallback={PromotionCallback} />
                </>
                }
        </>
    )
}

import { handlePawnPromotion } from '../../slices/piecesPosition'

export function PawnPromotion({ color, file, PromotionCallback }) {
    let pieceStyle = 'h-[10vw] w-full border border-black'
    let positionStyle = ['A', 'B', 'C', 'D'].includes(file[0])
    const dispatch = useDispatch()

    return (
        <div className={`grid grid-cols-4 absolute h-[10vw] w-[30vw] bg-white border border-black -top-10 ${positionStyle ? 'left-0' : 'right-0'} z-50`}>
            {color == 'W' ?
                <>
                    <div onClick={() => { dispatch(handlePawnPromotion(['WQ', file])), PromotionCallback() }}><White_Queen className={pieceStyle} /> </div>
                    <div onClick={() => { dispatch(handlePawnPromotion(['WR', file])), PromotionCallback() }}><White_Rook className={pieceStyle} /></div>
                    <div onClick={() => { dispatch(handlePawnPromotion(['WN', file])), PromotionCallback() }}><White_Knight className={pieceStyle} /></div>
                    <div onClick={() => { dispatch(handlePawnPromotion(['WB', file])), PromotionCallback() }}><White_Bishop className={pieceStyle} /> </div>
                </>
                :
                <>
                    <div onClick={() => { dispatch(handlePawnPromotion(['BQ', file])), PromotionCallback() }}><Black_Queen className={pieceStyle} /> </div>
                    <div onClick={() => { dispatch(handlePawnPromotion(['BR', file])), PromotionCallback() }}><Black_Rook className={pieceStyle} /></div>
                    <div onClick={() => { dispatch(handlePawnPromotion(['BN', file])), PromotionCallback() }}><Black_Knight className={pieceStyle} /></div>
                    <div onClick={() => { dispatch(handlePawnPromotion(['BB', file])), PromotionCallback() }}><Black_Bishop className={pieceStyle} /> </div>
                </>}
        </div>
    )
}