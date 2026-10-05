import { useEffect, useState } from "react"

import ChessLogo from "../../public/Downloads/ChessLogo.png"
import Button from "../Component/Button.jsx"
import GameHistory from "../Features/GameHistory.jsx"

import { BoxCard } from "./RatingPage.jsx"
import BulletIcon from "../Assets/Icons/RatingsIcons/BulletIcon.svg?react"
import StopwatchIcon from "../Assets/Icons/RatingsIcons/StopwatchIcon.svg?react"
import LightingBoltIcon from "../Assets/Icons/RatingsIcons/LightingBoltIcon.svg?react"
import SettingIcon from "../Assets/Icons/RatingsIcons/settingIcon.svg?react"
import UsersIcon from "../Assets/Icons/Users.svg?react"


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

    function handleBackbtn() {
        setClickedText('')
        setShowSection(true)
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
                <div onClick={handleBackbtn}>
                    <Button label={"Back"} shadowbg="bg-[#252525]" btnBg="bg-[#424242]" />
                </div>
                <Button label={"Start"} shadowbg="bg-[#006655]" btnBg="bg-[#009E84]" />
            </div>

            {clickedText == 'Play Offline' && <PlayOffline_Section />}
        </div>
    )
}

function PlayOffline_Section() {
    const [PlayingAs, setPlayingAs] = useState('white')
    return (
        <div className="mt-5 flex flex-col gap-4">
            {/* Select Game mode */}
            <div className="rounded-md h-full w-full bg-[#252525] p-3 px-4 xl:py-10 xl:px-10 flex flex-col gap-5 text-[#848484]">
                <h2 className="text-[#848484]text-xl">Game modes</h2>
                <hr />
                <div className="grid grid-cols-3 grid-rows-2 gap-2 text-white">
                    <BoxCard Icon={<StopwatchIcon />} title={"Rapid"} />
                    <BoxCard Icon={<LightingBoltIcon />} title={"Blitz"} />
                    <BoxCard Icon={<BulletIcon />} title={"Bullet"} />
                    <BoxCard Icon={<SettingIcon/>} title={"Custom"} styles={'col-span-3'}>
                        <input type="number" className="bg-[#272727] border-2 border-[#989696] rounded-md p-2 text-[0.7em]" placeholder="Enter Value (in Min)"/>
                    </BoxCard>
                </div>
            </div>

            {/* Select Game mode */}
            <div className="rounded-md h-full w-full bg-[#252525] p-3 px-4 xl:py-10 xl:px-10 flex flex-col gap-5 text-[#848484]">
                <h2 className="text-[#848484] text-xl">Player Settings</h2>
                <hr />
                <div className="grid grid-cols-3 grid-rows-2 gap-2 w-full">
                    <BoxCard Icon={<UsersIcon/>} title={"Player Names"} styles={'col-span-3 items-start px-5 text-sm text-white w-full' }>
                        <div className="flex gap-4 items-center">
                            <p>Player 1:</p>
                            <input type="number" className="bg-[#272727] border-2 border-[#989696] rounded-md p-2 text-[0.7em]" placeholder="Enter Value (in Min)"/>
                        </div>
                        <div className="flex gap-4 items-center">
                            <p>Player 2:</p>
                            <input type="number" className="bg-[#272727] border-2 border-[#989696] rounded-md p-2 text-[0.7em]" placeholder="Enter Value (in Min)"/>
                        </div>
                    </BoxCard>

                    <BoxCard Icon={<SettingIcon/>} title={"Play as"} styles={'col-span-3 items-start px-5 text-sm text-white w-full' }>
                        <div className="grid grid-cols-2 grid-rows-2 w-full gap-x-2 place-items-center">
                            <div className={`h-10 w-full rounded-xl grid grid-cols-2 bg-white text-gray-600`}>
                                <button onClick={() => setPlayingAs('')} className={`bg-black rounded-l-xl relative`}>
                                    {PlayingAs ==='white' && <div className="bg-[#272727] rounded-l-xl w-full h-full absolute -top-2 "></div>}
                                </button>
                                <button onClick={() => setPlayingAs('white')} className={`bg-white rounded-r-xl relative`}>
                                    {PlayingAs ==='' && <div className="bg-[#cecece] rounded-r-xl w-full h-full absolute -top-2 "></div>}
                                </button>
                            </div>
                            <div className={`h-10 w-full rounded-xl grid place-items-center ${PlayingAs === 'white' ? 'bg-white text-gray-600': 'bg-black text-gray-400'} `}>{PlayingAs || 'black'}</div>
                            <p>Player 1</p>
                            <p>Player 2</p>
                        </div>
                    </BoxCard>
                </div>
            </div>
        </div>
    )
}

export default HomePage