import { useState, useEffect } from "react";

function Board({ playAs = 'white ' }) {

  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].reverse()
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8]
  const darkSquares = []
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < letters.length; j++) {
      const element = `${letters[j]}${numbers[i]}`;
      darkSquares.push(element)
    }
  }

  return (
    <div className={`w-full h-[100vw] bg-[#3A1A0C] border-y-4  border-[#634833] grid grid-cols-[1.5rem_auto_1.5em] grid-rows-[1.5rem_auto_1.5em]`}>
      <Coords row={1} col={2} deg={180} />
      <Coords row={3} col={2} deg={0} />
      <Coords row={2} col={1} deg={0} grid_col={true} num={true} />
      <Coords row={2} col={3} deg={180} grid_col={true} num={true} />

      <div className="row-start-2 col-start-2 bg-[#3A1A0C] border-2 border-[#634833]">
        <div className=" grid grid-rows-8 grid-cols-8 h-full w-full bg-[#E9E9DF]">
          {darkSquares.map((elmt, i) => {
            let num = Number(elmt[1])
            let color;
            let playVal = playAs == 'white' ? 0 : 1;
            if (num % 2 == playVal) { color = i % 2 == 0 ? 'bg-[#E9E9DF]' : 'bg-[#BB9979]' }
            else { color = i % 2 == 0 ? 'bg-[#BB9979]' : 'bg-[#E9E9DF]' }
            return (
              <div key={elmt} id={elmt}
                className={`h-full w-full ${color} text-amber-950 flex justify-center items-center`}
                onClick={(e) => { console.log(e.target.id) }}>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function Coords({ row, col, deg, grid_col, num }) {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].reverse()
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8]
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