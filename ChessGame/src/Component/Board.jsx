import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePosition, handleCastle, evaluateDraw, setGameOver } from "../slices/piecesPosition.js";
import { createContext, useContext } from "react";
const BoardContext = createContext();
const useBoard = () => useContext(BoardContext);
import getAttackedSquares from "./Logic/Attacks.js";
import hasLegalMove from "./Logic/GameState.js";
import DefaultPieces from "./Pieces/DefaultPieces.jsx"
import MoveGen from "./Logic/MoveGen.js";

function Board({ playAs = 'white' }) {
  const gameOver = useSelector(state => state.piecesPosition.gameOver)
  const dispatch = useDispatch()
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].reverse()
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8]
  let darkSquares = []
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < letters.length; j++) {
      const element = `${letters[j]}${numbers[i]}`;
      darkSquares.push(element)
    }
  }

  if (playAs == 'white') {
    darkSquares = darkSquares.reverse()
  }

  // --------------------- Game Logic
  const [ClikedPiece, setClikedPiece] = useState()
  const [ClikedPosition, setClikedPosition] = useState()
  const [LastCliked, setLastCliked] = useState([])
  const [lastMove, setLastMove] = useState(null)
  const Turn = useSelector(state => state.piecesPosition.moves % 2 == 0 ? 'W' : 'B')
  const [promotion, setPromotion] = useState([])
  const pieces = useSelector(state => state.piecesPosition.value)
  const enemy = Turn == 'W' ? 'B' : 'W'
  const kingSq = pieces[Turn == 'W' ? 'WhiteKing' : 'BlackKing'][0]
  const checkedSquare = getAttackedSquares(pieces, enemy).has(kingSq) ? kingSq : null
  const handlePieceClick = (e) => {
    if (gameOver || promotion[0] != null) return
    setClikedPiece(e.currentTarget.children.item(0) != null ? e.currentTarget.children.item(0).id : null)
    setClikedPosition(e.currentTarget.id)
  }
  useEffect(() => {
    if (ClikedPiece != null && ClikedPiece[0] == Turn) {
      MoveGen(ClikedPosition, ClikedPiece, MoveGenCallback, lastMove)
      setLastCliked([ClikedPosition, ClikedPiece])
    } else {
      if (nextMoves.includes(ClikedPosition) || killables.includes(ClikedPosition)) {
        setLastMove({ piece: LastCliked[1], from: LastCliked[0], to: ClikedPosition })
        dispatch(changePosition([ClikedPosition, LastCliked]))
        dispatch(handleCastle([ClikedPosition[0], LastCliked]))
        dispatch(evaluateDraw())
        let lastrank = LastCliked[1][0] == 'W' ? '8' : '1'
        if (LastCliked[1][1] == 'P' && ClikedPosition[1] == lastrank) {
          setPromotion([<PawnPromotion color={LastCliked[1][0]} file={ClikedPosition} PromotionCallback={() => setPromotion([])} />, ClikedPosition])
        }
        setNextMoves([])
        setkillables([])
      }
    }

  }, [ClikedPiece, ClikedPosition])

  const [nextMoves, setNextMoves] = useState([])
  const [killables, setkillables] = useState([])
  const MoveGenCallback = (moves, killables) => {
    setNextMoves(moves)
    setkillables(killables)
  }

  useEffect(() => {
    if (gameOver) setTimeout(() => alert(gameOver), 100)
  }, [gameOver])

  useEffect(() => {
    if (!lastMove || gameOver) return
    if (promotion[0] != null) return
    if (hasLegalMove(Turn, lastMove)) return

    dispatch(setGameOver(
      checkedSquare
        ? `Checkmate! ${Turn == 'W' ? 'Black' : 'White'} wins`
        : 'Stalemate! Draw'
    ))
  }, [pieces, Turn, promotion])
  return (
    <div className={`w-full h-[100vw] bg-[#3A1A0C] border-y-4  border-[#634833] grid grid-cols-[1.5rem_auto_1.5em] grid-rows-[1.5rem_auto_1.5em]`}>
      <BoardContext.Provider value={{ reverse: playAs === "white" }}>
        <Coords row={1} col={2} deg={180} />
        <Coords row={3} col={2} deg={0} />
        <Coords row={2} col={1} deg={0} grid_col={true} num={true} />
        <Coords row={2} col={3} deg={180} grid_col={true} num={true} />
      </BoardContext.Provider>

      <div className="row-start-2 col-start-2 bg-[#3A1A0C] border-2 border-[#634833]">
        <div className=" grid grid-rows-8 grid-cols-8 h-full w-full bg-[#E9E9DF]">
          {darkSquares.map((elmt, i) => {
            let num = Number(elmt[1])
            let color;
            if (num % 2 == 0) { color = i % 2 == 0 ? 'bg-[#E9E9DF]' : 'bg-[#BB9979]' }
            else { color = i % 2 == 0 ? 'bg-[#BB9979]' : 'bg-[#E9E9DF]' }
            return (
              <div key={elmt} id={elmt}
                style={elmt.toLowerCase() == checkedSquare ? { backgroundColor: '#ef4444' } : undefined}
                className={`relative h-full w-full ${color} ${nextMoves.includes(elmt) ? 'moveOverlay' : ''} ${killables.includes(elmt) ? 'killOverlay' : ''} text-amber-950 flex justify-center items-center`}
                onClick={(e) => { handlePieceClick(e) }}>
                <DefaultPieces elmt={elmt} />
                {(elmt == promotion[1] && promotion[0] != null) ? promotion[0] : null}
              </div>
            )
          })}
        </div>
      </div>
    </div >
  )
}


import White_Queen from '../Assets/Default Chess Pieces/White_Queen.svg?react'
import White_Bishop from '../Assets/Default Chess Pieces/White_Bishop.svg?react'
import White_Knight from '../Assets/Default Chess Pieces/White_Knight.svg?react'
import White_Rook from '../Assets/Default Chess Pieces/White_Rook.svg?react'

import Black_Queen from '../Assets/Default Chess Pieces/Black_Queen.svg?react'
import Black_Bishop from '../Assets/Default Chess Pieces/Black_Bishop.svg?react'
import Black_Knight from '../Assets/Default Chess Pieces/Black_Rook-1.svg?react'
import Black_Rook from '../Assets/Default Chess Pieces/Black_Rook.svg?react'

import { handlePawnPromotion } from "../slices/piecesPosition.js";

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


function Coords({ row, col, deg, grid_col, num }) {
  const { reverse } = useBoard()
  let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  let numbers = [1, 2, 3, 4, 5, 6, 7, 8].reverse()
  if (!reverse) {
    letters = letters.reverse()
    numbers = numbers.reverse()
  }
  return (
    <div className={`text-[0.6em] row-start-${row} col-start-${col} grid ${grid_col ? 'grid-rows-8' : 'grid-cols-8'} w-full text-white place-items-center`}>
      {!num ?
        letters.map((elmt) => <p key={elmt} className={`rotate-${deg}`}>{elmt}</p>)
        : numbers.map((elmt) => <p key={elmt} className={`rotate-${deg}`}>{elmt}</p>)
      }
    </div>
  )
}

export default Board