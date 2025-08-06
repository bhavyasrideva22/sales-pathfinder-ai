import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AssessmentResult } from "@/types/assessment";
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  TrendingUp, 
  Brain, 
  Target, 
  Users, 
  BookOpen,
  Lightbulb,
  ArrowRight
} from "lucide-react";

interface AssessmentResultsProps {
  result: AssessmentResult;
  onRestart: () => void;
}

const AssessmentResults = ({ result, onRestart }: AssessmentResultsProps) => {
  const getRecommendationIcon = () => {
    switch (result.recommendation) {
      case 'Yes': return <CheckCircle className="h-8 w-8 text-success" />;
      case 'Maybe': return <AlertCircle className="h-8 w-8 text-warning" />;
      case 'No': return <XCircle className="h-8 w-8 text-destructive" />;
    }
  };

  const getRecommendationColor = () => {
    switch (result.recommendation) {
      case 'Yes': return 'success';
      case 'Maybe': return 'warning';
      case 'No': return 'destructive';
    }
  };

  const wiscarLabels = {
    will: { label: "Will", icon: Target, description: "Motivation & Grit" },
    interest: { label: "Interest", icon: TrendingUp, description: "Passion for Sales" },
    skill: { label: "Skill", icon: Users, description: "Current Abilities" },
    cognitive: { label: "Cognitive", icon: Brain, description: "Reasoning & Logic" },
    ability: { label: "Ability to Learn", icon: BookOpen, description: "Growth Potential" },
    realWorld: { label: "Real-World Fit", icon: Lightbulb, description: "Practical Alignment" }
  };

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      {/* Overall Result */}
      <Card className="bg-gradient-card shadow-elevated border-2 border-primary/20">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            {getRecommendationIcon()}
          </div>
          <CardTitle className="text-3xl mb-2">
            Assessment Complete!
          </CardTitle>
          <div className="space-y-2">
            <Badge 
              variant={getRecommendationColor() as any}
              className="text-lg px-4 py-2"
            >
              Recommendation: {result.recommendation}
            </Badge>
            <p className="text-xl font-semibold text-foreground">
              Overall Readiness Score: {result.overallScore}%
            </p>
          </div>
        </CardHeader>
      </Card>

      {/* WISCAR Breakdown */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl">WISCAR Framework Analysis</CardTitle>
          <p className="text-muted-foreground">
            Detailed breakdown of your strengths across key dimensions
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(result.breakdown).map(([key, score]) => {
              const config = wiscarLabels[key as keyof typeof wiscarLabels];
              const Icon = config.icon;
              
              return (
                <div key={key} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{config.label}</h4>
                      <p className="text-sm text-muted-foreground">{config.description}</p>
                    </div>
                    <div className="ml-auto">
                      <Badge variant="outline" className="font-semibold">
                        {score}%
                      </Badge>
                    </div>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl">Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {result.insights.map((insight, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-accent/30 rounded-lg">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <p className="text-foreground leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <ArrowRight className="h-6 w-6 text-primary" />
            Recommended Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {result.nextSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-3 p-4 border border-border rounded-lg bg-background">
                <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>
                <p className="text-foreground leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Career Matches */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl">Best Career Matches</CardTitle>
          <p className="text-muted-foreground">
            Based on your assessment results
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {result.careerMatches.map((career, index) => (
              <div key={index} className="p-4 border border-border rounded-lg bg-background">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold">{career.title}</h4>
                  <Badge variant="secondary" className="font-semibold">
                    {career.fitScore}% match
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{career.description}</p>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-foreground">Key Requirements:</p>
                  {career.requirements.slice(0, 3).map((req, idx) => (
                    <p key={idx} className="text-xs text-muted-foreground">• {req}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alternative Paths */}
      {result.alternatives.length > 0 && (
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="text-2xl">Alternative Career Paths</CardTitle>
            <p className="text-muted-foreground">
              Other careers that might be a good fit
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {result.alternatives.map((alt, index) => (
                <Badge key={index} variant="outline" className="px-3 py-1">
                  {alt}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="text-center space-y-4">
        <Button 
          onClick={onRestart}
          variant="hero"
          size="lg"
          className="px-8"
        >
          Take Assessment Again
        </Button>
        <p className="text-sm text-muted-foreground">
          Share these results with a career counselor or mentor for additional guidance
        </p>
      </div>
    </div>
  );
};

export default AssessmentResults;