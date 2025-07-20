import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Shield, Zap, CheckCircle } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { checkNFTOwnership } from "@/lib/checkNFTOwnership";
import { useToast } from "@/hooks/use-toast";

interface NFTGateProps {
  onConnect: (hasNFT: boolean) => void;
}

export const NFTGate = ({ onConnect }: NFTGateProps) => {
  const [isChecking, setIsChecking] = useState(false);
  const { address, isConnected, isConnecting, connectWallet } = useWallet();
  const { toast } = useToast();

  useEffect(() => {
    if (isConnected && address) {
      checkUserNFTs();
    }
  }, [isConnected, address]);

  const checkUserNFTs = async () => {
    if (!address) return;
    
    setIsChecking(true);
    try {
      const ownership = await checkNFTOwnership(address);
      
      toast({
        title: ownership.hasNFT ? "NFT Verified!" : "No NFT Found",
        description: ownership.hasNFT 
          ? `Found ${ownership.nftCount} KryptoMurat NFT(s)` 
          : "You need a KryptoMurat NFT to access premium content",
        variant: ownership.hasNFT ? "default" : "destructive",
      });
      
      onConnect(ownership.hasNFT);
    } catch (error) {
      toast({
        title: "Verification Error",
        description: "Failed to check NFT ownership",
        variant: "destructive",
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleConnect = async () => {
    if (!isConnected) {
      await connectWallet();
    } else {
      await checkUserNFTs();
    }
  };

  return (
    <div className="text-center p-12 bg-card rounded-xl border border-border">
      <Shield className="mx-auto mb-6 text-bitcoin" size={80} />
      
      <h3 className="text-2xl font-bold text-foreground mb-4">
        Wallet Verbindung erforderlich
      </h3>
      
      <p className="text-muted-foreground mb-8">
        Verbinde deine Wallet und verifiziere deinen NFT-Besitz für exklusiven Zugang zum Live-Stream.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 border border-border rounded-lg">
          <Wallet className="mx-auto mb-2 text-bitcoin" size={32} />
          <h4 className="font-semibold text-foreground">1. Wallet verbinden</h4>
          <p className="text-sm text-muted-foreground">MetaMask oder WalletConnect</p>
        </div>
        
        <div className="p-4 border border-border rounded-lg">
          <Zap className="mx-auto mb-2 text-bitcoin" size={32} />
          <h4 className="font-semibold text-foreground">2. NFT prüfen</h4>
          <p className="text-sm text-muted-foreground">Automatische Verifizierung</p>
        </div>
        
        <div className="p-4 border border-border rounded-lg">
          <Shield className="mx-auto mb-2 text-bitcoin" size={32} />
          <h4 className="font-semibold text-foreground">3. Zugang erhalten</h4>
          <p className="text-sm text-muted-foreground">Stream freischalten</p>
        </div>
      </div>

      <Button 
        onClick={handleConnect}
        disabled={isConnecting || isChecking}
        size="lg"
        className="w-full max-w-md"
      >
        {isConnected ? (
          <>
            <CheckCircle className="mr-2" size={20} />
            {isChecking ? "NFT wird geprüft..." : "NFT-Zugang prüfen"}
          </>
        ) : (
          <>
            <Wallet className="mr-2" size={20} />
            {isConnecting ? "Verbinde..." : "Wallet verbinden"}
          </>
        )}
      </Button>
      
      {isConnected && address && (
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            Verbunden: {address.slice(0, 6)}...{address.slice(-4)}
          </p>
        </div>
      )}

      <div className="mt-8 text-center">
        <p className="text-xs text-muted-foreground">
          Noch kein NFT? 
          <a href="/mint" className="text-bitcoin hover:underline ml-1">
            Hier minten →
          </a>
        </p>
      </div>
    </div>
  );
};