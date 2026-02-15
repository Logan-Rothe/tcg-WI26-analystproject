//DEFINE ALL THE TYPES FOR ITEMS IN JSON

//Generalized data of case
export interface CaseData {
  name: string;
  time: number;
  description: string;
  sections: Section[];
}

//Each modular section
export interface Section {
  name: string;
  time: number;
  type: 'writing' | 'brainstorm' | 'framework';
  content: {
    prompt: string;
    images: Image[];
    hint?: string;
  };
  answer: Answer;
}

//Image component
export interface Image {
  url: string;
  width: number;
  height: number;
  alt?: string;
}

//Answer component
export interface Answer {
  showAnswer: boolean;
  type: 'text' | 'table';
  headers?: string[];
  rows?: string[][];
}