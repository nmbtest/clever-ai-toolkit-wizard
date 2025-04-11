
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import TextToSpeech from "@/components/TextToSpeech";
import ImageToText from "@/components/ImageToText";
import ArticleGenerator from "@/components/ArticleGenerator";
import SpeechRecognition from "@/components/SpeechRecognition";
import ImageGenerator from "@/components/ImageGenerator";
import LanguageTranslator from "@/components/LanguageTranslator";
import ImageStyleTransfer from "@/components/ImageStyleTransfer";
import ChatbotBuilder from "@/components/ChatbotBuilder";
import CodeGenerator from "@/components/CodeGenerator";
import MusicGenerator from "@/components/MusicGenerator";
import VideoGenerator from "@/components/VideoGenerator";
import VideoSummarizer from "@/components/VideoSummarizer";
import VideoEditor from "@/components/VideoEditor";
import CategorySection from "@/components/CategorySection";
import ToolCard from "@/components/ToolCard";
import ComingSoon from "@/components/ComingSoon";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  BrainCircuit, 
  ChevronDown, 
  Volume2, 
  FileImage, 
  FileText, 
  Mic, 
  Video, 
  Image, 
  MessageSquare, 
  FileCode, 
  Languages, 
  Repeat, 
  Music, 
  BookOpen, 
  Camera, 
  SlidersHorizontal 
} from "lucide-react";
import { toast } from "sonner";
 
const Index = () => {
  const { t, dir } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<string | null>(null);

  // Animate content on load
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  // Handle tool selection
  const handleSelectTool = (toolId: string) => {
    setActiveTool(toolId);
    
    // Scroll to the tool section
    const element = document.getElementById(toolId);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  // List of implemented tools
  const implementedTools = [
    "text-to-speech", 
    "image-to-text", 
    "article-generator",
    "speech-recognition",
    "image-generator",
    "language-translator",
    "image-style-transfer",
    "chatbot-builder",
    "code-generator",
    "music-generator",
    "video-generator",
    "video-summarizer",
    "video-editor"
  ];

  return (
    <div className={`min-h-screen bg-[#1a1a2e] ${dir === "rtl" ? "text-right" : "text-left"}`}>
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero section with animation */}
        <div className={`text-center my-16 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex justify-center">
            <BrainCircuit className="h-20 w-20 text-[#e94560] animate-pulse-slow" />
          </div>
          <h1 className="mt-6 text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block">{t("app.title")}</span>
            <span className="block text-2xl sm:text-3xl md:text-4xl mt-3 bg-gradient-to-r from-[#e94560] to-[#0f3460] text-transparent bg-clip-text">
              {t("app.subtitle")}
            </span>
          </h1>
          <p className="mt-5 max-w-md mx-auto text-base text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            {t("Explore our suite of 13 AI-powered tools to enhance your productivity, creativity, and workflow")}
          </p>
          
          {/* Quick category navigation */}
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <button 
              onClick={() => {
                const element = document.getElementById("text");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }} 
              className="px-5 py-2 text-sm font-medium rounded-full bg-[#16213e] hover:bg-[#0f3460] transition-all text-white border border-[#0f3460]"
            >
              {t("category.text")}
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById("voice");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }} 
              className="px-5 py-2 text-sm font-medium rounded-full bg-[#16213e] hover:bg-[#0f3460] transition-all text-white border border-[#0f3460]"
            >
              {t("category.voice")}
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById("image");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }} 
              className="px-5 py-2 text-sm font-medium rounded-full bg-[#16213e] hover:bg-[#0f3460] transition-all text-white border border-[#0f3460]"
            >
              {t("category.image")}
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById("video");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }} 
              className="px-5 py-2 text-sm font-medium rounded-full bg-[#16213e] hover:bg-[#0f3460] transition-all text-white border border-[#0f3460]"
            >
              {t("category.video")}
            </button>
          </div>
          
          {/* Scroll indicator */}
          <div className="flex justify-center mt-16 animate-bounce">
            <ChevronDown className="h-6 w-6 text-gray-500" />
          </div>
        </div>
        
        {/* Tool Sections */}
        <div className="space-y-16 mb-20">
          {/* Text Tools */}
          <CategorySection 
            id="text" 
            titleKey="category.text" 
            descriptionKey="category.text.description"
            icon={<FileText className="h-8 w-8" />}
          >
            <ToolCard 
              icon={<FileText className="h-6 w-6" />}
              titleKey="tool.article-generator"
              descriptionKey="tool.article-generator.description"
              bgColor="bg-gradient-to-r from-[#e94560] to-[#f2726d]"
              onClick={() => handleSelectTool("article-generator")}
              isImplemented={implementedTools.includes("article-generator")}
            />
            <ToolCard 
              icon={<MessageSquare className="h-6 w-6" />}
              titleKey="tool.chatbot-builder"
              descriptionKey="tool.chatbot-builder.description"
              bgColor="bg-gradient-to-r from-[#72a1f8] to-[#a2b9f0]"
              onClick={() => handleSelectTool("chatbot-builder")}
              isImplemented={implementedTools.includes("chatbot-builder")}
            />
            <ToolCard 
              icon={<FileCode className="h-6 w-6" />}
              titleKey="tool.code-generator"
              descriptionKey="tool.code-generator.description"
              bgColor="bg-gradient-to-r from-[#5b8def] to-[#7da6f4]"
              onClick={() => handleSelectTool("code-generator")}
              isImplemented={implementedTools.includes("code-generator")}
            />
            <ToolCard 
              icon={<Languages className="h-6 w-6" />}
              titleKey="tool.language-translator"
              descriptionKey="tool.language-translator.description"
              bgColor="bg-gradient-to-r from-[#46c2cb] to-[#4fd8e3]"
              onClick={() => handleSelectTool("language-translator")}
              isImplemented={implementedTools.includes("language-translator")}
            />
          </CategorySection>
          
          {/* Voice Tools */}
          <CategorySection 
            id="voice" 
            titleKey="category.voice" 
            descriptionKey="category.voice.description"
            icon={<Mic className="h-8 w-8" />}
          >
            <ToolCard 
              icon={<Volume2 className="h-6 w-6" />}
              titleKey="tool.text-to-speech"
              descriptionKey="tool.text-to-speech.description"
              bgColor="bg-gradient-to-r from-[#e94560] to-[#f2726d]"
              onClick={() => handleSelectTool("text-to-speech")}
              isImplemented={implementedTools.includes("text-to-speech")}
            />
            <ToolCard 
              icon={<Mic className="h-6 w-6" />}
              titleKey="tool.speech-recognition"
              descriptionKey="tool.speech-recognition.description"
              bgColor="bg-gradient-to-r from-[#72a1f8] to-[#a2b9f0]"
              onClick={() => handleSelectTool("speech-recognition")}
              isImplemented={implementedTools.includes("speech-recognition")}
            />
            <ToolCard 
              icon={<Music className="h-6 w-6" />}
              titleKey="tool.music-generator"
              descriptionKey="tool.music-generator.description"
              bgColor="bg-gradient-to-r from-[#5b8def] to-[#7da6f4]"
              onClick={() => handleSelectTool("music-generator")}
              isImplemented={implementedTools.includes("music-generator")}
            />
          </CategorySection>
          
          {/* Image Tools */}
          <CategorySection 
            id="image" 
            titleKey="category.image" 
            descriptionKey="category.image.description"
            icon={<Image className="h-8 w-8" />}
          >
            <ToolCard 
              icon={<FileImage className="h-6 w-6" />}
              titleKey="tool.image-to-text"
              descriptionKey="tool.image-to-text.description"
              bgColor="bg-gradient-to-r from-[#e94560] to-[#f2726d]"
              onClick={() => handleSelectTool("image-to-text")}
              isImplemented={implementedTools.includes("image-to-text")}
            />
            <ToolCard 
              icon={<Image className="h-6 w-6" />}
              titleKey="tool.image-generator"
              descriptionKey="tool.image-generator.description"
              bgColor="bg-gradient-to-r from-[#72a1f8] to-[#a2b9f0]"
              onClick={() => handleSelectTool("image-generator")}
              isImplemented={implementedTools.includes("image-generator")}
            />
            <ToolCard 
              icon={<Repeat className="h-6 w-6" />}
              titleKey="tool.image-style-transfer"
              descriptionKey="tool.image-style-transfer.description"
              bgColor="bg-gradient-to-r from-[#5b8def] to-[#7da6f4]"
              onClick={() => handleSelectTool("image-style-transfer")}
              isImplemented={implementedTools.includes("image-style-transfer")}
            />
          </CategorySection>
          
          {/* Video Tools */}
          <CategorySection 
            id="video" 
            titleKey="category.video" 
            descriptionKey="category.video.description"
            icon={<Video className="h-8 w-8" />}
          >
            <ToolCard 
              icon={<Video className="h-6 w-6" />}
              titleKey="tool.video-generator"
              descriptionKey="tool.video-generator.description"
              bgColor="bg-gradient-to-r from-[#e94560] to-[#f2726d]"
              onClick={() => handleSelectTool("video-generator")}
              isImplemented={implementedTools.includes("video-generator")}
            />
            <ToolCard 
              icon={<Camera className="h-6 w-6" />}
              titleKey="tool.video-summarizer"
              descriptionKey="tool.video-summarizer.description"
              bgColor="bg-gradient-to-r from-[#72a1f8] to-[#a2b9f0]"
              onClick={() => handleSelectTool("video-summarizer")}
              isImplemented={implementedTools.includes("video-summarizer")}
            />
            <ToolCard 
              icon={<SlidersHorizontal className="h-6 w-6" />}
              titleKey="tool.video-editor"
              descriptionKey="tool.video-editor.description"
              bgColor="bg-gradient-to-r from-[#5b8def] to-[#7da6f4]"
              onClick={() => handleSelectTool("video-editor")}
              isImplemented={implementedTools.includes("video-editor")}
            />
          </CategorySection>
        </div>
        
        {/* Tool Components */}
        {activeTool === "text-to-speech" && (
          <div id="text-to-speech" className="mb-16">
            <TextToSpeech />
          </div>
        )}
        
        {activeTool === "image-to-text" && (
          <div id="image-to-text" className="mb-16">
            <ImageToText />
          </div>
        )}
        
        {activeTool === "article-generator" && (
          <div id="article-generator" className="mb-16">
            <ArticleGenerator />
          </div>
        )}

        {activeTool === "speech-recognition" && (
          <div id="speech-recognition" className="mb-16">
            <SpeechRecognition />
          </div>
        )}

        {activeTool === "image-generator" && (
          <div id="image-generator" className="mb-16">
            <ImageGenerator />
          </div>
        )}

        {activeTool === "language-translator" && (
          <div id="language-translator" className="mb-16">
            <LanguageTranslator />
          </div>
        )}

        {activeTool === "image-style-transfer" && (
          <div id="image-style-transfer" className="mb-16">
            <ImageStyleTransfer />
          </div>
        )}

        {activeTool === "chatbot-builder" && (
          <div id="chatbot-builder" className="mb-16">
            <ChatbotBuilder />
          </div>
        )}

        {activeTool === "code-generator" && (
          <div id="code-generator" className="mb-16">
            <CodeGenerator />
          </div>
        )}

        {activeTool === "music-generator" && (
          <div id="music-generator" className="mb-16">
            <MusicGenerator />
          </div>
        )}

        {activeTool === "video-generator" && (
          <div id="video-generator" className="mb-16">
            <VideoGenerator />
          </div>
        )}

        {activeTool === "video-summarizer" && (
          <div id="video-summarizer" className="mb-16">
            <VideoSummarizer />
          </div>
        )}

        {activeTool === "video-editor" && (
          <div id="video-editor" className="mb-16">
            <VideoEditor />
          </div>
        )}
        
        {activeTool && !implementedTools.includes(activeTool) && (
          <div id={activeTool} className="mb-16">
            <ComingSoon />
          </div>
        )}
      </main>
      
      <footer className={`bg-[#16213e] py-12 border-t border-[#0f3460] ${dir === "rtl" ? "text-right" : "text-left"}`}>
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center mb-6">
            <BrainCircuit className="h-8 w-8 text-[#e94560]" />
            <span className="ml-2 text-xl font-bold text-white">{t("app.title")}</span>
          </div>
          <p className="text-gray-400">{t("footer.copyright")}</p>
          <p className="text-sm mt-2 text-gray-500">{t("footer.powered-by")}</p>
          <div className="mt-6 flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-[#e94560] transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-[#e94560] transition-colors">
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
