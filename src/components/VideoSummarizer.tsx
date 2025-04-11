
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { FileVideo, Link2, Copy, Clock, Download, List } from "lucide-react";

export default function VideoSummarizer() {
  const { t, dir } = useLanguage();
  const [videoUrl, setVideoUrl] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [summaryLength, setSummaryLength] = useState("medium");
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState("");
  const [keyPoints, setKeyPoints] = useState<string[]>([]);
  const [transcriptShown, setTranscriptShown] = useState(false);
  const [transcript, setTranscript] = useState("");

  const summaryLengths = [
    { id: "short", name: t("Short") },
    { id: "medium", name: t("Medium") },
    { id: "detailed", name: t("Detailed") },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        setVideoFile(file);
        setVideoUrl("");
        toast.success(t("Video file selected"));
      } else {
        toast.error(t("Please select a valid video file"));
      }
    }
  };

  const handleUrlSubmit = () => {
    if (!videoUrl.trim()) {
      toast.error(t("Please enter a video URL"));
      return;
    }
    
    // Simple URL validation
    if (!videoUrl.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com).+/)) {
      toast.error(t("Please enter a valid YouTube or Vimeo URL"));
      return;
    }
    
    setVideoFile(null);
    processSummary();
  };

  const handleFileSubmit = () => {
    if (!videoFile) {
      toast.error(t("Please select a video file"));
      return;
    }
    
    processSummary();
  };

  const processSummary = () => {
    setIsProcessing(true);
    
    // Simulate processing - in a real app this would call an API
    setTimeout(() => {
      // Generate demo summary based on length
      const demoSummaries = {
        short: t("This video discusses the impact of artificial intelligence on modern society, focusing on ethical considerations and future applications in healthcare and education."),
        medium: t("This educational video explores the evolving impact of artificial intelligence on modern society over the past decade. It discusses ethical considerations around AI development, highlighting concerns about privacy, bias, and job displacement. The presenter also covers promising applications in healthcare diagnostics and personalized education, concluding with policy recommendations for responsible AI governance."),
        detailed: t("This 25-minute educational video provides a comprehensive overview of artificial intelligence's impact on modern society. The presenter, Dr. Sarah Chen, begins by tracing AI development over the past decade, emphasizing the transition from narrow to more general AI applications. The first section explores ethical considerations, with detailed examples of privacy concerns in facial recognition, algorithmic bias in hiring processes, and potential job displacement in manufacturing and service industries. The middle portion examines promising applications, with case studies of AI in medical diagnostics showing a 30% improvement in early cancer detection rates, and adaptive learning platforms that have demonstrated significant improvements in student outcomes across diverse learning environments. The final segment offers policy recommendations, including establishing independent oversight committees, requiring algorithmic transparency for high-risk applications, and creating support systems for workforce transition. The video concludes by emphasizing that responsible AI governance requires collaboration between technologists, policymakers, and the general public.")
      };
      
      setSummary(demoSummaries[summaryLength as keyof typeof demoSummaries]);
      
      // Generate demo key points
      setKeyPoints([
        t("AI development has accelerated dramatically in the past decade"),
        t("Ethical concerns include privacy issues, algorithmic bias, and job displacement"),
        t("Healthcare applications show promising results in early disease detection"),
        t("Educational AI tools can provide personalized learning experiences"),
        t("Responsible governance requires collaboration between multiple stakeholders")
      ]);
      
      // Generate demo transcript
      setTranscript(t("Full transcript of the video would appear here. This would include a timestamped, verbatim record of all spoken content from the video, allowing users to reference specific points in detail. The transcript would be searchable and could be used for further analysis or reference."));
      
      setIsProcessing(false);
      toast.success(t("Video successfully summarized"));
    }, 3000);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(t("Copied to clipboard"));
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob(
      [
        `# ${t("Video Summary")}\n\n${summary}\n\n## ${t("Key Points")}\n${keyPoints.map(point => `- ${point}`).join('\n')}\n\n## ${t("Full Transcript")}\n\n${transcript}`
      ], 
      {type: 'text/plain'}
    );
    element.href = URL.createObjectURL(file);
    element.download = "video-summary.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success(t("Summary downloaded"));
  };

  return (
    <Card className={`bg-[#16213e] border-0 shadow-lg text-white max-w-4xl mx-auto ${dir === "rtl" ? "text-right" : ""}`}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">{t("AI Video Summarizer")}</CardTitle>
        <CardDescription className="text-gray-300 text-center">{t("Generate concise summaries of video content with key points highlighted")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-4">{t("Upload or Link Video")}</h3>
              
              <div className="mb-4">
                <label className="block text-white mb-2">{t("YouTube or Vimeo URL")}</label>
                <div className="flex gap-2">
                  <Input
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder={t("Paste video URL...")}
                    className="bg-[#0a1e3b] border-[#0f3460] text-white flex-1"
                  />
                  <Button 
                    onClick={handleUrlSubmit} 
                    disabled={isProcessing || !videoUrl.trim()}
                    className="bg-[#0f3460] hover:bg-[#0f3460]/80 text-white whitespace-nowrap"
                  >
                    <Link2 className="mr-2 h-4 w-4" />
                    {t("Process URL")}
                  </Button>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-white mb-2">{t("Or Upload Video File")}</label>
                <div className="border-2 border-dashed border-[#0f3460] rounded-lg p-4 text-center bg-[#0a1e3b] transition-colors hover:border-[#e94560]">
                  <FileVideo className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-400 mb-2">{videoFile ? videoFile.name : t("Drag & drop your video or click to browse")}</p>
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    id="video-upload"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="video-upload">
                    <div className="inline-block">
                      <Button 
                        variant="outline" 
                        className="border-[#0f3460] text-white hover:bg-[#0f3460]/50"
                      >
                        {t("Choose File")}
                      </Button>
                    </div>
                  </label>
                </div>
                
                {videoFile && (
                  <Button 
                    onClick={handleFileSubmit} 
                    disabled={isProcessing}
                    className="mt-2 bg-[#0f3460] hover:bg-[#0f3460]/80 text-white w-full"
                  >
                    <FileVideo className="mr-2 h-4 w-4" />
                    {t("Process Video")}
                  </Button>
                )}
              </div>
              
              <div>
                <label className="block text-white mb-2">{t("Summary Length")}</label>
                <Select value={summaryLength} onValueChange={setSummaryLength}>
                  <SelectTrigger className="bg-[#0a1e3b] border-[#0f3460] text-white">
                    <SelectValue placeholder={t("Select length")} />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a1e3b] border-[#0f3460] text-white">
                    {summaryLengths.map(length => (
                      <SelectItem key={length.id} value={length.id}>{length.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="bg-[#0a1e3b] border border-[#0f3460] rounded-lg p-4 flex flex-col">
            {isProcessing ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="animate-spin h-10 w-10 border-3 border-[#e94560] border-t-transparent rounded-full mb-4"></div>
                <p className="text-gray-300">{t("Processing your video...")}</p>
                <p className="text-xs text-gray-400 mt-2">{t("This may take a few minutes depending on the video length")}</p>
              </div>
            ) : summary ? (
              <div className="flex flex-col h-full">
                <h3 className="text-lg font-medium mb-4 flex justify-between items-center">
                  <span>{t("Summary")}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleCopy(summary)}
                    className="text-gray-400 hover:text-white"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </h3>
                
                <div className="bg-[#16213e] rounded-md p-3 mb-4 text-sm text-gray-300">
                  {summary}
                </div>
                
                <h3 className="text-lg font-medium mb-2">{t("Key Points")}</h3>
                <ul className="list-disc list-inside mb-4 space-y-1 text-sm text-gray-300">
                  {keyPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
                
                <div className="mt-auto space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full border-[#0f3460] text-white hover:bg-[#0f3460]/50 justify-between"
                    onClick={() => setTranscriptShown(!transcriptShown)}
                  >
                    <span>{t("View Full Transcript")}</span>
                    <List className="h-4 w-4" />
                  </Button>
                  
                  {transcriptShown && (
                    <div className="bg-[#16213e] rounded-md p-3 text-xs text-gray-400 max-h-32 overflow-y-auto">
                      {transcript}
                    </div>
                  )}
                  
                  <Button 
                    onClick={handleDownload} 
                    className="w-full bg-[#0f3460] hover:bg-[#0f3460]/80 text-white"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {t("Download Summary")}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <Clock className="h-16 w-16 text-gray-500 mb-4" />
                <p className="text-gray-400">{t("Your video summary will appear here")}</p>
                <p className="text-xs text-gray-500 mt-2">{t("Upload a video or provide a URL to get started")}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
