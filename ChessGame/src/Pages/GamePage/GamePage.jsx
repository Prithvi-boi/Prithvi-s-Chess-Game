import { useNavigate } from 'react-router-dom'
import { useLayoutEffect , useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Logo from "../../Component/Logo"
import ExitIcon from "../../Assets/Icons/Navigation Icons/Exit Icon.svg?react"
import ResignIcon from '../../Assets/Icons/Resign.svg?react'
import DrawIcon from '../../Assets/Icons/Draw.svg?react'
import ArrowIcon from '../../Assets/Icons/Down.svg?react'
import Timer from '../../Component/Timer'

import { CapturesBlock } from "../../Component/Pieces/DefaultPieces"
import Board from "../../Component/Board"

import { useSelector } from 'react-redux'
import GameOver from '../../Component/GameOver'
import { setGameOver } from '../../slices/piecesPosition'

export default function GamePage() {
  const switchTimer = useSelector((state) => state.game.switchTimer)
  const switchCard = useSelector(state => state.gameMode.switchColor)
  useLayoutEffect(() => {
    window.scrollTo({ top: 130, behavior: 'instant' })
  }, [])
  const navigate = useNavigate()
  const gameOver = useSelector(state => state.piecesPosition.gameOver)

  const dispatch = useDispatch()

  const offerDraw = () => {
    if (gameOver) return
    // local 2-player: the other person agrees on the same screen
    if (window.confirm('Opponent, do you accept the draw?'))
      dispatch(setGameOver({ winner: 'draw', reason: 'Draw by agreement' }))
  }

  const moves = useSelector(state => state.piecesPosition.moves)

  useEffect(() => {
    if (moves > 0 || gameOver) return          // game already started or finished

    const id = setTimeout(() => {
      dispatch(setGameOver({ winner: 'draw', reason: 'No move played in 30 seconds' }))
    }, 30000)

    return () => clearTimeout(id)              // runs when `moves` changes or the page unmounts
  }, [moves, gameOver])
  return (
    <div className={`flex flex-col gap-5 mt-10 xl:gap-9`}>
      {gameOver?.winner && (
        <GameOver winner={gameOver.winner} reason={gameOver.reason} exitNav={navigate} />
      )}
      {/* Heading and Navigation */}
      <div className="flex justify-between p-5 lg:px-50 lg:py-0">
        <Logo style={"mr-auto text-[25px] lg:text-[30px]  xl:pl-50"} />
        <nav onClick={() => navigate('/home')}>
          <ExitIcon className={'h-full'} />
        </nav>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[auto_auto] sm:gap-2 place-items-center">
        <div className="w-full bg-[#1d1d1d]">
          {/* Game Section */}
          <div className="grid grid-cols-1 grid-rows-[1fr_auto_1fr] place-items-center">
            <GameSection_PlayerCard PlayerInfo={['Prithvi', 'India']} switchTimer={switchTimer} color={'black'} reverse={switchCard == 'black' ? true : false} />
            <Board />
            <GameSection_PlayerCard PlayerInfo={['Vicky', 'India']} switchTimer={!switchTimer} color={'white'} reverse={switchCard == 'white' ? true : false} />
          </div>

        </div>
        <div className="h-full w-full flex flex-col gap-4">
          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4 px-10 sm:order-2 w-full">
            <button className="text-soft-white rounded-md bg-stone-600 h-10 flex justify-center items-center gap-2"><ResignIcon /> Resign</button>
            <button onClick={offerDraw} className="text-soft-white rounded-md bg-stone-600 h-10 flex justify-center items-center gap-2"><DrawIcon /> Draw</button>
          </div>
          {/* Moves Tracker */}
          <MovesTracker></MovesTracker>
        </div>
      </div>
    </div>
  )
}


export function GameSection_PlayerCard({ reverse, PlayerInfo, switchTimer, color }) {
  const [name, country] = PlayerInfo
  const reverseCardCss = 'rounded-b-md'
  return (
    <>
      {/* Profile Pic */}
      <div className={`${reverse ? 'row-start-3' : 'row-start-1'} bg-bg-dark h-25 md:h-20 w-full grid grid-cols-[1fr_3fr_2fr] lg:grid-cols-[0.5fr_2fr_1fr] px-2 place-items-center gap-2`}>
        <div className="bg-soft-white rounded-xl h-13 w-13 md:h-9 md:w-9 md:rounded-sm">
          <img></img>
        </div>

        {/* User Details and Captures*/}
        <div className="flex flex-col gap-2 w-full">
          <div className="grid grid-cols-[auto_3rem] gap-1.5 md:gap-2 md:flex place-items-center">
            <p className="text-white font-extrabold text-[0.7em]">{name}</p>
            <div className="h-7 md:h-5 md:w-10 w-full bg-[#3B3B3B] rounded-md"></div>
          </div>

          <div className="h-10 md:h-7 md:w-[70%] lg:w-[50%] w-full bg-[#3B3B3B] rounded-md">
            <CapturesBlock black={!reverse} />
          </div>
        </div>

        {/* Rating and Time*/}
        <div className={` px-1 h-full w-full flex flex-col items-center gap-2 ${!reverse && 'justify-end'}`}>
          <div className={`h-8 md:h-6 w-[80%] md:w-[40%] bg-[#3B3B3B] rounded-md ${reverse && 'order-2'} font-bold text-stone-500 flex justify-center items-center`}>1500</div>
          <div className={`h-10 md:h-8 w-full md:w-[50%] bg-soft-white ${reverse ? reverseCardCss : 'rounded-t-md'} flex justify-center items-center`}><Timer toggle={switchTimer} color={color} /></div>
        </div>
      </div>
    </>
  )
}

export function MovesTracker() {
  let Move = ['e4', 'xd', 'a8']
  let whiteMoves = useSelector(state => state.moveTracker.whiteMoves)
  let blackMoves = useSelector(state => state.moveTracker.blackMoves)
  return (
    <div className="bg-bg-dark text-soft-white w-full h-full">
      <div className="flex justify-between px-5 py-4">
        <h4>Moves</h4>
        <div className="flex gap-2">
          <button className="basicBtn"><span className="rotate-90"><ArrowIcon /></span></button>
          <button className="basicBtn"><span className="rotate-270"><ArrowIcon /></span></button>
        </div>
      </div>

      <div className="w-full flex px-4 py-2 bg-[#1f1f1f]">
        <h4>no.</h4>
        <div className="w-full flex">
          <h4 className="w-full flex justify-center">White</h4>
          <h4 className="w-full flex justify-center">Black</h4>
        </div>
      </div>

      <div className="flex w-full">
        <div className="h-100 overflow-y-scroll w-full scrollbar-none">
          {whiteMoves.map((val, i) => {
            i = i + 1
            return (
              <div key={i} className={`${i % 2 == 0 ? 'bg-background' : 'bg-bg-dark'} flex h-10 items-center pl-5`}>
                <span className="w-full">{i}</span>
                <span className="w-full justify-self-center">{val}</span>
              </div>
            )
          })}
        </div>
        <div className="h-100 overflow-y-scroll w-full scrollbar-none">
          {blackMoves.map((val, i) => {
            i = i + 1
            return (
              <div key={i + 3} className={`${i % 2 == 0 ? 'bg-background' : 'bg-bg-dark'} flex justify-center gap-15 h-10 items-center px-5`}>
                <span>{val}</span>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}
