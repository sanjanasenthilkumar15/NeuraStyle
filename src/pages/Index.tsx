import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  MessageSquare, 
  Smartphone, 
  Globe, 
  Store, 
  MessageCircle, 
  Mic,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/layout/Logo";
import { Navigation } from "@/components/layout/Navigation";

const channels = [
  { id: "mobile", label: "Mobile App", icon: Smartphone, description: "Native iOS & Android" },
  { id: "web", label: "Web App", icon: Globe, description: "Browser-based experience" },
  { id: "kiosk", label: "In-Store Kiosk", icon: Store, description: "Touch-screen stations" },
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle, description: "Conversational commerce" },
  { id: "voice", label: "Voice Assistant", icon: Mic, description: "Hands-free shopping" },
];

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Recommendations",
    description: "Personalized styling powered by advanced machine learning",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Federated learning with zero-copy data processing",
  },
  {
    icon: Zap,
    title: "Real-time Inventory",
    description: "Live stock updates across all channels and locations",
  },
  {
    icon: Users,
    title: "Unified Experience",
    description: "Seamless journey across all touchpoints",
  },
];

export default function Index() {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30"
          style={{ background: "var(--gradient-glow)" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 animate-fade-in">
              <Logo size="xl" showTagline />
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Transform Your
              <span className="text-primary block mt-2">Shopping Experience</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.2s" }}>
              Enterprise-grade AI shopping assistant that delivers personalized experiences across every channel. Built for the future of retail.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <Link to="/chat">
                <Button variant="hero" size="xl" className="gap-2 w-full sm:w-auto">
                  <MessageSquare className="w-5 h-5" />
                  Start Shopping
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/admin">
                <Button variant="heroOutline" size="xl" className="gap-2 w-full sm:w-auto">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Channel Selection */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Choose Your Channel
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Continue your journey seamlessly across any touchpoint
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {channels.map((channel) => {
              const Icon = channel.icon;
              const isSelected = selectedChannel === channel.id;
              return (
                <Card
                  key={channel.id}
                  variant={isSelected ? "highlight" : "elevated"}
                  className={`p-6 cursor-pointer text-center transition-all hover:-translate-y-1 ${
                    isSelected ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedChannel(channel.id)}
                >
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                    isSelected ? "bg-primary text-primary-foreground" : "bg-secondary"
                  }`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-semibold mb-1">{channel.label}</h3>
                  <p className="text-xs text-muted-foreground">{channel.description}</p>
                </Card>
              );
            })}
          </div>

          {selectedChannel && (
            <div className="text-center mt-8 animate-fade-in">
              <Link to="/chat">
                <Button variant="yellow" size="lg" className="gap-2">
                  Continue with {channels.find(c => c.id === selectedChannel)?.label}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  variant="elevated"
                  className="p-6 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Ready to Transform Your Retail Experience?
          </h2>
          <p className="text-accent-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Join leading retailers who trust NEURAStyle for their omnichannel AI needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/chat">
              <Button variant="yellow" size="xl" className="gap-2">
                <Sparkles className="w-5 h-5" />
                Try AI Assistant
              </Button>
            </Link>
            <Link to="/admin">
              <Button variant="yellowOutline" size="xl">
                Explore Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Logo size="sm" />
            <p className="text-sm text-muted-foreground">
              © 2024 NEURAStyle. Enterprise AI Shopping Platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
