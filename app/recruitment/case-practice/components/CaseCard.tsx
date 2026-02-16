import Link from 'next/link';
import styles from '../starting_page_style.module.css';
import { CaseData } from "../static/types";

interface Props{
    path: string;
    caseJson : CaseData;
}

export default function CaseCard({path, caseJson} : Props){
    
    return (
        <div className={styles.caseRow}>
            
            <div className={styles.caseInfo}>
                <div className={styles.caseTitle}>
                    {caseJson.name}
                </div>
                <div className={styles.caseTime}>
                    {caseJson.time} minutes
                </div>
            </div>

            <Link 
                href={`/recruitment/case-practice/${path}`} 
                className={styles.applyButton}
            >
                Start Case
            </Link>

        </div>
    )
}