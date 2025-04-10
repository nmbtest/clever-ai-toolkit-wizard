
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Copy, Loader2, Sparkles, RefreshCw } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export default function ArticleGenerator() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("informative");
  const [length, setLength] = useState(500);
  const [keywords, setKeywords] = useState("");
  const [includeHeadings, setIncludeHeadings] = useState(true);
  const [includeSummary, setIncludeSummary] = useState(true);
  const [generatedArticle, setGeneratedArticle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  
  const generateArticle = () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic for your article");
      return;
    }
    
    setIsGenerating(true);
    setGeneratedArticle("");
    setGenerationProgress(0);
    
    // Simulate AI generation with progress updates
    let progress = 0;
    const keywordsArray = keywords.split(",").map(k => k.trim()).filter(k => k);
    
    const progressInterval = setInterval(() => {
      progress += 10;
      setGenerationProgress(progress);
      
      if (progress >= 100) {
        clearInterval(progressInterval);
        
        // Generate an article based on the provided parameters
        const article = generateSampleArticle(
          topic, 
          tone, 
          length, 
          keywordsArray, 
          includeHeadings,
          includeSummary
        );
        
        setGeneratedArticle(article);
        setIsGenerating(false);
        toast.success("Article generated successfully!");
      }
    }, 400);
  };
  
  const regenerateArticle = () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    setGenerationProgress(0);
    
    // Simulate AI regeneration with progress updates
    let progress = 0;
    const keywordsArray = keywords.split(",").map(k => k.trim()).filter(k => k);
    
    const progressInterval = setInterval(() => {
      progress += 15; // Slightly faster for regeneration
      setGenerationProgress(progress);
      
      if (progress >= 100) {
        clearInterval(progressInterval);
        
        // Generate a different article based on the same parameters
        const article = generateSampleArticle(
          topic, 
          tone, 
          length, 
          keywordsArray, 
          includeHeadings,
          includeSummary,
          true // alternative version
        );
        
        setGeneratedArticle(article);
        setIsGenerating(false);
        toast.success("Article regenerated with new content!");
      }
    }, 300);
  };
  
  // Function to generate a sample article based on the parameters
  const generateSampleArticle = (
    topic: string, 
    tone: string, 
    length: number,
    keywords: string[],
    includeHeadings: boolean,
    includeSummary: boolean,
    alternative = false
  ) => {
    // Format the topic to be more readable
    const formattedTopic = topic.charAt(0).toUpperCase() + topic.slice(1);
    
    // Generate a title
    const titles = [
      `Understanding ${formattedTopic}: A Comprehensive Guide`,
      `The Ultimate Guide to ${formattedTopic}`,
      `Everything You Need to Know About ${formattedTopic}`,
      `${formattedTopic}: An In-depth Analysis`,
      `Exploring the World of ${formattedTopic}`
    ];
    const title = alternative ? 
      titles[Math.floor(Math.random() * titles.length)] : 
      titles[0];
    
    // Generate introduction based on tone
    let introduction = "";
    if (tone === "professional") {
      introduction = `This article presents a thorough analysis of ${formattedTopic}. The following sections will explore various aspects of this subject, providing valuable insights for professionals in the field.`;
    } else if (tone === "casual") {
      introduction = `Hey there! Ever wondered about ${formattedTopic}? It's a pretty fascinating topic, and we're going to dive into it today. Let's break it down in a way that's easy to understand.`;
    } else { // informative
      introduction = `${formattedTopic} is an important topic that warrants comprehensive understanding. This article explores the key aspects of ${formattedTopic} and provides useful information for readers interested in this subject.`;
    }
    
    // Generate headings if requested
    const headings = [
      `The History of ${formattedTopic}`,
      `Key Components of ${formattedTopic}`,
      `Applications and Uses of ${formattedTopic}`,
      `Challenges and Considerations`,
      `Future Developments in ${formattedTopic}`
    ];
    
    // Generate content paragraphs
    const paragraphs = [];
    
    // Add a paragraph for each heading if headings are included
    if (includeHeadings) {
      for (let i = 0; i < Math.min(headings.length, Math.ceil(length / 200)); i++) {
        const heading = headings[i];
        paragraphs.push(`## ${heading}\n\n`);
        
        // Generate 1-2 paragraphs per heading
        for (let j = 0; j < (length > 500 ? 2 : 1); j++) {
          let paragraph = "";
          
          // Professional tone
          if (tone === "professional") {
            paragraph = `Research indicates that ${formattedTopic} has evolved significantly over time. Analysis of recent developments suggests that stakeholders should consider multiple factors when approaching this subject. ${keywords.length > 0 ? `Notably, ${keywords[Math.floor(Math.random() * keywords.length)]} plays a crucial role in understanding this domain.` : ''} Experts in the field have documented various methodologies that can be applied to optimize outcomes.`;
          } 
          // Casual tone
          else if (tone === "casual") {
            paragraph = `So, let's talk about ${heading.toLowerCase()}. It's pretty interesting how things have changed over the years. ${keywords.length > 0 ? `I've found that ${keywords[Math.floor(Math.random() * keywords.length)]} is super important here.` : ''} When you really think about it, there's a lot more to ${formattedTopic.toLowerCase()} than meets the eye. It's definitely worth learning more about!`;
          } 
          // Informative tone (default)
          else {
            paragraph = `When examining ${heading.toLowerCase()}, several important factors come into play. ${keywords.length > 0 ? `The concept of ${keywords[Math.floor(Math.random() * keywords.length)]} is particularly relevant in this context.` : ''} Understanding these elements provides valuable insight into the broader implications of ${formattedTopic.toLowerCase()}. Studies have shown that this approach yields the most comprehensive understanding of the subject.`;
          }
          
          paragraphs.push(`${paragraph}\n\n`);
        }
      }
    } 
    // If no headings, just generate paragraphs
    else {
      const paragraphCount = Math.ceil(length / 150);
      for (let i = 0; i < paragraphCount; i++) {
        let paragraph = "";
        
        // Professional tone
        if (tone === "professional") {
          paragraph = `Analysis of ${formattedTopic} reveals multiple facets worthy of consideration. ${keywords.length > i ? `The concept of ${keywords[i]} is particularly significant in this context.` : ''} Research indicates that a methodical approach yields optimal results when addressing challenges in this domain. Stakeholders are advised to consider various perspectives when formulating strategies.`;
        } 
        // Casual tone
        else if (tone === "casual") {
          paragraph = `Let's dive a bit deeper into ${formattedTopic.toLowerCase()}. ${keywords.length > i ? `I've always found that ${keywords[i]} is really interesting to think about.` : ''} It's amazing how many different angles there are to this topic. When you look at it closely, you start to see patterns that weren't obvious at first glance.`;
        } 
        // Informative tone (default)
        else {
          paragraph = `${formattedTopic} encompasses several key aspects that merit further exploration. ${keywords.length > i ? `The relationship between ${formattedTopic.toLowerCase()} and ${keywords[i]} provides valuable insight.` : ''} Understanding these connections helps to build a more comprehensive view of the subject. Recent developments have expanded our knowledge in significant ways.`;
        }
        
        paragraphs.push(`${paragraph}\n\n`);
      }
    }
    
    // Add summary if requested
    let summary = "";
    if (includeSummary) {
      if (tone === "professional") {
        summary = `## Conclusion\n\nIn conclusion, this analysis of ${formattedTopic} has explored various critical aspects of the subject. The insights provided herein should serve as a foundation for further research and application in professional contexts.`;
      } else if (tone === "casual") {
        summary = `## Wrapping Up\n\nSo there you have it! We've covered a lot about ${formattedTopic.toLowerCase()}, and I hope you found it helpful. The next time this topic comes up, you'll have plenty to talk about!`;
      } else {
        summary = `## Summary\n\nTo summarize, ${formattedTopic} is a multifaceted subject with various important components. This article has explored key aspects to provide a comprehensive understanding of the topic. Readers are encouraged to apply this knowledge in relevant contexts.`;
      }
    }
    
    // Combine all parts of the article
    return `# ${title}\n\n${introduction}\n\n${paragraphs.join('')}${summary}`;
  };
  
  const copyToClipboard = () => {
    if (generatedArticle) {
      navigator.clipboard.writeText(generatedArticle);
      toast.success("Article copied to clipboard!");
    }
  };
  
  return (
    <Card id="article-generator" className="w-full border-0 shadow-lg hover:shadow-xl transition-shadow bg-[#16213e] text-white overflow-hidden">
      <div className="h-1 w-full bg-gradient-to-r from-[#5b8def] to-[#7da6f4]"></div>
      <CardHeader className="bg-[#16213e]">
        <CardTitle className="text-white flex items-center">
          <FileText className="mr-2 h-6 w-6" />
          Article Generator
        </CardTitle>
        <CardDescription className="text-gray-300">
          Generate high-quality articles on any topic
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Topic or Title
            </label>
            <Input
              placeholder="Enter a topic or title for your article..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="bg-[#0f3460] text-white border-[#0f3460] focus:border-[#5b8def] placeholder:text-gray-400"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Tone
              </label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="bg-[#0f3460] border-[#0f3460] text-white">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent className="bg-[#0f3460] text-white border-[#0f3460]">
                  <SelectItem value="informative">Informative</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Length (words): {length}
              </label>
              <Slider
                value={[length]}
                min={300}
                max={1500}
                step={100}
                onValueChange={(value) => setLength(value[0])}
                className="py-4"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Keywords (comma separated)
            </label>
            <Input
              placeholder="Enter keywords to include in your article..."
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="bg-[#0f3460] text-white border-[#0f3460] focus:border-[#5b8def] placeholder:text-gray-400"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="include-headings" 
                checked={includeHeadings} 
                onCheckedChange={(checked) => setIncludeHeadings(checked as boolean)}
                className="data-[state=checked]:bg-[#5b8def] data-[state=checked]:border-[#5b8def]"
              />
              <label
                htmlFor="include-headings"
                className="text-sm font-medium text-gray-300 leading-none cursor-pointer"
              >
                Include Headings
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="include-summary" 
                checked={includeSummary} 
                onCheckedChange={(checked) => setIncludeSummary(checked as boolean)}
                className="data-[state=checked]:bg-[#5b8def] data-[state=checked]:border-[#5b8def]"
              />
              <label
                htmlFor="include-summary"
                className="text-sm font-medium text-gray-300 leading-none cursor-pointer"
              >
                Include Summary
              </label>
            </div>
          </div>
          
          {isGenerating && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Generating article...</span>
                <span className="text-sm text-gray-400">{generationProgress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-gradient-to-r from-[#5b8def] to-[#7da6f4] h-2.5 rounded-full" 
                  style={{ width: `${generationProgress}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {generatedArticle && (
            <div className="space-y-2 pt-4">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-300">
                  Generated Article
                </label>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={copyToClipboard}
                  className="h-8 px-2 text-gray-400 hover:text-white"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                value={generatedArticle}
                onChange={(e) => setGeneratedArticle(e.target.value)}
                className="min-h-[300px] font-mono text-sm bg-[#0f3460] text-white border-[#0f3460] focus:border-[#5b8def]"
              />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-800 pt-4 flex justify-between">
        {generatedArticle && (
          <Button
            variant="outline"
            onClick={regenerateArticle}
            disabled={isGenerating}
            className="border-[#0f3460] bg-[#0f3460] text-white hover:bg-[#0f3460]/80"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Regenerate
          </Button>
        )}
        
        <Button
          onClick={generateArticle}
          disabled={isGenerating || !topic.trim()}
          className={`${generatedArticle ? '' : 'ml-auto'} bg-gradient-to-r from-[#5b8def] to-[#7da6f4] hover:from-[#5b8def]/90 hover:to-[#7da6f4]/90 text-white`}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Article
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
