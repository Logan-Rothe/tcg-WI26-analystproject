'use client'

import { CaseData } from "../static/types";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import styles from './GradingPage.module.css';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
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

    const loadImageForPdf = (url: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "Anonymous"; 
            img.src = url;
            img.onload = () => resolve(img);
            img.onerror = (err) => reject(err);
        });
    };
    const handleDownload = async() => {
        const doc = new jsPDF();

        // formatting for the pdf document
        const margin = 15;
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        const maxTextWidth = pageWidth - margin * 2;
        let yPos = 20;

        // Document Title
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text(`Results: ${caseData.name}`, margin, yPos);
        yPos += 15;

        // Start Building the PDF
        for(let idx = 0; idx<caseData.sections.length;idx++){
            const section = caseData.sections[idx];
            const userAnswer = userAnswers.find(ua => ua.sectionIndex === idx);

            // Section Header
            // Check if we need a new page for the section header
            if (yPos > pageHeight - 40) {
                doc.addPage();
                yPos = 20;
            }

            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(40, 40, 40); // Dark gray
            doc.text(`Section ${idx + 1}: ${section.name}`, margin, yPos);
            yPos += 8;

            // Add the prompt
            doc.setFontSize(11);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(0,0,0);
            doc.text("Prompt: ", margin, yPos);
            yPos +=5; 
            doc.setFontSize(10);
            doc.setFont("helvetica","normal");
            const splitPrompt = doc.splitTextToSize(section.content.prompt, maxTextWidth);

            splitPrompt.forEach((line: string) => {
                if (yPos > pageHeight - margin) {
                    doc.addPage();
                    yPos = 20;
                }
                doc.text(line, margin, yPos);
                yPos += 5;
            });
            yPos +=5;

            // add images if the prompt has any
            if(section.content.images && section.content.images.length>0){
                for(const imageObj of section.content.images){
                    try{
                        const img = await loadImageForPdf(imageObj.url);
                        let imgWidth = img.width;
                        let imgHeight = img.height;
                        const maxWidth = maxTextWidth - 10;

                        if(imgWidth > maxWidth){
                            const ratio = maxWidth / imgWidth;
                            imgWidth = maxWidth;
                            imgHeight = imgHeight*ratio;
                        }

                        if(yPos + imgHeight>pageHeight-margin){
                            doc.addPage();
                            yPos=20;
                        }
                        const format = imageObj.url.toLowerCase().match(/\.(jpeg|jpg)$/)?'JPEG':'PNG';
                        doc.addImage(img,format,margin+5,yPos,imgWidth,imgHeight);
                        yPos+=imgHeight+10;
                    }catch(error){
                        console.error("Failed to load image for PDF:", imageObj.url,error);
                        doc.setTextColor(255,0,0);
                        doc.text(`[Image failed to load: ${imageObj.alt}]`,margin,yPos);
                        yPos+=10;
                    }
                }
            }

            if(yPos>pageHeight-20){
                doc.addPage();
                yPos=20;
            }
            // Expected Answer
            doc.setFontSize(11);
            doc.setTextColor(0, 102, 51); // Dark green for expected answer
            doc.text("Expected Answer:", margin, yPos);
            yPos += 4;

            // If its a table
            if (section.answer.type === "table" && section.answer.headers && section.answer.rows) {
                autoTable(doc, {
                    startY: yPos,
                    head: [section.answer.headers],
                    body: section.answer.rows,
                    theme: 'grid',
                    styles: { fontSize: 10, cellPadding: 3 },
                    headStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: 'bold' },
                    margin: { left: margin, right: margin }
                });
                // autoTable attaches the final Y position to the doc object
                yPos = (doc as any).lastAutoTable.finalY + 10;
            }

            // User Answer
            // Check if we need a new page before writing the user's answer
            if (yPos > pageHeight - 30) {
                doc.addPage();
                yPos = 20;
            }

            doc.setFontSize(11);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(0, 0, 0); // Black
            doc.text("Your Answer:", margin, yPos);
            yPos += 6;

            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");

            const userText = userAnswer?.userInput && userAnswer.userInput.trim() !== ""
                ? userAnswer.userInput
                : "No answer provided.";

            // Split text to fit page width
            const splitText = doc.splitTextToSize(userText, pageWidth - (margin * 2));

            // Render user text line by line to handle page breaks mid-paragraph
            splitText.forEach((line: string) => {
                if (yPos > pageHeight - margin) {
                    doc.addPage();
                    yPos = 20;
                }
                doc.text(line, margin, yPos);
                yPos += 5;
            });

            yPos += 12;
        }

        // Clean up filename and save
        const safeFilename = caseData.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        doc.save(`${safeFilename}_practice_results.pdf`);
    }
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
