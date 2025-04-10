
import React, { useState } from "react";
import { Image, Loader, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ImageGenerator() {
  const { t } = useLanguage();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState(512);
  
  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast.error(t("Please enter a description"));
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      // Using a placeholder image
      setGeneratedImage(`https://placehold.co/${imageSize}x${imageSize}/16213E/E94560?text=AI+Generated`);
      setIsGenerating(false);
      toast.success(t("Image generated successfully"));
    }, 3000);
  };
  
  const handleDownload = () => {
    if (generatedImage) {
      // Simulate download
      toast.success(t("Image downloaded"));
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">{t("tool.image-generator")}</h2>
      
      <Card className="bg-[#16213e] text-white border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">{t("Create Images with AI")}</CardTitle>
          <CardDescription className="text-gray-300">
            {t("Generate unique images from your text descriptions")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="prompt">{t("Image Description")}</Label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={t("Describe the image you want to generate...")}
              className="min-h-[100px] bg-[#0f3460] border-gray-700 text-white mt-2"
            />
          </div>
          
          <div>
            <Label htmlFor="size">{t("Image Size")}: {imageSize}x{imageSize}px</Label>
            <Slider
              id="size"
              min={256}
              max={1024}
              step={128}
              value={[imageSize]}
              onValueChange={(value) => setImageSize(value[0])}
              className="mt-2"
            />
          </div>
          
          {generatedImage && !isGenerating && (
            <div className="flex justify-center mt-6">
              <div className="border border-gray-700 rounded-lg overflow-hidden">
                <img
                  src={generatedImage}
                  alt={t("Generated image")}
                  className="max-w-full h-auto"
                />
              </div>
            </div>
          )}
          
          {isGenerating && (
            <div className="flex flex-col items-center justify-center py-10">
              <Loader className="h-12 w-12 animate-spin text-[#e94560] mb-4" />
              <p className="text-gray-300">{t("Generating your image...")}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t border-gray-800 pt-4">
          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating || !prompt.trim()}
            className="bg-[#e94560] hover:bg-[#e94560]/90 flex-1 mr-2"
          >
            {isGenerating ? t("Generating...") : t("Generate Image")}
          </Button>
          
          {generatedImage && (
            <Button
              onClick={handleDownload}
              variant="outline"
              className="border-gray-700 flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              {t("Download")}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
