
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
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { MessageSquare, Code, Save, Send, Plus, Trash2 } from "lucide-react";

export default function ChatbotBuilder() {
  const { t, dir } = useLanguage();
  const [chatbotName, setChatbotName] = useState("");
  const [personality, setPersonality] = useState("friendly");
  const [instructions, setInstructions] = useState("");
  const [activeTab, setActiveTab] = useState("config");
  const [userMessage, setUserMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([]);
  const [knowledgeBase, setKnowledgeBase] = useState<string[]>([]);
  const [newKnowledge, setNewKnowledge] = useState("");

  const personalityTypes = [
    { id: "friendly", name: t("Friendly") },
    { id: "professional", name: t("Professional") },
    { id: "casual", name: t("Casual") },
    { id: "humorous", name: t("Humorous") },
    { id: "technical", name: t("Technical") },
  ];

  const handleSave = () => {
    if (!chatbotName.trim()) {
      toast.error(t("Please enter a name for your chatbot"));
      return;
    }

    setIsSaving(true);
    
    // Simulate saving - in a real app, this would call an API
    setTimeout(() => {
      setIsSaving(false);
      toast.success(t("Chatbot saved successfully"));
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!userMessage.trim()) return;
    
    // Add user message to chat
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTesting(true);
    
    // Simulate AI response - in a real app, this would call an API
    setTimeout(() => {
      let response = "";
      
      // Generate different responses based on personality
      switch(personality) {
        case "friendly":
          response = t("Hi there! I'm happy to help with your question. Let me find that information for you!");
          break;
        case "professional":
          response = t("Thank you for your inquiry. I'd be pleased to assist you with this matter.");
          break;
        case "casual":
          response = t("Hey! Thanks for reaching out. Let me help you with that!");
          break;
        case "humorous":
          response = t("Well hello there! I was just sitting here waiting for someone interesting to chat with!");
          break;
        case "technical":
          response = t("Analyzing query. Processing relevant information from knowledge base. Preparing response...");
          break;
        default:
          response = t("Thanks for your message. How can I help you today?");
      }
      
      setChatMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTesting(false);
      setUserMessage("");
    }, 1500);
  };

  const handleAddKnowledge = () => {
    if (!newKnowledge.trim()) return;
    setKnowledgeBase(prev => [...prev, newKnowledge]);
    setNewKnowledge("");
    toast.success(t("Knowledge added successfully"));
  };

  const handleRemoveKnowledge = (index: number) => {
    setKnowledgeBase(prev => prev.filter((_, i) => i !== index));
  };

  const clearChat = () => {
    setChatMessages([]);
  };

  const generateEmbedCode = () => {
    if (!chatbotName.trim()) {
      toast.error(t("Please enter a name for your chatbot first"));
      return;
    }

    const embedCode = `<div id="chatbot-${chatbotName.toLowerCase().replace(/\s+/g, '-')}"></div>
<script src="https://ai-toolkit-pro.com/chatbot.js"></script>
<script>
  initChatbot({
    elementId: "chatbot-${chatbotName.toLowerCase().replace(/\s+/g, '-')}",
    botId: "${Math.random().toString(36).substring(2, 12)}",
    theme: "dark"
  });
</script>`;

    navigator.clipboard.writeText(embedCode);
    toast.success(t("Embed code copied to clipboard"));
  };

  return (
    <Card className={`bg-[#16213e] border-0 shadow-lg text-white max-w-5xl mx-auto ${dir === "rtl" ? "text-right" : ""}`}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">{t("AI Chatbot Builder")}</CardTitle>
        <CardDescription className="text-gray-300 text-center">{t("Create custom AI chatbots for your website or application")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 bg-[#0a1e3b] mx-auto mb-6">
            <TabsTrigger value="config" className="data-[state=active]:bg-[#0f3460]">
              {t("Configuration")}
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="data-[state=active]:bg-[#0f3460]">
              {t("Knowledge Base")}
            </TabsTrigger>
            <TabsTrigger value="test" className="data-[state=active]:bg-[#0f3460]">
              {t("Test & Deploy")}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="config" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2">{t("Chatbot Name")}</label>
                <Input
                  value={chatbotName}
                  onChange={(e) => setChatbotName(e.target.value)}
                  placeholder={t("Enter a name for your chatbot")}
                  className="bg-[#0a1e3b] border-[#0f3460] text-white"
                />
              </div>
              
              <div>
                <label className="block text-white mb-2">{t("Personality")}</label>
                <Select value={personality} onValueChange={setPersonality}>
                  <SelectTrigger className="bg-[#0a1e3b] border-[#0f3460] text-white">
                    <SelectValue placeholder={t("Select personality")} />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a1e3b] border-[#0f3460] text-white">
                    {personalityTypes.map(type => (
                      <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="block text-white mb-2">{t("Chatbot Instructions")}</label>
              <Textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder={t("Enter detailed instructions for your chatbot's behavior and knowledge...")}
                className="bg-[#0a1e3b] border-[#0f3460] text-white min-h-32"
              />
              <p className="text-xs text-gray-400 mt-2">{t("These instructions will guide your chatbot's behavior and responses.")}</p>
            </div>
            
            <Button 
              onClick={handleSave} 
              disabled={isSaving || !chatbotName.trim()}
              className="bg-gradient-to-r from-[#e94560] to-[#f2726d] hover:from-[#e94560]/90 hover:to-[#f2726d]/90 text-white"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-opacity-20 border-t-white rounded-full" />
                  {t("Saving...")}
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {t("Save Configuration")}
                </>
              )}
            </Button>
          </TabsContent>
          
          <TabsContent value="knowledge" className="space-y-6">
            <div className="bg-[#0a1e3b] border border-[#0f3460] rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4">{t("Add Knowledge")}</h3>
              <Textarea
                value={newKnowledge}
                onChange={(e) => setNewKnowledge(e.target.value)}
                placeholder={t("Enter information that your chatbot should know...")}
                className="bg-[#16213e] border-[#0f3460] text-white mb-4"
              />
              <Button 
                onClick={handleAddKnowledge} 
                disabled={!newKnowledge.trim()}
                className="bg-[#0f3460] hover:bg-[#0f3460]/80 text-white"
              >
                <Plus className="mr-2 h-4 w-4" />
                {t("Add to Knowledge Base")}
              </Button>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">{t("Knowledge Base Items")}</h3>
              {knowledgeBase.length === 0 ? (
                <p className="text-gray-400 italic">{t("No knowledge base items yet. Add some above.")}</p>
              ) : (
                <div className="space-y-3">
                  {knowledgeBase.map((item, index) => (
                    <div key={index} className="bg-[#0a1e3b] border border-[#0f3460] rounded-lg p-3 flex justify-between items-start">
                      <p className="text-sm text-white mr-2">{item}</p>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleRemoveKnowledge(index)}
                        className="text-gray-400 hover:text-[#e94560]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="test" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0a1e3b] border border-[#0f3460] rounded-lg p-4 h-96 flex flex-col">
                <h3 className="text-lg font-medium mb-4">{t("Test Your Chatbot")}</h3>
                
                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                  {chatMessages.length === 0 ? (
                    <p className="text-gray-400 italic text-center">{t("Your conversation will appear here...")}</p>
                  ) : (
                    <>
                      {chatMessages.map((msg, index) => (
                        <div 
                          key={index} 
                          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[80%] rounded-lg p-3 ${
                              msg.role === 'user' 
                                ? 'bg-[#e94560] text-white' 
                                : 'bg-[#0f3460] text-white'
                            }`}
                          >
                            <p className="text-sm">{msg.content}</p>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
                
                <div className="flex gap-2 mt-auto">
                  <Input
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder={t("Type a message...")}
                    className="bg-[#16213e] border-[#0f3460] text-white"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={isTesting || !userMessage.trim()}
                    className="bg-[#0f3460] hover:bg-[#0f3460]/80 text-white"
                  >
                    {isTesting ? (
                      <div className="animate-spin h-4 w-4 border-2 border-white border-opacity-20 border-t-white rounded-full" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                  <Button 
                    onClick={clearChat} 
                    variant="outline" 
                    className="border-[#0f3460] text-white hover:bg-[#0f3460]/50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="bg-[#0a1e3b] border border-[#0f3460] rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4">{t("Deploy")}</h3>
                <p className="text-sm text-gray-300 mb-4">{t("Generate an embed code to add this chatbot to your website")}</p>
                
                <Button 
                  onClick={generateEmbedCode} 
                  className="mb-4 bg-[#0f3460] hover:bg-[#0f3460]/80 text-white w-full"
                >
                  <Code className="mr-2 h-4 w-4" />
                  {t("Generate Embed Code")}
                </Button>
                
                <div className="bg-[#16213e] border border-[#0f3460] rounded-lg p-3">
                  <h4 className="text-sm font-medium mb-2">{t("Preview")}</h4>
                  <div className="h-32 flex items-center justify-center border border-dashed border-[#0f3460] rounded-lg p-4">
                    <div className="flex flex-col items-center">
                      <MessageSquare className="h-8 w-8 text-[#e94560] mb-2" />
                      <p className="text-xs text-center text-gray-400">
                        {chatbotName 
                          ? t("Your {{name}} chatbot is ready to deploy", { name: chatbotName })
                          : t("Configure and save your chatbot first")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
