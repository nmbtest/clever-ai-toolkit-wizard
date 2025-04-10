
import Header from "@/components/Header";
import TextToSpeech from "@/components/TextToSpeech";
import ImageToText from "@/components/ImageToText";
import ArticleGenerator from "@/components/ArticleGenerator";
import { BrainCircuit } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero section */}
        <div className="text-center my-12">
          <div className="flex justify-center">
            <BrainCircuit className="h-16 w-16 text-tool-purple" />
          </div>
          <h1 className="mt-4 text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">AI Toolkit</span>
            <span className="block text-2xl sm:text-3xl md:text-4xl mt-3 bg-gradient-to-r from-tool-purple to-tool-pink text-transparent bg-clip-text">
              Powerful AI tools at your fingertips
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Explore our collection of AI-powered tools to enhance your productivity
          </p>
        </div>
        
        {/* Tools section */}
        <div className="space-y-12">
          <div>
            <TextToSpeech />
          </div>
          
          <div>
            <ImageToText />
          </div>
          
          <div>
            <ArticleGenerator />
          </div>
        </div>
      </main>
      
      <footer className="bg-white mt-12 py-8 border-t">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© 2025 AI Toolkit. All rights reserved.</p>
          <p className="text-sm mt-2">Powered by advanced AI technologies</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
