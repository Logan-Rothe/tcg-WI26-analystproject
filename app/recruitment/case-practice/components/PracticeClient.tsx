'use client'
//logic runner for case

import { useState, useCallback } from 'react';
import { CaseData, Section } from '../static/types';
import WritingInput from './input/WritingInput';
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
        }
    }
    return(
        <>
            {/* Header */}
            <div>
                Section {currentSection + 1} of {numberOfSections}
            </div>
            <div>
                Name: {currentSectionData?.name}
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
                    />
                )}
                {currentSectionType === "brainstorm" && (
                    
                    <div>  Brainstorm input component coming soon</div>
                )}
                {currentSectionType === "framework" && (
                    <div>Proof of User answer {userAnswers[0].userInput}</div>
                )}
            </div>
        </>
    )
}