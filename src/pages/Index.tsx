
import React, { useState } from 'react';
import PrototypeForm from '@/components/PrototypeForm';
import PrototypePreview from '@/components/PrototypePreview';
import { Sparkles, Zap, Globe, Target } from 'lucide-react';

interface FormData {
  goal: string;
  businessName: string;
  natureOfWork: string;
  geographicRelevance: string;
  productsServices: string;
  targetAudience: string;
  brandColorsStyle: string;
  specialNotes: string;
}

interface PrototypeData {
  businessName: string;
  goal: string;
  natureOfWork: string;
  targetAudience: string;
  sections: string[];
  insights: string[];
  techStack: string[];
}

const Index = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPrototype, setGeneratedPrototype] = useState<PrototypeData | null>(null);

  const generatePrototype = async (formData: FormData) => {
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate realistic prototype data based on input
    const mockPrototype: PrototypeData = {
      businessName: formData.businessName,
      goal: formData.goal,
      natureOfWork: formData.natureOfWork,
      targetAudience: formData.targetAudience,
      sections: generateSections(formData.goal),
      insights: generateInsights(formData.natureOfWork),
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite']
    };
    
    setGeneratedPrototype(mockPrototype);
    setIsGenerating(false);
  };

  const generateSections = (goal: string): string[] => {
    const baseSections = ['Hero Section', 'About', 'Contact'];
    
    if (goal === 'landing-page') {
      return [...baseSections, 'Features', 'Testimonials', 'CTA'];
    } else if (goal === 'full-website') {
      return [...baseSections, 'Services', 'Portfolio', 'Team', 'Blog', 'FAQ'];
    } else if (goal === 'e-commerce') {
      return [...baseSections, 'Products', 'Categories', 'Cart', 'Checkout', 'Reviews'];
    } else {
      return [...baseSections, 'Portfolio', 'Skills', 'Experience'];
    }
  };

  const generateInsights = (natureOfWork: string): string[] => {
    return [
      `${natureOfWork} businesses benefit from clear value propositions`,
      'Mobile-first design is crucial for your target audience',
      'Trust signals and testimonials increase conversion rates',
      'Fast loading times improve user experience significantly'
    ];
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10"></div>
        <div className="section-container relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ai-primary/10 border border-ai-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-ai-primary" />
              <span className="text-sm font-medium text-ai-primary">AI-Powered Website Generation</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Build Professional 
              <span className="gradient-hero bg-clip-text text-transparent"> Website Prototypes</span> in Minutes
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
              Transform minimal business input into complete website prototypes with AI-powered industry research, 
              content generation, and React/TypeScript code.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-16">
              <div className="text-center p-6">
                <div className="w-12 h-12 rounded-full gradient-hero flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">Generate complete prototypes in under 5 minutes</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-12 h-12 rounded-full bg-ai-secondary flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Industry Smart</h3>
                <p className="text-sm text-muted-foreground">AI researches your industry for relevant insights</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-12 h-12 rounded-full bg-ai-accent flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Audience Focused</h3>
                <p className="text-sm text-muted-foreground">Tailored content for your specific target market</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="section-container">
          {!generatedPrototype ? (
            <div className="animate-fade-in">
              <PrototypeForm onGenerate={generatePrototype} isGenerating={isGenerating} />
            </div>
          ) : (
            <div className="animate-fade-in">
              <PrototypePreview data={generatedPrototype} />
              <div className="text-center mt-8">
                <button 
                  onClick={() => setGeneratedPrototype(null)}
                  className="text-ai-primary hover:text-ai-primary/80 font-medium"
                >
                  ← Generate Another Prototype
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
