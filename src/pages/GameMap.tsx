import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, Lock, Unlock, Star, Zap, Users } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { useToast } from "@/hooks/use-toast";

const GameMap = () => {
  const { isConnected } = useWallet();
  const { toast } = useToast();
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  // Mock NFT ownership - in real app, this would come from the blockchain
  const [userNFTs] = useState({
    murat: true,
    jaeger: false
  });

  const locations = [
    {
      id: "altstadt",
      name: "🏙️ Altstadt-Gasse",
      description: "Starte dein erstes Meme-Rätsel",
      requirements: "none",
      level: 1,
      rewards: "100 XP + Starter NFT",
      available: true,
      completed: false,
      position: { top: "60%", left: "20%" }
    },
    {
      id: "subway",
      name: "🚇 U-Bahn-Tunnel",
      description: "Wird nur mit Murat-NFT freigeschaltet",
      requirements: "murat-nft",
      level: 2,
      rewards: "200 XP + Rare Meme",
      available: userNFTs.murat,
      completed: false,
      position: { top: "75%", left: "45%" }
    },
    {
      id: "arena",
      name: "🔥 Meme-Arena",
      description: "Hier entscheidet das Volk – Voting aktiviert",
      requirements: "voting",
      level: 3,
      rewards: "300 XP + Community Badge",
      available: true,
      completed: true,
      position: { top: "30%", left: "60%" }
    },
    {
      id: "hq",
      name: "💀 Motorrad-Gang HQ",
      description: "Gefährlich – nur mit Jäger-NFT",
      requirements: "jaeger-nft",
      level: 4,
      rewards: "500 XP + Legendary NFT",
      available: userNFTs.jaeger,
      completed: false,
      position: { top: "40%", left: "80%" }
    },
    {
      id: "vault",
      name: "🏦 Bitcoin Vault",
      description: "Das finale Ziel - höchste Sicherheitsstufe",
      requirements: "both-nfts",
      level: 5,
      rewards: "1000 XP + Master NFT",
      available: userNFTs.murat && userNFTs.jaeger,
      completed: false,
      position: { top: "15%", left: "40%" }
    },
    {
      id: "hideout",
      name: "🏠 Geheimversteck",
      description: "Versteckter Ort für echte Insider",
      requirements: "secret",
      level: "?",
      rewards: "??? XP + Mystery Reward",
      available: false,
      completed: false,
      position: { top: "85%", left: "75%" }
    }
  ];

  const handleLocationClick = (location: any) => {
    if (!isConnected) {
      toast({
        title: "Wallet verbinden",
        description: "Verbinde deine Wallet, um Zugang zu erhalten",
        variant: "destructive",
      });
      return;
    }

    if (!location.available) {
      toast({
        title: "Zugang verweigert",
        description: `Du benötigst ${getRequirementText(location.requirements)}`,
        variant: "destructive",
      });
      return;
    }

    setSelectedLocation(location.id);
    
    if (location.completed) {
      toast({
        title: "Level abgeschlossen",
        description: `Du hast ${location.name} bereits erfolgreich abgeschlossen`,
      });
    } else {
      toast({
        title: "Level starten",
        description: `Bereit für ${location.name}?`,
      });
    }
  };

  const getRequirementText = (requirement: string) => {
    switch (requirement) {
      case "murat-nft": return "ein Murat NFT";
      case "jaeger-nft": return "ein Jäger NFT";
      case "both-nfts": return "sowohl Murat als auch Jäger NFT";
      case "voting": return "Teilnahme am Community Voting";
      case "secret": return "einen geheimen Schlüssel";
      default: return "keine besonderen Voraussetzungen";
    }
  };

  const getLocationIcon = (location: any) => {
    if (location.completed) return <Star className="text-bitcoin" size={16} />;
    if (!location.available) return <Lock className="text-muted-foreground" size={16} />;
    return <Unlock className="text-green-500" size={16} />;
  };

  return (
    <div className="min-h-screen bg-crypto-dark">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <section className="p-6 max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <MapPin className="mx-auto mb-4 text-bitcoin" size={64} />
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              🗺️ Die Welt von Jagd auf den Bitcoin
            </h1>
            <p className="mb-6 text-lg text-muted-foreground max-w-3xl mx-auto">
              Wähle deinen nächsten Ort. Jeder Platz ist ein neues Meme-Abenteuer – manche sind nur mit
              NFT-Zugang betretbar.
            </p>
          </div>

          {/* Progress Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-card border-border">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-bitcoin">
                  {locations.filter(l => l.completed).length}/{locations.length}
                </div>
                <p className="text-sm text-muted-foreground">Level abgeschlossen</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-500">
                  {locations.filter(l => l.available).length}
                </div>
                <p className="text-sm text-muted-foreground">Verfügbare Level</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground">
                  {Object.values(userNFTs).filter(Boolean).length}/2
                </div>
                <p className="text-sm text-muted-foreground">NFTs im Besitz</p>
              </CardContent>
            </Card>
          </div>

          {/* Interactive Map */}
          <Card className="bg-card border-border mb-8">
            <CardHeader>
              <CardTitle className="text-foreground">Interaktive Spielwelt</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-10 left-10 w-8 h-8 bg-bitcoin rounded-full opacity-50"></div>
                  <div className="absolute top-20 right-20 w-6 h-6 bg-green-500 rounded-full opacity-30"></div>
                  <div className="absolute bottom-20 left-20 w-10 h-10 bg-purple-500 rounded-full opacity-40"></div>
                </div>

                {/* Location markers */}
                {locations.map((location) => (
                  <Dialog key={location.id}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                          location.available ? "hover:scale-110" : "opacity-50 cursor-not-allowed"
                        } transition-all duration-200`}
                        style={{ 
                          top: location.position.top, 
                          left: location.position.left 
                        }}
                        onClick={() => handleLocationClick(location)}
                      >
                        <div className={`p-3 rounded-full border-2 ${
                          location.completed 
                            ? "bg-bitcoin border-bitcoin text-black" 
                            : location.available 
                              ? "bg-card border-green-500 text-foreground" 
                              : "bg-muted border-muted-foreground text-muted-foreground"
                        }`}>
                          {getLocationIcon(location)}
                        </div>
                      </Button>
                    </DialogTrigger>
                    
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-foreground">{location.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">{location.description}</p>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Level:</span>
                            <Badge variant="outline">{location.level}</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Voraussetzung:</span>
                            <span className="text-sm">{getRequirementText(location.requirements)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Belohnung:</span>
                            <span className="text-sm text-bitcoin">{location.rewards}</span>
                          </div>
                        </div>

                        <Button 
                          className={`w-full ${
                            location.completed 
                              ? "bg-green-600 hover:bg-green-700" 
                              : location.available 
                                ? "bg-gradient-primary hover:bg-gradient-primary/90" 
                                : "bg-muted"
                          }`}
                          disabled={!location.available}
                        >
                          {location.completed ? (
                            <>
                              <Star className="mr-2" size={16} />
                              Abgeschlossen
                            </>
                          ) : location.available ? (
                            <>
                              <Zap className="mr-2" size={16} />
                              Level starten
                            </>
                          ) : (
                            <>
                              <Lock className="mr-2" size={16} />
                              Gesperrt
                            </>
                          )}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Location Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location) => (
              <Card 
                key={location.id} 
                className={`bg-card border-border cursor-pointer transition-all duration-200 ${
                  location.available ? "hover:border-bitcoin hover:shadow-lg" : "opacity-60"
                }`}
                onClick={() => handleLocationClick(location)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-foreground text-lg">
                      {location.name}
                    </CardTitle>
                    {getLocationIcon(location)}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    {location.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Level:</span>
                      <Badge variant="outline">{location.level}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Status:</span>
                      <Badge 
                        variant={location.completed ? "default" : location.available ? "secondary" : "destructive"}
                      >
                        {location.completed ? "Abgeschlossen" : location.available ? "Verfügbar" : "Gesperrt"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {!isConnected && (
            <div className="mt-8 p-6 bg-muted rounded-xl text-center">
              <Users className="mx-auto mb-3 text-bitcoin" size={32} />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Verbinde deine Wallet
              </h3>
              <p className="text-muted-foreground mb-4">
                Um auf die Spielwelt zuzugreifen und NFT-exklusive Level freizuschalten
              </p>
              <Button className="bg-gradient-primary hover:bg-gradient-primary/90 text-white">
                Wallet verbinden
              </Button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GameMap;