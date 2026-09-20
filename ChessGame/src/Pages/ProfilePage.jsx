import { useState } from "react"
import DownIcon from "../Assets/Icons/Down.svg?react"

function Details_section({ children, title }) {
    return (
        <div className="flex justify-between items-center h-10 w-full">
            <h3 className="text-[0.9em] w-30">{title}</h3>
            {children}
        </div>
    )
}

function ProfilePage() {
    const [bioCharNum, setbioCharNum] = useState(0)
    // console.log(bioCharNum)
    return (
        <>
            {/* Main Section */}
            <div className="flex flex-col justify-center gap-5 mx-5 mt-10 md:mx-20 lg:mx-60 xl:mx-110 xl:gap-14">

                {/* Profile Section */}
                <div className="rounded-md h-full w-full bg-[#252525] p-3 px-4 xl:py-10 xl:px-10 flex flex-col gap-5 text-[#848484]">
                    <h2 className="text-white text-xl">Profile</h2>
                    <hr />
                    {/* User Section */}
                    <div className="h-full w-full  flex gap-5 xl:gap-10">

                        <div className="flex flex-col items-center">
                            <div className="h-15 w-15 xl:h-30 xl:w-30 bg-white rounded-lg grid place-items-center">
                                <img aria-label="profilePic"></img>
                            </div>
                            <button className="text-sm">remove</button>
                        </div>

                        <div className="min-w-0 flex-1 flex flex-col gap-2 xl:gap-4">
                            <div className="flex gap-5 xl:gap-7">
                                <div>
                                    <h3 className="text-[0.7em] ">Username</h3>
                                    <p className="text-white font-bold text-[0.9em] xl:text-lg">PrithviOpinChess</p>
                                </div>
                                <div>
                                    <h3 className="text-[0.7em]">Country</h3>
                                    <div className="h-7 w-full bg-[#3B3B3B] rounded-md"></div>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <h3 className="text-[0.7em]">Bio</h3>
                                    <textarea onChange={(e) => setbioCharNum(e.target.value.length)} placeholder="Your short bio" className="border-2 border-[#4C4C4C] p-3 rounded-md text-[0.7em] h-full w-full bg-[#3B3B3B]"></textarea>
                                    <p className="text-[0.7em]">{bioCharNum}/{50}</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Buttons */}
                    <div className="w-full flex justify-evenly">
                        <button className="xl:w-40 xl:h-10 p-2 w-20 text-[0.7em] text-white font-bold rounded-md bg-[#424242]">Cancle</button>
                        <button className="xl:w-40 xl:h-10 p-2 w-20 text-[0.7em] text-white font-bold rounded-md bg-[#009E84]">Save</button>
                    </div>
                </div>

                {/* Details Section */}
                <div className="rounded-md h-full w-full bg-[#252525] p-3 px-4 xl:py-10 xl:px-10 flex flex-col gap-5 text-[#848484]">
                    <h2 className="text-white text-xl">Details</h2>
                    <hr />
                    {/* Form Section */}
                    <div className="h-full w-full flex flex-col gap-5 xl:gap-10">
                        {/* 1. Joing Date */}
                        <Details_section title={"Join Date"}>
                            <div className="border-2 border-[#4C4C4C] p-3 rounded-md text-[0.7em] h-full w-full bg-[#3B3B3B]">2 sep 2026</div>
                        </Details_section>

                        {/* 2. Username */}
                        <Details_section title={"Usename"}>
                            <div className="border-2 border-[#4C4C4C] p-3 rounded-md text-[0.7em] h-full w-full bg-[#3B3B3B] flex justify-between items-center">PrithviOpinChess
                                <button className="text-white bg-[#5a5a5a] rounded-sm w-13 h-5">Change</button>
                            </div>
                        </Details_section>

                        {/* 3. First Name */}
                        <Details_section title={"First Name"}>
                            <input className="border-2 border-[#4C4C4C] p-3 rounded-md text-[0.7em] h-full w-full bg-[#282828]" defaultValue={"Prithvi"} placeholder="Enter your name"></input>
                        </Details_section>

                        {/* 4. Last Name */}
                        <Details_section title={"Last Name"}>
                            <input className="border-2 border-[#4C4C4C] p-3 rounded-md text-[0.7em] h-full w-full bg-[#282828]" defaultValue={"Beldar"} placeholder="Enter your name"></input>
                        </Details_section>

                        {/* 5. Country */}
                        <Details_section title={"Country"}>
                            <div className="border-2 border-[#4C4C4C] p-3 rounded-md text-[0.7em] h-full w-full bg-[#282828] flex justify-between items-center">India
                                <div>
                                    <DownIcon />
                                </div>
                            </div>
                        </Details_section>

                        {/* 6. Country */}
                        <Details_section title={"Language"}>
                            <div className="border-2 border-[#4C4C4C] p-3 rounded-md text-[0.7em] h-full w-full bg-[#282828] flex justify-between items-center">English
                                <div>
                                    <DownIcon />
                                </div>
                            </div>
                        </Details_section>

                    </div>

                    {/* Buttons */}
                    <div className="w-full flex justify-evenly">
                        <button className="xl:w-40 xl:h-10 p-2 w-20 text-[0.7em] text-white font-bold rounded-md bg-[#424242]">Cancle</button>
                        <button className="xl:w-40 xl:h-10 p-2 w-20 text-[0.7em] text-white font-bold rounded-md bg-[#009E84]">Save</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePage
