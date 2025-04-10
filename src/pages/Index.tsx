
import Header from "@/components/Header";
import TextToSpeech from "@/components/TextToSpeech";
import ImageToText from "@/components/ImageToText";
import ArticleGenerator from "@/components/ArticleGenerator";
import { BrainCircuit, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

const Index = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Animate content on load
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero section with animation */}
        <div className={`text-center my-16 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex justify-center">
            <BrainCircuit className="h-20 w-20 text-tool-purple animate-pulse-slow" />
          </div>
          <h1 className="mt-6 text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">AI Toolkit</span>
            <span className="block text-2xl sm:text-3xl md:text-4xl mt-3 bg-gradient-to-r from-tool-purple to-tool-pink text-transparent bg-clip-text">
              Powerful AI tools at your fingertips
            </span>
          </h1>
          <p className="mt-5 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Transform text to speech, extract text from images, and generate articles with our AI-powered tools
          </p>
          
          {/* Quick navigation links */}
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <button 
              onClick={() => scrollToSection('text-to-speech')} 
              className="px-5 py-2 text-sm font-medium rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all text-gray-700 hover:text-tool-purple"
            >
              Text to Speech
            </button>
            <button 
              onClick={() => scrollToSection('image-to-text')} 
              className="px-5 py-2 text-sm font-medium rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all text-gray-700 hover:text-tool-blue"
            >
              Image to Text
            </button>
            <button 
              onClick={() => scrollToSection('article-generator')} 
              className="px-5 py-2 text-sm font-medium rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all text-gray-700 hover:text-tool-pink"
            >
              Article Generator
            </button>
          </div>
          
          {/* Scroll indicator */}
          <div className="flex justify-center mt-16 animate-bounce">
            <ChevronDown className="h-6 w-6 text-gray-400" />
          </div>
        </div>
        
        {/* Tools section with staggered animation */}
        <div className="space-y-20 mb-20">
          <div className={`transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
            <TextToSpeech />
          </div>
          
          <div className={`transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '400ms' }}>
            <ImageToText />
          </div>
          
          <div className={`transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '600ms' }}>
            <ArticleGenerator />
          </div>
        </div>
      </main>
      
      <footer className="bg-white py-12 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500">© 2025 AI Toolkit. All rights reserved.</p>
          <p className="text-sm mt-2 text-gray-400">Powered by advanced AI technologies</p>
          <div className="mt-6 flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
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
