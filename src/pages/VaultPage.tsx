import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Vault, Trophy, Coins, RefreshCw, Eye, Download, Share2 } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { useToast } from "@/hooks/use-toast";

const VaultPage = () => {
  const { isConnected, connectWallet, address } = useWallet();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Mock user inventory data
  const [inventory, setInventory] = useState({
    nfts: [
      {
        id: "murat-access",
        name: "🎖️ Murat Access NFT",
        type: "Access Token",
        rarity: "Epic",
        image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=400&fit=crop",
        description: "Zugriff auf geheime Orte und Premium-Features",
        acquired: "2024-01-15",
        level: "Premium"
      },
      {
        id: "meme-medal-2",
        name: "🎖️ Meme Medaille Level 2",
        type: "Achievement",
        rarity: "Rare",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop",
        description: "Belohnung für richtige Antwort in der Meme-Arena",
        acquired: "2024-01-20",
        level: "Level 2"
      },
      {
        id: "starter-badge",
        name: "🏁 Starter Badge",
        type: "Achievement",
        rarity: "Common",
        image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=400&fit=crop",
        description: "Erstes abgeschlossenes Level",
        acquired: "2024-01-10",
        level: "Beginner"
      }
    ],
    tokens: [
      {
        id: "xp",
        name: "Experience Points",
        symbol: "XP",
        balance: "2,450",
        icon: "⭐"
      },
      {
        id: "murat",
        name: "MURAT Token",
        symbol: "MURAT",
        balance: "125.50",
        icon: "🪙"
      },
      {
        id: "meme-coins",
        name: "Meme Coins",
        symbol: "MEME",
        balance: "8,750",
        icon: "🎭"
      }
    ],
    achievements: [
      {
        id: "first-meme",
        name: "Erster Meme",
        description: "Erstes Meme erfolgreich generiert",
        unlocked: true,
        date: "2024-01-12"
      },
      {
        id: "voting-master",
        name: "Voting Master",
        description: "An 10 Community-Votings teilgenommen",
        unlocked: true,
        date: "2024-01-18"
      },
      {
        id: "nft-collector",
        name: "NFT Sammler",
        description: "5 verschiedene NFTs gesammelt",
        unlocked: false,
        progress: "3/5"
      }
    ]
  });

  const handleSyncWallet = async () => {
    if (!isConnected) {
      await connectWallet();
      return;
    }

    setIsLoading(true);
    
    // Simulate wallet sync
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Synchronisation abgeschlossen",
        description: "Dein Inventar wurde mit der Blockchain aktualisiert",
      });
    }, 2000);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Legendary": return "text-yellow-500 border-yellow-500";
      case "Epic": return "text-purple-500 border-purple-500";
      case "Rare": return "text-blue-500 border-blue-500";
      case "Common": return "text-green-500 border-green-500";
      default: return "text-muted-foreground border-muted";
    }
  };

  const totalValue = inventory.nfts.length + inventory.tokens.reduce((acc, token) => acc + parseFloat(token.balance.replace(',', '')), 0);

  return (
    <div className="min-h-screen bg-crypto-dark">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <section className="p-6 max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <Vault className="mx-auto mb-4 text-bitcoin" size={64} />
            <h1 className="text-3xl font-bold mb-4 text-foreground">
              💼 Dein Inventar
            </h1>
            <p className="mb-6 text-muted-foreground max-w-2xl mx-auto">
              Hier findest du alle NFTs, Belohnungen und Token, die du auf deiner Jagd gesammelt hast.
            </p>
          </div>

          {/* Portfolio Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-card border-border">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-bitcoin">{inventory.nfts.length}</div>
                <p className="text-sm text-muted-foreground">NFTs im Besitz</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-500">{inventory.tokens.length}</div>
                <p className="text-sm text-muted-foreground">Token-Arten</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-500">
                  {inventory.achievements.filter(a => a.unlocked).length}
                </div>
                <p className="text-sm text-muted-foreground">Erfolge freigeschaltet</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground">
                  {totalValue.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">Gesamtwert (geschätzt)</p>
              </CardContent>
            </Card>
          </div>

          {/* Wallet Connection */}
          {!isConnected ? (
            <Card className="bg-card border-border mb-8">
              <CardContent className="p-6 text-center">
                <Vault className="mx-auto mb-4 text-muted-foreground" size={48} />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Wallet nicht verbunden
                </h3>
                <p className="text-muted-foreground mb-4">
                  Verbinde deine Wallet, um dein echtes NFT-Inventar zu sehen
                </p>
                <Button 
                  onClick={connectWallet}
                  className="bg-gradient-primary hover:bg-gradient-primary/90 text-white"
                >
                  Wallet verbinden
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-muted-foreground">
                Verbunden: {address?.slice(0, 6)}...{address?.slice(-4)}
              </div>
              <Button
                onClick={handleSyncWallet}
                disabled={isLoading}
                variant="outline"
                size="sm"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 animate-spin" size={16} />
                    Synchronisiere...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2" size={16} />
                    🔁 Mit Wallet synchronisieren
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Inventory Tabs */}
          <Tabs defaultValue="nfts" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="nfts">NFTs & Sammlerstücke</TabsTrigger>
              <TabsTrigger value="tokens">Token & Währungen</TabsTrigger>
              <TabsTrigger value="achievements">Erfolge & Medaillen</TabsTrigger>
            </TabsList>

            {/* NFTs Tab */}
            <TabsContent value="nfts" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inventory.nfts.map((nft) => (
                  <Dialog key={nft.id}>
                    <DialogTrigger asChild>
                      <Card className="bg-card border-border cursor-pointer hover:border-bitcoin transition-all duration-200">
                        <div className="relative">
                          <img 
                            src={nft.image} 
                            alt={nft.name}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          <Badge 
                            className={`absolute top-2 right-2 ${getRarityColor(nft.rarity)}`}
                            variant="outline"
                          >
                            {nft.rarity}
                          </Badge>
                        </div>
                        <CardHeader>
                          <CardTitle className="text-foreground text-lg">{nft.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{nft.type}</p>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-2">{nft.description}</p>
                          <div className="flex justify-between items-center">
                            <Badge variant="secondary">{nft.level}</Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(nft.acquired).toLocaleDateString()}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-foreground">{nft.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <img 
                          src={nft.image} 
                          alt={nft.name}
                          className="w-full rounded-lg"
                        />
                        <div className="space-y-2">
                          <p className="text-muted-foreground">{nft.description}</p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Typ:</span>
                              <p className="font-semibold">{nft.type}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Seltenheit:</span>
                              <p className={`font-semibold ${getRarityColor(nft.rarity).split(' ')[0]}`}>
                                {nft.rarity}
                              </p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Level:</span>
                              <p className="font-semibold">{nft.level}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Erhalten:</span>
                              <p className="font-semibold">
                                {new Date(nft.acquired).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1">
                            <Eye className="mr-2" size={16} />
                            Details
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Share2 className="mr-2" size={16} />
                            Teilen
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </TabsContent>

            {/* Tokens Tab */}
            <TabsContent value="tokens" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inventory.tokens.map((token) => (
                  <Card key={token.id} className="bg-card border-border">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{token.icon}</div>
                        <div>
                          <CardTitle className="text-foreground">{token.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{token.symbol}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-bitcoin mb-2">
                        {token.balance}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {token.symbol} im Besitz
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {inventory.achievements.map((achievement) => (
                  <Card 
                    key={achievement.id} 
                    className={`bg-card border-border ${
                      achievement.unlocked ? "border-bitcoin" : "opacity-60"
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-foreground flex items-center gap-2">
                          <Trophy 
                            className={achievement.unlocked ? "text-bitcoin" : "text-muted-foreground"} 
                            size={20} 
                          />
                          {achievement.name}
                        </CardTitle>
                        {achievement.unlocked ? (
                          <Badge className="bg-bitcoin text-crypto-dark">Freigeschaltet</Badge>
                        ) : (
                          <Badge variant="outline">Gesperrt</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-2">{achievement.description}</p>
                      {achievement.unlocked ? (
                        <p className="text-xs text-bitcoin">
                          Freigeschaltet am {new Date(achievement.date!).toLocaleDateString()}
                        </p>
                      ) : (
                        achievement.progress && (
                          <p className="text-xs text-muted-foreground">
                            Fortschritt: {achievement.progress}
                          </p>
                        )
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default VaultPage;