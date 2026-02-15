//This page represents the pop up when one selects a case
//Provides basic information as well as start/go back option

import { getCaseByPathName } from "../static";
import { CaseData } from "../static/types";
import styles from '../../recruitment.module.css';
import Link from 'next/link';
interface Props {
    params: {
        casePath : string;
    }
}

export default async function caseInformationPage({params} : Props){
    //slug passed in via params
    const promiseResolvedParams = await params;
    const pathName = promiseResolvedParams.casePath;
    const caseJsonData = getCaseByPathName(pathName);
    //case not in file path
    if(caseJsonData == null){
        return (
            <div>
                Case not Found
            </div>
        )
    }
    return (
        <>
            <div>
                Case: {caseJsonData.name}
                <br></br>
                Time: {caseJsonData.time}
                <br></br>
                Description: {caseJsonData.description}
                <br></br>
                WARNING: PLEASE MAKE SURE YOU ARE READY BEFORE CLICKING BEGIN
            </div>
            <div style={{marginTop:30}}>
                <Link 
                    href={`/recruitment/case-practice/${pathName}/practice`} 
                    className={styles.applyButton} 
                >
                    Start Case
                </Link>
            </div>
            <div style={{marginTop:30}}>
                <Link 
                    href={`/recruitment/case-practice`} 
                    className={styles.applyButton} 
                >
                    Go Back
                </Link>
            </div>
        </>
    )
}