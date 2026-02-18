'use client'

import { CaseData } from "../static/types";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import styles from './GradingPage.module.css';

interface Props {
    caseData: CaseData | null;
    userAnswers: UserAnswer[];
}

interface UserAnswer {
    sectionIndex: number;
    sectionName: string;
    userInput: string;
}

export default function GradingPage({ caseData, userAnswers }: Props) {
    const [left, setLeftWidth] = useState(50);
    const contRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    if (!caseData) {
        return <div>Loading case data...</div>;
    }

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

    const handleDownload = () => {
        // TODO: Implement PDF download functionality
        console.log('Download triggered');
    };

    return (
        <div className={styles.wrapper}>
            {/* Header */}
            <div className={styles.header}>
                <h1 className={styles.title}>Results</h1>
                <button className={styles.downloadButton} onClick={handleDownload}>
                    <span className={styles.downloadIcon}>↓</span>
                    Download
                </button>
            </div>

            {/* Two-column layout with divider */}
            <div className={styles.container} ref={contRef}>
                {/* Recommended Answers - Left Panel */}
                <div className={styles.leftPanel} style={{ width: `${left}%` }}>
                    <h2 className={styles.panelTitle}>Recommended Answers</h2>
                    
                    {caseData.sections.map((section, idx) => (
                        <div key={idx} className={styles.section}>
                            {/* Section Header */}
                            <div className={styles.sectionHeader}>
                                <span className={styles.sectionNumber}>Section {idx + 1}</span>
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

                            {/* Answer - Table or Text */}
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
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div
                    className={styles.divider}
                    onMouseDown={handleMouseDown}
                />

                {/* User Answers - Right Panel */}
                <div className={styles.rightPanel} style={{ width: `${100 - left}%` }}>
                    <h2 className={styles.panelTitle}>Your Answer</h2>
                    
                    {userAnswers.map((answer, idx) => (
                        <div key={idx} className={styles.section}>
                            {/* Section Header */}
                            <div className={styles.sectionHeader}>
                                <span className={styles.sectionNumber}>Section {answer.sectionIndex + 1}</span>
                                <span className={styles.sectionName}>{answer.sectionName}</span>
                            </div>

                            {/* User's Answer */}
                            <div className={styles.userAnswer}>
                                {answer.userInput || <em className={styles.noAnswer}>No answer provided</em>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className={styles.footer}>
                <Link href="/recruitment/case-practice" className={styles.homeButton}>
                    Home
                </Link>
            </div>
        </div>
    );
}