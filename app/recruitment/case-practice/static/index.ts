import { CaseData } from './types';
import fs from 'fs';
import path from 'path';

// directory that holds the JSON files; must match the filesystem layout
const caseDir = path.join(process.cwd(), 'app/recruitment/case-practice/static');

/**
 * Normalise a file name so it can serve as a stable key.
 * In the previous implementation we had to strip a leading "./",
 * but when reading from the file system the names come back without it.
 */
function cleanPathName(p: string): string {
  return p.startsWith('./') ? p.slice(2) : p;
}

// load all JSON files synchronously at module initialisation
function loadCaseFiles(): Record<string, CaseData> {
  const result: Record<string, CaseData> = {};
  const files = fs.readdirSync(caseDir).filter(f => f.endsWith('.json'));

  for (const file of files) {
    const raw = fs.readFileSync(path.join(caseDir, file), 'utf-8');
    const data = JSON.parse(raw) as CaseData;
    result[cleanPathName(file)] = data;
  }

  return result;
}

const caseData: Record<string, CaseData> = loadCaseFiles();

/**
 * Return JSON data for a given case name, or `null` if not found.
 */
export function getCaseDataByName(caseName: string): CaseData | null {
  return caseData[caseName] ?? null;
}

/**
 * Return the entire case-data dictionary. The caller should treat the
 * object as read-only.
 */
export function getCaseData(): Record<string, CaseData> {
  return caseData;
}