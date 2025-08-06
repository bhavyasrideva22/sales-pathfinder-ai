import { useState } from "react";
import Header from "@/components/Header";
import AssessmentIntro from "@/components/AssessmentIntro";
import AssessmentProgress from "@/components/AssessmentProgress";
import AssessmentQuestion from "@/components/AssessmentQuestion";
import AssessmentResults from "@/components/AssessmentResults";
import { assessmentSections } from "@/data/assessmentData";
import { AssessmentResponse, AssessmentResult } from "@/types/assessment";
import { calculateAssessmentResults } from "@/utils/assessmentScoring";

type AssessmentState = 'intro' | 'assessment' | 'results';

const Index = () => {
  const [currentState, setCurrentState] = useState<AssessmentState>('intro');
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [results, setResults] = useState<AssessmentResult | null>(null);

  const currentSection = assessmentSections[currentSectionIndex];
  const currentQuestion = currentSection?.questions[currentQuestionIndex];
  const totalQuestions = currentSection?.questions.length || 0;

  const handleStartAssessment = () => {
    setCurrentState('assessment');
    setCurrentSectionIndex(0);
    setCurrentQuestionIndex(0);
    setResponses([]);
  };

  const handleAnswer = (questionId: string, value: string | number) => {
    const newResponse: AssessmentResponse = {
      questionId,
      value,
      timestamp: Date.now()
    };

    setResponses(prev => {
      const filtered = prev.filter(r => r.questionId !== questionId);
      return [...filtered, newResponse];
    });
  };

  const getCurrentResponseValue = () => {
    const response = responses.find(r => r.questionId === currentQuestion?.id);
    return response?.value;
  };

  const isCurrentQuestionAnswered = () => {
    return getCurrentResponseValue() !== undefined;
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else if (currentSectionIndex < assessmentSections.length - 1) {
      setCurrentSectionIndex(prev => prev + 1);
      setCurrentQuestionIndex(0);
    } else {
      // Assessment complete
      const calculatedResults = calculateAssessmentResults(responses);
      setResults(calculatedResults);
      setCurrentState('results');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
      setCurrentQuestionIndex(assessmentSections[currentSectionIndex - 1].questions.length - 1);
    }
  };

  const canGoBack = currentSectionIndex > 0 || currentQuestionIndex > 0;

  const handleRestart = () => {
    setCurrentState('intro');
    setCurrentSectionIndex(0);
    setCurrentQuestionIndex(0);
    setResponses([]);
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {currentState === 'intro' && (
        <AssessmentIntro onStartAssessment={handleStartAssessment} />
      )}

      {currentState === 'assessment' && currentQuestion && (
        <>
          <AssessmentProgress
            currentSection={currentSectionIndex + 1}
            totalSections={assessmentSections.length}
            sectionTitle={currentSection.title}
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
          />
          <AssessmentQuestion
            question={currentQuestion}
            value={getCurrentResponseValue()}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onPrevious={handlePrevious}
            showPrevious={canGoBack}
            isAnswered={isCurrentQuestionAnswered()}
          />
        </>
      )}

      {currentState === 'results' && results && (
        <AssessmentResults
          result={results}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default Index;