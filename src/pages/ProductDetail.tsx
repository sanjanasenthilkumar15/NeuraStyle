import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/layout/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ProductCarousel } from "@/components/products/ProductCarousel";
import { ARTryOnDemo } from "@/components/ar/ARTryOnDemo";
import { sampleProducts } from "@/data/products";
import { 
  Star, 
  Heart, 
  Share2, 
  Sparkles, 
  MapPin, 
  Truck, 
  RotateCcw,
  ShoppingBag,
  Minus,
  Plus,
  Check
} from "lucide-react";
import { toast } from "sonner";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colors = [
  { name: "Black", hex: "#000000" },
  { name: "Navy", hex: "#1e3a5f" },
  { name: "Charcoal", hex: "#36454f" },
  { name: "Beige", hex: "#d4c4a8" },
];

export default function ProductDetail() {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [showInventory, setShowInventory] = useState(false);
  const [showAR, setShowAR] = useState(false);

  const product = sampleProducts.find((p) => p.id === id) || sampleProducts[0];

  const handleAddToCart = () => {
    toast.success("Added to cart!", {
      description: `${product.name} - Size ${selectedSize}`,
    });
  };

  const handleCheckInventory = () => {
    setShowInventory(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-foreground">Products</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-[3/4] bg-muted rounded-2xl overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.aiRecommended && (
                  <Badge variant="ai" className="absolute top-4 left-4 gap-1">
                    <Sparkles className="w-3 h-3" />
                    AI Fit Prediction
                  </Badge>
                )}
              </div>
              
              {/* AR Try-On Button */}
              <Button variant="yellow" size="lg" className="w-full gap-2" onClick={() => setShowAR(true)}>
                <Sparkles className="w-5 h-5" />
                Try in AR
              </Button>
            </div>

            {/* AR Try-On Modal */}
            {showAR && (
              <ARTryOnDemo
                productImage={product.image}
                productName={product.name}
                onClose={() => setShowAR(false)}
              />
            )}

            {/* Product Info */}
            <div className="space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {product.isNew && <Badge variant="new">New In</Badge>}
                {product.isTrending && <Badge variant="trending">Trending</Badge>}
              </div>

              {/* Title & Rating */}
              <div>
                <h1 className="text-3xl font-display font-bold mb-2">{product.name}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-primary text-primary" />
                    <span className="font-semibold">{product.rating}</span>
                    <span className="text-muted-foreground">({product.reviews} reviews)</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="iconSm">
                      <Heart className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="iconSm">
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                    <Badge variant="destructive">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </Badge>
                  </>
                )}
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="text-sm font-semibold mb-3">Color: {selectedColor.name}</h3>
                <div className="flex gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor.name === color.name
                          ? "border-primary ring-2 ring-primary ring-offset-2"
                          : "border-border"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold">Size</h3>
                  <button className="text-sm text-primary font-medium">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`w-12 h-12 rounded-lg border-2 font-semibold transition-all ${
                        selectedSize === size
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-foreground"
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-sm font-semibold mb-3">Quantity</h3>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Inventory Check */}
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={handleCheckInventory}
              >
                <MapPin className="w-4 h-4" />
                Check In-Store Availability
              </Button>

              {showInventory && (
                <Card variant="highlight" className="p-4 animate-fade-in">
                  <h4 className="font-semibold mb-3">Stock Availability</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Phoenix Mall Store</span>
                      </div>
                      <span className="text-sm text-emerald-600 font-medium">In Stock (5)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Central Warehouse</span>
                      </div>
                      <span className="text-sm text-emerald-600 font-medium">In Stock (23)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-primary" />
                        <span>Delivery ETA</span>
                      </div>
                      <span className="text-sm font-medium">2-3 days</span>
                    </div>
                  </div>
                </Card>
              )}

              {/* Add to Cart */}
              <div className="flex gap-3">
                <Button variant="yellow" size="xl" className="flex-1 gap-2" onClick={handleAddToCart}>
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="text-center">
                  <Truck className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Free Delivery</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Easy Returns</p>
                </div>
                <div className="text-center">
                  <Sparkles className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">AI Styling</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <ProductCarousel
              title="Pairs Well With"
              subtitle="Complete the look with these recommendations"
              products={sampleProducts.slice(3, 7)}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
