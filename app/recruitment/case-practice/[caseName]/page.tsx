//This page represents the pop up when one selects a case
//Provides basic information as well as start/go back option

export default function caseInformationPage({params } : {params: {caseName: string}}){
    return (
        <div>
            Case: {params.caseName}
        </div>
    )
}