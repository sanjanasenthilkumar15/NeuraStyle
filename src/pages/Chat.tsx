import { useState } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { ProductCarousel } from "@/components/products/ProductCarousel";
import { sampleProducts, getAIRecommendedProducts, getTrendingProducts } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hi! 👋 I'm your NEURAStyle AI assistant. How can I help you shop today? I can recommend outfits, check inventory, or help you find the perfect look!",
    timestamp: "Just now",
  },
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your style preferences, I've curated some amazing pieces for you! The Premium Cotton Blazer would be perfect for your upcoming meetings, and it pairs beautifully with our Slim Fit Denim Jeans.",
        "I found some great options! Would you like to try them on using our AR feature? You can see exactly how they'll look on you before making a decision.",
        "Great choice! I can check the inventory at your nearest store. The items are available for same-day pickup, or I can arrange express delivery to your address.",
      ];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: "Just now",
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-32">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Context Badge */}
          <div className="flex items-center justify-center mb-6">
            <Badge variant="ai" className="gap-1.5 px-4 py-2">
              <Sparkles className="w-4 h-4" />
              Personalized for you based on past browsing
            </Badge>
          </div>

          {/* Chat Messages */}
          <div className="space-y-4 mb-8">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                role={message.role}
                content={message.content}
                timestamp={message.timestamp}
              />
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary-foreground animate-pulse" />
                </div>
                <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Product Recommendations */}
          <ProductCarousel
            title="AI Curated Styles"
            subtitle="Personalized picks based on your preferences"
            products={getAIRecommendedProducts()}
          />

          <ProductCarousel
            title="Trending Now"
            subtitle="What's hot this season"
            products={getTrendingProducts()}
          />
        </div>

        {/* Fixed Chat Input */}
        <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-border p-4">
          <div className="container mx-auto max-w-4xl">
            <ChatInput onSend={handleSend} isLoading={isLoading} />
          </div>
        </div>
      </main>
    </div>
  );
}
