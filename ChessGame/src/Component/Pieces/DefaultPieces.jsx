import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';
import React from 'react';

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

const defaultPieceStyle = {
    white: {
        K: <White_King />,
        Q: <White_Queen />,
        R: <White_Rook />,
        B: <White_Bishop />,
        N: <White_Knight />,
        P: <White_Pawn />,
    },
    black: {
        K: <Black_King />,
        Q: <Black_Queen />,
        R: <Black_Rook />,
        B: <Black_Bishop />,
        N: <Black_Knight />,
        P: <Black_Pawn />,
    }
}

export default function DefaultPieces({ elmt, PromotionFlag = false, PromotionPiece = { color: null, file: null, PromotionCallback: () => { } } }) {

    const piecesPosition = useSelector(state => state.piecesPosition.value)
    const [pieceStyle, setPieceStyle] = useState(defaultPieceStyle)
    const pieceSize = 'h-[10vw] w-full lg:h-full md:h-full'

    const { color, file, PromotionCallback } = PromotionPiece
    return (
        <>
            {PromotionFlag == false ?
                <>
                    {Object.entries(piecesPosition).map(([key, value]) => {
                        if (!value.includes(elmt)) return null
                        const k = key[0] + key[5]
                        const color = key[0] === 'W' ? pieceStyle.white : pieceStyle.black;
                        return React.cloneElement(color[key[5]], {
                            key: k,
                            id: k,
                            className: pieceSize
                        });
                    })}
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
import { trackPromotion } from '../../slices/moveTracker'

export function PawnPromotion({ color, file, PromotionCallback }) {
    let pieceStyle = 'h-[10vw] w-full border border-black'
    let positionStyle = ['A', 'B', 'C', 'D'].includes(file[0])
    const dispatch = useDispatch()

    const choose = (piece) => {
        dispatch(handlePawnPromotion([piece, file]))
        dispatch(trackPromotion([piece, file]))
        PromotionCallback()
    }

    return (
        <div className={`grid grid-cols-4 absolute h-[10vw] w-[30vw] bg-white border border-black -top-10 ${positionStyle ? 'left-0' : 'right-0'} z-50`}>
            {color == 'W' ?
                <>
                    <div onClick={() => { choose('WQ'), PromotionCallback() }}><White_Queen className={pieceStyle} /> </div>
                    <div onClick={() => { choose('WR'), PromotionCallback() }}><White_Rook className={pieceStyle} /></div>
                    <div onClick={() => { choose('WN'), PromotionCallback() }}><White_Knight className={pieceStyle} /></div>
                    <div onClick={() => { choose('WB'), PromotionCallback() }}><White_Bishop className={pieceStyle} /> </div>
                </>
                :
                <>
                    <div onClick={() => { choose('BQ'), PromotionCallback() }}><Black_Queen className={pieceStyle} /> </div>
                    <div onClick={() => { choose('BR'), PromotionCallback() }}><Black_Rook className={pieceStyle} /></div>
                    <div onClick={() => { choose('BN'), PromotionCallback() }}><Black_Knight className={pieceStyle} /></div>
                    <div onClick={() => { choose('BB'), PromotionCallback() }}><Black_Bishop className={pieceStyle} /> </div>
                </>}
        </div>
    )
}

export function CapturesBlock({ black }) {
    const whiteCaptures = useSelector(state => state.piecesPosition.whiteCaptures)
    const blackCaptures = useSelector(state => state.piecesPosition.blackCaptures)

    const svg = black ? defaultPieceStyle.white : defaultPieceStyle.black
    const captureArry = black ? blackCaptures : whiteCaptures

    const order = 'PNBRQK';
    const sortedCapturesArry = [...captureArry].sort(
        (a, b) => order.indexOf(a[1]) - order.indexOf(b[1])
    );

    return (
        <div className={`h-full w-full flex pl-4`}>
            <>
                {sortedCapturesArry.map((val, i) => {
                    return React.cloneElement(svg[val[1]], {
                        key: i,
                        className: `h-5 w-5 self-center ${val[1] == 'P' ? '-ml-[15px]' : '-ml-2'}`
                    });
                })}
            </>
        </div>
    )
}