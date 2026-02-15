'use client'

import { Section } from '../static/types';
import { useState, useEffect, useRef } from 'react';

interface Props{
    section: Section;
    duration: number;
    onExpire: () => void;
}

export default function Timer({section, duration, onExpire}: Props){
    const [timeRemaining, setTimeRemaining] = useState(duration);
    const [isRunning, setIsRunning] = useState(false);
    const hasExpired = useRef(false);
    //whenever duration changes (aka when page changes)
    //update timer
    useEffect(() => {
        setTimeRemaining(duration);
        setIsRunning(true);
        hasExpired.current = false;
    }, [section])


    // Format time as MM:SS
    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    //countdown
    useEffect(() => {
        //timer over
        if(!isRunning || timeRemaining <= 0){
            return;
        }

        //every 1000 milliseconds, count down one second
        const interval = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    setIsRunning(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // CLEANUP FUNCTION, prevent stacking of time renders
        return () => clearInterval(interval);
    }, [isRunning, timeRemaining])

    //function to cause timer end
    useEffect(() => {
        if (timeRemaining === 0 && !hasExpired.current) {
            hasExpired.current = true;
            setTimeout(() => {
                onExpire();
            }, 0);
        }
    }, [timeRemaining, onExpire]);

    return (
        <div>
            {isRunning ? 'Time Remaining' : 'Time Expired'}
            {formatTime(timeRemaining)}
        </div>
    )

}