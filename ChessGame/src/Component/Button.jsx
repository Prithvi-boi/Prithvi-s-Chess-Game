import { useState, useEffect } from "react"

export default function Button({ label, btnBg, logo, shadowbg }) {
    const [Clicked, setClicked] = useState(false)
    function handleClick() {
        setClicked(prev => !prev)
        setTimeout(() => {
            setClicked(prev => !prev)
        }, 200)
    }
    return (
        <div>
            <div className={`h-14 w-full rounded-lg ${shadowbg ? shadowbg : "bg-[#015e73] "}`} >
                <button className={`${Clicked ? "bottom-0" : "bottom-2"} h-14 text-white w-full rounded-lg  text-xl font-bold relative  transition-all flex justify-evenly items-center ${btnBg ? btnBg : "bg-[#00819E]"}`}
                    onClick={handleClick}>
                        <div className="flex items-center gap-6">
                            {logo}{label}
                        </div>
                </button>
            </div>
        </div>
    )
}
