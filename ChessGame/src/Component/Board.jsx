/*-------------------------------
          IMPORTS
---------------------------------*/

// React Hooks Imports
import { useState, useRef, useEffect } from "react";

// React Context Imports and Application
import { useContext, createContext } from 'react'
const BoardContext = createContext();
const useBoard = () => useContext(BoardContext);

// Redux - Hooks and Reducer Imports
import { useDispatch, useSelector } from "react-redux";
import { changePosition, handleCastle, evaluateDraw, setGameOver } from "../slices/piecesPosition.js";
import { addMove } from "../slices/moveTracker.js";

// Logic Functions Imports
import getAttackedSquares from "./Logic/Attacks.js";
import hasLegalMove from "./Logic/GameState.js";
import MoveGen from "./Logic/MoveGen.js";

// Default Pieces Styles Import
import DefaultPieces from "./Pieces/DefaultPieces.jsx"

/*-------------------------------
    Main Game Function (Board)
---------------------------------*/

function Board({ playAs = 'white' }) {

  const dispatch = useDispatch()

  //____________ 1. Displaying Board ____________ //
  //////////////////////////////////////////////////
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].reverse()
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8]
  let darkSquares = []

  /*Creating files and Rank (A1,B2,E4,D3....)*/
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < letters.length; j++) {
      const element = `${letters[j]}${numbers[i]}`;
      darkSquares.push(element)
    }
  }
  if (playAs == 'white') { darkSquares = darkSquares.reverse() }


  //____________ Game Logic and Current Values ____________ //
  ////////////////////////////////////////////////////////////
  // redux state imports
  const gameOver = useSelector(state => state.piecesPosition.gameOver)
  const pieces = useSelector(state => state.piecesPosition.value)
  const Turn = useSelector(state => state.piecesPosition.moves % 2 == 0 ? 'W' : 'B')

  // Conditional variables
  const enemy = Turn == 'W' ? 'B' : 'W'                                               // Checks the current opponent
  const kingSq = pieces[Turn == 'W' ? 'WhiteKing' : 'BlackKing'][0]                   // Get all the posible King moving Squares
  const checkedSquare = getAttackedSquares(pieces, enemy).has(kingSq) ? kingSq : null // Check All the Current Attacked Squares for King 

  // Board States
  const [ClikedPiece, setClikedPiece] = useState()
  const [ClikedPosition, setClikedPosition] = useState()
  const [LastCliked, setLastCliked] = useState([])
  const [promotion, setPromotion] = useState([])
  const [nextMoves, setNextMoves] = useState([])
  const [killables, setkillables] = useState([])

  // Board Refs
  const lastMoveRef = useRef(null)

  //____________ Game Events ____________ //
  //////////////////////////////////////////

  const handlePieceClick = (e) => {
    if (gameOver || promotion[0] != null) return
    setClikedPiece(e.currentTarget.children.item(0) != null ? e.currentTarget.children.item(0).id : null)
    setClikedPosition(e.currentTarget.id)
  }

  const MoveGenCallback = (moves, killables) => {
    setNextMoves(moves)
    setkillables(killables)
  }

  useEffect(() => {
    // If User Click on a Piece
    if (ClikedPiece != null && ClikedPiece[0] == Turn) {
      MoveGen(ClikedPosition, ClikedPiece, MoveGenCallback, lastMoveRef.current)
      setLastCliked([ClikedPosition, ClikedPiece])
    }
    // Else If User Click on Other blocks
    else {
      // If User Click only on a Move or Kill blocks
      if (nextMoves.includes(ClikedPosition) || killables.includes(ClikedPosition)) {
        dispatch(addMove([ClikedPosition.toLowerCase(), LastCliked[1]])); 
        dispatch(changePosition([ClikedPosition, LastCliked]))  // Move the Piece
        dispatch(handleCastle([ClikedPosition[0], LastCliked])) // Check for castle then Move King & rook
        dispatch(evaluateDraw())                                // Check for Draw

        lastMoveRef.current = { piece: LastCliked[1], from: LastCliked[0], to: ClikedPosition } // Stores the Last move history

        // Check for Pawn Promotion
        let lastrank = LastCliked[1][0] == 'W' ? '8' : '1'
        if (LastCliked[1][1] == 'P' && ClikedPosition[1] == lastrank) {
          setPromotion([
              <DefaultPieces 
                PromotionFlag={true} 
                PromotionPiece={{ color: LastCliked[1][0], file: ClikedPosition, 
                PromotionCallback: () => setPromotion([]) }} 
              />, 
              ClikedPosition
            ])
        }

        // After Moving or Killing the piece. Set Both state to empty
        setNextMoves([])
        setkillables([])
      }
    }
  }, [ClikedPiece, ClikedPosition])

  //____________ Game Over and Draw Logic ____________ //
  //////////////////////////////////////////////////////
  useEffect(() => {
    if (gameOver) setTimeout(() => alert(gameOver), 100)
  }, [gameOver])

  useEffect(() => {
    if (!lastMoveRef.current || gameOver) return
    if (promotion[0] != null) return
    if (hasLegalMove(Turn, lastMoveRef.current)) return

    dispatch(setGameOver(
      checkedSquare
        ? `Checkmate! ${Turn == 'W' ? 'Black' : 'White'} wins`
        : 'Stalemate! Draw'
    ))
  }, [pieces, Turn, promotion])

  //////////////////////////////////////////////////
  return (
    <div aria-label="Board" className={`BoardStyle bg-[#3A1A0C] border-y-4  border-[#634833]`}>
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
                <DefaultPieces elmt={elmt.toLowerCase()} />
                {(elmt == promotion[1] && promotion[0] != null) ? promotion[0] : null}
              </div>
            )
          })}
        </div>
      </div>
    </div >
  )
}

//------------------------------------------------------------------------- X
/*-------------------------------
    Board Helper Function
---------------------------------*/

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