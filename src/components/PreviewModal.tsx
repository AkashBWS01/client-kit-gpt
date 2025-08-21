import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, ExternalLink } from 'lucide-react';

interface PrototypeData {
  businessName: string;
  goal: string;
  natureOfWork: string;
  targetAudience: string;
  sections: string[];
  insights: string[];
  techStack: string[];
}

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PrototypeData;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, data }) => {
  const generatePreviewHTML = () => {
    const componentName = data.businessName.replace(/\s+/g, '');
    
    return `
      <div class="min-h-screen bg-white">
        <section class="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
          <div class="container mx-auto px-4 text-center">
            <h1 class="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
              ${data.businessName}
            </h1>
            <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Professional ${data.natureOfWork} services tailored for ${data.targetAudience}
            </p>
            <button class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Get Started
            </button>
          </div>
        </section>
        
        ${data.sections.map(section => `
        <section class="py-16">
          <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-12 text-gray-900">${section}</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="p-6 border border-gray-200 rounded-lg">
                <h3 class="text-xl font-semibold mb-4 text-gray-900">${section} Feature 1</h3>
                <p class="text-gray-600">Professional ${section.toLowerCase()} services designed for ${data.targetAudience}.</p>
              </div>
              <div class="p-6 border border-gray-200 rounded-lg">
                <h3 class="text-xl font-semibold mb-4 text-gray-900">${section} Feature 2</h3>
                <p class="text-gray-600">Expert ${section.toLowerCase()} solutions that deliver results.</p>
              </div>
              <div class="p-6 border border-gray-200 rounded-lg">
                <h3 class="text-xl font-semibold mb-4 text-gray-900">${section} Feature 3</h3>
                <p class="text-gray-600">Customized ${section.toLowerCase()} approach for your business needs.</p>
              </div>
            </div>
          </div>
        </section>`).join('')}
        
        <footer class="bg-gray-50 py-12">
          <div class="container mx-auto px-4 text-center">
            <p class="text-gray-600">© 2024 ${data.businessName}. All rights reserved.</p>
          </div>
        </footer>
      </div>
    `;
  };

  const handleOpenInNewTab = () => {
    const previewHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${data.businessName} - Live Preview</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        ${generatePreviewHTML()}
      </body>
      </html>
    `;
    
    const blob = new Blob([previewHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">
              {data.businessName} - Live Preview
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleOpenInNewTab}
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Open in New Tab
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="px-6 pb-6">
          <div className="border rounded-lg overflow-hidden bg-white">
            <div 
              className="h-[70vh] overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: generatePreviewHTML() }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewModal;
