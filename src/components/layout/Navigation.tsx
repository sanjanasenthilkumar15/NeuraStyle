import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  MessageSquare, 
  ShoppingBag, 
  LayoutDashboard, 
  Shield, 
  Menu, 
  X,
  Sparkles,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/chat", label: "AI Assistant", icon: MessageSquare },
  { path: "/products", label: "Products", icon: ShoppingBag },
  { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { path: "/security", label: "Security", icon: Shield },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Logo size="sm" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    className={cn(
                      "gap-2",
                      isActive && "bg-secondary font-semibold"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/cart">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingBag className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold">
                  3
                </span>
              </Button>
            </Link>
            <Button variant="yellow" size="sm" className="gap-2">
              <Sparkles className="w-4 h-4" />
              Try AI
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-down">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className="w-full justify-start gap-3"
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
              <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                <Link to="/cart" className="flex-1" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    Cart (3)
                  </Button>
                </Link>
                <Button variant="yellow" className="flex-1 gap-2">
                  <Sparkles className="w-4 h-4" />
                  Try AI
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
