
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileImage, Copy, Loader2, Upload } from "lucide-react";
import { toast } from "sonner";

export default function ImageToText() {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
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
  
  const extractText = () => {
    if (!image) {
      toast.error("Please upload an image first");
      return;
    }
    
    setIsExtracting(true);
    
    // Mock API call - in real implementation, this would call an OCR API
    setTimeout(() => {
      // For demo purposes, we'll just set some dummy text
      setExtractedText("This is sample extracted text from your image. In a real implementation, this would be the actual text extracted from the uploaded image using an OCR (Optical Character Recognition) service.");
      setIsExtracting(false);
      toast.success("Text extracted successfully!");
    }, 2000);
  };
  
  const copyToClipboard = () => {
    if (extractedText) {
      navigator.clipboard.writeText(extractedText);
      toast.success("Text copied to clipboard!");
    }
  };
  
  return (
    <Card id="image-to-text" className="w-full border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="bg-gradient-to-r from-tool-blue to-tool-purple">
        <CardTitle className="text-white flex items-center">
          <FileImage className="mr-2 h-6 w-6" />
          Image to Text
        </CardTitle>
        <CardDescription className="text-gray-100">
          Extract text from images using OCR technology
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            {imagePreview ? (
              <div className="space-y-4">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="max-h-48 mx-auto rounded"
                />
                <p className="text-sm text-gray-500 truncate">
                  {image?.name}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="mx-auto h-12 w-12 text-gray-400">
                  <FileImage className="h-12 w-12" />
                </div>
                <div className="flex text-sm text-gray-600">
                  <label 
                    htmlFor="image-upload" 
                    className="relative cursor-pointer rounded-md font-medium text-tool-purple hover:text-tool-purple/80 focus-within:outline-none"
                  >
                    <span>Upload an image</span>
                    <input
                      id="image-upload"
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
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            )}
          </div>
          
          {imagePreview && (
            <div className="flex justify-end">
              <label 
                htmlFor="new-image-upload" 
                className="cursor-pointer text-sm text-tool-purple hover:text-tool-purple/80"
              >
                Change image
                <input
                  id="new-image-upload"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          )}
          
          {extractedText && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">
                  Extracted Text
                </label>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={copyToClipboard}
                  className="h-8 px-2 text-gray-500 hover:text-gray-700"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                value={extractedText}
                onChange={(e) => setExtractedText(e.target.value)}
                className="min-h-[120px] resize-none"
                readOnly
              />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={extractText}
          disabled={isExtracting || !image}
          className="ml-auto bg-gradient-to-r from-tool-blue to-tool-purple hover:from-tool-blue/90 hover:to-tool-purple/90 text-white"
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
