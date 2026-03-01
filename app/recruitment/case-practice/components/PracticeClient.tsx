'use client'

import { useCallback, useEffect, useState } from 'react';
import { CaseData } from '../static/types';
import GradingPage from './GradingPage';
import WritingInput from './input/WritingInput';
import styles from "./PracticeClient.module.css";
import SectionAnswer from './SectionAnswer';
import Timer from './Timer';

interface Props {
    caseData : CaseData | null;
    pathName: string;
}

interface UserAnswer{
    sectionIndex: number;
    sectionName: string;
    userInput: string;
}

export default function PracticeClient({caseData, pathName} : Props){
    
    const storageKey = `case-progress-${pathName}`;
    const [currentSection, setCurrentSection] = useState(0);
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
    const [timeExpired, setTimeExpired] = useState(false);
    const [caseCompleted, setCaseCompleted] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        const saved = sessionStorage.getItem(storageKey);
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed.currentSection !== undefined) setCurrentSection(parsed.currentSection);
            if (parsed.userAnswers !== undefined) setUserAnswers(parsed.userAnswers);
        }
        setHydrated(true);
    }, []);

    useEffect(() => {
        if (!hydrated) return;
        sessionStorage.setItem(storageKey, JSON.stringify({ currentSection, userAnswers }));
    }, [currentSection, userAnswers, hydrated]);

    if(!caseData){
        return <div>Loading case data...</div>;
    }

    const currentSectionData = caseData.sections[currentSection];
    const numberOfSections = caseData.sections.length;
    const isLastSection = currentSection == (numberOfSections - 1);
    
    const moveToNextSection = () => {
        if (!isLastSection) {
            setCurrentSection(currentSection + 1);
            setTimeExpired(false);
            setShowAnswer(false);
        } else {
            sessionStorage.removeItem(storageKey);
            setCaseCompleted(true);
        }
    };

    const handleTimeExpire = useCallback(() => {
        setTimeExpired(true);
    }, []);

    const handleSectionComplete = (userInput: string) => {
        const newAnswer: UserAnswer = {
            sectionIndex: currentSection,
            sectionName: currentSectionData.name,
            userInput: userInput
        };
        setUserAnswers([...userAnswers, newAnswer]);
        if (currentSectionData.answer.showAnswer) {
            setTimeExpired(true);
            setShowAnswer(true);
        } else {
            moveToNextSection();
        }
    }

    return(
        <>
            {!caseCompleted && (
                <>
                    <div className={styles.header}>
                        <div className={styles.sectionLine}>
                            Section {currentSection + 1} of {numberOfSections}
                        </div>
                        <div className={styles.nameRow}>
                            <span className={styles.nameLabel}>Name: </span>
                            <span className={styles.nameValue}>{currentSectionData?.name}</span>
                        </div>
                        <div className={styles.headerDivider} />
                    </div>

                    <div>
                        {!showAnswer && hydrated &&(
                            <Timer
                                section={currentSectionData}
                                duration={currentSectionData.time * 60}
                                onExpire={handleTimeExpire}
                                storageKey={storageKey}
                            />
                        )}
                    </div>

                    <div>
                        {!showAnswer ? (
                            <WritingInput 
                                section={currentSectionData}
                                onSubmit={handleSectionComplete}
                                timeExpired={timeExpired}
                                storageKey={storageKey}
                            />
                        ) : (
                            <SectionAnswer
                                section={currentSectionData}
                                sectionNumber={currentSection + 1}
                                userAnswer={userAnswers[currentSection]?.userInput || ''}
                                onNext={moveToNextSection}
                                isLastSection={isLastSection}
                            />
                        )}
                    </div>
                </>
            )}

            {caseCompleted && (
                <GradingPage
                    caseData={caseData}
                    userAnswers={userAnswers}
                />
            )}
        </>
    )
}