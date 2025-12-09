import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-4xl",
  xl: "text-5xl",
};

export function Logo({ size = "md", showTagline = false, className }: LogoProps) {
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="flex items-center gap-2">
        <div className="relative">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-lg flex items-center justify-center shadow-glow">
            <span className="font-display font-bold text-primary-foreground text-lg md:text-xl">N</span>
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full" />
        </div>
        <span className={cn("font-display font-bold tracking-tight", sizeClasses[size])}>
          NEURA<span className="text-primary">Style</span>
        </span>
      </div>
      {showTagline && (
        <p className="text-muted-foreground text-sm font-medium">
          Unified AI Shopping Assistant
        </p>
      )}
    </div>
  );
}
