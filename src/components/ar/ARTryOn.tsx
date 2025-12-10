import { useRef, useState, useEffect, useCallback } from "react";
import { Camera, X, ZoomIn, ZoomOut, RotateCw, Sparkles, Download, RefreshCw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface ARTryOnProps {
  productImage: string;
  productName: string;
  onClose: () => void;
}

interface BodyPosition {
  x: number;
  y: number;
  width: number;
  height: number;
  shoulderWidth: number;
}

export function ARTryOn({ productImage, productName, onClose }: ARTryOnProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const productImageRef = useRef<HTMLImageElement | null>(null);
  
  const [isStreaming, setIsStreaming] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [productScale, setProductScale] = useState(100);
  const [productRotation, setProductRotation] = useState(0);
  const [verticalOffset, setVerticalOffset] = useState(0);
  const [bodyDetected, setBodyDetected] = useState(false);

  // Load product image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      productImageRef.current = img;
    };
    img.src = productImage;
  }, [productImage]);

  // Simple body detection using skin color and motion
  const detectBody = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number): BodyPosition | null => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    
    let minX = width, maxX = 0, minY = height, maxY = 0;
    let skinPixelCount = 0;
    
    // Detect skin-like colors and central region (likely person)
    const centerX = width / 2;
    const detectionRegion = width * 0.4; // Focus on center 40%
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Focus on center region
        if (Math.abs(x - centerX) > detectionRegion) continue;
        
        const i = (y * width + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Skin tone detection (various skin colors)
        const isSkinTone = (
          r > 95 && g > 40 && b > 20 &&
          r > g && r > b &&
          Math.abs(r - g) > 15 &&
          r - g > 15 && r - b > 15
        ) || (
          // Darker skin tones
          r > 60 && g > 40 && b > 30 &&
          r > g && r > b &&
          r - b > 10
        );
        
        // Also detect clothing colors (non-background)
        const isNotBackground = (
          Math.abs(r - g) > 10 || Math.abs(g - b) > 10 || Math.abs(r - b) > 10
        ) && (r + g + b) < 700 && (r + g + b) > 100;
        
        if (isSkinTone || isNotBackground) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
          if (isSkinTone) skinPixelCount++;
        }
      }
    }
    
    // Minimum skin pixels to consider body detected
    if (skinPixelCount < 500) return null;
    
    const bodyWidth = maxX - minX;
    const bodyHeight = maxY - minY;
    
    // Reasonable body proportions check
    if (bodyWidth < 50 || bodyHeight < 100) return null;
    
    // Estimate shoulder position (roughly 1/4 from top of detected region)
    const shoulderY = minY + bodyHeight * 0.15;
    const torsoX = minX + bodyWidth / 2;
    
    // Estimate shoulder width (roughly 60% of body width for clothing)
    const shoulderWidth = bodyWidth * 0.7;
    
    return {
      x: torsoX,
      y: shoulderY,
      width: bodyWidth,
      height: bodyHeight,
      shoulderWidth
    };
  }, []);

  // Render loop
  const renderFrame = useCallback(() => {
    if (!videoRef.current || !overlayCanvasRef.current || !productImageRef.current) {
      animationRef.current = requestAnimationFrame(renderFrame);
      return;
    }

    const video = videoRef.current;
    const canvas = overlayCanvasRef.current;
    const ctx = canvas.getContext("2d");
    
    if (!ctx || video.readyState !== 4) {
      animationRef.current = requestAnimationFrame(renderFrame);
      return;
    }

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw video frame (mirrored for selfie)
    if (facingMode === "user") {
      ctx.save();
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    if (facingMode === "user") {
      ctx.restore();
    }

    // Detect body
    const bodyPos = detectBody(ctx, canvas.width, canvas.height);
    
    if (bodyPos) {
      setBodyDetected(true);
      
      const img = productImageRef.current;
      const scale = (productScale / 100) * 1.2;
      
      // Size clothing based on detected shoulder width
      const clothingWidth = bodyPos.shoulderWidth * scale * 1.5;
      const aspectRatio = img.height / img.width;
      const clothingHeight = clothingWidth * aspectRatio;
      
      // Position on body
      let drawX = bodyPos.x - clothingWidth / 2;
      const drawY = bodyPos.y + verticalOffset + (bodyPos.height * 0.05);
      
      // Apply transformations
      ctx.save();
      ctx.translate(drawX + clothingWidth / 2, drawY + clothingHeight / 2);
      ctx.rotate((productRotation * Math.PI) / 180);
      
      // Add slight transparency for blend effect
      ctx.globalAlpha = 0.92;
      
      // Draw with shadow for depth
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
      ctx.shadowBlur = 20;
      ctx.shadowOffsetY = 10;
      
      ctx.drawImage(
        img,
        -clothingWidth / 2,
        -clothingHeight / 2,
        clothingWidth,
        clothingHeight
      );
      
      ctx.restore();
    } else {
      setBodyDetected(false);
    }

    animationRef.current = requestAnimationFrame(renderFrame);
  }, [facingMode, productScale, productRotation, verticalOffset, detectBody]);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      
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
        setIsLoading(false);
        
        // Start render loop
        animationRef.current = requestAnimationFrame(renderFrame);
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setError("Unable to access camera. Please grant permission and try again.");
      setIsLoading(false);
    }
  }, [facingMode, renderFrame]);

  const stopCamera = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
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
    startCamera();
    return () => stopCamera();
  }, [facingMode]);

  // Restart render loop when parameters change
  useEffect(() => {
    if (isStreaming && !animationRef.current) {
      animationRef.current = requestAnimationFrame(renderFrame);
    }
  }, [isStreaming, renderFrame]);

  const capturePhoto = () => {
    if (!overlayCanvasRef.current) return;
    
    const canvas = overlayCanvasRef.current;
    const link = document.createElement("a");
    link.download = `neurastyle-tryout-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-white font-semibold">Virtual Try-On</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="w-6 h-6" />
          </Button>
        </div>
        <p className="text-white/70 text-sm mt-1">{productName}</p>
        
        {/* Body detection status */}
        <div className={cn(
          "mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-all",
          bodyDetected 
            ? "bg-green-500/20 text-green-400" 
            : "bg-yellow-500/20 text-yellow-400"
        )}>
          <div className={cn(
            "w-2 h-2 rounded-full",
            bodyDetected ? "bg-green-400 animate-pulse" : "bg-yellow-400"
          )} />
          {bodyDetected ? "Body detected - Fitting active" : "Stand back to fit in frame"}
        </div>
      </div>

      {/* Camera View */}
      <div className="relative w-full h-full">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-20">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-white">Initializing camera...</p>
          </div>
        )}
        
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
            {/* Hidden video element for capture */}
            <video
              ref={videoRef}
              className="hidden"
              playsInline
              muted
            />
            
            {/* Overlay canvas showing video + product */}
            <canvas
              ref={overlayCanvasRef}
              className="w-full h-full object-cover"
            />
            
            {/* Guide overlay */}
            {isStreaming && !bodyDetected && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="border-2 border-dashed border-white/30 rounded-3xl w-[60%] h-[70%] flex items-center justify-center">
                  <p className="text-white/50 text-center px-8">
                    Position yourself here
                  </p>
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
          {/* Size Control */}
          <div className="flex items-center gap-4 text-white">
            <ZoomOut className="w-4 h-4" />
            <Slider
              value={[productScale]}
              onValueChange={([value]) => setProductScale(value)}
              min={50}
              max={150}
              step={1}
              className="flex-1"
            />
            <ZoomIn className="w-4 h-4" />
          </div>

          {/* Vertical Position Control */}
          <div className="flex items-center gap-4 text-white">
            <span className="text-xs w-16">Position</span>
            <Slider
              value={[verticalOffset]}
              onValueChange={([value]) => setVerticalOffset(value)}
              min={-100}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-sm w-12 text-right">{verticalOffset > 0 ? '+' : ''}{verticalOffset}</span>
          </div>

          {/* Rotation Control */}
          <div className="flex items-center gap-4 text-white">
            <RotateCw className="w-4 h-4" />
            <Slider
              value={[productRotation]}
              onValueChange={([value]) => setProductRotation(value)}
              min={-30}
              max={30}
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
