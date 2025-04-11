
import React, { useState, useRef } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Slider
} from "@/components/ui/slider";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { Video, PlayCircle, PauseCircle, Download, Film } from "lucide-react";

export default function VideoGenerator() {
  const { t, dir } = useLanguage();
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("cinematic");
  const [duration, setDuration] = useState(15);
  const [resolution, setResolution] = useState("720p");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const videoStyles = [
    { id: "cinematic", name: t("Cinematic") },
    { id: "animation", name: t("Animation") },
    { id: "documentary", name: t("Documentary") },
    { id: "drone", name: t("Drone Footage") },
    { id: "timelapse", name: t("Timelapse") },
  ];

  const resolutions = [
    { id: "480p", name: "480p" },
    { id: "720p", name: "720p" },
    { id: "1080p", name: "1080p" },
  ];

  // Sample videos for demonstration
  const sampleVideos = {
    cinematic: "/videos/cinematic.mp4",
    animation: "/videos/animation.mp4",
    documentary: "/videos/documentary.mp4",
    drone: "/videos/drone.mp4",
    timelapse: "/videos/timelapse.mp4"
  };

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast.error(t("Please enter a description for your video"));
      return;
    }
    
    setIsGenerating(true);
    
    // For demo purposes, we'll use predefined samples
    setTimeout(() => {
      // Use the selected style to determine which sample to use
      const video = sampleVideos[style as keyof typeof sampleVideos] || sampleVideos.cinematic;
      setGeneratedVideo(video);
      setIsGenerating(false);
      toast.success(t("Video generated successfully"));
    }, 5000);
  };

  const togglePlayPause = () => {
    if (!generatedVideo || !videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  const handleDownload = () => {
    if (!generatedVideo) return;
    
    const link = document.createElement('a');
    link.href = generatedVideo;
    link.download = `ai-video-${style}-${new Date().getTime()}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(t("Video downloaded"));
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  return (
    <Card className={`bg-[#16213e] border-0 shadow-lg text-white max-w-4xl mx-auto ${dir === "rtl" ? "text-right" : ""}`}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">{t("AI Video Generator")}</CardTitle>
        <CardDescription className="text-gray-300 text-center">{t("Create short videos from text descriptions")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-white mb-2">{t("Video Description")}</label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={t("Describe the video you want to generate...")}
                className="bg-[#0a1e3b] border-[#0f3460] text-white h-24"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-2">{t("Style")}</label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger className="bg-[#0a1e3b] border-[#0f3460] text-white">
                    <SelectValue placeholder={t("Select style")} />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a1e3b] border-[#0f3460] text-white">
                    {videoStyles.map(s => (
                      <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-white mb-2">{t("Resolution")}</label>
                <Select value={resolution} onValueChange={setResolution}>
                  <SelectTrigger className="bg-[#0a1e3b] border-[#0f3460] text-white">
                    <SelectValue placeholder={t("Select resolution")} />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a1e3b] border-[#0f3460] text-white">
                    {resolutions.map(r => (
                      <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="block text-white mb-2">{t("Duration")} ({duration} {t("seconds")})</label>
              <Slider
                value={[duration]}
                min={5}
                max={30}
                step={5}
                onValueChange={(value) => setDuration(value[0])}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>5s</span>
                <span>15s</span>
                <span>30s</span>
              </div>
            </div>
            
            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating || !prompt.trim()}
              className="w-full bg-gradient-to-r from-[#e94560] to-[#f2726d] hover:from-[#e94560]/90 hover:to-[#f2726d]/90 text-white"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-opacity-20 border-t-white rounded-full" />
                  {t("Generating...")}
                </>
              ) : (
                <>
                  <Video className="mr-2 h-4 w-4" />
                  {t("Generate Video")}
                </>
              )}
            </Button>
          </div>
          
          <div className="bg-[#0a1e3b] border border-[#0f3460] rounded-lg p-4 flex flex-col">
            <h3 className="text-lg font-medium mb-4">{t("Your Generated Video")}</h3>
            
            {generatedVideo ? (
              <>
                <div className="flex-1 mb-4 relative bg-black rounded-md overflow-hidden">
                  <video 
                    ref={videoRef} 
                    src={generatedVideo} 
                    className="w-full h-full object-contain"
                    onEnded={handleVideoEnded}
                  />
                  
                  {!isPlaying && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center cursor-pointer"
                      onClick={togglePlayPause}
                    >
                      <div className="bg-black/50 p-4 rounded-full">
                        <PlayCircle className="h-12 w-12 text-white" />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-300 mb-1">
                    {style.charAt(0).toUpperCase() + style.slice(1)} • {resolution}
                  </p>
                  <p className="text-xs text-gray-400">{duration} {t("seconds")}</p>
                </div>
                
                <div className="flex gap-4 justify-center">
                  <Button 
                    onClick={togglePlayPause} 
                    className="bg-[#0f3460] hover:bg-[#0f3460]/80 text-white"
                  >
                    {isPlaying ? (
                      <>
                        <PauseCircle className="mr-2 h-4 w-4" />
                        {t("Pause")}
                      </>
                    ) : (
                      <>
                        <PlayCircle className="mr-2 h-4 w-4" />
                        {t("Play")}
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    onClick={handleDownload} 
                    className="bg-[#0f3460] hover:bg-[#0f3460]/80 text-white"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {t("Download")}
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <Film className="h-16 w-16 text-gray-500 mb-4" />
                <p className="text-gray-400">
                  {isGenerating 
                    ? t("Creating your video...") 
                    : t("Your generated video will appear here")}
                </p>
                {isGenerating && (
                  <div className="mt-4 w-32 h-2 bg-[#0f3460] rounded-full overflow-hidden">
                    <div className="h-full bg-[#e94560] animate-progress-bar"></div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
