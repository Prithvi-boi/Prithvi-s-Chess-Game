import { useState } from "react"
function Toggle() {
    const [Toggle, setToggle] = useState(false)
    return (
        <div onClick={() => setToggle(T => !T)} className="cursor-pointer bg-bg-dark h-7 w-16 rounded-2xl grid place-items-center">
            <div className="bg-stone-900 h-5 w-14 rounded-2xl">
                <div className={`transition-all ease-in-out ${Toggle ? 'translate-x-9 bg-primary' : 'bg-stone-700'} h-5 w-5  rounded-full`}></div>
            </div>
        </div>
    )
}

export default Toggle
