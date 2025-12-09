import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/layout/Navigation";
import { ProductCard, Product } from "@/components/products/ProductCard";
import { sampleProducts } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  SlidersHorizontal, 
  Grid3X3, 
  LayoutList,
  Sparkles,
  X
} from "lucide-react";

const filterOptions = [
  { id: "all", label: "All" },
  { id: "new", label: "New In" },
  { id: "trending", label: "Trending" },
  { id: "ai", label: "AI Picks" },
  { id: "sale", label: "On Sale" },
];

const nlpFilters = [
  "Show in black",
  "Under ₹2000",
  "Athleisure",
  "Formal wear",
  "Summer collection",
];

export default function Products() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeNlpFilters, setActiveNlpFilters] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = sampleProducts.filter((product) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "new") return product.isNew;
    if (activeFilter === "trending") return product.isTrending;
    if (activeFilter === "ai") return product.aiRecommended;
    if (activeFilter === "sale") return product.originalPrice;
    return true;
  });

  const toggleNlpFilter = (filter: string) => {
    setActiveNlpFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold">Discover Products</h1>
              <p className="text-muted-foreground mt-1">
                {filteredProducts.length} products found
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>
              <div className="flex border border-border rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="iconSm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="iconSm"
                  onClick={() => setViewMode("list")}
                >
                  <LayoutList className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {filterOptions.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "yellow" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {/* NLP Filters */}
          <Card variant="highlight" className="p-4 mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold">AI-Powered Filters</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {nlpFilters.map((filter) => (
                <Badge
                  key={filter}
                  variant={activeNlpFilters.includes(filter) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/80 transition-colors"
                  onClick={() => toggleNlpFilter(filter)}
                >
                  {filter}
                  {activeNlpFilters.includes(filter) && (
                    <X className="w-3 h-3 ml-1" />
                  )}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Product Grid */}
          <div className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
              : "grid-cols-1 md:grid-cols-2"
          }`}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onView={() => navigate(`/product/${product.id}`)}
              />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Products
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
