import { useState, useEffect } from "react";
import { createContext, useContext } from "react";
const BoardContext = createContext();
const useBoard = () => useContext(BoardContext);

import DefaultPieces from "./Pieces/DefaultPieces.jsx"
import MoveGen from "./Logic/MoveGen.js";

function Board({ playAs = 'white' }) {

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
  useEffect(() => MoveGen(ClikedPosition,ClikedPiece),[ClikedPiece,ClikedPosition])

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
                className={`h-full w-full ${color} text-amber-950 flex justify-center items-center`}
                onClick={(e) => { setClikedPiece(e.currentTarget.children.item(0) != null  ? e.currentTarget.children.item(0).id : null), setClikedPosition(e.currentTarget.id) }}>
                    <DefaultPieces elmt={elmt}/>
              </div>
            )
          })}
        </div>
      </div>
    </div >
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