import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface AssessmentProgressProps {
  currentSection: number;
  totalSections: number;
  sectionTitle: string;
  currentQuestion: number;
  totalQuestions: number;
}

const AssessmentProgress = ({ 
  currentSection, 
  totalSections, 
  sectionTitle,
  currentQuestion,
  totalQuestions 
}: AssessmentProgressProps) => {
  const overallProgress = ((currentSection - 1) / totalSections + (currentQuestion / totalQuestions) / totalSections) * 100;
  const sectionProgress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="bg-background border-b border-border py-4">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-xs">
              Section {currentSection} of {totalSections}
            </Badge>
            <h2 className="text-lg font-semibold">{sectionTitle}</h2>
          </div>
          <div className="text-sm text-muted-foreground">
            Question {currentQuestion} of {totalQuestions}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Overall Progress</span>
            <span>{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Section Progress</span>
            <span>{Math.round(sectionProgress)}%</span>
          </div>
          <Progress value={sectionProgress} className="h-1" />
        </div>
      </div>
    </div>
  );
};

export default AssessmentProgress;