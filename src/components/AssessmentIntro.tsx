import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Phone, MessageCircle, Target, Award } from "lucide-react";

interface AssessmentIntroProps {
  onStartAssessment: () => void;
}

const AssessmentIntro = ({ onStartAssessment }: AssessmentIntroProps) => {
  const careerPaths = [
    { title: "Business Development Executive", icon: TrendingUp, level: "Entry-Mid Level" },
    { title: "Account Manager", icon: Users, level: "Mid Level" },
    { title: "Enterprise Sales Representative", icon: Phone, level: "Senior Level" },
    { title: "SaaS Sales Specialist", icon: Target, level: "Specialized" },
    { title: "Inside Sales Executive", icon: MessageCircle, level: "Entry Level" },
    { title: "Solutions Consultant", icon: Award, level: "Expert Level" }
  ];

  const successTraits = [
    "Strong Communication Skills",
    "Emotional Intelligence",
    "High Motivation & Resilience", 
    "Persuasion & Negotiation",
    "Customer-Centric Thinking",
    "Goal-Oriented Mindset"
  ];

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      {/* What is a Sales Specialist */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Target className="h-6 w-6 text-primary" />
            What is a Sales Specialist?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A Sales Specialist is a professional who understands products and services deeply, 
            driving business growth by generating leads, closing sales, and nurturing customer relationships. 
            They combine technical product knowledge with interpersonal skills to match customer needs 
            with the right solutions.
          </p>
        </CardContent>
      </Card>

      {/* Career Paths */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl">Career Opportunities</CardTitle>
          <p className="text-muted-foreground">Explore the diverse paths available to Sales Specialists</p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {careerPaths.map((career, index) => (
              <div key={index} className="p-4 border border-border rounded-lg bg-background hover:shadow-card transition-smooth">
                <div className="flex items-start gap-3">
                  <career.icon className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-sm">{career.title}</h4>
                    <Badge variant="secondary" className="mt-1 text-xs">{career.level}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Success Traits */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl">Who Succeeds in Sales?</CardTitle>
          <p className="text-muted-foreground">Key traits that predict success in sales roles</p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {successTraits.map((trait, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-accent/50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm font-medium">{trait}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Assessment Overview */}
      <Card className="bg-gradient-card shadow-card border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl">Assessment Overview</CardTitle>
          <p className="text-muted-foreground">Comprehensive evaluation using proven psychometric methods</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">What We'll Evaluate:</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Psychological & cognitive fit
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Technical & professional readiness
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Personality alignment with sales roles
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Learning readiness & growth potential
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Assessment Framework:</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                  Big 5 Personality Traits
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                  Holland Codes (RIASEC)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                  Growth Mindset & Grit Scales
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                  WISCAR Framework Analysis
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-accent/30 rounded-lg p-4">
            <p className="text-center font-medium text-foreground">
              ⏱️ Estimated time: 15-20 minutes | 📊 Instant results with personalized recommendations
            </p>
          </div>

          <div className="text-center">
            <Button 
              onClick={onStartAssessment}
              variant="hero"
              size="lg"
              className="text-lg px-8 py-3"
            >
              Start Your Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentIntro;