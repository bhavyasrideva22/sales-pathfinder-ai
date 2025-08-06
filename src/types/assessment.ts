export interface Question {
  id: string;
  text: string;
  type: 'likert' | 'multiple-choice' | 'scenario';
  options?: string[];
  category: string;
  construct: string;
}

export interface AssessmentSection {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface AssessmentResponse {
  questionId: string;
  value: number | string;
  timestamp: number;
}

export interface ScoreBreakdown {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  ability: number;
  realWorld: number;
}

export interface AssessmentResult {
  overallScore: number;
  breakdown: ScoreBreakdown;
  recommendation: 'Yes' | 'Maybe' | 'No';
  insights: string[];
  nextSteps: string[];
  alternatives: string[];
  careerMatches: CareerMatch[];
}

export interface CareerMatch {
  title: string;
  fitScore: number;
  description: string;
  requirements: string[];
}

export interface PersonalityTraits {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}