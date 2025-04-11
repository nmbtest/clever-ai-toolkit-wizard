
import React from "react";
import { Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ComingSoon() {
  const { t, dir } = useLanguage();

  return (
    <div className={`flex items-center ${dir === "rtl" ? "flex-row-reverse" : ""} justify-center w-full p-6 rounded-lg bg-white shadow-lg gap-3 mx-auto max-w-3xl`}>
      <Info className="h-6 w-6 text-[#0f3460] flex-shrink-0" />
      <p className="text-black font-medium text-lg">{t("message.coming-soon")}</p>
    </div>
  );
}
