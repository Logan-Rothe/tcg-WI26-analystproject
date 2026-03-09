import { getCaseByPathName } from "../../static";
import PracticeClient from "../../components/PracticeClient";
import { Metadata } from 'next';

interface Props {
    params: {
        casePath: string;
    }
}

interface UserAnswer {
    sectionIndex: number;
    sectionName: string;
    userInput: string | string[][] | any;
    timeSpent: number;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const promiseResolvedParams = await params;
    const pathName = promiseResolvedParams.casePath;
    const caseJsonData = getCaseByPathName(pathName);
    
    if (!caseJsonData) {
        return {
            title: 'Case Not Found - TCG',
        };
    }
    
    return {
        title: `${caseJsonData.name} - TCG`,
        description: caseJsonData.description,
    };
}

export default async function PracticePage({params}: Props){
    const promiseResolvedParams = await params;
    const pathName = promiseResolvedParams.casePath;
    const caseJsonData = getCaseByPathName(pathName);

    if(caseJsonData == null){
        return (
            <div>
                Case not Found
            </div>
        )
    }

    return(
        <>
            <PracticeClient caseData={caseJsonData} pathName = {pathName}></PracticeClient>
        </>
    )
}