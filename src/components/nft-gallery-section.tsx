import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Star, 
  Lock, 
  ExternalLink, 
  Download,
  Eye,
  Heart,
  Zap
} from "lucide-react";
import { useState } from "react";

export const NFTGallerySection = () => {
  const [selectedCategory, setSelectedCategory] = useState("story");

  const nftCollections = {
    story: [
      {
        id: 1,
        title: "Jagd auf den Bitcoin #001",
        description: "Warum rennst du mit meinen Coins?! - Fang mich, wenn du kannst!",
        image: "/lovable-uploads/b2fe4902-9a19-45b8-9bb7-58973b181eef.png",
        rarity: "Legendary",
        owned: true,
        price: "2.5 ETH",
        holders: 156,
        unlocks: "Exklusiver Chat-Zugang"
      },
      {
        id: 2,
        title: "Egal wo du bist, KryptoMurat",
        description: "Ich werde auch da sein! - Der Jäger wird niemals aufgeben",
        image: "/lovable-uploads/e8089fb6-0917-4be6-bc88-0589ed422548.png",
        rarity: "Epic",
        owned: false,
        price: "1.8 ETH",
        holders: 89,
        unlocks: "Voting Power x2"
      },
      {
        id: 3,
        title: "Katze und Maus",
        description: "Hör auf, mir zu entkommen! - Das ultimative Katz-und-Maus-Spiel",
        image: "/lovable-uploads/3675c6a2-1411-4a51-bd60-e8044ad46de0.png",
        rarity: "Epic",
        owned: false,
        price: "1.5 ETH",
        holders: 73,
        unlocks: "Spezial-Stream Zugang"
      },
      {
        id: 4,
        title: "U-Bahn Verfolgung",
        description: "Die Spannung steigt - Verfolgung in den Tunneln der Stadt",
        image: "/lovable-uploads/5c6539d5-e209-4a90-86d6-6538d45e466c.png",
        rarity: "Rare",
        owned: false,
        price: "1.2 ETH",
        holders: 45,
        unlocks: "Behind-the-Scenes Content"
      },
      {
        id: 5,
        title: "Langfristige Stabilität",
        description: "Schutz vor Übernahme - Der Kampf um Web3 Dominanz",
        image: "/lovable-uploads/8659deab-9234-4128-998d-97563a74bc19.png",
        rarity: "Legendary",
        owned: false,
        price: "3.0 ETH",
        holders: 23,
        unlocks: "VIP Analytics Dashboard"
      },
      {
        id: 6,
        title: "Bitcoin vs XRP Race",
        description: "I Love Bitcoin vs I Love XRP - Das ultimative Crypto-Rennen",
        image: "/lovable-uploads/13bf4ef5-1c70-42e9-9ea1-a297b15d7aca.png",
        rarity: "Epic",
        owned: true,
        price: "2.0 ETH",
        holders: 67,
        unlocks: "Trading Signals Access"
      },
      {
        id: 7,
        title: "Murat - Dein rationaler Anker",
        description: "Der rationale Anker im Multichain-Web3 - Führung und Weisheit",
        image: "/lovable-uploads/2ced2c72-29f2-410c-94ad-3deb0c56c18a.png",
        rarity: "Legendary",
        owned: false,
        price: "4.0 ETH",
        holders: 12,
        unlocks: "Alle Premium Features",
        isLive: true
      }
    ],
    characters: [
      {
        id: 8,
        title: "Murat - Der Protagonist",
        description: "I ❤️ KRYPTO - Der sympathische Held unserer Geschichte",
        image: "/lovable-uploads/cba50bdb-cb2b-48b5-b69c-a8662f60f0d7.png",
        rarity: "Legendary", 
        owned: true,
        price: "5.0 ETH",
        holders: 50,
        unlocks: "Alle Premium Features"
      },
      {
        id: 9,
        title: "Der Jäger - Bitcoin Hunter",
        description: "Der mysteriöse und bedrohliche Antagonist mit Bitcoin-Pendant",
        image: "/lovable-uploads/a3709dd4-6c96-4b86-9c81-4aab2403adbc.png",
        rarity: "Epic",
        owned: false,
        price: "3.5 ETH", 
        holders: 25,
        unlocks: "Jäger-Perspektive Stream"
      }
    ],
    rewards: [
      {
        id: 6,
        title: "Voting Champion",
        description: "Für die meisten korrekten Voting-Entscheidungen",
        image: "/api/placeholder/300/400",
        rarity: "Achievement",
        owned: false,
        price: "Nur verdienbar",
        holders: 5,
        unlocks: "VIP Status lebenslang"
      }
    ]
  };

  const categories = [
    { id: "story", name: "Story NFTs", icon: Trophy, count: nftCollections.story.length },
    { id: "characters", name: "Charaktere", icon: Star, count: nftCollections.characters.length },
    { id: "rewards", name: "Belohnungen", icon: Zap, count: nftCollections.rewards.length }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Legendary": return "text-bitcoin border-bitcoin bg-bitcoin/10";
      case "Epic": return "text-purple-400 border-purple-400 bg-purple-400/10"; 
      case "Rare": return "text-electric-blue border-electric-blue bg-electric-blue/10";
      case "Achievement": return "text-green-400 border-green-400 bg-green-400/10";
      default: return "text-muted-foreground border-border bg-secondary/30";
    }
  };

  return (
    <section id="nfts" className="py-20 bg-gradient-crypto">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="bg-bitcoin text-crypto-dark mb-4">
            <Trophy className="mr-2" size={16} />
            NFT GALLERY
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-bitcoin to-electric-blue bg-clip-text text-transparent">
            Sammle Story-NFTs
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Jede Episode wird als exklusives NFT geprägt. Sammle sie alle und schalte besondere Features frei!
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "bitcoin" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center space-x-2"
            >
              <category.icon size={20} />
              <span>{category.name}</span>
              <Badge 
                variant="secondary" 
                className={selectedCategory === category.id ? "bg-crypto-dark text-bitcoin" : ""}
              >
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* NFT Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {nftCollections[selectedCategory as keyof typeof nftCollections].map((nft) => (
            <Card 
              key={nft.id} 
              className={`
                bg-card/80 backdrop-blur border-border hover:shadow-card-glow transition-all duration-300 group overflow-hidden
                ${nft.owned ? 'border-bitcoin/50 bg-bitcoin/5' : ''}
                ${nft.isLive ? 'animate-pulse border-electric-blue' : ''}
              `}
            >
              {/* NFT Image */}
              <div className="relative aspect-[3/4] bg-gradient-to-br from-crypto-dark to-crypto-darker">
                <img 
                  src={nft.image} 
                  alt={nft.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Live Badge */}
                {nft.isLive && (
                  <Badge className="absolute top-3 left-3 bg-red-600 text-white animate-pulse">
                    🔴 LIVE
                  </Badge>
                )}

                {/* Owned Badge */}
                {nft.owned && (
                  <Badge className="absolute top-3 right-3 bg-bitcoin text-crypto-dark">
                    ✓ OWNED
                  </Badge>
                )}

                {/* Locked Overlay */}
                {!nft.owned && (
                  <div className="absolute inset-0 bg-crypto-dark/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Lock className="text-bitcoin" size={48} />
                  </div>
                )}

                {/* Rarity Badge */}
                <Badge 
                  className={`absolute bottom-3 left-3 ${getRarityColor(nft.rarity)}`}
                  variant="outline"
                >
                  {nft.rarity}
                </Badge>

                {/* Quick Actions */}
                <div className="absolute bottom-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button variant="ghost" size="sm" className="bg-crypto-dark/80 hover:bg-crypto-dark">
                    <Eye size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" className="bg-crypto-dark/80 hover:bg-crypto-dark">
                    <Heart size={16} />
                  </Button>
                </div>
              </div>

              {/* NFT Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{nft.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{nft.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Preis</p>
                    <p className="font-semibold">{nft.price}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Besitzer</p>
                    <p className="font-semibold">{nft.holders}</p>
                  </div>
                </div>

                {/* Unlocks */}
                <div className="bg-secondary/30 rounded-lg p-3 mb-4">
                  <p className="text-xs text-muted-foreground mb-1">SCHALTET FREI:</p>
                  <p className="text-sm font-medium text-bitcoin">{nft.unlocks}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  {nft.owned ? (
                    <>
                      <Button variant="bitcoin" size="sm" className="flex-1">
                        <Download className="mr-2" size={16} />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink size={16} />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="electric" size="sm" className="flex-1">
                        Kaufen
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink size={16} />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Collection Stats */}
        <Card className="mt-12 bg-card/50 border-border">
          <div className="p-8">
            <h3 className="text-2xl font-semibold mb-6 text-center">Deine Sammlung</h3>
            
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-bitcoin mb-2">3</div>
                <p className="text-muted-foreground">Owned NFTs</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-electric-blue mb-2">1,247</div>
                <p className="text-muted-foreground">Total Value (USD)</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-bitcoin mb-2">45%</div>
                <p className="text-muted-foreground">Collection Complete</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-electric-blue mb-2">12</div>
                <p className="text-muted-foreground">Voting Power</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};