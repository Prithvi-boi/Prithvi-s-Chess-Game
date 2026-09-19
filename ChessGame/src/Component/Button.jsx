import { useState, useEffect } from "react"

export default function Button({ label }) {
    const [Clicked, setClicked] = useState(false)
    function handleClick() {
        setClicked(prev => !prev)
        setTimeout(() => {
            setClicked(prev => !prev)
        }, 200)
    }
    return (
        <div>
            <div className={`h-14 w-full bg-[#015e73] rounded-lg`} >
                <button className={`${Clicked ? "bottom-0" : "bottom-2"} h-14 text-white bg-[#00819E]  w-full rounded-lg  text-xl font-bold relative  transition-all`}
                    onClick={handleClick}>
                    {label}
                </button>
            </div>
        </div>
    )
}
