
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Volume2, Loader2, Play, Save, Pause } from "lucide-react";
import { toast } from "sonner";

export default function TextToSpeech() {
  const [text, setText] = useState("");
  const [voice, setVoice] = useState("female");
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  // Audio references
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synth = window.speechSynthesis;
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  const generateSpeech = () => {
    if (!text.trim()) {
      toast.error("Please enter some text to convert to speech");
      return;
    }
    
    setIsGenerating(true);
    setAudioUrl(null);
    
    // Cancel any ongoing speech
    if (utteranceRef.current) {
      synth.cancel();
    }
    
    // Create a new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;
    
    // Configure speech properties
    utterance.pitch = pitch;
    utterance.rate = rate;
    
    // Set voice based on selection
    const voices = synth.getVoices();
    const selectedVoice = voices.find(v => 
      voice === "female" 
        ? (v.name.toLowerCase().includes("female") || v.name.toLowerCase().includes("woman"))
        : (v.name.toLowerCase().includes("male") || v.name.toLowerCase().includes("man"))
    );
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    // Handle speech end
    utterance.onend = () => {
      setIsPlaying(false);
      
      // In a real implementation, we would set the final audio URL here
      // For now, we'll just simulate a successful generation
      setIsGenerating(false);
      toast.success("Speech generated successfully!");
    };
    
    // Start speaking
    synth.speak(utterance);
    setIsPlaying(true);
    setIsGenerating(false);
  };
  
  const handlePlayPause = () => {
    if (!text.trim()) {
      toast.error("Please generate speech first");
      return;
    }
    
    if (isPlaying) {
      // Pause speech
      synth.pause();
      setIsPlaying(false);
    } else {
      // Resume or start speech
      if (synth.paused) {
        synth.resume();
      } else if (utteranceRef.current) {
        synth.speak(utteranceRef.current);
      } else {
        generateSpeech();
        return;
      }
      setIsPlaying(true);
    }
  };
  
  const downloadAudio = () => {
    if (!text.trim()) {
      toast.error("Please generate speech first");
      return;
    }
    
    // This is a simplified mock download implementation
    // In a real app, you'd convert the audio to a blob and create a download link
    
    // Create a temporary blob URL for demo purposes
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create anchor and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'speech.txt'; // In real implementation, this would be .mp3 or .wav
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Speech file downloaded");
  };
  
  return (
    <Card id="text-to-speech" className="w-full border-0 shadow-lg hover:shadow-xl transition-shadow bg-[#16213e] text-white overflow-hidden">
      <div className="h-1 w-full bg-gradient-to-r from-[#e94560] to-[#f2726d]"></div>
      <CardHeader className="bg-[#16213e]">
        <CardTitle className="text-white flex items-center">
          <Volume2 className="mr-2 h-6 w-6" />
          Text to Speech
        </CardTitle>
        <CardDescription className="text-gray-300">
          Convert your text into natural-sounding voice
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <Textarea
            placeholder="Enter the text you want to convert to speech..."
            className="min-h-[150px] resize-none bg-[#0f3460] text-white border-[#0f3460] focus:border-[#e94560] placeholder:text-gray-400"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Voice Type
              </label>
              <Select value={voice} onValueChange={setVoice}>
                <SelectTrigger className="bg-[#0f3460] border-[#0f3460] text-white">
                  <SelectValue placeholder="Select voice" />
                </SelectTrigger>
                <SelectContent className="bg-[#0f3460] text-white border-[#0f3460]">
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Speech Rate: {rate.toFixed(1)}
              </label>
              <Slider
                value={[rate]}
                min={0.5}
                max={2}
                step={0.1}
                onValueChange={(value) => setRate(value[0])}
                className="py-4"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Pitch: {pitch.toFixed(1)}
            </label>
            <Slider
              value={[pitch]}
              min={0.5}
              max={2}
              step={0.1}
              onValueChange={(value) => setPitch(value[0])}
              className="py-4"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-800 pt-4 flex justify-between">
        <Button
          variant="outline"
          onClick={handlePlayPause}
          disabled={isGenerating || !text.trim()}
          className="border-[#0f3460] bg-[#0f3460] text-white hover:bg-[#0f3460]/80"
        >
          {isPlaying ? (
            <>
              <Pause className="mr-2 h-4 w-4" />
              Pause
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Play
            </>
          )}
        </Button>
        
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={downloadAudio}
            disabled={isGenerating || !text.trim()}
            className="border-[#0f3460] bg-[#0f3460] text-white hover:bg-[#0f3460]/80"
          >
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
          
          <Button
            onClick={generateSpeech}
            disabled={isGenerating || !text.trim()}
            className="bg-gradient-to-r from-[#e94560] to-[#f2726d] hover:from-[#e94560]/90 hover:to-[#f2726d]/90 text-white"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Speech"
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
