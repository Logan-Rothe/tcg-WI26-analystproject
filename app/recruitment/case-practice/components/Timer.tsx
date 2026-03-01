'use client'

import { useEffect, useRef, useState } from 'react';
import { Section } from '../static/types';
import styles from './Timer.module.css';

interface Props{
    section: Section;
    duration: number;
    onExpire: () => void;
    storageKey: string;
}

export default function Timer({section, duration, onExpire, storageKey}: Props){
    const [timeRemaining, setTimeRemaining] = useState(duration);
    const [isRunning, setIsRunning] = useState(false);
    const hasExpired = useRef(false);
    const prevSection = useRef(section);

    useEffect(() => {
        const saved = sessionStorage.getItem(storageKey);
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed.timeRemaining !== undefined) {
                setTimeRemaining(parsed.timeRemaining);
            }
        }
        setIsRunning(true);
    }, []);

    useEffect(() => {
        if (prevSection.current === section) return;
        prevSection.current = section;
        setTimeRemaining(duration);
        setIsRunning(true);
        hasExpired.current = false;
    }, [section]);

    useEffect(() => {
        const saved = sessionStorage.getItem(storageKey);
        const base = saved ? JSON.parse(saved) : {};
        sessionStorage.setItem(storageKey, JSON.stringify({ ...base, timeRemaining }));
    }, [timeRemaining]);

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if(!isRunning || timeRemaining <= 0) return;
        const interval = setInterval(() => {
            setTimeRemaining((prev: number) => {
                if (prev <= 1) return 0;
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [isRunning, timeRemaining]);

    useEffect(() => {
        if (timeRemaining === 0 && !hasExpired.current) {
            hasExpired.current = true;
            setIsRunning(false);
            setTimeout(() => onExpire(), 0);
        }
    }, [timeRemaining, onExpire]);

    return (
        <div className={styles.timerWrapper}>
            <div className={styles.timerPill}>
                {formatTime(timeRemaining)}
            </div>
        </div>
    );
}