import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Shield, AlertCircle } from "lucide-react";

interface NFTGateProps {
  onConnect: () => void;
}

export const NFTGate = ({ onConnect }: NFTGateProps) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnecting(false);
      onConnect();
    }, 2000);
  };

  return (
    <Card className="bg-card border-border max-w-md mx-auto">
      <CardHeader className="text-center">
        <Shield className="mx-auto mb-4 text-bitcoin" size={64} />
        <CardTitle className="text-foreground">Wallet Verbindung erforderlich</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Verbinde deine Wallet, um auf exklusive Inhalte zuzugreifen.
          </p>
          
          <Badge variant="secondary" className="bg-blue-600 text-white mb-4">
            <AlertCircle className="mr-1" size={16} />
            NFT-Zugang erforderlich
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <span className="text-sm text-muted-foreground">Benötigtes NFT:</span>
            <span className="text-sm text-foreground font-medium">Jäger NFT</span>
          </div>
          
          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <span className="text-sm text-muted-foreground">Contract:</span>
            <span className="text-sm text-foreground font-mono">0x123...def</span>
          </div>
        </div>

        <Button 
          className="w-full" 
          variant="default"
          onClick={handleConnect}
          disabled={isConnecting}
        >
          <Wallet className="mr-2" size={20} />
          {isConnecting ? "Verbinde..." : "Wallet verbinden"}
        </Button>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Unterstützte Wallets: MetaMask, WalletConnect, Coinbase Wallet
          </p>
        </div>

        <div className="border-t border-border pt-4">
          <p className="text-xs text-muted-foreground text-center">
            Noch kein NFT? 
            <a href="/mint" className="text-bitcoin hover:underline ml-1">
              Hier minten →
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};