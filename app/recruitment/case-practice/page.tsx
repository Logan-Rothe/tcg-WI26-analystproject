"use client";

import {getCaseData} from './static';
import {CaseData} from './static/types';
import { useEffect } from "react";
//This page contains all of the cases
//TODO: Build case selection component
export default function CaseLandingPage(){
    

    const practice : Record<string, CaseData> = getCaseData();
    
    return(
        <div>
            Welcome to the Practice Page
            {Object.keys(practice)}
        </div>
    )
}