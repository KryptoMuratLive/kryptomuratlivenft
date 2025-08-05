import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, CheckCircle, ExternalLink } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { useToast } from "@/hooks/use-toast";

const NFTAccess = () => {
  const { isConnected, connectWallet, address } = useWallet();
  const [isChecking, setIsChecking] = useState(false);
  const [hasNFT, setHasNFT] = useState(false);
  const { toast } = useToast();

  const handleNFTCheck = async () => {
    if (!isConnected) {
      await connectWallet();
      return;
    }

    setIsChecking(true);
    
    // Simulate NFT check
    setTimeout(() => {
      setHasNFT(Math.random() > 0.5); // 50% chance for demo
      setIsChecking(false);
      
      toast({
        title: hasNFT ? "NFT gefunden!" : "Kein NFT gefunden",
        description: hasNFT 
          ? "Du hast Zugang zu exklusiven Features!" 
          : "Du benötigst einen MURAT oder JÄGER NFT",
        variant: hasNFT ? "default" : "destructive",
      });
    }, 2000);
  };

  const nftTypes = [
    {
      id: "murat",
      name: "MURAT Premium",
      description: "Zugang zu Meme-Battles & DAO-Votings",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=400&fit=crop",
      rarity: "Epic",
      benefits: ["Geheime Räume", "Meme-Battles", "DAO-Voting", "Exklusive Belohnungen"]
    },
    {
      id: "jaeger", 
      name: "JÄGER Premium",
      description: "Elite Hunter Status mit besonderen Rechten",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop",
      rarity: "Legendary",
      benefits: ["Hunter-Modus", "Spezial-Quests", "Premium-Rewards", "VIP-Zugang"]
    }
  ];

  return (
    <div className="min-h-screen bg-crypto-dark">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <section className="p-6 max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Shield className="mx-auto mb-4 text-bitcoin" size={64} />
            <h1 className="text-3xl font-bold mb-4 text-foreground">
              🎫 NFT-Zugang
            </h1>
            <p className="mb-4 text-muted-foreground max-w-2xl mx-auto">
              Halte einen <strong className="text-bitcoin">MURAT</strong> oder{" "}
              <strong className="text-bitcoin">JÄGER</strong> NFT, um Zugriff auf geheime Räume,
              exklusive Meme-Battles und DAO-Votings zu erhalten.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {nftTypes.map((nft) => (
              <Card key={nft.id} className="bg-card border-border overflow-hidden">
                <div className="relative">
                  <img 
                    src={nft.image} 
                    alt={nft.name}
                    className="w-full h-48 object-cover"
                  />
                  <Badge 
                    className="absolute top-2 right-2 bg-bitcoin text-crypto-dark"
                  >
                    {nft.rarity}
                  </Badge>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-foreground">{nft.name}</CardTitle>
                  <p className="text-muted-foreground text-sm">{nft.description}</p>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <h4 className="font-semibold text-foreground text-sm">Vorteile:</h4>
                    {nft.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="text-bitcoin" size={16} />
                        <span className="text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.open("/mint", "_blank")}
                  >
                    <ExternalLink className="mr-2" size={16} />
                    Jetzt minten
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleNFTCheck}
              disabled={isChecking}
              className="bg-gradient-primary hover:bg-gradient-primary/90 text-white px-6 py-3"
              size="lg"
            >
              {isChecking ? (
                <>
                  <Zap className="mr-2 animate-spin" size={20} />
                  NFT wird überprüft...
                </>
              ) : isConnected ? (
                <>
                  <CheckCircle className="mr-2" size={20} />
                  ✅ NFT überprüfen
                </>
              ) : (
                <>
                  <Shield className="mr-2" size={20} />
                  ✅ NFT überprüfen / Mint starten
                </>
              )}
            </Button>

            {isConnected && address && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Wallet: {address.slice(0, 6)}...{address.slice(-4)}
                </p>
                {hasNFT && (
                  <Badge className="mt-2 bg-bitcoin text-crypto-dark">
                    NFT-Zugang bestätigt
                  </Badge>
                )}
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              Noch kein NFT? 
              <a href="/mint" className="text-bitcoin hover:underline ml-1">
                Hier minten →
              </a>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NFTAccess;