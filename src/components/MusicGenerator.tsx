
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
import { Music, PlayCircle, PauseCircle, Download, RefreshCcw } from "lucide-react";

export default function MusicGenerator() {
  const { t, dir } = useLanguage();
  const [prompt, setPrompt] = useState("");
  const [genre, setGenre] = useState("ambient");
  const [length, setLength] = useState(30);
  const [mood, setMood] = useState("happy");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMusic, setGeneratedMusic] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const genres = [
    { id: "ambient", name: t("Ambient") },
    { id: "electronic", name: t("Electronic") },
    { id: "cinematic", name: t("Cinematic") },
    { id: "lofi", name: t("Lo-Fi") },
    { id: "jazz", name: t("Jazz") },
    { id: "rock", name: t("Rock") },
    { id: "classical", name: t("Classical") },
  ];

  const moods = [
    { id: "happy", name: t("Happy") },
    { id: "sad", name: t("Sad") },
    { id: "energetic", name: t("Energetic") },
    { id: "relaxed", name: t("Relaxed") },
    { id: "suspenseful", name: t("Suspenseful") },
    { id: "romantic", name: t("Romantic") },
  ];

  // Pre-defined sample tracks for demonstration
  const sampleTracks = {
    ambient: "/audio/ambient.mp3",
    electronic: "/audio/electronic.mp3",
    cinematic: "/audio/cinematic.mp3",
    lofi: "/audio/lofi.mp3",
    jazz: "/audio/jazz.mp3",
    rock: "/audio/rock.mp3",
    classical: "/audio/classical.mp3"
  };

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast.error(t("Please enter a description for your music"));
      return;
    }
    
    setIsGenerating(true);
    
    // For demo purposes, we'll use predefined samples
    setTimeout(() => {
      // Use the selected genre to determine which sample to use
      const track = sampleTracks[genre as keyof typeof sampleTracks] || sampleTracks.ambient;
      setGeneratedMusic(track);
      setIsGenerating(false);
      toast.success(t("Music generated successfully"));
    }, 3000);
  };

  const togglePlayPause = () => {
    if (!generatedMusic) return;
    
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  const handleDownload = () => {
    if (!generatedMusic) return;
    
    const link = document.createElement('a');
    link.href = generatedMusic;
    link.download = `ai-music-${genre}-${new Date().getTime()}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(t("Music downloaded"));
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  return (
    <Card className={`bg-[#16213e] border-0 shadow-lg text-white max-w-4xl mx-auto ${dir === "rtl" ? "text-right" : ""}`}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">{t("AI Music Generator")}</CardTitle>
        <CardDescription className="text-gray-300 text-center">{t("Create original music clips based on your description and preferences")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-white mb-2">{t("Music Description")}</label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={t("Describe the music you want to create...")}
                className="bg-[#0a1e3b] border-[#0f3460] text-white h-24"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-2">{t("Genre")}</label>
                <Select value={genre} onValueChange={setGenre}>
                  <SelectTrigger className="bg-[#0a1e3b] border-[#0f3460] text-white">
                    <SelectValue placeholder={t("Select genre")} />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a1e3b] border-[#0f3460] text-white">
                    {genres.map(g => (
                      <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-white mb-2">{t("Mood")}</label>
                <Select value={mood} onValueChange={setMood}>
                  <SelectTrigger className="bg-[#0a1e3b] border-[#0f3460] text-white">
                    <SelectValue placeholder={t("Select mood")} />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a1e3b] border-[#0f3460] text-white">
                    {moods.map(m => (
                      <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="block text-white mb-2">{t("Duration")} ({length} {t("seconds")})</label>
              <Slider
                value={[length]}
                min={10}
                max={60}
                step={5}
                onValueChange={(value) => setLength(value[0])}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>10s</span>
                <span>30s</span>
                <span>60s</span>
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
                  <Music className="mr-2 h-4 w-4" />
                  {t("Generate Music")}
                </>
              )}
            </Button>
          </div>
          
          <div className="bg-[#0a1e3b] border border-[#0f3460] rounded-lg p-4 flex flex-col">
            <h3 className="text-lg font-medium mb-4">{t("Your Generated Music")}</h3>
            
            {generatedMusic ? (
              <>
                <div className="flex-1 flex flex-col items-center justify-center mb-6">
                  <div className="w-40 h-40 relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#e94560] to-[#0f3460] rounded-full animate-pulse-slow"></div>
                    <div className="absolute inset-4 bg-[#0a1e3b] rounded-full flex items-center justify-center">
                      <Music className="h-16 w-16 text-white" />
                    </div>
                    <audio 
                      ref={audioRef} 
                      src={generatedMusic} 
                      onEnded={handleAudioEnded}
                    />
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-300 mb-1">
                      {genre.charAt(0).toUpperCase() + genre.slice(1)} • {mood.charAt(0).toUpperCase() + mood.slice(1)}
                    </p>
                    <p className="text-xs text-gray-400">{length} {t("seconds")}</p>
                  </div>
                </div>
                
                <div className="flex gap-2 justify-center">
                  <Button 
                    onClick={togglePlayPause} 
                    size="lg"
                    className="bg-[#0f3460] hover:bg-[#0f3460]/80 text-white rounded-full w-12 h-12 p-0"
                  >
                    {isPlaying ? (
                      <PauseCircle className="h-8 w-8" />
                    ) : (
                      <PlayCircle className="h-8 w-8" />
                    )}
                  </Button>
                  
                  <Button 
                    onClick={handleDownload} 
                    size="lg"
                    className="bg-[#0f3460] hover:bg-[#0f3460]/80 text-white rounded-full w-12 h-12 p-0"
                  >
                    <Download className="h-6 w-6" />
                  </Button>
                  
                  <Button 
                    onClick={handleGenerate} 
                    disabled={isGenerating}
                    size="lg"
                    className="bg-[#0f3460] hover:bg-[#0f3460]/80 text-white rounded-full w-12 h-12 p-0"
                  >
                    <RefreshCcw className="h-6 w-6" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <Music className="h-16 w-16 text-gray-500 mb-4" />
                <p className="text-gray-400">
                  {isGenerating 
                    ? t("Creating your music masterpiece...") 
                    : t("Your generated music will appear here")}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
