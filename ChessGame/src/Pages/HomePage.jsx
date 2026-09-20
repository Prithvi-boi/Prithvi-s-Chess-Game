

import ChessLogo from "../../public/Downloads/ChessLogo.png"
import Button from "../Component/Button.jsx"

import GameHistory from "../Features/GameHistory.jsx"
import Navigation from "../Features/Navigation.jsx"

// Button Svg Imports
import PlayOnlineIcon from "../Assets/Icons/Play Online Icon.svg?react"
import PlayOfflineIcon from "../Assets/Icons/Players Icon.svg?react"
import PlayBotIcon from "../Assets/Icons/Bot Icon.svg?react"


function HomePage() {
    return (
        <>
            {/* Main Section */}
            <div className="flex flex-col gap-5 mx-5 mt-10 md:mx-40 lg:mx-70 xl:gap-14">

                {/* Play Options */}
                <div className="flex flex-col items-center xl:mx-64">
                    <img className="h-50 w-50" src={ChessLogo} />
                    <div className="w-full  flex flex-col gap-5">
                        <div onClick={() => console.log("cliked Play Online btn")} className="w-full">
                            <Button shadowbg={'bg-[#006655]'} btnBg={'bg-[#009E84]'} label={"Play Online"} logo={<PlayOnlineIcon />} />
                        </div>
                        <div onClick={() => console.log("cliked Play Offline btn")} className="w-full">
                            <Button shadowbg={'bg-[#252525]'} btnBg={'bg-[#424242]'} label={"Play Offline"} logo={<PlayOfflineIcon />} />
                        </div>
                        <div onClick={() => console.log("cliked Play Bot btn")} className="w-full">
                            <Button shadowbg={'bg-[#252525]'} btnBg={'bg-[#424242]'} label={"Play Bots"} logo={<PlayBotIcon />} />
                        </div>
                    </div>
                </div>

                {/* Game History */}
                <GameHistory />

            </div>
        </>
    )
}

export default HomePage
