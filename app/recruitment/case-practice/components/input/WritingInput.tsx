import { Section } from "../../static/types";
import { useState, useEffect, useRef } from "react";

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
        <div>
            <p>{section.content.prompt}</p>
            {section.content.images && <img></img>}
            {section.content.hint && <p className="hint">{section.content.hint}</p>}
            
            <textarea 
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here"
            />
            
            <button onClick={() => onSubmit(answer)}>
                Skip to Next Section
            </button>
        </div>
    );
}