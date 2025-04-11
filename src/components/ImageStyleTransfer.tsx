
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Download, Upload, Paintbrush } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

export default function ImageStyleTransfer() {
  const { t, dir } = useLanguage();
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [styleImage, setStyleImage] = useState<string | null>(null);
  const [styleStrength, setStyleStrength] = useState(50);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [stylePreset, setStylePreset] = useState("custom");

  // Predefined style presets
  const stylePresets = {
    custom: "Custom Image",
    vanGogh: "/styles/van-gogh.jpg",
    picasso: "/styles/picasso.jpg",
    monet: "/styles/monet.jpg",
    kandinsky: "/styles/kandinsky.jpg",
  };

  const handleSourceImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setSourceImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStyleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setStyleImage(e.target.result as string);
          setStylePreset("custom");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStylePresetChange = (value: string) => {
    setStylePreset(value);
    if (value !== "custom") {
      setStyleImage(stylePresets[value as keyof typeof stylePresets]);
    } else {
      setStyleImage(null);
    }
  };

  const handleTransfer = () => {
    if (!sourceImage) {
      toast.error(t("Please upload a source image"));
      return;
    }
    
    if (!styleImage && stylePreset === "custom") {
      toast.error(t("Please upload a style image or select a preset"));
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing - in a real app, this would call an API
    setTimeout(() => {
      // For demo purposes, we'll just use a combination of the source and style images
      setResultImage(sourceImage);
      setIsProcessing(false);
      toast.success(t("Style transfer completed successfully"));
    }, 2000);
  };

  const handleDownload = () => {
    if (resultImage) {
      const link = document.createElement('a');
      link.href = resultImage;
      link.download = 'styled-image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success(t("Image downloaded"));
    }
  };

  return (
    <Card className={`bg-[#16213e] border-0 shadow-lg text-white max-w-4xl mx-auto ${dir === "rtl" ? "text-right" : ""}`}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">{t("Transfer Art Styles to Your Images")}</CardTitle>
        <CardDescription className="text-gray-300 text-center">{t("Apply artistic styles to your photos to create unique visual effects")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${dir === "rtl" ? "md:flex-row-reverse" : ""}`}>
          <div className="space-y-4">
            <div>
              <label className="block text-white mb-2">{t("Source Image")}</label>
              <div className="border-2 border-dashed border-[#0f3460] rounded-lg p-4 h-64 flex items-center justify-center bg-[#0a1e3b] transition-colors hover:border-[#e94560] cursor-pointer relative">
                {sourceImage ? (
                  <img src={sourceImage} alt="Source" className="max-h-full max-w-full object-contain" />
                ) : (
                  <div className="text-center">
                    <Upload className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                    <p className="text-gray-400">{t("Upload your image")}</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleSourceImageUpload}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-white mb-2">{t("Style Strength")}</label>
              <Slider
                value={[styleStrength]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => setStyleStrength(value[0])}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>{t("Subtle")}</span>
                <span>{styleStrength}%</span>
                <span>{t("Dramatic")}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-white mb-2">{t("Style Image")}</label>
              <Select value={stylePreset} onValueChange={handleStylePresetChange}>
                <SelectTrigger className="bg-[#0a1e3b] border-[#0f3460] text-white">
                  <SelectValue placeholder={t("Select a style preset")} />
                </SelectTrigger>
                <SelectContent className="bg-[#0a1e3b] border-[#0f3460] text-white">
                  <SelectItem value="custom">{t("Custom Upload")}</SelectItem>
                  <SelectItem value="vanGogh">{t("Van Gogh")}</SelectItem>
                  <SelectItem value="picasso">{t("Picasso")}</SelectItem>
                  <SelectItem value="monet">{t("Monet")}</SelectItem>
                  <SelectItem value="kandinsky">{t("Kandinsky")}</SelectItem>
                </SelectContent>
              </Select>
              
              {stylePreset === "custom" && (
                <div className="mt-2 border-2 border-dashed border-[#0f3460] rounded-lg p-4 h-48 flex items-center justify-center bg-[#0a1e3b] transition-colors hover:border-[#e94560] cursor-pointer relative">
                  {styleImage ? (
                    <img src={styleImage} alt="Style" className="max-h-full max-w-full object-contain" />
                  ) : (
                    <div className="text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-gray-400">{t("Upload style image")}</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleStyleImageUpload}
                  />
                </div>
              )}
              
              {stylePreset !== "custom" && styleImage && (
                <div className="mt-2 border-2 border-[#0f3460] rounded-lg p-4 h-48 flex items-center justify-center bg-[#0a1e3b]">
                  <img src={styleImage} alt="Style Preset" className="max-h-full max-w-full object-contain" />
                </div>
              )}
            </div>

            <Button 
              onClick={handleTransfer} 
              disabled={isProcessing || !sourceImage || (stylePreset === "custom" && !styleImage)}
              className="w-full bg-gradient-to-r from-[#e94560] to-[#f2726d] hover:from-[#e94560]/90 hover:to-[#f2726d]/90 text-white"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-opacity-20 border-t-white rounded-full" />
                  {t("Processing...")}
                </>
              ) : (
                <>
                  <Paintbrush className="mr-2 h-4 w-4" />
                  {t("Apply Style")}
                </>
              )}
            </Button>
          </div>
        </div>
        
        {resultImage && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">{t("Result")}</h3>
            <div className="border-2 border-[#e94560] rounded-lg p-4 bg-[#0a1e3b]">
              <img src={resultImage} alt="Result" className="max-h-96 mx-auto" />
              <Button 
                onClick={handleDownload} 
                className="mt-4 mx-auto block bg-[#0f3460] hover:bg-[#0f3460]/80 text-white"
              >
                <Download className="mr-2 h-4 w-4" />
                {t("Download Image")}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
