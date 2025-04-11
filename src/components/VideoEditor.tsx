import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { 
  FileVideo, 
  Crop, 
  Volume2, 
  Clock, 
  Scissors, 
  Download, 
  Play, 
  Undo2, 
  Redo2 
} from "lucide-react";

export default function VideoEditor() {
  const { t, dir } = useLanguage();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(60);
  const [volume, setVolume] = useState(50);
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [isProcessing, setIsProcessing] = useState(false);
  const [videoUrl, setVideoUrl] = useState(""); // To store the video URL
  const [croppedVideoUrl, setCroppedVideoUrl] = useState(""); // To store the cropped video URL

  const aspectRatios = [
    { id: "16:9", name: "16:9" },
    { id: "4:3", name: "4:3" },
    { id: "1:1", name: "1:1" },
    { id: "9:16", name: "9:16" },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        setVideoFile(file);
        setVideoUrl(URL.createObjectURL(file)); // Create URL for the video file
        toast.success(t("Video file selected"));
      } else {
        toast.error(t("Please select a valid video file"));
      }
    }
  };

  const handleTrim = () => {
    setIsProcessing(true);
    
    // Simulate trimming - in a real app this would call an API
    setTimeout(() => {
      // For demo purposes, just set the croppedVideoUrl to the original videoUrl
      setCroppedVideoUrl(videoUrl);
      setIsProcessing(false);
      toast.success(t("Video trimmed successfully"));
    }, 3000);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const handleAspectRatioChange = (ratio: string) => {
    setAspectRatio(ratio);
  };

  const handleDownload = () => {
    if (!croppedVideoUrl) {
      toast.error(t("No video to download"));
      return;
    }

    const element = document.createElement("a");
    element.href = croppedVideoUrl;
    element.download = "edited-video.mp4";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success(t("Video downloaded"));
  };

  const handleUndo = () => {
    toast.success(t("Undo successful"));
  };

  const handleRedo = () => {
    toast.success(t("Redo successful"));
  };

  return (
    <Card className="bg-[#16213e] border-0 shadow-lg text-white max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">{t("AI Video Editor")}</CardTitle>
        <CardDescription className="text-gray-300 text-center">{t("Edit your videos with ease")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-4">{t("Upload Video")}</h3>
              
              <div className="mb-4">
                <label className="block text-white mb-2">{t("Upload Video")}</label>
                <div className="border-2 border-dashed border-[#0f3460] rounded-lg p-4 text-center bg-[#0a1e3b] transition-colors hover:border-[#e94560]">
                  <FileVideo className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-400 mb-2">{videoFile ? videoFile.name : t("Drag & drop your video or click to browse")}</p>
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    id="video-upload"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="video-upload">
                    <div className="inline-block">
                      <Button 
                        variant="outline"
                        className="border-[#0f3460] text-white hover:bg-[#0f3460]/50"
                      >
                        {t("Choose File")}
                      </Button>
                    </div>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-white mb-2">{t("Trim Video (seconds)")}</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={startTime}
                    onChange={(e) => setStartTime(Number(e.target.value))}
                    placeholder={t("Start Time")}
                    className="bg-[#0a1e3b] border-[#0f3460] text-white flex-1"
                  />
                  <Input
                    type="number"
                    value={endTime}
                    onChange={(e) => setEndTime(Number(e.target.value))}
                    placeholder={t("End Time")}
                    className="bg-[#0a1e3b] border-[#0f3460] text-white flex-1"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-white mb-2">{t("Adjust Volume")}</label>
                <Slider
                  defaultValue={[volume]}
                  max={100}
                  step={1}
                  onValueChange={handleVolumeChange}
                  className="text-white"
                />
              </div>
              
              <div>
                <label className="block text-white mb-2">{t("Aspect Ratio")}</label>
                <Select value={aspectRatio} onValueChange={handleAspectRatioChange}>
                  <SelectTrigger className="bg-[#0a1e3b] border-[#0f3460] text-white">
                    <SelectValue placeholder={t("Select ratio")} />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a1e3b] border-[#0f3460] text-white">
                    {aspectRatios.map(ratio => (
                      <SelectItem key={ratio.id} value={ratio.id}>{ratio.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="bg-[#0a1e3b] border border-[#0f3460] rounded-lg p-4 flex flex-col">
            {isProcessing ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="animate-spin h-10 w-10 border-3 border-[#e94560] border-t-transparent rounded-full mb-4"></div>
                <p className="text-gray-300">{t("Processing your video...")}</p>
                <p className="text-xs text-gray-400 mt-2">{t("This may take a few minutes")}</p>
              </div>
            ) : croppedVideoUrl ? (
              <div className="flex flex-col h-full">
                <video controls className="mb-4 rounded-md">
                  <source src={croppedVideoUrl} type="video/mp4" />
                  {t("Your browser does not support the video tag")}
                </video>
                
                <div className="mt-auto space-y-3">
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="w-1/2 border-[#0f3460] text-white hover:bg-[#0f3460]/50 justify-center"
                      onClick={handleUndo}
                    >
                      <Undo2 className="mr-2 h-4 w-4" />
                      {t("Undo")}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-1/2 border-[#0f3460] text-white hover:bg-[#0f3460]/50 justify-center"
                      onClick={handleRedo}
                    >
                      <Redo2 className="mr-2 h-4 w-4" />
                      {t("Redo")}
                    </Button>
                  </div>
                  
                  <Button 
                    onClick={handleDownload} 
                    className="w-full bg-[#0f3460] hover:bg-[#0f3460]/80 text-white"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {t("Download Video")}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <Clock className="h-16 w-16 text-gray-500 mb-4" />
                <p className="text-gray-400">{t("Your edited video will appear here")}</p>
                <p className="text-xs text-gray-500 mt-2">{t("Upload a video to get started")}</p>
              </div>
            )}
          </div>
        </div>
        
        <Button 
          onClick={handleTrim} 
          disabled={isProcessing || !videoFile}
          className="w-full bg-[#e94560] hover:bg-[#e94560]/80 text-white"
        >
          <Scissors className="mr-2 h-4 w-4" />
          {t("Trim Video")}
        </Button>
      </CardContent>
    </Card>
  );
}
