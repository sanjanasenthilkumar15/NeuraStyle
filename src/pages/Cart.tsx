import { useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/layout/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sampleProducts } from "@/data/products";
import { 
  Minus, 
  Plus, 
  Trash2, 
  Sparkles, 
  Gift, 
  CreditCard,
  Wallet,
  Building2,
  Smartphone,
  ShieldCheck,
  ArrowRight
} from "lucide-react";

const cartItems = sampleProducts.slice(0, 3).map((product, index) => ({
  ...product,
  quantity: index === 0 ? 2 : 1,
  size: ["M", "L", "S"][index],
  color: ["Black", "Navy", "Beige"][index],
}));

const paymentMethods = [
  { id: "card", label: "Card", icon: CreditCard },
  { id: "upi", label: "UPI", icon: Smartphone },
  { id: "wallet", label: "Wallet", icon: Wallet },
  { id: "cod", label: "Cash on Pickup", icon: Building2 },
];

export default function Cart() {
  const [items, setItems] = useState(cartItems);
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [loyaltyApplied, setLoyaltyApplied] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const loyaltyDiscount = loyaltyApplied ? 230 : 0;
  const aiDiscount = 150;
  const total = subtotal - loyaltyDiscount - aiDiscount;

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-display font-bold mb-8">Shopping Cart</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id} variant="elevated" className="p-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-32 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold line-clamp-2">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Size: {item.size} | Color: {item.color}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="iconSm"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4 text-muted-foreground" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="iconSm"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="iconSm"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <span className="font-bold">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              {items.length === 0 && (
                <Card variant="ghost" className="p-12 text-center">
                  <p className="text-muted-foreground mb-4">Your cart is empty</p>
                  <Link to="/products">
                    <Button variant="yellow">Continue Shopping</Button>
                  </Link>
                </Card>
              )}
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              {/* Loyalty Points */}
              <Card variant="highlight" className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Gift className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Loyalty Points</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  You have 2,300 points available (worth ₹230)
                </p>
                <Button
                  variant={loyaltyApplied ? "secondary" : "yellow"}
                  size="sm"
                  className="w-full"
                  onClick={() => setLoyaltyApplied(!loyaltyApplied)}
                >
                  {loyaltyApplied ? "Points Applied ✓" : "Apply Points"}
                </Button>
              </Card>

              {/* AI Offer */}
              <Card variant="elevated" className="p-4 border-primary/30">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold">AI Selected Best Offer</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Extra ₹150 off applied automatically
                </p>
              </Card>

              {/* Price Breakdown */}
              <Card variant="elevated" className="p-4">
                <h3 className="font-semibold mb-4">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">MRP</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  {loyaltyApplied && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Loyalty Points</span>
                      <span>-₹{loyaltyDiscount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-emerald-600">
                    <span>AI Offer</span>
                    <span>-₹{aiDiscount}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-3 border-t border-border">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>

                {loyaltyApplied && (
                  <Badge variant="success" className="w-full justify-center mt-3">
                    You saved ₹{loyaltyDiscount + aiDiscount}!
                  </Badge>
                )}
              </Card>

              {/* Payment Methods */}
              <Card variant="elevated" className="p-4">
                <h3 className="font-semibold mb-4">Payment Method</h3>
                <div className="grid grid-cols-2 gap-2">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <button
                        key={method.id}
                        className={`p-3 rounded-lg border-2 transition-all text-left ${
                          selectedPayment === method.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-foreground/20"
                        }`}
                        onClick={() => setSelectedPayment(method.id)}
                      >
                        <Icon className="w-5 h-5 mb-1" />
                        <span className="text-sm font-medium">{method.label}</span>
                      </button>
                    );
                  })}
                </div>
              </Card>

              {/* Checkout Button */}
              <Button variant="yellow" size="xl" className="w-full gap-2">
                Proceed to Payment
                <ArrowRight className="w-5 h-5" />
              </Button>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="w-4 h-4" />
                <span>Secure Payment – Governed by Security Layer</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
