//This page represents the pop up when one selects a case
//Provides basic information as well as start/go back option

import { getCaseByPathName } from "../static";
import styles from './page.module.css';
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
            <div className={styles.notFound}>
                Case not Found
            </div>
        )
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <h1 className={styles.caseTitle}><span className={styles.caseLabel}>Case:</span> {caseJsonData.name}</h1>
                <p className={styles.caseMeta}>Time: {caseJsonData.time} minutes</p>
                <p className={styles.caseDescription}>{caseJsonData.description}</p>
                <p className={styles.warning}>
                    WARNING: PLEASE MAKE SURE YOU ARE READY BEFORE CLICKING BEGIN
                </p>
                <div className={styles.buttonGroup}>
                    <Link href={`/recruitment/case-practice/${pathName}/practice`} className={styles.startButton}>Start Case</Link>
                    <Link href={`/recruitment/case-practice`} className={styles.backButton}>Go Back</Link>
                </div>
            </div>
        </div>
    )
}