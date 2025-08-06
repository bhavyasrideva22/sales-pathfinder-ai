import { AssessmentResponse, AssessmentResult, ScoreBreakdown, CareerMatch } from "@/types/assessment";
import { assessmentSections } from "@/data/assessmentData";

export const calculateAssessmentResults = (responses: AssessmentResponse[]): AssessmentResult => {
  const scoreBreakdown = calculateWISCARScores(responses);
  const overallScore = calculateOverallScore(scoreBreakdown);
  const recommendation = determineRecommendation(overallScore, scoreBreakdown);
  
  return {
    overallScore,
    breakdown: scoreBreakdown,
    recommendation,
    insights: generateInsights(scoreBreakdown, responses),
    nextSteps: generateNextSteps(recommendation, scoreBreakdown),
    alternatives: generateAlternatives(scoreBreakdown),
    careerMatches: generateCareerMatches(scoreBreakdown)
  };
};

const calculateWISCARScores = (responses: AssessmentResponse[]): ScoreBreakdown => {
  // Find relevant questions for each WISCAR dimension
  const responseMap = new Map(responses.map(r => [r.questionId, r.value]));
  
  // Will (Motivation & Grit) - questions about persistence, targets, resilience
  const willQuestions = ['p2', 'p6', 'l4', 's2']; // Energy from targets, bounce back, seek learning, handle pressure
  const willScore = calculateDimensionScore(willQuestions, responseMap);
  
  // Interest (Passion for domain) - questions about enjoying sales activities
  const interestQuestions = ['p1', 'p7', 'l3']; // Persuading, analyzing needs, facing challenges
  const interestScore = calculateDimensionScore(interestQuestions, responseMap);
  
  // Skill (Current abilities) - scenario-based and knowledge questions
  const skillQuestions = ['s1', 's3', 's4', 's5', 'a2', 'a3', 'a6']; // Objection handling, follow-up, competition, honesty, CRM, funnel, qualification
  const skillScore = calculateDimensionScore(skillQuestions, responseMap, true);
  
  // Cognitive (Reasoning ability) - logical and numerical questions
  const cognitiveQuestions = ['a1', 'a4', 'a5']; // Math, percentages, patterns
  const cognitiveScore = calculateDimensionScore(cognitiveQuestions, responseMap, true);
  
  // Ability to Learn (Growth mindset) - learning and feedback questions
  const abilityQuestions = ['l1', 'l2', 'l5']; // Feedback response, belief in development, challenge preference
  const abilityScore = calculateDimensionScore(abilityQuestions, responseMap);
  
  // Real-World Alignment (Practical fit) - scenario handling and adaptability
  const realWorldQuestions = ['p3', 'p4', 'p8', 's1', 's2']; // Approaching strangers, teamwork, uncertainty, scenarios
  const realWorldScore = calculateDimensionScore(realWorldQuestions, responseMap);
  
  return {
    will: Math.round(willScore),
    interest: Math.round(interestScore),
    skill: Math.round(skillScore),
    cognitive: Math.round(cognitiveScore),
    ability: Math.round(abilityScore),
    realWorld: Math.round(realWorldScore)
  };
};

const calculateDimensionScore = (
  questionIds: string[], 
  responseMap: Map<string, string | number>, 
  isCorrectAnswer: boolean = false
): number => {
  let totalScore = 0;
  let validResponses = 0;
  
  questionIds.forEach(questionId => {
    const response = responseMap.get(questionId);
    if (response !== undefined) {
      validResponses++;
      
      if (isCorrectAnswer) {
        // For multiple choice questions, award points for correct answers
        const score = getCorrectAnswerScore(questionId, response);
        totalScore += score;
      } else {
        // For Likert scale questions (1-5), convert to 0-100 scale
        let score = typeof response === 'number' ? response : parseInt(response as string);
        
        // Reverse scoring for negative items (like p4 - preferring to work alone)
        if (['p4', 'l5'].includes(questionId)) {
          score = 6 - score; // Reverse 1->5, 2->4, etc.
        }
        
        totalScore += (score - 1) * 25; // Convert 1-5 to 0-100 scale
      }
    }
  });
  
  return validResponses > 0 ? totalScore / validResponses : 0;
};

const getCorrectAnswerScore = (questionId: string, response: string | number): number => {
  const correctAnswers: Record<string, string> = {
    'a1': '$85',
    'a2': 'Customer Relationship Management',
    'a3': 'Awareness → Interest → Decision → Action',
    'a4': '70%',
    'a5': '162',
    'a6': 'Determining if a prospect has budget, authority, need, and timeline',
    's1': 'Ask what they\'re comparing it to and understand their budget constraints',
    's2': 'Analyze your pipeline, accelerate warm leads, and increase activity levels',
    's3': 'Send a thoughtful follow-up with additional value and set a timeline for next steps',
    's4': 'Focus on understanding unique value you provide and differentiating your solution',
    's5': 'Be honest about limitations while highlighting strengths and exploring workarounds',
    'l1': 'Listen carefully and look for ways to improve',
    'l2': 'A skill that can be developed through practice and learning'
  };
  
  return response === correctAnswers[questionId] ? 100 : 0;
};

const calculateOverallScore = (breakdown: ScoreBreakdown): number => {
  // Weighted average with emphasis on Will, Skill, and Real-World fit
  const weights = {
    will: 0.25,
    interest: 0.15,
    skill: 0.25,
    cognitive: 0.15,
    ability: 0.1,
    realWorld: 0.1
  };
  
  return Math.round(
    breakdown.will * weights.will +
    breakdown.interest * weights.interest +
    breakdown.skill * weights.skill +
    breakdown.cognitive * weights.cognitive +
    breakdown.ability * weights.ability +
    breakdown.realWorld * weights.realWorld
  );
};

const determineRecommendation = (overallScore: number, breakdown: ScoreBreakdown): 'Yes' | 'Maybe' | 'No' => {
  if (overallScore >= 70 && breakdown.will >= 60 && breakdown.skill >= 60 && breakdown.realWorld >= 60) {
    return 'Yes';
  } else if (overallScore >= 50 && (breakdown.will >= 70 || breakdown.interest >= 70)) {
    return 'Maybe';
  } else {
    return 'No';
  }
};

const generateInsights = (breakdown: ScoreBreakdown, responses: AssessmentResponse[]): string[] => {
  const insights: string[] = [];
  
  // Analyze strengths
  const strengths = Object.entries(breakdown)
    .filter(([_, score]) => score >= 70)
    .sort(([,a], [,b]) => b - a);
    
  if (strengths.length > 0) {
    const topStrength = strengths[0][0];
    const strengthLabels: Record<string, string> = {
      will: "high motivation and persistence",
      interest: "genuine passion for sales activities", 
      skill: "strong existing sales competencies",
      cognitive: "excellent analytical and reasoning abilities",
      ability: "outstanding growth mindset and learning drive",
      realWorld: "excellent practical alignment with sales roles"
    };
    insights.push(`Your strongest area is ${strengthLabels[topStrength]} with a score of ${strengths[0][1]}%.`);
  }
  
  // Analyze areas for development
  const weakAreas = Object.entries(breakdown)
    .filter(([_, score]) => score < 60)
    .sort(([,a], [,b]) => a - b);
    
  if (weakAreas.length > 0) {
    const weakestArea = weakAreas[0][0];
    const weaknessLabels: Record<string, string> = {
      will: "motivation and persistence",
      interest: "interest in sales activities",
      skill: "sales-specific skills and knowledge", 
      cognitive: "analytical and reasoning abilities",
      ability: "growth mindset and learning approach",
      realWorld: "practical readiness for sales environments"
    };
    insights.push(`Consider developing your ${weaknessLabels[weakestArea]} (current score: ${weakAreas[0][1]}%).`);
  }
  
  // Communication and interpersonal insights
  if (breakdown.interest >= 70 && breakdown.realWorld >= 60) {
    insights.push("You show strong interpersonal alignment and customer-focused thinking.");
  }
  
  // Learning and development insights
  if (breakdown.ability >= 70) {
    insights.push("Your growth mindset indicates strong potential for rapid skill development.");
  }
  
  return insights;
};

const generateNextSteps = (recommendation: 'Yes' | 'Maybe' | 'No', breakdown: ScoreBreakdown): string[] => {
  const steps: string[] = [];
  
  if (recommendation === 'Yes') {
    steps.push("Start applying for entry-level sales roles or sales development positions.");
    steps.push("Consider sales certification programs (e.g., HubSpot Sales, Salesforce Trailhead).");
    if (breakdown.skill < 80) {
      steps.push("Practice sales scenarios and role-playing to strengthen your skills.");
    }
  } else if (recommendation === 'Maybe') {
    steps.push("Develop foundational sales skills through online courses or workshops.");
    steps.push("Shadow experienced sales professionals or seek mentorship.");
    if (breakdown.will < 70) {
      steps.push("Explore what specifically motivates you and aligns with sales goals.");
    }
    if (breakdown.skill < 60) {
      steps.push("Learn CRM systems, sales processes, and communication techniques.");
    }
  } else {
    steps.push("Consider exploring related fields that match your strengths better.");
    steps.push("Develop core competencies before reconsidering a sales career.");
    if (breakdown.interest < 50) {
      steps.push("Reflect on whether customer-facing roles align with your interests.");
    }
  }
  
  return steps;
};

const generateAlternatives = (breakdown: ScoreBreakdown): string[] => {
  const alternatives: string[] = [];
  
  if (breakdown.cognitive >= 70) {
    alternatives.push("Business Analyst", "Data Analytics");
  }
  
  if (breakdown.interest >= 60 && breakdown.realWorld >= 60) {
    alternatives.push("Customer Success Manager", "Account Coordinator");
  }
  
  if (breakdown.ability >= 70) {
    alternatives.push("Training & Development", "Product Specialist");
  }
  
  if (breakdown.will >= 70) {
    alternatives.push("Project Management", "Operations Management");
  }
  
  return alternatives.length > 0 ? alternatives : ["Marketing", "Customer Support", "Business Development"];
};

const generateCareerMatches = (breakdown: ScoreBreakdown): CareerMatch[] => {
  const careers: CareerMatch[] = [
    {
      title: "Sales Development Representative",
      fitScore: Math.round((breakdown.will * 0.3 + breakdown.interest * 0.3 + breakdown.realWorld * 0.4)),
      description: "Entry-level role focused on prospecting and qualifying leads",
      requirements: ["Strong communication", "Persistence", "Phone/email outreach", "CRM proficiency"]
    },
    {
      title: "Account Executive", 
      fitScore: Math.round((breakdown.skill * 0.4 + breakdown.cognitive * 0.3 + breakdown.will * 0.3)),
      description: "Mid-level role managing full sales cycle from lead to close",
      requirements: ["Sales experience", "Negotiation skills", "Pipeline management", "Presentation abilities"]
    },
    {
      title: "Customer Success Manager",
      fitScore: Math.round((breakdown.interest * 0.4 + breakdown.ability * 0.3 + breakdown.realWorld * 0.3)),
      description: "Focus on customer retention, expansion, and satisfaction",
      requirements: ["Relationship building", "Problem solving", "Customer advocacy", "Product knowledge"]
    },
    {
      title: "Inside Sales Specialist",
      fitScore: Math.round((breakdown.skill * 0.3 + breakdown.will * 0.3 + breakdown.cognitive * 0.4)),
      description: "Remote/office-based sales role with structured processes",
      requirements: ["Phone sales skills", "Data analysis", "Process adherence", "Technology proficiency"]
    }
  ];
  
  return careers
    .filter(career => career.fitScore >= 40)
    .sort((a, b) => b.fitScore - a.fitScore)
    .slice(0, 4);
};