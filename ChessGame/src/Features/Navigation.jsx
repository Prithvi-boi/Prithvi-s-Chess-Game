import Logo from "../Component/Logo"
import { useState } from "react"

// Naviagation Svg Imports
import HamburgerIcon from "../Assets/Icons/Hamburger Icon.svg?react"
import CrossIcon from "../Assets/Icons/Navigation Icons/Cross Icon.svg?react"
import BoardIcon from "../Assets/Icons/Navigation Icons/Board Icon.svg?react"
import GameIcon from "../Assets/Icons/Navigation Icons/Game Icon.svg?react"
import PiecesIcon from "../Assets/Icons/Navigation Icons/Pieces Icon.svg?react"
import ProfileIcon from "../Assets/Icons/Navigation Icons/Profile Icon.svg?react"
import RatingsIcon from "../Assets/Icons/Navigation Icons/Ratings Icon.svg?react"

function NavigationButtons({ option, flex_direction, btnStyle, line, Callback = () => { } }) {
    const [Selected, setSelected] = useState(option)
    const btnNames = ['Game', 'Profile', 'Ratings', 'Pieces', 'Board']
    const btns = btnNames.map((name) => {
        let Icon;
        let IconStyle = "h-4 w-4 pointer-events-none"
        switch (name) {
            case 'Game': Icon = <GameIcon className="h-4 w-4 pointer-events-none" />; break;
            case 'Profile': Icon = <ProfileIcon className={IconStyle} />; break;
            case 'Ratings': Icon = <RatingsIcon className={IconStyle} />; break;
            case 'Pieces': Icon = <PiecesIcon className={IconStyle} />; break;
            case 'Board': Icon = <BoardIcon className={IconStyle} />; break;
            default: break;
        }

        return (
            <button key={name} onClick={(e) => {
                const selectedName = e.target.innerText === "" ? name : e.target.innerText;
                Callback(selectedName);
                setSelected(selectedName);
            }} className={`${name.toLowerCase() == Selected.toLowerCase() ? 'bg-[#009E84] text-white' : ''} flex xl:flex-col flex-row justify-center`}>
                <div className={`flex items-center gap-2 my-auto ${btnStyle} order-2`}>
                    <p>{Icon}</p>
                    <p className="font-bold">{name}</p>
                </div>
                <div className={`${name.toLowerCase() == Selected.toLowerCase() ? 'xl:h-1 xl:w-full h-full w-1 bg-white' : ''} order-1 xl:order-3`}></div>
            </button>
        )
    })
    return <div className={`flex ${flex_direction} bg-[#262522] text-[#868686]`}> {btns} </div>
}

export default function Navigation({ option, NavCallback = () => { } }) {

    // Navigation for smaller devices
    const [sideBar, setSideBar] = useState(false)

    return (
        <div className="flex justify-between items-center mx-10 lg:mx-20 mt-10">
            <Logo style={"mr-auto text-[25px] xl:pl-50"} />
            <div className="block xl:hidden" onClick={() => setSideBar(prev => !prev)}>
                <HamburgerIcon />
            </div>

            <div className={`xl:hidden fixed inset-0 z-10 ${sideBar ? 'bg-black/50' : 'bg-black/0 pointer-events-none'} transition-all`} onClick={() => setSideBar(false)} />

            <div className={`fixed ${!sideBar ? '-right-100' : 'right-0'} xl:transition-none gap-7 xl:gap-0 inset-y-0 xl:static xl:h-10 xl:flex ${sideBar ? 'translate-x-0 shadow-xl shadow-black' : 'translate-x-full xl:translate-x-0'}  flex flex-col xl:flex-row w-40 xl:w-auto bg-[#2C2A26] xl:bg-transparent z-20 transition-transform ease-in duration-75`}>
                <div className="ml-auto mx-10 mt-10 xl:hidden" onClick={() => setSideBar(prev => !prev)}>
                    <CrossIcon />
                </div>

                <div className="w-full flex flex-col xl:flex-row">
                    <NavigationButtons Callback={NavCallback} option={option} flex_direction="flex-col xl:flex-row" btnStyle="w-24 h-14 xl:h-10 pl-4 xl:pl-0 justify-center mx-auto" line="order-1" />
                </div>
            </div>
        </div>
    )
}
