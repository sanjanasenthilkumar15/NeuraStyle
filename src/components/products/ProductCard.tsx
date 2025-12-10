import { useState } from "react";
import { Heart, Eye, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ARTryOnDemo } from "@/components/ar/ARTryOnDemo";
import { cn } from "@/lib/utils";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  tags: string[];
  isNew?: boolean;
  isTrending?: boolean;
  aiRecommended?: boolean;
}

interface ProductCardProps {
  product: Product;
  onView?: () => void;
  onAddToCart?: () => void;
}

export function ProductCard({ product, onView, onAddToCart }: ProductCardProps) {
  const [showAR, setShowAR] = useState(false);
  
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card variant="elevated" className="group overflow-hidden">
      <div className="relative aspect-[3/4] bg-muted overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && <Badge variant="new">New In</Badge>}
          {product.isTrending && <Badge variant="trending">Trending</Badge>}
          {product.aiRecommended && (
            <Badge variant="ai" className="gap-1">
              <Sparkles className="w-3 h-3" />
              AI Pick
            </Badge>
          )}
          {discount > 0 && (
            <Badge variant="destructive">-{discount}%</Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="secondary" size="iconSm" className="rounded-full shadow-md">
            <Heart className="w-4 h-4" />
          </Button>
          <Button variant="secondary" size="iconSm" className="rounded-full shadow-md" onClick={onView}>
            <Eye className="w-4 h-4" />
          </Button>
        </div>

        {/* AR Try-On Button */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
          <Button variant="yellow" size="sm" className="w-full gap-2" onClick={() => setShowAR(true)}>
            <Sparkles className="w-4 h-4" />
            Try in AR
          </Button>
        </div>
      </div>

      {/* AR Try-On Modal */}
      {showAR && (
        <ARTryOnDemo
          productImage={product.image}
          productName={product.name}
          onClose={() => setShowAR(false)}
        />
      )}

      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-primary text-primary" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>

        {/* Name */}
        <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs text-muted-foreground">
              #{tag}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
