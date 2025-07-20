import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { 
  Wallet, 
  Menu, 
  X, 
  Play, 
  Vote, 
  Trophy, 
  BarChart3, 
  Users,
  Settings 
} from "lucide-react";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Live Stream", href: "/livestream", icon: Play },
    { name: "Voting", href: "/voting", icon: Vote },
    { name: "NFT Gallery", href: "/gallery", icon: Trophy },
    { name: "Staking", href: "/staking", icon: BarChart3 },
    { name: "Mint NFT", href: "/mint", icon: Users },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-crypto-dark/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-bitcoin rounded-full flex items-center justify-center shadow-bitcoin">
              <span className="text-crypto-dark font-bold text-lg">₿</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">KryptoMurat</h1>
              <p className="text-xs text-muted-foreground">Live Jagd auf Bitcoin</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 text-muted-foreground hover:text-bitcoin transition-colors duration-200"
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </a>
            ))}
          </div>

          {/* Wallet Status & Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Live Status */}
            <Badge variant="secondary" className="bg-red-600 text-white animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full mr-1 animate-ping" />
              LIVE
            </Badge>

            {/* Wallet Button */}
            <Button variant="wallet" size="sm">
              <Wallet className="mr-2" size={16} />
              Wallet verbinden
            </Button>

            <Button variant="ghost" size="sm">
              <Settings size={16} />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-2 text-muted-foreground hover:text-bitcoin hover:bg-secondary/50 rounded-md transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </a>
              ))}
              
              <div className="pt-4 space-y-2">
                <Button variant="wallet" className="w-full" size="sm">
                  <Wallet className="mr-2" size={16} />
                  Wallet verbinden
                </Button>
                
                <Badge variant="secondary" className="bg-red-600 text-white animate-pulse w-full justify-center py-2">
                  <div className="w-2 h-2 bg-white rounded-full mr-2 animate-ping" />
                  LIVE STREAM AKTIV
                </Badge>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};