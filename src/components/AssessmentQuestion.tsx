import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Question } from "@/types/assessment";
import { likertOptions } from "@/data/assessmentData";

interface AssessmentQuestionProps {
  question: Question;
  value: string | number | undefined;
  onAnswer: (questionId: string, value: string | number) => void;
  onNext: () => void;
  onPrevious: () => void;
  showPrevious: boolean;
  isAnswered: boolean;
}

const AssessmentQuestion = ({
  question,
  value,
  onAnswer,
  onNext,
  onPrevious,
  showPrevious,
  isAnswered
}: AssessmentQuestionProps) => {
  const handleAnswerChange = (selectedValue: string) => {
    const numericValue = question.type === 'likert' ? parseInt(selectedValue) : selectedValue;
    onAnswer(question.id, numericValue);
  };

  const renderQuestionContent = () => {
    if (question.type === 'likert') {
      return (
        <RadioGroup
          value={value?.toString()}
          onValueChange={handleAnswerChange}
          className="space-y-3"
        >
          {likertOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-smooth">
              <RadioGroupItem value={option.value.toString()} id={`${question.id}-${option.value}`} />
              <Label 
                htmlFor={`${question.id}-${option.value}`}
                className="flex-1 cursor-pointer text-sm font-medium"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      );
    }

    if (question.type === 'multiple-choice' && question.options) {
      return (
        <RadioGroup
          value={value?.toString()}
          onValueChange={handleAnswerChange}
          className="space-y-3"
        >
          {question.options.map((option, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 rounded-lg hover:bg-accent/50 transition-smooth border border-border/50">
              <RadioGroupItem value={option} id={`${question.id}-${index}`} className="mt-1" />
              <Label 
                htmlFor={`${question.id}-${index}`}
                className="flex-1 cursor-pointer text-sm leading-relaxed"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      );
    }

    return null;
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <Card className="bg-gradient-card shadow-elevated max-w-4xl mx-auto">
        <CardContent className="p-8">
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold leading-relaxed text-foreground">
                {question.text}
              </h3>
              {question.type === 'likert' && (
                <p className="text-muted-foreground">
                  Rate how much you agree with this statement:
                </p>
              )}
            </div>

            <div className="space-y-4">
              {renderQuestionContent()}
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-border">
              <div>
                {showPrevious && (
                  <Button 
                    onClick={onPrevious}
                    variant="outline"
                    className="px-6"
                  >
                    Previous
                  </Button>
                )}
              </div>
              
              <Button 
                onClick={onNext}
                disabled={!isAnswered}
                variant={isAnswered ? "default" : "outline"}
                className="px-8"
              >
                {isAnswered ? "Next Question" : "Please select an answer"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentQuestion;