import { CaseData } from './types';
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';



/**
 * Normalise a file name so it can serve as a slug root
 */
function cleanPathName(p: string): string {
  return p.startsWith('./') ? p.slice(2) : p;
}

/**
 * Get all cases from the static directory
 */
export function getAllCases(): Record<string, CaseData> {
  const dir = path.join(process.cwd(), 'app/recruitment/case-practice/static');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  
  const cases: Record<string, CaseData> = {};
  
  files.forEach(file => {
    const fileName = file.replace('.json', '');
    const filePath = path.join(dir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    cases[cleanPathName(fileName)] = JSON.parse(fileContent) as CaseData;
  });
  
  return cases;
}

/**
 * Get a single case by name
 */
export function getCaseByName(caseName: string): CaseData | null {
  const cases = getAllCases();
  return cases[caseName] || null;
}