import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTimeOver } from '../slices/Ingame'

export default function Timer({ toggle, color }) {
    const dispatch = useDispatch()
    const gameMode = useSelector(state => state.gameMode.value)
    const gameOver = useSelector(state => state.piecesPosition.gameOver)

    // correct starting time from the very first render
    const startSeconds = { rapid: 600, blitz: 300, bullet: 60 }[gameMode] ?? 700

    const [time, setTime] = useState(startSeconds)
    const timeRef = useRef(startSeconds)     // always-current remaining seconds
    const intervalRef = useRef(null)
    const endTimeRef = useRef(null)

    function startTimer() {
        if (intervalRef.current !== null) return

        endTimeRef.current = Date.now() + timeRef.current * 1000

        intervalRef.current = setInterval(() => {
            const remaining = Math.max(
                0,
                Math.ceil((endTimeRef.current - Date.now()) / 1000)
            )

            timeRef.current = remaining
            setTime(remaining)

            if (remaining === 0) {
                stopTimer()
                dispatch(setTimeOver(color))
            }
        }, 250)
    }

    function stopTimer() {
        if (intervalRef.current === null) return

        // save the exact time left, so the next start continues from here
        if (endTimeRef.current !== null) {
            timeRef.current = Math.max(
                0,
                Math.ceil((endTimeRef.current - Date.now()) / 1000)
            )
        }

        clearInterval(intervalRef.current)
        intervalRef.current = null
        endTimeRef.current = null
    }

    useEffect(() => {
        if (toggle && !gameOver) startTimer()
        else stopTimer()

        return () => stopTimer()   // pause, game over, or unmount
    }, [toggle, gameOver])

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    return (
        <div>
            <h2 className='font-bold text-stone-800'>
                {String(minutes).padStart(2, '0')}:
                {String(seconds).padStart(2, '0')}
            </h2>
        </div>
    )
}