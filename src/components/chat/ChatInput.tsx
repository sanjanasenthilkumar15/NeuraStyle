import { useState } from "react";
import { Send, Mic, Camera, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSend(message.trim());
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-center gap-2 p-2 bg-card border border-border rounded-2xl shadow-md">
        <Button
          type="button"
          variant="ghost"
          size="iconSm"
          className="text-muted-foreground hover:text-foreground"
        >
          <Camera className="w-5 h-5" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="iconSm"
          className="text-muted-foreground hover:text-foreground"
        >
          <Mic className="w-5 h-5" />
        </Button>
        
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask me anything about fashion..."
            className="w-full bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground px-2 py-2"
            disabled={isLoading}
          />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-muted-foreground">
            <Sparkles className="w-3 h-3" />
            <span>AI Powered</span>
          </div>
        </div>

        <Button
          type="submit"
          variant="yellow"
          size="icon"
          disabled={!message.trim() || isLoading}
          className={cn(
            "rounded-xl transition-all",
            message.trim() && "shadow-glow"
          )}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
}
