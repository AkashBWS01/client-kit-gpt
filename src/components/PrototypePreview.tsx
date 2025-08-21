
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Code, Download, Globe, Users, Lightbulb, CheckCircle } from 'lucide-react';

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
            <Button className="gradient-accent text-white font-semibold">
              <Eye className="w-4 h-4 mr-2" />
              Preview Live Site
            </Button>
            <Button variant="outline" className="border-ai-primary text-ai-primary hover:bg-ai-primary/10">
              <Code className="w-4 h-4 mr-2" />
              View Source Code
            </Button>
            <Button variant="outline" className="border-ai-secondary text-ai-secondary hover:bg-ai-secondary/10">
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
