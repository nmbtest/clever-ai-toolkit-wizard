
import { BrainCircuit, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Add scroll effect to header
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setIsMenuOpen(false);
    
    // Smooth scroll to category section
    const element = document.getElementById(category);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#1a1a2e]/95 backdrop-blur-sm shadow-md' : 'bg-[#1a1a2e] shadow-sm'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <BrainCircuit className="h-8 w-8 text-[#e94560]" />
              <span className="ml-2 text-xl font-bold text-white font-sans">
                AI Toolkit Pro
              </span>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-[#16213e] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#e94560]"
              aria-expanded="false"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:ml-6 md:flex md:space-x-8">
            <button 
              onClick={() => handleCategoryChange("all")}
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors duration-200 ${activeCategory === "all" ? "text-white border-[#e94560]" : "text-gray-300 hover:text-white border-transparent hover:border-gray-300"}`}
            >
              All Tools
            </button>
            <button 
              onClick={() => handleCategoryChange("text")}
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors duration-200 ${activeCategory === "text" ? "text-white border-[#e94560]" : "text-gray-300 hover:text-white border-transparent hover:border-gray-300"}`}
            >
              Text Tools
            </button>
            <button 
              onClick={() => handleCategoryChange("voice")}
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors duration-200 ${activeCategory === "voice" ? "text-white border-[#e94560]" : "text-gray-300 hover:text-white border-transparent hover:border-gray-300"}`}
            >
              Voice Tools
            </button>
            <button 
              onClick={() => handleCategoryChange("image")}
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors duration-200 ${activeCategory === "image" ? "text-white border-[#e94560]" : "text-gray-300 hover:text-white border-transparent hover:border-gray-300"}`}
            >
              Image Tools
            </button>
            <button 
              onClick={() => handleCategoryChange("video")}
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors duration-200 ${activeCategory === "video" ? "text-white border-[#e94560]" : "text-gray-300 hover:text-white border-transparent hover:border-gray-300"}`}
            >
              Video Tools
            </button>
          </nav>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#16213e]">
          <div className="pt-2 pb-3 space-y-1">
            <button 
              onClick={() => handleCategoryChange("all")}
              className={`block w-full text-left pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200 ${activeCategory === "all" ? "border-[#e94560] text-white bg-[#0f3460]/50" : "border-transparent text-gray-300 hover:bg-[#0f3460]/30 hover:border-gray-300 hover:text-white"}`}
            >
              All Tools
            </button>
            <button 
              onClick={() => handleCategoryChange("text")}
              className={`block w-full text-left pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200 ${activeCategory === "text" ? "border-[#e94560] text-white bg-[#0f3460]/50" : "border-transparent text-gray-300 hover:bg-[#0f3460]/30 hover:border-gray-300 hover:text-white"}`}
            >
              Text Tools
            </button>
            <button 
              onClick={() => handleCategoryChange("voice")}
              className={`block w-full text-left pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200 ${activeCategory === "voice" ? "border-[#e94560] text-white bg-[#0f3460]/50" : "border-transparent text-gray-300 hover:bg-[#0f3460]/30 hover:border-gray-300 hover:text-white"}`}
            >
              Voice Tools
            </button>
            <button 
              onClick={() => handleCategoryChange("image")}
              className={`block w-full text-left pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200 ${activeCategory === "image" ? "border-[#e94560] text-white bg-[#0f3460]/50" : "border-transparent text-gray-300 hover:bg-[#0f3460]/30 hover:border-gray-300 hover:text-white"}`}
            >
              Image Tools
            </button>
            <button 
              onClick={() => handleCategoryChange("video")}
              className={`block w-full text-left pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200 ${activeCategory === "video" ? "border-[#e94560] text-white bg-[#0f3460]/50" : "border-transparent text-gray-300 hover:bg-[#0f3460]/30 hover:border-gray-300 hover:text-white"}`}
            >
              Video Tools
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
