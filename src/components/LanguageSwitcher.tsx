
import React from "react";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  
  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };
  
  return (
    <Button 
      onClick={toggleLanguage}
      variant="outline"
      className="flex items-center gap-2 bg-[#16213e] text-white border-[#0f3460] hover:bg-[#0f3460]/80"
    >
      <Languages className="h-4 w-4" />
      <span>{t("language.switch")}</span>
    </Button>
  );
}
