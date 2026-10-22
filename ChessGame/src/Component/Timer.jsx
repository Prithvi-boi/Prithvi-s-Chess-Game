import { useState, useRef } from 'react';
import { setTimeOver } from '../slices/Ingame';
import { useDispatch } from 'react-redux';

export default function Timer({toggle, color}) {
    const [time, setTime] = useState(60); // 10 minutes in seconds
    const dispatch = useDispatch()

    const intervalRef = useRef(null);
    const endTimeRef = useRef(null);


    function startTimer() {
        if (intervalRef.current !== null) return;

        endTimeRef.current = new Date().getTime() + time * 1000;
        console.log(endTimeRef.current);
        

        intervalRef.current = setInterval(() => {
            const remaining = Math.max(
                0,
                Math.ceil((endTimeRef.current - new Date().getTime()) / 1000)
            );

            setTime(remaining);

            if (remaining === 0) {
                stopTimer();
                dispatch(setTimeOver(color))
            }
        }, 250);
    }


    function stopTimer() {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        endTimeRef.current = null;
    }

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    
    if (toggle) {
        startTimer()
    }else{
        stopTimer()
    }

    return (
        <div>
            <h2 className='font-bold text-stone-800'>
                {String(minutes).padStart(2, '0')}:
                {String(seconds).padStart(2, '0')}
            </h2>
        </div>
    );
}