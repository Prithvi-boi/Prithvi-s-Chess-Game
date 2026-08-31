function Board() {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].reverse()    
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8]
    const darkSquares = []
    for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < letters.length; j++) {
            const element = `${letters[j]}${numbers[i]}`;
            darkSquares.push(element)
        } 
    }    

    return (
        <div className="h-[45%] w-[85%] bg-[#3A1A0C] border-4 border-[#634833] grid grid-cols-[2rem_auto_2em] grid-rows-[2rem_auto_2rem]">
            <div className="row-start-1 col-start-2 grid grid-cols-8 w-full text-white place-items-center">
                {letters.map((elmt)=> <p key={elmt} className="rotate-180">{elmt}</p>)}
            </div>

            <div className="row-start-3 col-start-2 grid grid-cols-8 w-full text-white place-items-center">
                {letters.map((elmt)=> <p key={elmt}>{elmt}</p>)}
            </div>

            <div className="row-start-2 col-start-1 grid grid-rows-8 w-full text-white place-items-center">
                {numbers.map((elmt)=> <p key={elmt}>{elmt}</p>)}
            </div>

            <div className="row-start-2 col-start-3 grid grid-rows-8 w-full text-white place-items-center">
                {numbers.map((elmt)=> <p key={elmt} className="rotate-180">{elmt}</p>)}
            </div>

            <div className="row-start-2 col-start-2 bg-[#3A1A0C] border-4 border-[#634833]">
                <div className=" grid grid-rows-8 grid-cols-8 h-full w-full bg-[#E9E9DF]">
                    {darkSquares.map((elmt,i) => {
                        let num = Number(elmt[1])
                        let color;
                        if (num % 2 == 0) {
                            color = i % 2 == 0 ? 'bg-[#E9E9DF]' : 'bg-[#BB9979]'
                        }else{
                            color = i % 2 == 0 ? 'bg-[#BB9979]' : 'bg-[#E9E9DF]' 
                        }
                        
                        return <div key={elmt} id={elmt} className={`h-full w-full ${color} text-amber-950 flex justify-center items-center`} onClick={(e)=>{console.log(e.target.id)}}></div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Board