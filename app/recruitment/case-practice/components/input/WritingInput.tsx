import { useEffect, useRef, useState } from "react";
import { Section } from "../../static/types";
import styles from "./input_style.module.css";

interface Props {
    section: Section;
    onSubmit: (answer: string) => void;
    timeExpired: boolean;
}


export default function WritingInput({ section, onSubmit, timeExpired }: Props) {
    const [answer, setAnswer] = useState('');
    const hasSubmitted = useRef(false);
    useEffect(() => {
        if (timeExpired && !hasSubmitted.current) {
            hasSubmitted.current = true;
            onSubmit(answer);

        }
    }, [timeExpired]);

    //reset values when section changes
    useEffect(() => {
        setAnswer('');
        hasSubmitted.current = false;
    }, [section]);

    return (
        
        <div className={styles.wrapper}>
            <div className={styles.leftPanel}>
            <p className={styles.prompt}>
                {section.content.prompt}
            </p>
            </div>

            <div className={styles.rightPanel}>
            <textarea
                className={styles.textarea}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here"
            />
            
            <button
                className={styles.button}
                onClick={() => onSubmit(answer)}
            >
                Skip to Next Section
            </button>
            </div>
        </div>
);
}