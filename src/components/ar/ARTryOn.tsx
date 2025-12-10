import { useRef, useState, useEffect, useCallback } from "react";
import { Camera, X, ZoomIn, ZoomOut, Move, RotateCw, Sparkles, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface ARTryOnProps {
  productImage: string;
  productName: string;
  onClose: () => void;
}

export function ARTryOn({ productImage, productName, onClose }: ARTryOnProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [productPosition, setProductPosition] = useState({ x: 50, y: 50 });
  const [productScale, setProductScale] = useState(30);
  const [productRotation, setProductRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsStreaming(true);
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setError("Unable to access camera. Please grant permission and try again.");
    }
  }, [facingMode]);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
    }
  }, []);

  const switchCamera = useCallback(() => {
    stopCamera();
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  }, [stopCamera]);

  useEffect(() => {
    if (facingMode) {
      startCamera();
    }
    return () => stopCamera();
  }, [facingMode, startCamera, stopCamera]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setProductPosition({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw mirrored video for selfie camera
    if (facingMode === "user") {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0);
    
    // Reset transform
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Draw product overlay
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const scale = productScale / 100;
      const imgWidth = canvas.width * scale;
      const imgHeight = (img.height / img.width) * imgWidth;
      
      let drawX = (productPosition.x / 100) * canvas.width - imgWidth / 2;
      if (facingMode === "user") {
        drawX = canvas.width - drawX - imgWidth;
      }
      const drawY = (productPosition.y / 100) * canvas.height - imgHeight / 2;

      ctx.save();
      ctx.translate(drawX + imgWidth / 2, drawY + imgHeight / 2);
      ctx.rotate((productRotation * Math.PI) / 180);
      ctx.drawImage(img, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
      ctx.restore();

      // Download the image
      const link = document.createElement("a");
      link.download = `neurastyle-tryout-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
    img.src = productImage;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-white font-semibold">AR Try-On</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="w-6 h-6" />
          </Button>
        </div>
        <p className="text-white/70 text-sm mt-1">{productName}</p>
      </div>

      {/* Camera View */}
      <div 
        className="relative w-full h-full"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {error ? (
          <div className="flex flex-col items-center justify-center h-full text-white">
            <Camera className="w-16 h-16 mb-4 text-muted-foreground" />
            <p className="text-center px-8 mb-4">{error}</p>
            <Button onClick={startCamera} variant="yellow">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              className={cn(
                "w-full h-full object-cover",
                facingMode === "user" && "scale-x-[-1]"
              )}
              playsInline
              muted
            />
            
            {/* Product Overlay */}
            {isStreaming && (
              <div
                className="absolute pointer-events-none transition-transform"
                style={{
                  left: `${productPosition.x}%`,
                  top: `${productPosition.y}%`,
                  transform: `translate(-50%, -50%) rotate(${productRotation}deg) scale(${productScale / 100})`,
                  width: "60%",
                }}
              >
                <img
                  src={productImage}
                  alt={productName}
                  className="w-full h-auto drop-shadow-2xl"
                  style={{
                    filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.4))",
                  }}
                />
              </div>
            )}

            {/* Drag hint */}
            {isStreaming && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className={cn(
                  "flex items-center gap-2 bg-black/50 text-white px-4 py-2 rounded-full text-sm transition-opacity",
                  isDragging ? "opacity-0" : "opacity-70"
                )}>
                  <Move className="w-4 h-4" />
                  Drag to position
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Hidden canvas for photo capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Controls */}
      {isStreaming && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 space-y-4">
          {/* Scale Control */}
          <div className="flex items-center gap-4 text-white">
            <ZoomOut className="w-4 h-4" />
            <Slider
              value={[productScale]}
              onValueChange={([value]) => setProductScale(value)}
              min={10}
              max={80}
              step={1}
              className="flex-1"
            />
            <ZoomIn className="w-4 h-4" />
          </div>

          {/* Rotation Control */}
          <div className="flex items-center gap-4 text-white">
            <RotateCw className="w-4 h-4" />
            <Slider
              value={[productRotation]}
              onValueChange={([value]) => setProductRotation(value)}
              min={-180}
              max={180}
              step={1}
              className="flex-1"
            />
            <span className="text-sm w-12 text-right">{productRotation}°</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <Button
              variant="outline"
              size="icon"
              onClick={switchCamera}
              className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <RefreshCw className="w-5 h-5" />
            </Button>
            
            <Button
              variant="yellow"
              size="lg"
              onClick={capturePhoto}
              className="rounded-full w-16 h-16 p-0"
            >
              <Camera className="w-8 h-8" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={capturePhoto}
              className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Download className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
