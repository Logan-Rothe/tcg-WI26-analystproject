'use client'
//logic runner for case

import { useCallback, useEffect, useState } from 'react';
import { CaseData } from '../static/types';
import GradingPage from './GradingPage';
import WritingInput from './input/WritingInput';
import styles from "./PracticeClient.module.css";
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
    
    //all state variables
    const [currentSection, setCurrentSection] = useState(0);
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
    const [timeExpired, setTimeExpired] = useState(false);
    const [caseCompleted, setCaseCompleted] = useState(false);
    const storageKey = `case-progress-${pathName}`;
    useEffect(() => {
        sessionStorage.setItem(storageKey, JSON.stringify({ currentSection, userAnswers }));
    }, [currentSection, userAnswers]);

    if(!caseData){
        return <div>Loading case data...</div>;
    }
    const currentSectionData = caseData.sections[currentSection];
    const numberOfSections = caseData.sections.length;
    //representative of final section -> grading
    const isLastSection = currentSection == (numberOfSections - 1);
    const currentSectionType = caseData.sections[currentSection].type;
    
    const handleTimeExpire = useCallback(() => {
        setTimeExpired(true);
        
    }, []);

    const handleSectionComplete = (userInput : string) => {
        const newAnswer: UserAnswer = {
            sectionIndex: currentSection,
            sectionName: currentSectionData.name,
            userInput: userInput
        };

        setUserAnswers([...userAnswers, newAnswer]);
        if(!isLastSection){
            //advance section
            setCurrentSection(currentSection + 1);
            setTimeExpired(false);
        }else{
            sessionStorage.removeItem(storageKey);
            setCaseCompleted(true);
        }
        
    }
    return(
        <>
            {/* Header */}
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
                        
                        <Timer
                            section={currentSectionData}
                            duration={currentSectionData.time * 60}
                            onExpire={handleTimeExpire}
                        >

                        </Timer>
                        
                    </div>

                    {/* Content */}
                    <div>
                        {currentSectionType === "writing" && (
                            <WritingInput 
                                section={currentSectionData}
                                onSubmit={handleSectionComplete}
                                timeExpired={timeExpired}
                                storageKey={storageKey}
                            />
                        )}
                        {currentSectionType === "brainstorm" && (
                            
                            <WritingInput 
                                section={currentSectionData}
                                onSubmit={handleSectionComplete}
                                timeExpired={timeExpired}
                                storageKey={storageKey}
                            />
                        )}
                        {currentSectionType === "framework" && (
                            <WritingInput 
                                section={currentSectionData}
                                onSubmit={handleSectionComplete}
                                timeExpired={timeExpired}
                                storageKey={storageKey}
                            />
                        )}
                    </div>
                </>
            )}

            {/*Grading Page */}
            {caseCompleted && (
                <GradingPage 
                    caseData = {caseData}
                    userAnswers = {userAnswers}
                />
            )}
        </>
    )
}