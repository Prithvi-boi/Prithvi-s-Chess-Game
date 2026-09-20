
import TimeIcon from "../Assets/Icons/Time Icon.svg?react"


export function GameHistoryCard() {
    return (
        <div className="justify-between px-4 py-3 rounded-md w-full h-16 bg-[#424242] flex items-center">
            <div className="flex items-center gap-5">
                <div className="flex flex-col gap-2 items-center">
                    <TimeIcon />
                    <p>10:00</p>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 bg-black"></div>
                        <p>Player1</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 bg-white"></div>
                        <p>Player2</p>
                    </div>
                </div>

            </div>

            <div className="flex items-center gap-5">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 bg-red-600"></div>
                        <p>L</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 bg-lime-400"></div>
                        <p>W</p>
                    </div>
                </div>
                <div>2 sep 2026</div>
            </div>
        </div>
    )
}


export default function GameHistory() {
    return (
        <div className="w-full bg-[#252525] flex flex-col">
            <div className="w-full h-10 flex justify-center items-center bg-[#424242] text-[#AFAFAF] text-sm rounded-t-md">Game History</div>

            <div className="px-5 w-full h-10 flex justify-between items-center bg-[#353535] text-[#AFAFAF] text-[0.7em]">
                <p className="pl-10">Game</p>
                <div className="flex gap-14">
                    <p>Result</p>
                    <p>Date</p>
                </div>
            </div>

            {/* Game History Container */}
            <div className="overflow-scroll scrollbar-none p-2 w-full h-96 flex flex-col gap-2 bg-[#252525] text-[#AFAFAF] text-[0.7em]">
                <GameHistoryCard />
                <GameHistoryCard />
                <GameHistoryCard />
                <GameHistoryCard />
                <GameHistoryCard />
                <GameHistoryCard />
            </div>

        </div>
    )
}
