'use client'

import { Section } from '../static/types';
import { useRef, useState, useEffect } from 'react';
import styles from './SectionAnswer.module.css';

interface Props {
    section: Section;
    sectionNumber: number;
    userAnswer: string;
    onNext: () => void;
    isLastSection: boolean;
}

export default function SectionAnswer({ section, userAnswer, onNext, isLastSection, sectionNumber }: Props) {
    const [left, setLeftWidth] = useState(50);
    const contRef = useRef<HTMLDivElement>(null);
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
        if (newLeftWidth > 30 && newLeftWidth < 70) {
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
        <div className={styles.container} ref={contRef}>
            {/* Recommended Answers */}
            <div className={styles.leftPanel} style={{ width: `${left}%` }}>
                <h2 className={styles.panelTitle}>Recommended Answers</h2>

                
                <div className={styles.section}>
                    {/* Section Header */}
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionNumber}>Section { sectionNumber }</span>
                        <span className={styles.sectionName}>{section.name}</span>
                    </div>

                    {/* Prompt */}
                    <p className={styles.prompt}>{section.content.prompt}</p>

                    {/* Images */}
                    {section.content.images && section.content.images.map((img, imgIdx) => (
                        <img
                            key={imgIdx}
                            src={img.url}
                            alt={img.alt}
                            className={styles.image}
                        />
                    ))}

                    {/* Hint */}
                    {section.content.hint && (
                        <p className={styles.hint}>{section.content.hint}</p>
                    )}
                </div>
                
            </div>

            {/* Divider */}
            <div
                className={styles.divider}
                onMouseDown={handleMouseDown}
            />

                {/* Answers */}
                <div className={styles.rightPanel} style={{ width: `${100 - left}%` }}>
                    {/* Suggested Answer */}
                    <h2 className={styles.panelTitle}>Suggested Answer</h2>
                    <div className={styles.answerSection}>
                        {section.answer.type === 'table' && (
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        {section.answer.headers?.map((header, hIdx) => (
                                            <th key={hIdx} className={styles.tableHeader}>
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {section.answer.rows?.map((row, rIdx) => (
                                        <tr key={rIdx}>
                                            {row.map((cell, cIdx) => (
                                                <td key={cIdx} className={styles.tableCell}>
                                                    {cell}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    { /* User Anser */}
                    <h2 className={styles.panelTitle}>Your Answer</h2>
                    <div className={styles.section}>
                        {/* User's Answer */}
                        <div className={styles.userAnswer}>
                            {userAnswer || <em className={styles.noAnswer}>No answer provided</em>}
                        </div>
                        <button onClick={onNext} className={styles.nextButton}>
                            {isLastSection ? 'View Final Results' : 'Next Section'}
                        </button>
                    </div>
                    
                    
            </div>
        </div>
    );
}
