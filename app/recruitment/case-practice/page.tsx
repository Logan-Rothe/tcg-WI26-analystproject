
import {getAllCases} from './static';
import {CaseData} from './static/types';
//This page contains all of the cases
//TODO: Build case selection component
export default function CaseLandingPage(){
    

    const practice : Record<string, CaseData> = getAllCases();
    
    return(
        <div>
            Welcome to the Practice Page
            {Object.keys(practice)}
        </div>
    )
}