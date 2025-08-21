
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

  const generatePreviewUrl = (data: PrototypeData) => {
    // Create a preview URL with the prototype data
    const params = new URLSearchParams({
      name: data.businessName,
      type: data.goal,
      work: data.natureOfWork,
      audience: data.targetAudience
    });
    return `/preview?${params.toString()}`;
  };

  const handlePreviewLive = () => {
    toast({
      title: "Live Preview Opening",
      description: "Your prototype is being prepared for live preview...",
    });
    
    // Generate a proper preview URL with the prototype data
    const previewUrl = generatePreviewUrl(data);
    
    setTimeout(() => {
      // Open the preview in a new window
      const previewWindow = window.open(previewUrl, '_blank', 'width=1200,height=800');
      
      if (!previewWindow) {
        toast({
          title: "Popup Blocked",
          description: "Please allow popups to view the live preview.",
        });
      }
    }, 1000);
  };

  const handleViewSourceCode = () => {
    toast({
      title: "Source Code Ready",
      description: "Opening source code viewer...",
    });
    
    setTimeout(() => {
      const codeContent = generateSourceCode(data);
      
      // Create a blob with the source code
      const blob = new Blob([codeContent], { type: 'text/typescript' });
      const url = URL.createObjectURL(blob);
      
      // Open in new window for viewing
      const codeWindow = window.open('', '_blank');
      if (codeWindow) {
        codeWindow.document.write(`
          <html>
            <head>
              <title>${data.businessName} - Source Code</title>
              <style>
                body { font-family: 'Courier New', monospace; margin: 20px; background: #1e1e1e; color: #d4d4d4; }
                pre { white-space: pre-wrap; word-wrap: break-word; }
                .header { background: #2d2d30; padding: 15px; margin: -20px -20px 20px -20px; }
                .copy-btn { background: #007acc; color: white; border: none; padding: 8px 16px; cursor: pointer; }
              </style>
            </head>
            <body>
              <div class="header">
                <h2>${data.businessName} - Generated React Component</h2>
                <button class="copy-btn" onclick="navigator.clipboard.writeText(document.querySelector('pre').textContent)">Copy Code</button>
              </div>
              <pre>${codeContent}</pre>
            </body>
          </html>
        `);
      }
      
      URL.revokeObjectURL(url);
    }, 1000);
  };

  const generateSourceCode = (data: PrototypeData): string => {
    const componentName = data.businessName.replace(/\s+/g, '');
    
    return `// Generated React Component for ${data.businessName}
import React from 'react';

const ${componentName}Page = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            ${data.businessName}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Professional ${data.natureOfWork} services tailored for ${data.targetAudience}
          </p>
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
            Get Started
          </button>
        </div>
      </section>
      
      ${data.sections.map(section => `
      {/* ${section} Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">${section}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* ${section} content goes here */}
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-4">${section} Feature 1</h3>
              <p className="text-muted-foreground">Description for ${section.toLowerCase()} feature.</p>
            </div>
          </div>
        </div>
      </section>`).join('')}
      
      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">© 2024 ${data.businessName}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ${componentName}Page;`;
  };

  const handleExportProject = () => {
    toast({
      title: "Exporting Project",
      description: "Preparing your project files for download...",
    });

    setTimeout(() => {
      // Create a comprehensive project structure
      const projectData = {
        name: data.businessName,
        goal: data.goal,
        metadata: {
          generatedAt: new Date().toISOString(),
          version: '1.0.0'
        },
        structure: {
          sections: data.sections,
          techStack: data.techStack,
          insights: data.insights,
          targetAudience: data.targetAudience
        },
        sourceCode: generateSourceCode(data),
        styles: generateTailwindConfig(data),
        packageJson: generatePackageJson(data)
      };

      // Create and download a comprehensive JSON file
      const dataStr = JSON.stringify(projectData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${data.businessName.toLowerCase().replace(/\s+/g, '-')}-prototype-complete.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Project Exported",
        description: "Your complete prototype project has been downloaded successfully!",
      });
    }, 2000);
  };

  const generateTailwindConfig = (data: PrototypeData): string => {
    return `// Tailwind config for ${data.businessName}
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
      }
    }
  },
  plugins: []
}`;
  };

  const generatePackageJson = (data: PrototypeData): object => {
    return {
      name: data.businessName.toLowerCase().replace(/\s+/g, '-'),
      version: '0.1.0',
      private: true,
      scripts: {
        dev: 'vite',
        build: 'tsc && vite build',
        preview: 'vite preview'
      },
      dependencies: {
        react: '^18.3.1',
        'react-dom': '^18.3.1',
        'react-router-dom': '^6.30.1'
      },
      devDependencies: {
        '@types/react': '^18.3.1',
        '@types/react-dom': '^18.3.1',
        typescript: '^5.0.0',
        vite: '^5.0.0'
      }
    };
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
