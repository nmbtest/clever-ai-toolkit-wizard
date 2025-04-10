
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CategorySectionProps {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export default function CategorySection({ id, titleKey, descriptionKey, icon, children }: CategorySectionProps) {
  const { t, dir } = useLanguage();

  return (
    <section id={id} className="py-16 relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-[#e94560]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#72a1f8]/5 rounded-full blur-3xl"></div>
      
      <div className="mb-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-[#16213e] text-[#e94560] shadow-lg transform transition-transform hover:scale-110">
            {icon}
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">{t(titleKey)}</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">{t(descriptionKey)}</p>
        <div className="mt-4 w-20 h-1 bg-gradient-to-r from-[#e94560] to-[#0f3460] mx-auto rounded-full"></div>
      </div>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${dir === "rtl" ? "dir-rtl text-right" : ""}`}>
        {children}
      </div>
    </section>
  );
}
