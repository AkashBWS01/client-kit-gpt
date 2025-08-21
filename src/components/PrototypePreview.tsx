
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Code, Download, Globe, Users, Lightbulb, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PrototypeData {
  businessName: string;
  goal: string;
  natureOfWork: string;
  targetAudience: string;
  sections: string[];
  insights: string[];
  techStack: string[];
}

interface PrototypePreviewProps {
  data: PrototypeData;
}

const PrototypePreview: React.FC<PrototypePreviewProps> = ({ data }) => {
  const { toast } = useToast();

  const handlePreviewLive = () => {
    // Simulate opening a live preview
    toast({
      title: "Live Preview Opening",
      description: "Your prototype is being prepared for live preview...",
    });
    
    // In a real implementation, this would open a new window/tab with the live site
    setTimeout(() => {
      window.open('/', '_blank');
    }, 1000);
  };

  const handleViewSourceCode = () => {
    // Simulate viewing source code
    toast({
      title: "Source Code Ready",
      description: "Opening source code viewer...",
    });
    
    // In a real implementation, this would show a modal or redirect to code view
    setTimeout(() => {
      const codeContent = `// Generated React Component for ${data.businessName}
import React from 'react';

const ${data.businessName.replace(/\s+/g, '')}Page = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">${data.businessName}</h1>
          <p className="text-xl text-muted-foreground">${data.natureOfWork}</p>
        </div>
      </section>
      
      {/* Sections */}
      ${data.sections.map(section => `
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">${section}</h2>
          {/* ${section} content goes here */}
        </div>
      </section>`).join('')}
    </div>
  );
};

export default ${data.businessName.replace(/\s+/g, '')}Page;`;
      
      console.log('Generated Source Code:', codeContent);
      alert('Source code has been logged to console. In a full implementation, this would open in a code editor.');
    }, 1000);
  };

  const handleExportProject = () => {
    // Simulate project export
    toast({
      title: "Exporting Project",
      description: "Preparing your project files for download...",
    });

    setTimeout(() => {
      // Create a simple project structure as JSON
      const projectData = {
        name: data.businessName,
        goal: data.goal,
        structure: {
          sections: data.sections,
          techStack: data.techStack,
          insights: data.insights,
          targetAudience: data.targetAudience
        },
        generated: new Date().toISOString()
      };

      // Create and download a JSON file
      const dataStr = JSON.stringify(projectData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${data.businessName.toLowerCase().replace(/\s+/g, '-')}-prototype.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Project Exported",
        description: "Your prototype data has been downloaded successfully!",
      });
    }, 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="gradient-card border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-foreground">
                {data.businessName} Prototype
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                Generated {data.goal} • {data.natureOfWork}
              </p>
            </div>
            <Badge variant="secondary" className="bg-ai-primary/10 text-ai-primary border-ai-primary/20">
              {data.goal}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Site Structure */}
        <Card className="gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-ai-primary" />
              Site Structure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.sections.map((section, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-2 h-2 rounded-full bg-ai-primary"></div>
                  <span className="font-medium">{section}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Industry Insights */}
        <Card className="gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-ai-secondary" />
              Industry Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.insights.map((insight, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <CheckCircle className="w-4 h-4 text-ai-secondary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{insight}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Target Audience & Tech Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-ai-accent" />
              Target Audience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground font-medium bg-muted/50 p-4 rounded-lg">
              {data.targetAudience}
            </p>
          </CardContent>
        </Card>

        <Card className="gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5 text-ai-warning" />
              Tech Stack
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {data.techStack.map((tech, index) => (
                <Badge key={index} variant="outline" className="border-ai-warning/30 text-ai-warning">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card className="gradient-card border-border/50">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              onClick={handlePreviewLive}
              className="gradient-accent text-white font-semibold"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview Live Site
            </Button>
            <Button 
              onClick={handleViewSourceCode}
              variant="outline" 
              className="border-ai-primary text-ai-primary hover:bg-ai-primary/10"
            >
              <Code className="w-4 h-4 mr-2" />
              View Source Code
            </Button>
            <Button 
              onClick={handleExportProject}
              variant="outline" 
              className="border-ai-secondary text-ai-secondary hover:bg-ai-secondary/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Project
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrototypePreview;
