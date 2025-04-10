
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Volume2, Loader2, Play, Save } from "lucide-react";
import { toast } from "sonner";

export default function TextToSpeech() {
  const [text, setText] = useState("");
  const [voice, setVoice] = useState("female");
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  const generateSpeech = () => {
    if (!text.trim()) {
      toast.error("Please enter some text to convert to speech");
      return;
    }
    
    setIsGenerating(true);
    setAudioUrl(null);
    
    // Mock API call - in real implementation, this would call a text-to-speech API
    setTimeout(() => {
      // Use browser's built-in speech synthesis as a fallback demo
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = speechSynthesis.getVoices().find(v => 
        voice === "female" ? v.name.includes("Female") || v.name.includes("female") : 
        v.name.includes("Male") || v.name.includes("male")
      ) || null;
      
      speechSynthesis.speak(utterance);
      
      // In a real implementation, we would set the audio URL from the API response
      setIsGenerating(false);
      toast.success("Speech generated successfully!");
    }, 1500);
  };
  
  const downloadAudio = () => {
    // In a real implementation, this would download the generated audio file
    toast.info("This would download your generated audio in a real implementation.");
  };
  
  const playAudio = () => {
    if (audioUrl) {
      // Play the audio from the URL
      const audio = new Audio(audioUrl);
      audio.play();
    } else {
      // Use browser's built-in speech synthesis as a fallback demo
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = speechSynthesis.getVoices().find(v => 
        voice === "female" ? v.name.includes("Female") || v.name.includes("female") : 
        v.name.includes("Male") || v.name.includes("male")
      ) || null;
      
      speechSynthesis.speak(utterance);
    }
  };
  
  return (
    <Card id="text-to-speech" className="w-full border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="bg-gradient-to-r from-tool-purple to-tool-pink">
        <CardTitle className="text-white flex items-center">
          <Volume2 className="mr-2 h-6 w-6" />
          Text to Speech
        </CardTitle>
        <CardDescription className="text-gray-100">
          Convert your text into natural-sounding voice
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <Textarea
            placeholder="Enter the text you want to convert to speech..."
            className="min-h-[150px] resize-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Voice Type
              </label>
              <Select value={voice} onValueChange={setVoice}>
                <SelectTrigger>
                  <SelectValue placeholder="Select voice" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={playAudio}
          disabled={isGenerating || !text.trim()}
        >
          <Play className="mr-2 h-4 w-4" />
          Play
        </Button>
        
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={downloadAudio}
            disabled={isGenerating || !audioUrl}
          >
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
          
          <Button
            onClick={generateSpeech}
            disabled={isGenerating || !text.trim()}
            className="bg-gradient-to-r from-tool-purple to-tool-pink hover:from-tool-purple/90 hover:to-tool-pink/90 text-white"
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
