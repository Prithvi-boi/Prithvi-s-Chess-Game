
import BulletIcon from "../Assets/Icons/RatingsIcons/BulletIcon.svg?react"
import StopwatchIcon from "../Assets/Icons/RatingsIcons/StopwatchIcon.svg?react"
import LightingBoltIcon from "../Assets/Icons/RatingsIcons/LightingBoltIcon.svg?react"
import GameHistory from "../Features/GameHistory"

function BoxCard({ title, Icon }) {
    return (
        <div className="flex flex-col gap-4 items-center bg-[#3D3D3D] p-2 w-full rounded-md">
            <div className="flex gap-1 items-center">
                {Icon &&
                    <div className="h-5 w-5 flex justify-center items-center">{Icon}</div>
                }
                <h4 className="text-[0.8em]">{title}</h4>
            </div>

            <div className="border-2 font-bold border-[#949292] p-1 lg:p-3 w-full flex justify-center rounded-xl">
                1000
            </div>
        </div>
    )
}

function RatingPage() {
    return (
        <>
            {/* Main Section */}
            <div className="flex flex-col justify-center gap-5 mx-5 mt-10 md:mx-20 lg:mx-60 xl:mx-110 xl:gap-14">

                {/* Player Card */}
                <div className="rounded-md h-full w-full bg-[#252525] p-3 px-4 xl:py-10 xl:px-10 flex flex-col gap-5 text-[#848484]">
                    <div className="h-full w-full bg-[#252525] flex items-center gap-3">
                        <div className="h-12 w-12 xl:h-20 xl:w-20 bg-white rounded-lg grid place-items-center">
                            <img aria-label="profilePic"></img>
                        </div>
                        <div className="flex gap-2 items-center w-43">
                            <p className="text-white font-bold text-[1em] xl:text-lg">PrithviOpinChess</p>
                            <div className="h-7 w-full bg-[#3B3B3B] rounded-md"></div>
                        </div>
                    </div>
                </div>

                {/* Ratings Card */}
                <div className="rounded-md h-full w-full bg-[#252525] p-3 px-4 xl:py-10 xl:px-10 flex flex-col gap-5 text-[#848484]">
                    <h2 className="text-white text-xl">Ratings</h2>
                    <hr />
                    <div className="flex justify-between gap-3">
                        <BoxCard Icon={<StopwatchIcon />} title={"Rapid"} />
                        <BoxCard Icon={<LightingBoltIcon />} title={"Blitz"} />
                        <BoxCard Icon={<BulletIcon />} title={"Bullet"} />
                    </div>
                </div>

                {/* Details Card */}
                <div className="rounded-md h-full w-full bg-[#252525] p-3 px-4 xl:py-10 xl:px-10 flex flex-col gap-5 text-[#848484]">
                    <div className="flex gap-2 items-baseline">
                        <h2 className="text-white text-xl">Games</h2>
                        <p>(10000)</p>
                    </div>
                    <hr />
                    <div className="flex justify-between gap-3">
                        <BoxCard title={"Wins"} />
                        <BoxCard title={"Lose"} />
                        <BoxCard title={"Draw"} />
                    </div>
                </div>

                <GameHistory />
            </div>
        </>
    )
}

export default RatingPage
