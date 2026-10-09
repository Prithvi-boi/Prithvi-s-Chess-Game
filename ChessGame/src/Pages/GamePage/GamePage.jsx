import Logo from "../../Component/Logo"
import ExitIcon from "../../Assets/Icons/Navigation Icons/Exit Icon.svg?react"
import Board from "../../Component/Board"
import { useNavigate } from 'react-router-dom'
import ResignIcon from '../../Assets/Icons/Resign.svg?react'
import DrawIcon from '../../Assets/Icons/Draw.svg?react'
import ArrowIcon from '../../Assets/Icons/Down.svg?react'


export default function GamePage() {
  const navigate = useNavigate()
  return (
    <div className={`flex flex-col gap-5 mt-10 xl:gap-14`}>
      {/* Heading and Navigation */}
      <div className="flex justify-between p-5">
        <Logo style={"mr-auto text-[25px] xl:pl-50"} />
        <nav onClick={() => navigate('/home')}>
          <ExitIcon />
        </nav>
      </div>

      {/* Game Section */}
      <div className="grid grid-cols-1 grid-rows-[1fr_auto_1fr]">
          <GameSection_PlayerCard />
          <Board />
          <GameSection_PlayerCard reverse={true} />
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-4 px-10">
        <button className="text-soft-white rounded-md bg-stone-600 h-10 flex justify-center items-center gap-2"><ResignIcon/> Resign</button>
        <button className="text-soft-white rounded-md bg-stone-600 h-10 flex justify-center items-center gap-2"><DrawIcon/> Draw</button>
      </div>

      {/* Moves Tracker */}
      <MovesTracker></MovesTracker>
    </div>
  )
}


export function GameSection_PlayerCard({reverse}) {
  const reverseCardCss = 'rounded-b-md place-self-start row-start-1'
  return (
    <>
      {/* Profile Pic */}
      <div className="bg-bg-dark h-25 w-full grid grid-cols-[1fr_auto_3fr] px-2 place-items-center gap-2">
        <div className="bg-soft-white rounded-xl h-13 w-13">
          <img></img>
        </div>

        {/* User Details and Captures*/}
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-[auto_3rem] gap-1.5 place-items-center">
            <p className="text-white font-extrabold text-[0.7em] xl:text-lg">PrithviOpinChess</p>
            <div className="h-7 w-full bg-[#3B3B3B] rounded-md"></div>
          </div>

          <div className="h-9 w-full bg-[#3B3B3B] rounded-md"></div>
        </div>

        {/* Rating and Time*/}
        <div className={`grid ${reverse ? "grid-rows-[auto_1fr]":  "grid-rows-[1fr_auto]"} px-1 grid-cols-1 h-full w-full`}>
          <div className={`h-10 w-[80%] bg-[#3B3B3B] rounded-md place-self-center justify-self-center`}></div>
          <div className={`h-10 w-full bg-soft-white ${reverse ? reverseCardCss : 'rounded-t-md place-self-end'} justify-self-center`}></div>
        </div>
      </div>
    </>
  )
}

export function MovesTracker() {
  let Move = ['e4', 'xd','a8']
  return (
    <div className="bg-bg-dark text-soft-white">
      <div className="flex justify-between px-5 py-4">
        <h4>Moves</h4>
        <div className="flex gap-2">
          <button className="basicBtn"><span className="rotate-90"><ArrowIcon/></span></button>
          <button className="basicBtn"><span className="rotate-270"><ArrowIcon/></span></button>
        </div>
      </div>

      <div className="h-100 overflow-y-scroll">
        {Move.map((val,i)=>{
          return(
            <div key={i} className={`${i % 2 == 0 ? 'bg-background': 'bg-bg-dark'} flex gap-4 h-10 items-center px-5`}>
              <p>{i}</p>
              <p>{val}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
