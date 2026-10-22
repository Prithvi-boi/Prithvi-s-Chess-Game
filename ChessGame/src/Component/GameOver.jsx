
import White_Pawn from '../Assets/Default Chess Pieces/White_Pawn.svg?react'
import Black_Pawn from '../Assets/Default Chess Pieces/Black_Pawn.svg?react'

function GameOver({ winner = 'error', reason = 'error', exitNav }) {
    const svgstyle = 'h-12 w-12'
    const svg = winner != 'white' ? <White_Pawn className={svgstyle} /> : <Black_Pawn className={svgstyle} />
    return (
        <div className='fixed h-screen w-screen bg-[#000000b6] z-99 -mt-10 flex justify-center items-center'>
            <div className='flex flex-col gap-2 items-center h-120 w-100 bg-background rounded-2xl p-5'>
                <div className='flex items-center'>
                    {svg}
                    <h2 className='text-white font-extrabold text-4xl'>
                        {winner.charAt(0).toUpperCase() + winner.slice(1)} Won!
                    </h2>
                </div>

                <p className='text-[#8f8f8f]'>{reason}</p>
                <div className='flex gap-5'>
                    <PlayerCard name={'Prithvi'} />
                    <PlayerCard name={'Vicky'} />
                </div>

                <div className='flex gap-5 mt-10'>
                    <button onClick={() => exitNav('/home')} className='h-14 w-30 bg-[#5f5f5f] font-bold text-white rounded-lg'>Quit</button>
                    <button className='h-14 w-30 bg-[#5f5f5f] font-bold text-white rounded-lg'>Rematch</button>
                </div>
            </div>
        </div>
    )
}

export function PlayerCard({ name }) {
    return (
        <div className='bg-bg-dark h-60 w-40 p-2 gap-5 py-10 rounded-2xl text-white flex flex-col items-center'>
            <div className='h-15 w-15 bg-white rounded-xl'>
                <img></img>
            </div>

            <h3>{name}</h3>
            <div className='flex items-center gap-2'>
                <div className='bg-[#333333] px-5 py-2 rounded-lg'>1000</div>
                <p>+10</p>
            </div>
        </div>
    )
}


export default GameOver
