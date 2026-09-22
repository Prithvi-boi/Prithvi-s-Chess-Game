import { useState } from "react"

import ChessLogo from "../../public/Downloads/ChessLogo.png"
import Button from "../Component/Button.jsx"
import GameHistory from "../Features/GameHistory.jsx"

import { BoxCard } from "./RatingPage.jsx"
import BulletIcon from "../Assets/Icons/RatingsIcons/BulletIcon.svg?react"
import StopwatchIcon from "../Assets/Icons/RatingsIcons/StopwatchIcon.svg?react"
import LightingBoltIcon from "../Assets/Icons/RatingsIcons/LightingBoltIcon.svg?react"
import SettingIcon from "../Assets/Icons/RatingsIcons/settingIcon.svg?react"

import PlayOnlineIcon from "../Assets/Icons/Play Online Icon.svg?react"
import PlayOfflineIcon from "../Assets/Icons/Players Icon.svg?react"
import PlayBotIcon from "../Assets/Icons/Bot Icon.svg?react"

function HomePage() {
    const [showSection, setShowSection] = useState(true)
    const [clickedText, setClickedText] = useState('')

    function handlePlaybtn(e) {
        setClickedText(e.currentTarget.innerText)
        setShowSection(false)
    }

    return (
        <div className={`flex flex-col ${showSection ? 'gap-5' : 'gap-1'} mx-5 mt-10 md:mx-40 lg:mx-70 xl:gap-14`}>
            <div className="flex flex-col items-center xl:mx-64">
                <div className={`overflow-hidden transition-all duration-700 ease-in-out ${showSection ? "h-50 opacity-100" : "h-0 opacity-0"}`}>
                    <img className="h-50 w-50" src={ChessLogo} />
                </div>
                <div className={`w-full flex flex-col gap-5 transition-transform duration-700 ease-in-out ${showSection ? "translate-y-0" : "-translate-y-5"}`}>

                    {!((clickedText !== 'Play Online') && clickedText !== '') &&
                        <div onClick={handlePlaybtn} className="w-full">
                            <Button oneClickOnly={clickedText ? true : false} shadowbg="bg-[#006655]" btnBg="bg-[#009E84]" label="Play Online" logo={<PlayOnlineIcon />} />
                        </div>
                    }

                    {!((clickedText !== 'Play Offline') && clickedText !== '') &&
                        <div onClick={handlePlaybtn} className="w-full">
                            <Button oneClickOnly={clickedText ? true : false} shadowbg="bg-[#252525]" btnBg="bg-[#424242]" label="Play Offline" logo={<PlayOfflineIcon />} />
                        </div>
                    }

                    {!((clickedText !== 'Play Bots') && clickedText !== '') &&
                        <div onClick={handlePlaybtn} className="w-full">
                            <Button oneClickOnly={clickedText ? true : false} shadowbg="bg-[#252525]" btnBg="bg-[#424242]" label="Play Bots" logo={<PlayBotIcon />} />
                        </div>
                    }
                </div>
            </div>

            {/* Game History */}
            {showSection && <GameHistory />}

            {/* Start and Back buttons */}
            <div className={`grid grid-cols-2 gap-2 transition-all duration-900  ${showSection ? 'opacity-10 h-0 overflow-hidden' : 'opacity-100'}`}>
                <Button label={"Back"} shadowbg="bg-[#252525]" btnBg="bg-[#424242]" />
                <Button label={"Start"} shadowbg="bg-[#006655]" btnBg="bg-[#009E84]" />
            </div>

            {clickedText == 'Play Offline' && <PlayOffline_Section />}
        </div>
    )
}

function PlayOffline_Section() {
    return (
        <div className="mt-5">
            <div className="rounded-md h-full w-full bg-[#252525] p-3 px-4 xl:py-10 xl:px-10 flex flex-col gap-5 text-[#848484]">
                <h2 className="text-white text-xl">Game modes</h2>
                <hr />
                <div className="grid grid-cols-3 grid-rows-2 gap-2">
                    <BoxCard Icon={<StopwatchIcon />} title={"Rapid"} />
                    <BoxCard Icon={<LightingBoltIcon />} title={"Blitz"} />
                    <BoxCard Icon={<BulletIcon />} title={"Bullet"} />
                    <BoxCard Icon={<SettingIcon/>} title={"Custom"} styles={'col-span-3'}>
                        <input type="number" className="bg-[#272727] border-2 border-[#989696] rounded-md p-2 text-[0.7em]" placeholder="Enter Value (in Min)"/>
                    </BoxCard>
                </div>
            </div>
        </div>
    )
}

export default HomePage