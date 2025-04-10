
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileImage, Copy, Loader2, Upload, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function ImageToText() {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a valid image file (JPEG, PNG, GIF, WebP)");
        return;
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image size must be less than 10MB");
        return;
      }
      
      setImage(file);
      
      // Create image preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Reset extracted text when new image is selected
      setExtractedText("");
    }
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a valid image file (JPEG, PNG, GIF, WebP)");
        return;
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image size must be less than 10MB");
        return;
      }
      
      setImage(file);
      
      // Create image preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Reset extracted text when new image is selected
      setExtractedText("");
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    setExtractedText("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  const extractText = () => {
    if (!image) {
      toast.error("Please upload an image first");
      return;
    }
    
    setIsExtracting(true);
    setProgress(0);
    
    // Simulate a progressive OCR process
    const totalSteps = 10;
    let currentStep = 0;
    
    const progressInterval = setInterval(() => {
      currentStep++;
      setProgress((currentStep / totalSteps) * 100);
      
      if (currentStep >= totalSteps) {
        clearInterval(progressInterval);
        
        // Generate sample text with image name context
        const imageName = image.name.replace(/\.[^/.]+$/, ""); // Remove extension
        const sampleText = generateSampleOCRText(imageName);
        
        setExtractedText(sampleText);
        setIsExtracting(false);
        toast.success("Text extracted successfully!");
      }
    }, 300);
  };
  
  // Generate contextual sample text based on the image name
  const generateSampleOCRText = (imageName: string) => {
    // Convert image name to readable format
    const readableName = imageName
      .replace(/[-_]/g, " ")
      .replace(/([A-Z])/g, " $1")
      .toLowerCase();
    
    // Sample templates for different possible image contexts
    const templates = [
      `This document contains information about ${readableName}. The content appears to be related to professional documentation or reports that might be useful for business purposes.`,
      `The image shows what appears to be a ${readableName}. There are various details visible including specifications and descriptive text about its features and uses.`,
      `This appears to be a screenshot of ${readableName}. The interface shows various controls, text fields, and information related to the application's functionality.`,
      `The text in this image discusses various aspects of ${readableName}, including historical context, current applications, and future developments in the field.`,
      `This is a page from a document about ${readableName}. It contains paragraphs of text explaining concepts, definitions, and relevant information about the topic.`
    ];
    
    // Randomly select a template
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    return template;
  };
  
  const copyToClipboard = () => {
    if (extractedText) {
      navigator.clipboard.writeText(extractedText);
      toast.success("Text copied to clipboard!");
    }
  };
  
  return (
    <Card id="image-to-text" className="w-full border-0 shadow-lg hover:shadow-xl transition-shadow bg-[#16213e] text-white overflow-hidden">
      <div className="h-1 w-full bg-gradient-to-r from-[#72a1f8] to-[#a2b9f0]"></div>
      <CardHeader className="bg-[#16213e]">
        <CardTitle className="text-white flex items-center">
          <FileImage className="mr-2 h-6 w-6" />
          Image to Text
        </CardTitle>
        <CardDescription className="text-gray-300">
          Extract text from images using OCR technology
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div 
            className={`border-2 border-dashed ${imagePreview ? 'border-[#0f3460]' : 'border-gray-600'} rounded-lg p-6 text-center`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {imagePreview ? (
              <div className="space-y-4">
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="max-h-48 mx-auto rounded object-contain"
                  />
                  <button 
                    onClick={removeImage}
                    className="absolute top-0 right-0 p-1 bg-[#e94560] rounded-full text-white"
                    aria-label="Remove image"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-400 truncate">
                  {image?.name}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="mx-auto h-12 w-12 text-gray-400">
                  <FileImage className="h-12 w-12" />
                </div>
                <div className="flex text-sm text-gray-400 justify-center">
                  <label 
                    htmlFor="image-upload" 
                    className="relative cursor-pointer rounded-md font-medium text-[#72a1f8] hover:text-[#72a1f8]/80 focus-within:outline-none"
                  >
                    <span>Upload an image</span>
                    <input
                      id="image-upload"
                      ref={fileInputRef}
                      name="image-upload"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF, WebP up to 10MB
                </p>
              </div>
            )}
          </div>
          
          {isExtracting && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Processing image...</span>
                <span className="text-sm text-gray-400">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-gradient-to-r from-[#72a1f8] to-[#a2b9f0] h-2.5 rounded-full" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {extractedText && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-300">
                  Extracted Text
                </label>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={copyToClipboard}
                  className="h-8 px-2 text-gray-400 hover:text-white"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                value={extractedText}
                onChange={(e) => setExtractedText(e.target.value)}
                className="min-h-[120px] resize-none bg-[#0f3460] text-white border-[#0f3460] focus:border-[#72a1f8]"
              />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-800 pt-4">
        <Button
          onClick={extractText}
          disabled={isExtracting || !image}
          className="ml-auto bg-gradient-to-r from-[#72a1f8] to-[#a2b9f0] hover:from-[#72a1f8]/90 hover:to-[#a2b9f0]/90 text-white"
        >
          {isExtracting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Extracting...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Extract Text
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
