import {getCaseData} from '@/app/recruitment/case-practice/static/index.js';
import {CaseData} from '@/app/recruitment/case-practice/static/types.js';
//This page contains all of the cases
//TODO: Build case selection component
export default function CaseLandingPage(){
    //function stuff
    const practice : Record<string, CaseData> = getCaseData();
    console.log("something happens");
    console.log(practice);
    return(
        <div>
            Welcome to the Practice Page
        </div>
    )
}