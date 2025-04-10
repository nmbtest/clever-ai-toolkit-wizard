
import React, { useState } from "react";
import { Languages, ArrowDown, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Sample languages
const languages = [
  { code: "en", name: "English" },
  { code: "ar", name: "Arabic" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
  { code: "de", name: "German" },
  { code: "zh", name: "Chinese" },
  { code: "ja", name: "Japanese" },
  { code: "ru", name: "Russian" },
];

export default function LanguageTranslator() {
  const { t } = useLanguage();
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("ar");
  const [isTranslating, setIsTranslating] = useState(false);
  
  const handleTranslate = () => {
    if (!sourceText.trim()) {
      toast.error(t("Please enter text to translate"));
      return;
    }
    
    setIsTranslating(true);
    
    // Simulate API call
    setTimeout(() => {
      // Demo translations
      const demoTranslations: Record<string, Record<string, string>> = {
        en: {
          ar: "هذا نص مترجم للعرض التوضيحي. في التطبيق الحقيقي، سيتم استخدام واجهة برمجة تطبيقات الترجمة.",
          fr: "Ceci est un texte traduit pour la démonstration. Dans une implémentation réelle, une API de traduction serait utilisée.",
          es: "Este es un texto traducido para la demostración. En una implementación real, se utilizaría una API de traducción.",
          de: "Dies ist ein übersetzter Text für die Demonstration. In einer realen Implementierung würde eine Übersetzungs-API verwendet werden.",
          zh: "这是用于演示的翻译文本。在实际实现中，将使用翻译API。",
          ja: "これはデモンストレーション用の翻訳されたテキストです。実際の実装では、翻訳APIが使用されます。",
          ru: "Это переведенный текст для демонстрации. В реальной реализации будет использоваться API перевода."
        }
      };
      
      setTranslatedText(
        demoTranslations[sourceLang]?.[targetLang] || 
        "This is a translated text for demonstration. In a real implementation, a translation API would be used."
      );
      
      setIsTranslating(false);
      toast.success(t("Translation complete"));
    }, 1500);
  };
  
  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">{t("tool.language-translator")}</h2>
      
      <Card className="bg-[#16213e] text-white border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">{t("Translate Text")}</CardTitle>
          <CardDescription className="text-gray-300">
            {t("Translate text between multiple languages")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="source-language">{t("Source Language")}</Label>
              <Select value={sourceLang} onValueChange={setSourceLang}>
                <SelectTrigger id="source-language" className="bg-[#0f3460] border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#0f3460] border-gray-700 text-white">
                  {languages.map(lang => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end justify-center mb-2">
              <Button variant="ghost" onClick={swapLanguages} className="text-gray-300 hover:text-white">
                <Repeat className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="md:col-start-2 md:row-start-1">
              <Label htmlFor="target-language">{t("Target Language")}</Label>
              <Select value={targetLang} onValueChange={setTargetLang}>
                <SelectTrigger id="target-language" className="bg-[#0f3460] border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#0f3460] border-gray-700 text-white">
                  {languages.map(lang => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="source-text">{t("Text to Translate")}</Label>
            <Textarea
              id="source-text"
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder={t("Enter text to translate")}
              className="min-h-[120px] bg-[#0f3460] border-gray-700 text-white mt-2"
            />
          </div>
          
          <div className="flex justify-center my-4">
            <ArrowDown className="h-6 w-6 text-gray-400" />
          </div>
          
          <div>
            <Label htmlFor="translated-text">{t("Translation")}</Label>
            <Textarea
              id="translated-text"
              value={translatedText}
              readOnly
              placeholder={t("Translation will appear here")}
              className="min-h-[120px] bg-[#0f3460] border-gray-700 text-white mt-2"
            />
          </div>
        </CardContent>
        <CardFooter className="border-t border-gray-800 pt-4">
          <Button 
            onClick={handleTranslate} 
            disabled={isTranslating || !sourceText.trim()}
            className="bg-[#e94560] hover:bg-[#e94560]/90 w-full"
          >
            {isTranslating ? (
              <span className="flex items-center">
                <Languages className="h-4 w-4 mr-2 animate-spin" />
                {t("Translating...")}
              </span>
            ) : (
              <span className="flex items-center">
                <Languages className="h-4 w-4 mr-2" />
                {t("Translate")}
              </span>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
