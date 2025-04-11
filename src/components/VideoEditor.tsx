
import React, { useState, useRef } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { 
  FileVideo, 
  Scissors, 
  PlayCircle, 
  PauseCircle, 
  Download, 
  ArrowLeft, 
  ArrowRight,
  Filter,
  Wand2,
  ZoomIn
} from "lucide-react";

export default function VideoEditor() {
  const { t, dir } = useLanguage();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [startTrim, setStartTrim] = useState(0);
  const [endTrim, setEndTrim] = useState(100);
  const [filter, setFilter] = useState("none");
  const [effect, setEffect] = useState("none");
  const [processedVideo, setProcessedVideo] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  
  // Sample video for demonstration
  const sampleVideo = "/videos/sample.mp4";

  const filters = [
    { id: "none", name: t("None") },
    { id: "grayscale", name: t("Grayscale") },
    { id: "sepia", name: t("Sepia") },
    { id: "vintage", name: t("Vintage") },
    { id: "cold", name: t("Cold") },
    { id: "warm", name: t("Warm") },
  ];

  const effects = [
    { id: "none", name: t("None") },
    { id: "fadeIn", name: t("Fade In") },
    { id: "fadeOut", name: t("Fade Out") },
    { id: "slowMotion", name: t("Slow Motion") },
    { id: "speedUp", name: t("Speed Up") },
    { id: "reverse", name: t("Reverse") },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        setVideoFile(file);
        const url = URL.createObjectURL(file);
        setVideoUrl(url);
        toast.success(t("Video file selected"));
        
        // Reset editing params
        setStartTrim(0);
        setEndTrim(100);
        setFilter("none");
        setEffect("none");
        setProcessedVideo(null);
      } else {
        toast.error(t("Please select a valid video file"));
      }
    }
  };

  const handleLoadSample = () => {
    setVideoUrl(sampleVideo);
    setVideoFile(null);
    
    // Reset editing params
    setStartTrim(0);
    setEndTrim(100);
    setFilter("none");
    setEffect("none");
    setProcessedVideo(null);
    
    toast.success(t("Sample video loaded"));
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  const handleVideoTimeUpdate = () => {
    if (!videoRef.current) return;
    
    setCurrentTime(videoRef.current.currentTime);
    
    // Calculate percentage of video played
    const percent = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${percent}%`;
    }
  };

  const handleVideoLoaded = () => {
    if (!videoRef.current) return;
    
    setDuration(videoRef.current.duration);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    if (progressBarRef.current) {
      progressBarRef.current.style.width = '0%';
    }
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    
    const progressBar = e.currentTarget;
    const position = (e.pageX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth;
    
    videoRef.current.currentTime = position * videoRef.current.duration;
  };

  const handleSeek = (direction: 'backward' | 'forward') => {
    if (!videoRef.current) return;
    
    if (direction === 'backward') {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
    } else {
      videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 5);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const applyChanges = () => {
    if (!videoUrl) return;
    
    setIsProcessing(true);
    
    // Simulate processing - in a real app this would call an API
    setTimeout(() => {
      // For demo purposes, we'll just use the same video
      setProcessedVideo(videoUrl);
      setIsProcessing(false);
      toast.success(t("Video edited successfully"));
    }, 3000);
  };

  const handleDownload = () => {
    if (!processedVideo) return;
    
    // For local files, we can use the Object URL
    const link = document.createElement('a');
    link.href = processedVideo;
    link.download = "edited-video.mp4";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(t("Video downloaded"));
  };

  const getTrimmedDuration = () => {
    if (!duration) return "0:00";
    
    const trimmedDuration = (duration * (endTrim - startTrim)) / 100;
    return formatTime(trimmedDuration);
  };

  return (
    <Card className={`bg-[#16213e] border-0 shadow-lg text-white max-w-5xl mx-auto ${dir === "rtl" ? "text-right" : ""}`}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">{t("AI Video Editor")}</CardTitle>
        <CardDescription className="text-gray-300 text-center">{t("Edit and enhance videos with AI-powered effects and transformations")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!videoUrl ? (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-[#0f3460] rounded-lg p-8 text-center bg-[#0a1e3b] transition-colors hover:border-[#e94560]">
              <FileVideo className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-400 mb-4">{t("Drag & drop your video or click to browse")}</p>
              <div className="space-x-4">
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  id="video-upload"
                  onChange={handleFileChange}
                />
                <label htmlFor="video-upload">
                  <Button 
                    variant="outline" 
                    className="border-[#0f3460] text-white hover:bg-[#0f3460]/50"
                    as="span"
                  >
                    {t("Upload Video")}
                  </Button>
                </label>
                <Button 
                  variant="outline" 
                  className="border-[#0f3460] text-white hover:bg-[#0f3460]/50"
                  onClick={handleLoadSample}
                >
                  {t("Use Sample Video")}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-black rounded-md overflow-hidden relative">
                  <video 
                    ref={videoRef} 
                    src={videoUrl} 
                    className={`w-full ${filter !== 'none' ? `filter-${filter}` : ''}`}
                    onTimeUpdate={handleVideoTimeUpdate}
                    onLoadedMetadata={handleVideoLoaded}
                    onEnded={handleVideoEnded}
                    style={{
                      filter: filter === 'grayscale' ? 'grayscale(100%)' : 
                              filter === 'sepia' ? 'sepia(100%)' : 
                              filter === 'vintage' ? 'sepia(50%) contrast(110%) brightness(110%)' :
                              filter === 'cold' ? 'hue-rotate(180deg) saturate(110%)' :
                              filter === 'warm' ? 'sepia(30%) saturate(140%)' : 'none'
                    }}
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
                
                <div className="space-y-2">
                  <div 
                    className="h-2 bg-[#0a1e3b] rounded-full cursor-pointer relative overflow-hidden"
                    onClick={handleProgressBarClick}
                  >
                    <div ref={progressBarRef} className="h-full bg-[#e94560] w-0"></div>
                    <div 
                      className="absolute h-full bg-[#0f3460] opacity-50" 
                      style={{ left: `${startTrim}%`, width: `${endTrim - startTrim}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{formatTime(currentTime)}</span>
                    <span>{duration ? formatTime(duration) : "0:00"}</span>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-4">
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="rounded-full border-[#0f3460] text-white hover:bg-[#0f3460]/50"
                    onClick={() => handleSeek('backward')}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  
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
                    variant="outline" 
                    size="icon"
                    className="rounded-full border-[#0f3460] text-white hover:bg-[#0f3460]/50"
                    onClick={() => handleSeek('forward')}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button 
                  onClick={() => {
                    setVideoUrl(null);
                    setVideoFile(null);
                    setProcessedVideo(null);
                  }}
                  variant="outline" 
                  className="border-[#0f3460] text-white hover:bg-[#0f3460]/50 w-full"
                >
                  {t("Change Video")}
                </Button>
              </div>
              
              <div className="bg-[#0a1e3b] border border-[#0f3460] rounded-lg p-4 space-y-4">
                <h3 className="text-lg font-medium">{t("Edit Video")}</h3>
                
                <div>
                  <label className="block text-white mb-2">{t("Trim Video")}</label>
                  <div className="space-y-4">
                    <Slider
                      value={[startTrim, endTrim]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => {
                        setStartTrim(value[0]);
                        setEndTrim(value[1]);
                      }}
                      className="py-2"
                    />
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">
                        {t("Duration")}: {getTrimmedDuration()}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 text-xs text-gray-400 hover:text-white p-0"
                        onClick={() => {
                          setStartTrim(0);
                          setEndTrim(100);
                        }}
                      >
                        {t("Reset")}
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-white mb-2">{t("Apply Filter")}</label>
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="bg-[#16213e] border-[#0f3460] text-white">
                      <SelectValue placeholder={t("Select filter")} />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0a1e3b] border-[#0f3460] text-white">
                      {filters.map(f => (
                        <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-white mb-2">{t("Apply Effect")}</label>
                  <Select value={effect} onValueChange={setEffect}>
                    <SelectTrigger className="bg-[#16213e] border-[#0f3460] text-white">
                      <SelectValue placeholder={t("Select effect")} />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0a1e3b] border-[#0f3460] text-white">
                      {effects.map(e => (
                        <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={applyChanges} 
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-[#e94560] to-[#f2726d] hover:from-[#e94560]/90 hover:to-[#f2726d]/90 text-white"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-opacity-20 border-t-white rounded-full" />
                        {t("Processing...")}
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        {t("Apply Changes")}
                      </>
                    )}
                  </Button>
                </div>
                
                {processedVideo && (
                  <div className="pt-2">
                    <Button 
                      onClick={handleDownload} 
                      className="w-full bg-[#0f3460] hover:bg-[#0f3460]/80 text-white"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      {t("Download Edited Video")}
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="justify-start border-[#0f3460] text-white hover:bg-[#0f3460]/50"
                onClick={() => setFilter('grayscale')}
              >
                <Filter className="mr-2 h-4 w-4" />
                {t("Convert to Grayscale")}
              </Button>
              <Button 
                variant="outline" 
                className="justify-start border-[#0f3460] text-white hover:bg-[#0f3460]/50"
                onClick={() => setEffect('slowMotion')}
              >
                <ZoomIn className="mr-2 h-4 w-4" />
                {t("Slow Motion Effect")}
              </Button>
              <Button 
                variant="outline" 
                className="justify-start border-[#0f3460] text-white hover:bg-[#0f3460]/50"
                onClick={() => {
                  setStartTrim(0);
                  setEndTrim(50);
                }}
              >
                <Scissors className="mr-2 h-4 w-4" />
                {t("Trim First Half Only")}
              </Button>
              <Button 
                variant="outline" 
                className="justify-start border-[#0f3460] text-white hover:bg-[#0f3460]/50"
                onClick={() => {
                  setFilter('warm');
                  setEffect('fadeIn');
                }}
              >
                <Wand2 className="mr-2 h-4 w-4" />
                {t("Cinematic Look")}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
