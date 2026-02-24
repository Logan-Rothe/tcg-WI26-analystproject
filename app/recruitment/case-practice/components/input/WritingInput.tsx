import { useEffect, useRef, useState } from "react";
import { Section } from "../../static/types";
import styles from "./input_style.module.css";

interface Props {
    section: Section;
    onSubmit: (answer: string) => void;
    timeExpired: boolean;
    storageKey: string;
}

export default function WritingInput({ section, onSubmit, timeExpired, storageKey }: Props) {
    const [answer, setAnswer] = useState('');
    const hasSubmitted = useRef(false);
    const [left, setLeftWidth] = useState(50);
    const contRef = useRef<HTMLDivElement>(null);
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

    useEffect(() => {
        const saved = sessionStorage.getItem(storageKey);
        if (saved) {
            const parsed = JSON.parse(saved);
            const draftKey = `draft_${section.name}`;
            if (parsed[draftKey] !== undefined) {
                setAnswer(parsed[draftKey]);
            }
        }
    }, [section]);

    useEffect(() => {
        const saved = sessionStorage.getItem(storageKey);
        const base = saved ? JSON.parse(saved) : {};
        const draftKey = `draft_${section.name}`;
        sessionStorage.setItem(storageKey, JSON.stringify({
            ...base,
            [draftKey]: answer
        }));
    }, [answer, section.name]);

    const isDragging = useRef(false);
    const handleMouseDown = () => {
        isDragging.current = true;
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging.current || !contRef.current) return;
        const rect = contRef.current.getBoundingClientRect();
        const newLeftWidth = ((e.clientX - rect.left) / rect.width) * 100;
        if (newLeftWidth > 20 && newLeftWidth < 70) {
            setLeftWidth(newLeftWidth);
        }
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <div
            className={styles.container}
            ref={contRef}
        >
            <div
                className={styles.leftPanel}
                style={{ width: `${left}%` }}
            >
                <p className={styles.prompt}>
                    {section.content.prompt}
                </p>
                {/* Images Section */}
                {section.content.images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img.url}
                        alt={img.alt}
                        className={styles.image}
                    />
                ))}
                {/* Hint Section */}
                {section.content.hint && (
                    <p className={styles.hint}>{section.content.hint}</p>
                )}
            </div>
            <div
                className={styles.divider}
                onMouseDown={handleMouseDown}
            />
            <div
                className={styles.rightPanel}
                style={{ width: `${100 - left}%` }}
            >
                <textarea
                    className={styles.textarea}
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Type your answer here"
                />
                <button
                    className={styles.applyButton}
                    onClick={() => onSubmit(answer)}
                >
                    Skip to Next Section
                </button>
            </div>
        </div>
    );
}





