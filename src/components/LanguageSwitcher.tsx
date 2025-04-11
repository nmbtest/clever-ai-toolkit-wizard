
import React from "react";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  
  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ar" : "en";
    setLanguage(newLanguage);
    toast.success(t("language.changed"));
  };
  
  return (
    <Button 
      onClick={toggleLanguage}
      variant="outline"
      className="flex items-center gap-2 bg-[#16213e] text-white border-[#0f3460] hover:bg-[#0f3460]/80 relative"
    >
      <Languages className="h-4 w-4" />
      <span>{t("language.switch")}</span>
      <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#e94560] rounded-full animate-ping"></span>
    </Button>
  );
}
