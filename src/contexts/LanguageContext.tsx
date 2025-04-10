
import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const translations = {
  en: {
    // Header
    "app.title": "AI Toolkit Pro",
    "app.subtitle": "Advanced AI tools for every creative need",
    
    // Categories
    "category.text": "Text Tools",
    "category.text.description": "Transform and enhance your text content with advanced AI capabilities",
    "category.voice": "Voice Tools",
    "category.voice.description": "Powerful voice processing tools to enhance audio content and communication",
    "category.image": "Image Tools",
    "category.image.description": "Transform, enhance, and extract information from images with powerful AI",
    "category.video": "Video Tools",
    "category.video.description": "Create, edit, and enhance video content with cutting-edge AI technology",
    
    // Text Tools
    "tool.article-generator": "Article Generator",
    "tool.article-generator.description": "Generate well-structured articles on any topic with our advanced AI model",
    "tool.chatbot-builder": "Chatbot Builder",
    "tool.chatbot-builder.description": "Create customized AI chatbots for your website or application",
    "tool.code-generator": "Code Generator",
    "tool.code-generator.description": "Generate code snippets or complete functions based on your description",
    "tool.language-translator": "Language Translator",
    "tool.language-translator.description": "Translate text between over 100 languages with high accuracy",
    
    // Voice Tools
    "tool.text-to-speech": "Text to Speech",
    "tool.text-to-speech.description": "Convert written text into natural-sounding speech with multiple voice options",
    "tool.speech-recognition": "Speech Recognition",
    "tool.speech-recognition.description": "Convert spoken words into text with our high-accuracy speech recognition system",
    "tool.music-generator": "Music Generator",
    "tool.music-generator.description": "Create original music clips based on your description and preferences",
    
    // Image Tools
    "tool.image-to-text": "Image to Text",
    "tool.image-to-text.description": "Extract text from images using advanced OCR technology",
    "tool.image-generator": "Image Generator",
    "tool.image-generator.description": "Create unique images from textual descriptions with AI",
    "tool.image-style-transfer": "Image Style Transfer",
    "tool.image-style-transfer.description": "Apply artistic styles to your images with AI-powered style transfer",
    
    // Video Tools
    "tool.video-generator": "Video Generator",
    "tool.video-generator.description": "Create short videos from text descriptions or script outlines",
    "tool.video-summarizer": "Video Summarizer",
    "tool.video-summarizer.description": "Generate concise summaries of video content with key points highlighted",
    "tool.video-editor": "Video Editor",
    "tool.video-editor.description": "Edit and enhance videos with AI-powered effects and transformations",
    
    // Common
    "button.try-now": "Try Now",
    "button.coming-soon": "Coming Soon",
    "message.coming-soon": "This tool is coming soon! Stay tuned for updates.",
    "footer.copyright": "© 2025 AI Toolkit Pro. All rights reserved.",
    "footer.powered-by": "Powered by advanced AI technologies",
    
    // Language
    "language.switch": "العربية",
  },
  ar: {
    // Header
    "app.title": "مجموعة أدوات الذكاء الاصطناعي برو",
    "app.subtitle": "أدوات ذكاء اصطناعي متقدمة لكل احتياج إبداعي",
    
    // Categories
    "category.text": "أدوات النص",
    "category.text.description": "قم بتحويل وتحسين محتوى النص الخاص بك باستخدام قدرات الذكاء الاصطناعي المتقدمة",
    "category.voice": "أدوات الصوت",
    "category.voice.description": "أدوات معالجة صوتية قوية لتحسين المحتوى الصوتي والتواصل",
    "category.image": "أدوات الصور",
    "category.image.description": "قم بتحويل وتحسين واستخراج المعلومات من الصور باستخدام الذكاء الاصطناعي القوي",
    "category.video": "أدوات الفيديو",
    "category.video.description": "إنشاء وتحرير وتحسين محتوى الفيديو باستخدام تكنولوجيا الذكاء الاصطناعي المتطورة",
    
    // Text Tools
    "tool.article-generator": "منشئ المقالات",
    "tool.article-generator.description": "إنشاء مقالات منظمة جيدًا حول أي موضوع باستخدام نموذج الذكاء الاصطناعي المتقدم لدينا",
    "tool.chatbot-builder": "منشئ روبوت الدردشة",
    "tool.chatbot-builder.description": "إنشاء روبوتات دردشة ذكاء اصطناعي مخصصة لموقع الويب أو التطبيق الخاص بك",
    "tool.code-generator": "منشئ الكود",
    "tool.code-generator.description": "إنشاء مقتطفات الكود أو الوظائف الكاملة بناءً على وصفك",
    "tool.language-translator": "مترجم اللغات",
    "tool.language-translator.description": "ترجم النص بين أكثر من 100 لغة بدقة عالية",
    
    // Voice Tools
    "tool.text-to-speech": "تحويل النص إلى كلام",
    "tool.text-to-speech.description": "تحويل النص المكتوب إلى كلام طبيعي مع خيارات صوتية متعددة",
    "tool.speech-recognition": "التعرف على الكلام",
    "tool.speech-recognition.description": "تحويل الكلمات المنطوقة إلى نص باستخدام نظام التعرف على الكلام عالي الدقة لدينا",
    "tool.music-generator": "منشئ الموسيقى",
    "tool.music-generator.description": "إنشاء مقاطع موسيقية أصلية بناءً على وصفك وتفضيلاتك",
    
    // Image Tools
    "tool.image-to-text": "تحويل الصورة إلى نص",
    "tool.image-to-text.description": "استخراج النص من الصور باستخدام تقنية OCR المتقدمة",
    "tool.image-generator": "منشئ الصور",
    "tool.image-generator.description": "إنشاء صور فريدة من الأوصاف النصية باستخدام الذكاء الاصطناعي",
    "tool.image-style-transfer": "نقل نمط الصورة",
    "tool.image-style-transfer.description": "تطبيق أنماط فنية على صورك باستخدام نقل النمط المدعوم بالذكاء الاصطناعي",
    
    // Video Tools
    "tool.video-generator": "منشئ الفيديو",
    "tool.video-generator.description": "إنشاء مقاطع فيديو قصيرة من أوصاف نصية أو مخططات نصية",
    "tool.video-summarizer": "ملخص الفيديو",
    "tool.video-summarizer.description": "إنشاء ملخصات موجزة لمحتوى الفيديو مع إبراز النقاط الرئيسية",
    "tool.video-editor": "محرر الفيديو",
    "tool.video-editor.description": "تحرير وتحسين مقاطع الفيديو باستخدام تأثيرات وتحويلات مدعومة بالذكاء الاصطناعي",
    
    // Common
    "button.try-now": "جرب الآن",
    "button.coming-soon": "قريبًا",
    "message.coming-soon": "هذه الأداة قادمة قريبًا! ابق على اطلاع للحصول على التحديثات.",
    "footer.copyright": "© 2025 مجموعة أدوات الذكاء الاصطناعي برو. جميع الحقوق محفوظة.",
    "footer.powered-by": "مدعوم بتقنيات الذكاء الاصطناعي المتقدمة",
    
    // Language
    "language.switch": "English",
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
  dir: "ltr"
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");
  
  // Set the direction attribute on the document
  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);
  
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };
  
  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    t,
    dir: language === "ar" ? "rtl" : "ltr"
  };
  
  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};
