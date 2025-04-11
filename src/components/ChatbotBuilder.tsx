import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { Bot, Upload, Trash2, Plus, FileUp, Send } from "lucide-react";

export default function ChatbotBuilder() {
  const { t, dir } = useLanguage();
  const [chatbotName, setChatbotName] = useState("");
  const [personalityDescription, setPersonalityDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [knowledgeFiles, setKnowledgeFiles] = useState<File[]>([]);
  const [knowledgeText, setKnowledgeText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setKnowledgeFiles([...knowledgeFiles, ...files]);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...knowledgeFiles];
    newFiles.splice(index, 1);
    setKnowledgeFiles(newFiles);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setKnowledgeText(e.target.value);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      setChatHistory([...chatHistory, currentMessage]);
      setCurrentMessage("");
      // Here you would typically send the message to your chatbot API
      // and update the chat history with the response.
      // For this example, we'll just add a placeholder response.
      setTimeout(() => {
        setChatHistory(prev => [...prev, "This is a simulated response from the chatbot."]);
      }, 500);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!chatbotName.trim()) {
      // Fix: Remove any second argument to toast.error
      toast.error(t("Please enter a name for your chatbot"));
      return;
    }
    
    if (!personalityDescription.trim()) {
      toast.error(t("Please describe your chatbot's personality"));
      return;
    }
    
    setIsProcessing(true);
    // Simulate processing - in a real app this would call an API
    setTimeout(() => {
      setIsProcessing(false);
      toast.success(t("Chatbot created successfully"));
    }, 2000);
  };

  return (
    <Card className={`bg-[#16213e] border-0 shadow-lg text-white max-w-4xl mx-auto ${dir === "rtl" ? "text-right" : ""}`}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">{t("Chatbot Builder")}</CardTitle>
        <CardDescription className="text-gray-300 text-center">{t("Create and customize your own AI chatbot")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-2" htmlFor="chatbotName">{t("Chatbot Name")}</label>
            <Input
              type="text"
              id="chatbotName"
              placeholder={t("Enter chatbot name")}
              className="bg-[#0a1e3b] border-[#0f3460] text-white"
              value={chatbotName}
              onChange={(e) => setChatbotName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-white mb-2" htmlFor="personality">{t("Personality Description")}</label>
            <Textarea
              id="personality"
              placeholder={t("Describe the chatbot's personality")}
              className="bg-[#0a1e3b] border-[#0f3460] text-white resize-none"
              value={personalityDescription}
              onChange={(e) => setPersonalityDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-white mb-2" htmlFor="instructions">{t("Instructions")}</label>
            <Textarea
              id="instructions"
              placeholder={t("Specific instructions for the chatbot (optional)")}
              className="bg-[#0a1e3b] border-[#0f3460] text-white resize-none"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-white mb-2">{t("Upload Knowledge Files")}</label>
            <div className="border-2 border-dashed border-[#0f3460] rounded-lg p-4 text-center bg-[#0a1e3b] transition-colors hover:border-[#e94560]">
              <FileUp className="h-10 w-10 mx-auto mb-2 text-gray-400" />
              <p className="text-gray-400 mb-2">{t("Drag & drop files or click to browse")}</p>
              <input
                type="file"
                multiple
                className="hidden"
                id="knowledge-upload"
                onChange={handleFileChange}
              />
              <label htmlFor="knowledge-upload">
                <Button variant="outline" className="border-[#0f3460] text-white hover:bg-[#0f3460]/50">
                  {t("Choose Files")}
                </Button>
              </label>
            </div>
            {knowledgeFiles.length > 0 && (
              <div className="mt-4">
                <h4 className="text-lg font-medium mb-2">{t("Uploaded Files")}</h4>
                <ul>
                  {knowledgeFiles.map((file, index) => (
                    <li key={index} className="flex items-center justify-between py-2 px-4 bg-[#0a1e3b] rounded-md mb-2">
                      <span>{file.name}</span>
                      <Button variant="ghost" size="sm" onClick={() => handleRemoveFile(index)} className="text-red-500 hover:text-red-400">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div>
            <label className="block text-white mb-2" htmlFor="knowledgeText">{t("Additional Knowledge (Text)")}</label>
            <Textarea
              id="knowledgeText"
              placeholder={t("Enter any additional knowledge for the chatbot")}
              className="bg-[#0a1e3b] border-[#0f3460] text-white resize-none"
              value={knowledgeText}
              onChange={handleTextChange}
            />
          </div>
          <Button disabled={isProcessing} className="w-full bg-[#0f3460] hover:bg-[#0f3460]/80 text-white">
            {isProcessing ? (
              <>
                <Bot className="mr-2 h-4 w-4 animate-pulse" />
                {t("Creating Chatbot...")}
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                {t("Create Chatbot")}
              </>
            )}
          </Button>
        </form>
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">{t("Chat History")}</h3>
          <div className="space-y-2">
            {chatHistory.map((message, index) => (
              <div key={index} className={`p-3 rounded-md ${index % 2 === 0 ? 'bg-[#0a1e3b]' : 'bg-[#16213e]'}`}>
                {message}
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center">
            <Input
              type="text"
              placeholder={t("Type your message...")}
              className="bg-[#0a1e3b] border-[#0f3460] text-white flex-1 mr-2"
              value={currentMessage}
              onChange={handleMessageChange}
            />
            <Button onClick={handleSendMessage} className="bg-[#0f3460] hover:bg-[#0f3460]/80 text-white">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
