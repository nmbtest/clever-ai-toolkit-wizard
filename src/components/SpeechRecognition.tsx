
import React, { useState, useEffect } from "react";
import { Mic, MicOff, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function SpeechRecognition() {
  const { t, language } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleListening = () => {
    if (!isListening) {
      startListening();
    } else {
      stopListening();
    }
  };

  const startListening = () => {
    setIsLoading(true);
    // Simulate speech recognition API
    setTimeout(() => {
      setIsListening(true);
      setIsLoading(false);
      toast.success(t("Speech recognition started"));
    }, 1000);
  };

  const stopListening = () => {
    setIsListening(false);
    // Simulate receiving transcript
    const demoTexts = {
      en: "This is a demonstration of speech recognition technology. In a real implementation, this would use your device's microphone to convert spoken words into text.",
      ar: "هذا عرض توضيحي لتقنية التعرف على الكلام. في التطبيق الحقيقي، سيستخدم هذا ميكروفون جهازك لتحويل الكلمات المنطوقة إلى نص."
    };
    setTranscript(prev => prev + (prev ? "\n\n" : "") + demoTexts[language]);
  };

  const clearTranscript = () => {
    setTranscript("");
    toast.info(t("Transcript cleared"));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">{t("tool.speech-recognition")}</h2>
      
      <Card className="bg-[#16213e] text-white border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">{t("Speech Recognition")}</CardTitle>
          <CardDescription className="text-gray-300">
            {t("Speak clearly into your microphone to convert speech to text")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center mb-6">
            <Button
              onClick={toggleListening}
              disabled={isLoading}
              className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
                isListening ? "bg-red-500 hover:bg-red-600" : "bg-[#e94560] hover:bg-[#e94560]/90"
              }`}
            >
              {isLoading ? (
                <Loader className="h-10 w-10 animate-spin" />
              ) : isListening ? (
                <MicOff className="h-10 w-10" />
              ) : (
                <Mic className="h-10 w-10" />
              )}
            </Button>
          </div>
          
          <Textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder={t("Transcript will appear here...")}
            className="min-h-[200px] bg-[#0f3460] border-gray-700 text-white"
          />
        </CardContent>
        <CardFooter className="flex justify-between border-t border-gray-800 pt-4">
          <Button variant="outline" onClick={clearTranscript} className="border-gray-700">
            {t("Clear")}
          </Button>
          <Button className="bg-[#e94560] hover:bg-[#e94560]/90">
            {t("Save Transcript")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
