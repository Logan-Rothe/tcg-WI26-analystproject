
import { CaseData } from "../static/types"
import styles from '../../recruitment.module.css';
import Link from 'next/link';

interface Props{
    path: String,
    caseJson : CaseData;
}

//cards for each
export default function CaseCard({path, caseJson} : Props){
    
    
    return (
        <div>
            <div>
                {caseJson.name}
            </div>
            <div>
                {caseJson.time}
            </div>
            <div style={{marginTop:15}}>
                <Link 
                    href={`/recruitment/case-practice/${path}`} 
                    className={styles.applyButton} 
                   
                >
                    start case
                </Link>
            </div>
        </div>
    )
}