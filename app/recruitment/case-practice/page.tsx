
import CaseCard from './components/CaseCard';
import styles from './starting_page_style.module.css';
import { getAllCases } from './static';
import { CaseData } from './static/types';
//This page contains all of the cases
//TODO: Build case selection component

export const metadata = {
  title: 'Practice Cases - TCG',
};

export default function CaseLandingPage(){
    
    //all cases in name-of-path: json data
    const allCases : Record<string, CaseData> = getAllCases();

    //creates case Card object for each case
    return(
        <div className={styles.container}>
            {Object.entries(allCases).map(([key, value]) => (
                <CaseCard key={key} path={key} caseJson={value} />
            ))}
        </div>
    )
}