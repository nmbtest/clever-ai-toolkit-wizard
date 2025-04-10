
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ToolCardProps {
  icon: React.ReactNode;
  titleKey: string;
  descriptionKey: string;
  bgColor: string;
  onClick: () => void;
  isImplemented?: boolean;
}

export default function ToolCard({ 
  icon, 
  titleKey, 
  descriptionKey, 
  bgColor, 
  onClick, 
  isImplemented = false 
}: ToolCardProps) {
  const { t, dir } = useLanguage();
  const ArrowIcon = dir === "rtl" ? ArrowLeft : ArrowRight;
  
  return (
    <Card className={`border-0 shadow-lg hover:shadow-xl transition-all bg-[#16213e] text-white overflow-hidden group ${dir === "rtl" ? "text-right" : ""}`}>
      <div className={`h-1 w-full ${bgColor}`}></div>
      <CardHeader>
        <div className={`flex ${dir === "rtl" ? "flex-row-reverse" : ""} justify-between items-start`}>
          <div className="p-2 rounded-lg bg-[#0f3460] text-[#e94560]">
            {icon}
          </div>
          <CardTitle className="text-xl font-bold">{t(titleKey)}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-300 min-h-[80px]">
          {t(descriptionKey)}
        </CardDescription>
      </CardContent>
      <CardFooter className={`border-t border-gray-800 pt-4 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
        <Button 
          onClick={onClick} 
          className={`${dir === "rtl" ? "mr-auto group-hover:-translate-x-1" : "ml-auto group-hover:translate-x-1"} 
            bg-[#0f3460] hover:bg-[#0f3460]/80 text-white transition-transform`}
        >
          {isImplemented ? (
            <>
              {dir === "rtl" && <ArrowIcon className="ml-2 h-4 w-4 group-hover:animate-pulse" />}
              {t("button.try-now")}
              {dir === "ltr" && <ArrowIcon className="ml-2 h-4 w-4 group-hover:animate-pulse" />}
            </>
          ) : (
            <>
              <Clock className="mr-2 h-4 w-4" />
              {t("button.coming-soon")}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
