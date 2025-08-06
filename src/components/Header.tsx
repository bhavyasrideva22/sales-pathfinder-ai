import { Brain, Target } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-gradient-hero shadow-elevated">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Sales Specialist Assessment</h1>
            <p className="text-white/90 text-lg">Discover Your Career Readiness & Potential</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 text-white">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <Target className="h-6 w-6 mb-2" />
            <h3 className="font-semibold mb-1">Psychometric Analysis</h3>
            <p className="text-sm text-white/80">Evaluate personality traits, motivation, and cognitive fit</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <Target className="h-6 w-6 mb-2" />
            <h3 className="font-semibold mb-1">Aptitude Assessment</h3>
            <p className="text-sm text-white/80">Test technical readiness and core competencies</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <Target className="h-6 w-6 mb-2" />
            <h3 className="font-semibold mb-1">AI Recommendations</h3>
            <p className="text-sm text-white/80">Get personalized career guidance and next steps</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;