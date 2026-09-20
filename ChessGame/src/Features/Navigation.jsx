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

function NavigationButtons({ option, flex_direction, btnStyle, line }) {
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
            <button key={name} onClick={(e) => setSelected(e.target.innerText === "" ? name : e.target.innerText)} className={`${name.toLowerCase() == Selected.toLowerCase() ? 'bg-[#009E84] text-white' : ''} flex ${!line ? 'flex-col' : 'flex-row'} justify-center`}>
                <div className={`flex items-center gap-2 my-auto ${btnStyle} order-2 `}>
                    <p>{Icon}</p>
                    <p className="font-bold">{name}</p>
                </div>
                <div className={`${name.toLowerCase() == Selected.toLowerCase() ? `${!line ? 'h-1 w-full bg-white mt-auto' : 'h-full w-1 bg-white'}` : ''}  ${line ? line : "order-3"}`}></div>
            </button>
        )
    })

    return <div className={`flex ${flex_direction} bg-[#262522] text-[#868686]`}> {btns} </div>
}

export default function Navigation({ option }) {

    // Navigation for smaller devices
    const [sideBar, setSideBar] = useState(false)

    return (
        <div className="flex justify-between items-center mx-10 lg:mx-20 mt-10">
            <Logo style={"mr-auto text-[25px] xl:pl-50"} />
            <div className="block xl:hidden" onClick={() => setSideBar(prev => !prev)}>
                <HamburgerIcon />
            </div>

            <div className="h-10  hidden xl:flex">
                <NavigationButtons option={option} btnStyle={"w-24 justify-center mx-auto"} />
            </div>

            {/* Mobile or Tablet - SideBar */}
            <div className={`xl:hidden fixed inset-0 z-10 ${sideBar ? 'bg-black/50' : 'bg-black/0  pointer-events-none'} flex justify-end transition-all`}></div>
            <div className={`xl:hidden flex flex-col fixed right-0  ${sideBar ? 'translate-x-0 shadow-xl shadow-black' : 'translate-x-full '} inset-y-0 w-40 max-w-[100vw] bg-[#2C2A26] z-20 transition-all ease-in duration-75 gap-10 `}>
                <div className="ml-auto mx-10 block xl:hidden mt-10" onClick={() => setSideBar(prev => !prev)}>
                    <CrossIcon />
                </div>
                <div className="overflow-scroll w-full flex flex-col" onClick={() => setSideBar(prev => !prev)}>
                    <NavigationButtons option={option} flex_direction={"flex-col"} btnStyle={"pl-4 h-14 mr-auto"} line={'order-1'} />
                </div>
            </div>
        </div>
    )
}
