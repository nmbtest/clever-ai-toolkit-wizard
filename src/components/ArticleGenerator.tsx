
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Copy, Loader2, Sparkles } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

export default function ArticleGenerator() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("informative");
  const [length, setLength] = useState(500);
  const [generatedArticle, setGeneratedArticle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const generateArticle = () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic for your article");
      return;
    }
    
    setIsGenerating(true);
    setGeneratedArticle("");
    
    // Mock API call - in real implementation, this would call an AI text generation API
    setTimeout(() => {
      // Generate mock article content based on topic
      const article = `# ${topic.charAt(0).toUpperCase() + topic.slice(1)}
      
${tone === "professional" ? "In this comprehensive analysis" : tone === "casual" ? "Hey there! Let's chat about" : "This article explores"} ${topic}.

## Understanding ${topic.charAt(0).toUpperCase() + topic.slice(1)}

${topic.charAt(0).toUpperCase() + topic.slice(1)} is a fascinating subject that has gained significant attention in recent years. ${tone === "casual" ? "It's pretty amazing how much impact it has on our daily lives." : "The implications of this topic span across multiple domains of knowledge."} 

## Key Points to Consider

1. The historical context of ${topic}
2. Current trends and developments
3. Future projections and potential impacts

## Conclusion

${tone === "professional" ? "In conclusion, the aforementioned aspects of" : tone === "casual" ? "So, that's the scoop on" : "To summarize,"} ${topic} demonstrate its importance in our understanding of the subject matter. Further research and discussion will continue to enhance our knowledge in this area.
      `;
      
      setGeneratedArticle(article);
      setIsGenerating(false);
      toast.success("Article generated successfully!");
    }, 3000);
  };
  
  const copyToClipboard = () => {
    if (generatedArticle) {
      navigator.clipboard.writeText(generatedArticle);
      toast.success("Article copied to clipboard!");
    }
  };
  
  return (
    <Card id="article-generator" className="w-full border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="bg-gradient-to-r from-tool-pink to-tool-blue">
        <CardTitle className="text-white flex items-center">
          <FileText className="mr-2 h-6 w-6" />
          Article Generator
        </CardTitle>
        <CardDescription className="text-gray-100">
          Generate high-quality articles on any topic
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Topic or Title
            </label>
            <Input
              placeholder="Enter a topic or title for your article..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tone
              </label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="informative">Informative</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Length (words): {length}
              </label>
              <Slider
                value={[length]}
                min={100}
                max={1000}
                step={100}
                onValueChange={(value) => setLength(value[0])}
                className="py-4"
              />
            </div>
          </div>
          
          {generatedArticle && (
            <div className="space-y-2 pt-4">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">
                  Generated Article
                </label>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={copyToClipboard}
                  className="h-8 px-2 text-gray-500 hover:text-gray-700"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                value={generatedArticle}
                onChange={(e) => setGeneratedArticle(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
              />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={generateArticle}
          disabled={isGenerating || !topic.trim()}
          className="ml-auto bg-gradient-to-r from-tool-pink to-tool-blue hover:from-tool-pink/90 hover:to-tool-blue/90 text-white"
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
