export enum TechStack {
  AUTO = 'Auto-Detect',
  REACT = 'React',
  NODE = 'Node.js',
  JAVA = 'Java',
  PYTHON = 'Python',
  SQL = 'SQL',
  DOCKER = 'Docker',
  GENERAL = 'General',
}

export enum ExplainLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  PRO = 'Pro',
}

export interface AnalysisResult {
  whatWentWrong: string;
  rootCause: string;
  fixCode: string;
  prevention: string[];
  learningInsight: string;
  detectedStack?: TechStack;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  errorInput: string;
  stack: TechStack;
  level: ExplainLevel;
  result: AnalysisResult;
}

export interface MockAiResponse {
  [key: string]: AnalysisResult;
}