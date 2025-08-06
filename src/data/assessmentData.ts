import { AssessmentSection } from "@/types/assessment";

export const assessmentSections: AssessmentSection[] = [
  {
    id: "personality",
    title: "Personality & Motivation",
    description: "Understanding your personality traits and what drives you",
    questions: [
      {
        id: "p1",
        text: "I enjoy persuading people to see things from my perspective",
        type: "likert",
        category: "personality",
        construct: "extraversion"
      },
      {
        id: "p2", 
        text: "I get energized by achieving challenging targets",
        type: "likert",
        category: "motivation",
        construct: "achievement"
      },
      {
        id: "p3",
        text: "I feel comfortable approaching strangers to start conversations",
        type: "likert",
        category: "personality",
        construct: "extraversion"
      },
      {
        id: "p4",
        text: "I prefer working independently rather than in teams",
        type: "likert",
        category: "personality", 
        construct: "collaboration"
      },
      {
        id: "p5",
        text: "I'm motivated more by personal achievement than external rewards",
        type: "likert",
        category: "motivation",
        construct: "intrinsic"
      },
      {
        id: "p6",
        text: "I bounce back quickly from rejection or failure",
        type: "likert",
        category: "resilience",
        construct: "grit"
      },
      {
        id: "p7",
        text: "I enjoy analyzing customer needs and finding solutions",
        type: "likert",
        category: "interest",
        construct: "problem-solving"
      },
      {
        id: "p8",
        text: "I'm comfortable with uncertainty and changing priorities",
        type: "likert",
        category: "personality",
        construct: "adaptability"
      }
    ]
  },
  {
    id: "aptitude",
    title: "Cognitive & Technical Readiness",
    description: "Evaluating your logical reasoning and technical foundations",
    questions: [
      {
        id: "a1",
        text: "If a product costs $100 and you offer a 15% discount, what's the final price?",
        type: "multiple-choice",
        options: ["$85", "$90", "$95", "$115"],
        category: "numerical",
        construct: "arithmetic"
      },
      {
        id: "a2",
        text: "What does CRM stand for in business?",
        type: "multiple-choice", 
        options: ["Customer Relationship Management", "Customer Resource Manager", "Client Retention Method", "Corporate Revenue Model"],
        category: "domain-knowledge",
        construct: "sales-basics"
      },
      {
        id: "a3",
        text: "A sales funnel typically moves prospects through which sequence?",
        type: "multiple-choice",
        options: ["Awareness → Interest → Decision → Action", "Action → Decision → Interest → Awareness", "Interest → Awareness → Action → Decision", "Decision → Awareness → Interest → Action"],
        category: "domain-knowledge", 
        construct: "sales-process"
      },
      {
        id: "a4",
        text: "If your monthly target is $50,000 and you've achieved $35,000, what percentage of your target have you reached?",
        type: "multiple-choice",
        options: ["60%", "65%", "70%", "75%"],
        category: "numerical",
        construct: "percentages"
      },
      {
        id: "a5",
        text: "Which pattern comes next in this sequence: 2, 6, 18, 54, ?",
        type: "multiple-choice",
        options: ["108", "162", "216", "324"],
        category: "logical",
        construct: "pattern-recognition"
      },
      {
        id: "a6",
        text: "In B2B sales, what does 'lead qualification' primarily involve?",
        type: "multiple-choice",
        options: ["Determining if a prospect has budget, authority, need, and timeline", "Getting contact information", "Setting up meetings", "Closing deals quickly"],
        category: "domain-knowledge",
        construct: "sales-process"
      }
    ]
  },
  {
    id: "scenarios",
    title: "Real-World Scenarios",
    description: "How you handle typical sales situations and challenges",
    questions: [
      {
        id: "s1",
        text: "A potential customer says 'Your price is too high.' What's your best response?",
        type: "multiple-choice",
        options: [
          "Immediately offer a discount to close the deal",
          "Ask what they're comparing it to and understand their budget constraints", 
          "Explain that quality costs more",
          "Walk away from the deal"
        ],
        category: "scenario",
        construct: "objection-handling"
      },
      {
        id: "s2",
        text: "You're 20% behind your quarterly target with one month left. What do you do?",
        type: "multiple-choice",
        options: [
          "Focus only on the biggest potential deals",
          "Analyze your pipeline, accelerate warm leads, and increase activity levels",
          "Ask your manager to lower the target",
          "Start looking for a new job"
        ],
        category: "scenario", 
        construct: "problem-solving"
      },
      {
        id: "s3",
        text: "A prospect has gone silent after showing initial interest. What's your approach?",
        type: "multiple-choice",
        options: [
          "Call them every day until they respond",
          "Send a thoughtful follow-up with additional value and set a timeline for next steps",
          "Assume they're not interested and move on",
          "Contact their manager directly"
        ],
        category: "scenario",
        construct: "persistence"
      },
      {
        id: "s4",
        text: "You discover a competitor is also pitching to your prospect. How do you respond?",
        type: "multiple-choice",
        options: [
          "Immediately cut your price to beat the competition",
          "Focus on understanding unique value you provide and differentiating your solution",
          "Badmouth the competitor",
          "Give up and focus on other prospects"
        ],
        category: "scenario",
        construct: "competitive-strategy"
      },
      {
        id: "s5",
        text: "A customer wants features your product doesn't have. What do you do?",
        type: "multiple-choice",
        options: [
          "Promise the features will be added soon",
          "Be honest about limitations while highlighting strengths and exploring workarounds",
          "Suggest they buy a competitor's product",
          "Ignore the request and focus on other features"
        ],
        category: "scenario",
        construct: "honesty-transparency"
      }
    ]
  },
  {
    id: "learning",
    title: "Growth Mindset & Learning",
    description: "Your approach to learning, feedback, and personal development",
    questions: [
      {
        id: "l1",
        text: "When I receive critical feedback, I typically:",
        type: "multiple-choice",
        options: [
          "Feel defensive and try to justify my actions",
          "Listen carefully and look for ways to improve",
          "Ignore it if I disagree",
          "Get discouraged and doubt my abilities"
        ],
        category: "mindset",
        construct: "growth-mindset"
      },
      {
        id: "l2",
        text: "I believe that sales ability is:",
        type: "multiple-choice",
        options: [
          "A natural talent that you're born with",
          "A skill that can be developed through practice and learning", 
          "Mostly about being lucky",
          "Something that doesn't really matter"
        ],
        category: "mindset",
        construct: "growth-mindset"
      },
      {
        id: "l3",
        text: "When facing a new challenge, I:",
        type: "likert",
        category: "mindset",
        construct: "challenge-approach"
      },
      {
        id: "l4", 
        text: "I actively seek out learning opportunities to improve my skills",
        type: "likert",
        category: "learning",
        construct: "continuous-improvement"
      },
      {
        id: "l5",
        text: "I prefer tasks that I can already do well over tasks that challenge me",
        type: "likert",
        category: "mindset",
        construct: "challenge-preference"
      }
    ]
  }
];

export const likertOptions = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" }, 
  { value: 5, label: "Strongly Agree" }
];