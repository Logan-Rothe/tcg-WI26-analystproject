import {getCaseData} from './static';
import {CaseData} from './static/types';
import { useEffect } from "react";
//This page contains all of the cases
//TODO: Build case selection component
export default function CaseLandingPage(){
    
    useEffect(() => {
        const practice: Record<string, CaseData> = getCaseData();
        console.log("something happens");
        console.log(practice);
    }, []);

    const practice : Record<string, CaseData> = getCaseData();
    console.log("something happens");
    console.log(practice);
    return(
        <div>
            Welcome to the Practice Page
        </div>
    )
}