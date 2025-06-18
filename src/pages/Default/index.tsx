import { useCallback, useEffect, useState } from "react";
import Box from "src/Components/Box";

export default function Default() {
    
    const [contentController, setContentController] = useState<Map<number, string>>(new Map())
    const [round, setRound] = useState(0)
    const [winner, setWinner] = useState('')

    const winConditions = [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,4,7],
        [2,5,8],
        [3,6,9],
        [1,5,9],
        [3,5,7],
    ]

    const handleBoxClick = (event: Event) => {

        if (event.target) {
            
            const boxIdx = parseInt((event.target as HTMLElement).id.split('-')[1])

            if (contentController.get(boxIdx)) {
                return
            }

            const boxContent = round % 2 === 0 ? 'x' : 'o'
            
            setContentController(prevState => new Map(prevState.set(boxIdx, boxContent)))

            setRound(prevState => prevState += 1)
        }
    }

    const handleCheckWinner = useCallback(() => {

       
        const isX = round % 2 === 1
        const arr = Array.from(contentController.entries())
        let indexesToCheck = []
       

        isX ?
            indexesToCheck = arr.filter(([_, value]) => value === 'x').map(([key, _]) => key) :
            indexesToCheck = arr.filter(([_, value]) => value === 'o').map(([key, _]) => key)

        const finished = winConditions.some(condition => condition.every(num => indexesToCheck.includes(num)))

      
        if (finished) {
            
           setWinner(isX ? "X" : "O")
        }
    
    }, [contentController, round])

    useEffect(() => {
        const indexList = Array.from({length: 9}, (_, idx) => idx + 1)

        indexList.forEach(e => {
            const box = document.getElementById(`box-${e}`)

            if (box) {
                return box.addEventListener('click', handleBoxClick)
            }
        })

        return () => {
            indexList.forEach(e => {
                const box = document.getElementById(`box-${e}`)
                if (box) {
                    return box.removeEventListener('click', handleBoxClick)
                }
            })
        }
    }, [contentController])

    useEffect(() => {
        handleCheckWinner()
    }, [handleCheckWinner])

    return (
        <div className="w-screen h-screen m-0 p-0 ">
            {winner}
            <div className="flex items-center justify-center w-full h-full p-8">
                <button onClick={() => {
                    setContentController(new Map())
                    setWinner('')
                    setRound(0)
                }}>clear</button>
                <div className="w-full h-[50vh] md:h-[500px] md:w-[500px]">
                    <div className="grid grid-cols-3 w-full h-full">
                        {Array.from({length: 9}, (_, index) => (
                            <Box key={index} index={index} content={contentController.get(index + 1) ?? ""} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
        
    )
}

