import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, ChevronLeft, ChevronRight, Sparkles, Check } from "lucide-react";

interface ARTryOnDemoProps {
  productImage: string;
  productName: string;
  onClose: () => void;
}

// Demo models for try-on simulation
const demoModels = [
  {
    id: 1,
    name: "Model 1",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop",
    bodyType: "slim",
  },
  {
    id: 2,
    name: "Model 2", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    bodyType: "athletic",
  },
  {
    id: 3,
    name: "Model 3",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop",
    bodyType: "regular",
  },
];

// Pre-configured try-on results (simulated)
const tryOnResults = [
  "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=600&fit=crop",
];

export function ARTryOnDemo({ productImage, productName, onClose }: ARTryOnDemoProps) {
  const [selectedModel, setSelectedModel] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleTryOn = () => {
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowResult(true);
    }, 1500);
  };

  const nextModel = () => {
    setSelectedModel((prev) => (prev + 1) % demoModels.length);
    setShowResult(false);
  };

  const prevModel = () => {
    setSelectedModel((prev) => (prev - 1 + demoModels.length) % demoModels.length);
    setShowResult(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <Card className="relative w-full max-w-4xl bg-card border-border overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Virtual Try-On</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Model Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-muted-foreground">Select Model</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={prevModel} className="h-8 w-8">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={nextModel} className="h-8 w-8">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted">
                {!showResult ? (
                  <img
                    src={demoModels[selectedModel].image}
                    alt={demoModels[selectedModel].name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={tryOnResults[selectedModel]}
                      alt="Try-on result"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      AI Generated
                    </div>
                  </div>
                )}
                
                {isProcessing && (
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-white text-sm font-medium">Applying {productName}...</p>
                  </div>
                )}
              </div>

              {/* Model Thumbnails */}
              <div className="flex gap-2 justify-center">
                {demoModels.map((model, idx) => (
                  <button
                    key={model.id}
                    onClick={() => {
                      setSelectedModel(idx);
                      setShowResult(false);
                    }}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedModel === idx ? "border-primary scale-105" : "border-transparent opacity-60"
                    }`}
                  >
                    <img src={model.image} alt={model.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product & Actions */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">Selected Product</h3>
              
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-muted border border-border">
                <img
                  src={productImage}
                  alt={productName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3">
                <p className="font-medium text-foreground">{productName}</p>
                
                <Button 
                  className="w-full gap-2" 
                  size="lg"
                  onClick={handleTryOn}
                  disabled={isProcessing}
                >
                  <Sparkles className="w-4 h-4" />
                  {showResult ? "Try Again" : "Try On Virtually"}
                </Button>

                {showResult && (
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="text-sm text-foreground font-medium mb-1">✨ Perfect Fit!</p>
                    <p className="text-xs text-muted-foreground">
                      Our AI suggests this item would look great on you. Add to cart to complete your look.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-muted/30">
          <p className="text-xs text-center text-muted-foreground">
            This is a demonstration of virtual try-on technology. Actual results may vary.
          </p>
        </div>
      </Card>
    </div>
  );
}
