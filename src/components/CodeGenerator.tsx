
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
import { Code, Copy, Download, FileCode } from "lucide-react";

export default function CodeGenerator() {
  const { t, dir } = useLanguage();
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [activeTab, setActiveTab] = useState("javascript");

  const programmingLanguages = [
    { id: "javascript", name: "JavaScript" },
    { id: "typescript", name: "TypeScript" },
    { id: "python", name: "Python" },
    { id: "java", name: "Java" },
    { id: "csharp", name: "C#" },
    { id: "php", name: "PHP" },
    { id: "ruby", name: "Ruby" },
    { id: "go", name: "Go" },
    { id: "rust", name: "Rust" },
    { id: "swift", name: "Swift" },
  ];

  // Example code snippets for demo purposes
  const codeExamples = {
    javascript: `function calculateTotal(items) {
  return items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
}

// Example usage
const cart = [
  { name: 'Product 1', price: 10, quantity: 2 },
  { name: 'Product 2', price: 15, quantity: 1 }
];

console.log('Total:', calculateTotal(cart));`,
    typescript: `interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
}

// Example usage
const cart: CartItem[] = [
  { name: 'Product 1', price: 10, quantity: 2 },
  { name: 'Product 2', price: 15, quantity: 1 }
];

console.log('Total:', calculateTotal(cart));`,
    python: `def calculate_total(items):
    return sum(item['price'] * item['quantity'] for item in items)

# Example usage
cart = [
    {'name': 'Product 1', 'price': 10, 'quantity': 2},
    {'name': 'Product 2', 'price': 15, 'quantity': 1}
]

print('Total:', calculate_total(cart))`,
    java: `import java.util.List;
import java.util.ArrayList;

class CartItem {
    String name;
    double price;
    int quantity;
    
    CartItem(String name, double price, int quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}

public class Main {
    public static double calculateTotal(List<CartItem> items) {
        return items.stream()
            .mapToDouble(item -> item.price * item.quantity)
            .sum();
    }
    
    public static void main(String[] args) {
        List<CartItem> cart = new ArrayList<>();
        cart.add(new CartItem("Product 1", 10, 2));
        cart.add(new CartItem("Product 2", 15, 1));
        
        System.out.println("Total: " + calculateTotal(cart));
    }
}`,
    csharp: `using System;
using System.Collections.Generic;
using System.Linq;

class CartItem 
{
    public string Name { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
}

class Program 
{
    static decimal CalculateTotal(List<CartItem> items) 
    {
        return items.Sum(item => item.Price * item.Quantity);
    }
    
    static void Main() 
    {
        var cart = new List<CartItem> 
        {
            new CartItem { Name = "Product 1", Price = 10, Quantity = 2 },
            new CartItem { Name = "Product 2", Price = 15, Quantity = 1 }
        };
        
        Console.WriteLine($"Total: {CalculateTotal(cart)}");
    }
}`,
    php: `<?php
class CartItem {
    public string $name;
    public float $price;
    public int $quantity;
    
    function __construct(string $name, float $price, int $quantity) {
        $this->name = $name;
        $this->price = $price;
        $this->quantity = $quantity;
    }
}

function calculateTotal(array $items): float {
    return array_reduce($items, function($total, $item) {
        return $total + ($item->price * $item->quantity);
    }, 0);
}

// Example usage
$cart = [
    new CartItem("Product 1", 10, 2),
    new CartItem("Product 2", 15, 1)
];

echo "Total: " . calculateTotal($cart);
?>`,
    ruby: `class CartItem
  attr_accessor :name, :price, :quantity
  
  def initialize(name, price, quantity)
    @name = name
    @price = price
    @quantity = quantity
  end
end

def calculate_total(items)
  items.reduce(0) do |total, item|
    total + (item.price * item.quantity)
  end
end

# Example usage
cart = [
  CartItem.new("Product 1", 10, 2),
  CartItem.new("Product 2", 15, 1)
]

puts "Total: #{calculate_total(cart)}"`,
    go: `package main

import (
    "fmt"
)

type CartItem struct {
    Name     string
    Price    float64
    Quantity int
}

func calculateTotal(items []CartItem) float64 {
    var total float64
    for _, item := range items {
        total += item.Price * float64(item.Quantity)
    }
    return total
}

func main() {
    cart := []CartItem{
        {Name: "Product 1", Price: 10, Quantity: 2},
        {Name: "Product 2", Price: 15, Quantity: 1},
    }
    
    fmt.Printf("Total: %.2f\\n", calculateTotal(cart))
}`,
    rust: `struct CartItem {
    name: String,
    price: f64,
    quantity: i32,
}

fn calculate_total(items: &[CartItem]) -> f64 {
    items.iter().fold(0.0, |total, item| {
        total + (item.price * item.quantity as f64)
    })
}

fn main() {
    let cart = vec![
        CartItem {
            name: String::from("Product 1"),
            price: 10.0,
            quantity: 2,
        },
        CartItem {
            name: String::from("Product 2"),
            price: 15.0,
            quantity: 1,
        },
    ];
    
    println!("Total: {}", calculate_total(&cart));
}`,
    swift: `struct CartItem {
    let name: String
    let price: Double
    let quantity: Int
}

func calculateTotal(items: [CartItem]) -> Double {
    return items.reduce(0) { total, item in
        return total + (item.price * Double(item.quantity))
    }
}

// Example usage
let cart = [
    CartItem(name: "Product 1", price: 10, quantity: 2),
    CartItem(name: "Product 2", price: 15, quantity: 1)
]

print("Total: \\(calculateTotal(items: cart))")`
  };

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast.error(t("Please enter a description of the code you need"));
      return;
    }
    
    setIsGenerating(true);
    
    // For demo purposes, we'll use the predefined code examples
    setTimeout(() => {
      setGeneratedCode(codeExamples[language as keyof typeof codeExamples] || codeExamples.javascript);
      setActiveTab(language);
      setIsGenerating(false);
      toast.success(t("Code generated successfully"));
    }, 2000);
  };

  const handleCopyCode = () => {
    if (!generatedCode) return;
    
    navigator.clipboard.writeText(generatedCode);
    toast.success(t("Code copied to clipboard"));
  };

  const handleDownloadCode = () => {
    if (!generatedCode) return;
    
    const fileExtensions: Record<string, string> = {
      javascript: "js",
      typescript: "ts",
      python: "py",
      java: "java",
      csharp: "cs",
      php: "php",
      ruby: "rb",
      go: "go",
      rust: "rs",
      swift: "swift"
    };
    
    const extension = fileExtensions[language] || "txt";
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `generated-code.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success(t("Code downloaded"));
  };

  return (
    <Card className={`bg-[#16213e] border-0 shadow-lg text-white max-w-5xl mx-auto ${dir === "rtl" ? "text-right" : ""}`}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">{t("AI Code Generator")}</CardTitle>
        <CardDescription className="text-gray-300 text-center">{t("Generate code snippets or complete functions based on your description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <label className="block text-white mb-2">{t("What code do you need?")}</label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={t("Describe the code you want to generate, e.g. 'A function to calculate the total price of items in a shopping cart'")}
              className="bg-[#0a1e3b] border-[#0f3460] text-white h-32"
            />
          </div>
          
          <div>
            <label className="block text-white mb-2">{t("Programming Language")}</label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="bg-[#0a1e3b] border-[#0f3460] text-white">
                <SelectValue placeholder={t("Select language")} />
              </SelectTrigger>
              <SelectContent className="bg-[#0a1e3b] border-[#0f3460] text-white max-h-60 overflow-y-auto">
                {programmingLanguages.map(lang => (
                  <SelectItem key={lang.id} value={lang.id}>{lang.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating || !prompt.trim()}
              className="mt-6 w-full bg-gradient-to-r from-[#e94560] to-[#f2726d] hover:from-[#e94560]/90 hover:to-[#f2726d]/90 text-white"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-opacity-20 border-t-white rounded-full" />
                  {t("Generating...")}
                </>
              ) : (
                <>
                  <Code className="mr-2 h-4 w-4" />
                  {t("Generate Code")}
                </>
              )}
            </Button>
          </div>
        </div>
        
        {generatedCode && (
          <>
            <div className="bg-[#0a1e3b] border border-[#0f3460] rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">{t("Generated Code")}</h3>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleCopyCode} 
                    size="sm"
                    variant="outline"
                    className="border-[#0f3460] text-white hover:bg-[#0f3460]/50"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button 
                    onClick={handleDownloadCode} 
                    size="sm"
                    variant="outline"
                    className="border-[#0f3460] text-white hover:bg-[#0f3460]/50"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-4 lg:grid-cols-5 bg-[#16213e] mb-4">
                  {programmingLanguages.slice(0, window.innerWidth > 1024 ? 5 : 4).map(lang => (
                    <TabsTrigger 
                      key={lang.id} 
                      value={lang.id}
                      className="data-[state=active]:bg-[#0f3460]"
                    >
                      {lang.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {programmingLanguages.map(lang => (
                  <TabsContent key={lang.id} value={lang.id}>
                    <pre className="bg-[#16213e] rounded-lg p-4 overflow-x-auto text-sm text-white">
                      <code>{codeExamples[lang.id as keyof typeof codeExamples] || codeExamples.javascript}</code>
                    </pre>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
            
            <div className="mt-6 bg-[#0a1e3b] border border-[#0f3460] rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4">{t("Suggestions")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  variant="outline" 
                  className="justify-start border-[#0f3460] text-white hover:bg-[#0f3460]/50"
                  onClick={() => setPrompt(t("Optimize this code for better performance"))}
                >
                  <FileCode className="mr-2 h-4 w-4" />
                  {t("Optimize Performance")}
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start border-[#0f3460] text-white hover:bg-[#0f3460]/50"
                  onClick={() => setPrompt(t("Add error handling to this code"))}
                >
                  <FileCode className="mr-2 h-4 w-4" />
                  {t("Add Error Handling")}
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start border-[#0f3460] text-white hover:bg-[#0f3460]/50"
                  onClick={() => setPrompt(t("Convert this code to a class-based approach"))}
                >
                  <FileCode className="mr-2 h-4 w-4" />
                  {t("Convert to Class")}
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
