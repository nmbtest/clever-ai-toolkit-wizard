
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ToolCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
  onClick: () => void;
}

export default function ToolCard({ icon, title, description, bgColor, onClick }: ToolCardProps) {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all bg-[#16213e] text-white overflow-hidden">
      <div className={`h-1 w-full ${bgColor}`}></div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="p-2 rounded-lg bg-[#0f3460] text-[#e94560]">
            {icon}
          </div>
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-300 min-h-[80px]">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="border-t border-gray-800 pt-4">
        <Button 
          onClick={onClick} 
          className="ml-auto bg-[#0f3460] hover:bg-[#0f3460]/80 text-white"
        >
          Try Now <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
