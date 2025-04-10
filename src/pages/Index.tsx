
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import TextToSpeech from "@/components/TextToSpeech";
import ImageToText from "@/components/ImageToText";
import ArticleGenerator from "@/components/ArticleGenerator";
import CategorySection from "@/components/CategorySection";
import ToolCard from "@/components/ToolCard";
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
    
    // If tool is not implemented yet, show toast
    if (!["text-to-speech", "image-to-text", "article-generator"].includes(toolId)) {
      toast.info("This tool is coming soon! Stay tuned for updates.");
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <Header />
      
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero section with animation */}
        <div className={`text-center my-16 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex justify-center">
            <BrainCircuit className="h-20 w-20 text-[#e94560] animate-pulse-slow" />
          </div>
          <h1 className="mt-6 text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block">AI Toolkit Pro</span>
            <span className="block text-2xl sm:text-3xl md:text-4xl mt-3 bg-gradient-to-r from-[#e94560] to-[#0f3460] text-transparent bg-clip-text">
              Advanced AI tools for every creative need
            </span>
          </h1>
          <p className="mt-5 max-w-md mx-auto text-base text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Explore our suite of 13 AI-powered tools to enhance your productivity, creativity, and workflow
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
              Text Tools
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById("voice");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }} 
              className="px-5 py-2 text-sm font-medium rounded-full bg-[#16213e] hover:bg-[#0f3460] transition-all text-white border border-[#0f3460]"
            >
              Voice Tools
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById("image");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }} 
              className="px-5 py-2 text-sm font-medium rounded-full bg-[#16213e] hover:bg-[#0f3460] transition-all text-white border border-[#0f3460]"
            >
              Image Tools
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById("video");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }} 
              className="px-5 py-2 text-sm font-medium rounded-full bg-[#16213e] hover:bg-[#0f3460] transition-all text-white border border-[#0f3460]"
            >
              Video Tools
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
            title="Text Tools" 
            description="Transform and enhance your text content with advanced AI capabilities"
            icon={<FileText className="h-8 w-8" />}
          >
            <ToolCard 
              icon={<FileText className="h-6 w-6" />}
              title="Article Generator"
              description="Generate well-structured articles on any topic with our advanced AI model"
              bgColor="bg-gradient-to-r from-[#e94560] to-[#f2726d]"
              onClick={() => handleSelectTool("article-generator")}
            />
            <ToolCard 
              icon={<MessageSquare className="h-6 w-6" />}
              title="Chatbot Builder"
              description="Create customized AI chatbots for your website or application"
              bgColor="bg-gradient-to-r from-[#72a1f8] to-[#a2b9f0]"
              onClick={() => handleSelectTool("chatbot-builder")}
            />
            <ToolCard 
              icon={<FileCode className="h-6 w-6" />}
              title="Code Generator"
              description="Generate code snippets or complete functions based on your description"
              bgColor="bg-gradient-to-r from-[#5b8def] to-[#7da6f4]"
              onClick={() => handleSelectTool("code-generator")}
            />
            <ToolCard 
              icon={<Languages className="h-6 w-6" />}
              title="Language Translator"
              description="Translate text between over 100 languages with high accuracy"
              bgColor="bg-gradient-to-r from-[#46c2cb] to-[#4fd8e3]"
              onClick={() => handleSelectTool("language-translator")}
            />
          </CategorySection>
          
          {/* Voice Tools */}
          <CategorySection 
            id="voice" 
            title="Voice Tools" 
            description="Powerful voice processing tools to enhance audio content and communication"
            icon={<Mic className="h-8 w-8" />}
          >
            <ToolCard 
              icon={<Volume2 className="h-6 w-6" />}
              title="Text to Speech"
              description="Convert written text into natural-sounding speech with multiple voice options"
              bgColor="bg-gradient-to-r from-[#e94560] to-[#f2726d]"
              onClick={() => handleSelectTool("text-to-speech")}
            />
            <ToolCard 
              icon={<Mic className="h-6 w-6" />}
              title="Speech Recognition"
              description="Convert spoken words into text with our high-accuracy speech recognition system"
              bgColor="bg-gradient-to-r from-[#72a1f8] to-[#a2b9f0]"
              onClick={() => handleSelectTool("speech-recognition")}
            />
            <ToolCard 
              icon={<Music className="h-6 w-6" />}
              title="Music Generator"
              description="Create original music clips based on your description and preferences"
              bgColor="bg-gradient-to-r from-[#5b8def] to-[#7da6f4]"
              onClick={() => handleSelectTool("music-generator")}
            />
          </CategorySection>
          
          {/* Image Tools */}
          <CategorySection 
            id="image" 
            title="Image Tools" 
            description="Transform, enhance, and extract information from images with powerful AI"
            icon={<Image className="h-8 w-8" />}
          >
            <ToolCard 
              icon={<FileImage className="h-6 w-6" />}
              title="Image to Text"
              description="Extract text from images using advanced OCR technology"
              bgColor="bg-gradient-to-r from-[#e94560] to-[#f2726d]"
              onClick={() => handleSelectTool("image-to-text")}
            />
            <ToolCard 
              icon={<Image className="h-6 w-6" />}
              title="Image Generator"
              description="Create unique images from textual descriptions with AI"
              bgColor="bg-gradient-to-r from-[#72a1f8] to-[#a2b9f0]"
              onClick={() => handleSelectTool("image-generator")}
            />
            <ToolCard 
              icon={<Repeat className="h-6 w-6" />}
              title="Image Style Transfer"
              description="Apply artistic styles to your images with AI-powered style transfer"
              bgColor="bg-gradient-to-r from-[#5b8def] to-[#7da6f4]"
              onClick={() => handleSelectTool("image-style-transfer")}
            />
          </CategorySection>
          
          {/* Video Tools */}
          <CategorySection 
            id="video" 
            title="Video Tools" 
            description="Create, edit, and enhance video content with cutting-edge AI technology"
            icon={<Video className="h-8 w-8" />}
          >
            <ToolCard 
              icon={<Video className="h-6 w-6" />}
              title="Video Generator"
              description="Create short videos from text descriptions or script outlines"
              bgColor="bg-gradient-to-r from-[#e94560] to-[#f2726d]"
              onClick={() => handleSelectTool("video-generator")}
            />
            <ToolCard 
              icon={<Camera className="h-6 w-6" />}
              title="Video Summarizer"
              description="Generate concise summaries of video content with key points highlighted"
              bgColor="bg-gradient-to-r from-[#72a1f8] to-[#a2b9f0]"
              onClick={() => handleSelectTool("video-summarizer")}
            />
            <ToolCard 
              icon={<SlidersHorizontal className="h-6 w-6" />}
              title="Video Editor"
              description="Edit and enhance videos with AI-powered effects and transformations"
              bgColor="bg-gradient-to-r from-[#5b8def] to-[#7da6f4]"
              onClick={() => handleSelectTool("video-editor")}
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
      </main>
      
      <footer className="bg-[#16213e] py-12 border-t border-[#0f3460]">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center mb-6">
            <BrainCircuit className="h-8 w-8 text-[#e94560]" />
            <span className="ml-2 text-xl font-bold text-white">AI Toolkit Pro</span>
          </div>
          <p className="text-gray-400">© 2025 AI Toolkit Pro. All rights reserved.</p>
          <p className="text-sm mt-2 text-gray-500">Powered by advanced AI technologies</p>
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
