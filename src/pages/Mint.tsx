import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Zap, Star, Shield, Crown } from "lucide-react";

const Mint = () => {
  const [mintAmount, setMintAmount] = useState(1);
  const [isMinting, setIsMinting] = useState(false);

  const nftTiers = [
    {
      name: "Jäger",
      price: "0.05 ETH",
      supply: "1000",
      minted: "234",
      benefits: ["Live Stream Zugang", "Voting Rechte", "Discord Zugang"],
      icon: Shield,
      rarity: "Common"
    },
    {
      name: "Elite Jäger",
      price: "0.15 ETH", 
      supply: "500",
      minted: "89",
      benefits: ["Alle Jäger Benefits", "Exclusive Events", "Früher Episode Zugang"],
      icon: Star,
      rarity: "Rare"
    },
    {
      name: "Bitcoin Master",
      price: "0.5 ETH",
      supply: "100", 
      minted: "23",
      benefits: ["Alle Benefits", "Story Input", "1-on-1 mit Murat"],
      icon: Crown,
      rarity: "Legendary"
    }
  ];

  const handleMint = async (tier: typeof nftTiers[0]) => {
    setIsMinting(true);
    // Simulate minting process
    setTimeout(() => {
      setIsMinting(false);
      alert(`${tier.name} NFT erfolgreich geminted!`);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-crypto-dark">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20 pb-12">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="bg-purple-600 text-white mb-4">
            <Zap className="mr-1" size={16} />
            MINTING LIVE
          </Badge>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            KryptoMurat NFT Collection
          </h1>
          <p className="text-xl text-muted-foreground">
            Werde Teil der Story - Minte dein exklusives Jäger-NFT
          </p>
        </div>

        {/* Collection Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="flex items-center justify-center p-6">
              <div>
                <p className="text-2xl font-bold text-foreground">1,600</p>
                <p className="text-sm text-muted-foreground">Total Supply</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="flex items-center justify-center p-6">
              <div>
                <p className="text-2xl font-bold text-foreground">346</p>
                <p className="text-sm text-muted-foreground">Bereits geminted</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="flex items-center justify-center p-6">
              <div>
                <p className="text-2xl font-bold text-foreground">78%</p>
                <p className="text-sm text-muted-foreground">Verfügbar</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* NFT Tiers */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            Wähle dein NFT
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nftTiers.map((tier, index) => (
              <Card key={index} className="bg-card border-border relative">
                {tier.rarity === "Legendary" && (
                  <div className="absolute -top-2 -right-2">
                    <Badge variant="secondary" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black">
                      LEGENDARY
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <tier.icon className="mx-auto mb-4 text-bitcoin" size={48} />
                  <CardTitle className="text-foreground">{tier.name}</CardTitle>
                  <p className="text-2xl font-bold text-bitcoin">{tier.price}</p>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Supply Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Supply</span>
                        <span className="text-foreground">{tier.minted}/{tier.supply}</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="bg-bitcoin h-2 rounded-full" 
                          style={{ width: `${(parseInt(tier.minted) / parseInt(tier.supply)) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Benefits:</h4>
                      <ul className="space-y-1">
                        {tier.benefits.map((benefit, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-center">
                            <div className="w-1 h-1 bg-bitcoin rounded-full mr-2" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Amount Input */}
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Anzahl:</label>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        value={mintAmount}
                        onChange={(e) => setMintAmount(parseInt(e.target.value))}
                        className="bg-background border-border"
                      />
                    </div>

                    {/* Mint Button */}
                    <Button 
                      className="w-full" 
                      variant="default"
                      onClick={() => handleMint(tier)}
                      disabled={isMinting}
                    >
                      {isMinting ? "Minting..." : `Mint ${tier.name}`}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Info Section */}
          <Card className="bg-card border-border mt-8">
            <CardHeader>
              <CardTitle className="text-foreground">Wichtige Informationen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Utility:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Live Stream Zugang zu exklusiven Episoden</li>
                    <li>• Voting Rechte für Story-Entscheidungen</li>
                    <li>• Zugang zur privaten Discord Community</li>
                    <li>• Staking Boni für MURAT Token</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Technisch:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• ERC-721 Standard auf Ethereum</li>
                    <li>• IPFS Metadaten Speicherung</li>
                    <li>• Royalties: 5% für Entwicklung</li>
                    <li>• Smart Contract verifiziert</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Mint;