
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Globe, Target, Palette, FileText } from 'lucide-react';

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

interface PrototypeFormProps {
  onGenerate: (data: FormData) => void;
  isGenerating: boolean;
}

const PrototypeForm: React.FC<PrototypeFormProps> = ({ onGenerate, isGenerating }) => {
  const [formData, setFormData] = useState<FormData>({
    goal: '',
    businessName: '',
    natureOfWork: '',
    geographicRelevance: '',
    productsServices: '',
    targetAudience: '',
    brandColorsStyle: '',
    specialNotes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto gradient-card border-border/50">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-ai-primary" />
          AI Website Prototype Builder
        </CardTitle>
        <p className="text-muted-foreground">
          Generate professional website prototypes from minimal input
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="goal" className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-ai-primary" />
                Goal *
              </Label>
              <Select onValueChange={(value) => updateField('goal', value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="landing-page">Landing Page</SelectItem>
                  <SelectItem value="full-website">Full Website</SelectItem>
                  <SelectItem value="portfolio">Portfolio</SelectItem>
                  <SelectItem value="e-commerce">E-commerce</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name *</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => updateField('businessName', e.target.value)}
                placeholder="Enter business name"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="natureOfWork">Nature of Work *</Label>
            <Input
              id="natureOfWork"
              value={formData.natureOfWork}
              onChange={(e) => updateField('natureOfWork', e.target.value)}
              placeholder="e.g., Organic skincare products, Tax consulting, etc."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="geographicRelevance">Geographic Relevance</Label>
              <Input
                id="geographicRelevance"
                value={formData.geographicRelevance}
                onChange={(e) => updateField('geographicRelevance', e.target.value)}
                placeholder="e.g., US-based, Global, NYC area"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetAudience" className="flex items-center gap-2">
                <Target className="w-4 h-4 text-ai-secondary" />
                Target Audience *
              </Label>
              <Input
                id="targetAudience"
                value={formData.targetAudience}
                onChange={(e) => updateField('targetAudience', e.target.value)}
                placeholder="e.g., Small business owners, Women 20-40"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="productsServices" className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-ai-accent" />
              Products/Services *
            </Label>
            <Textarea
              id="productsServices"
              value={formData.productsServices}
              onChange={(e) => updateField('productsServices', e.target.value)}
              placeholder="List your main products or services"
              className="min-h-[80px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="brandColorsStyle" className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-ai-warning" />
              Brand Colors/Style
            </Label>
            <Input
              id="brandColorsStyle"
              value={formData.brandColorsStyle}
              onChange={(e) => updateField('brandColorsStyle', e.target.value)}
              placeholder="e.g., Green + Beige, Modern minimalist, Corporate blue"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialNotes">Special Notes</Label>
            <Textarea
              id="specialNotes"
              value={formData.specialNotes}
              onChange={(e) => updateField('specialNotes', e.target.value)}
              placeholder="Any specific requirements or preferences"
              className="min-h-[60px]"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full gradient-hero text-white font-semibold py-6 text-lg transition-all duration-300 hover:scale-[1.02] ai-glow"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                Generating Prototype...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Website Prototype
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PrototypeForm;
