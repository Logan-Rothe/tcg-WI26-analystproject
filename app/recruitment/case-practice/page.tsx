
import {getAllCases} from './static';
import {CaseData} from './static/types';
import CaseCard from './components/CaseCard';
//This page contains all of the cases
//TODO: Build case selection component
export default function CaseLandingPage(){
    
    //all cases in name-of-path: json data
    const allCases : Record<string, CaseData> = getAllCases();

    //creates case Card object for each case
    return(
        <>
            {Object.entries(allCases).map(([key, value]) => (
                <CaseCard key={key} path={key} caseJson={value} />
            ))}
        </>
    )
}