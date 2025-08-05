import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gamepad2, Trophy, Map, Sparkles, Swords, Vault, Zap, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

export const NFTGameSection = () => {
  const { t } = useTranslation();
  const gameFeatures = [
    {
      id: "game",
      icon: Gamepad2,
      title: "🎮 Jagd auf den Bitcoin",
      description: "Starte dein Abenteuer als Murat oder der Jäger. Löse Meme-Rätsel und sichere dir NFTs!",
      link: "/game",
      color: "bg-gradient-primary",
      badge: "SPIEL STARTEN"
    },
    {
      id: "memes",
      icon: Sparkles,
      title: "🖼️ Meme-Generator",
      description: "Erstelle epische Memes mit KI und deinen Lieblings-Charakteren",
      link: "/memes",
      color: "bg-bitcoin",
      badge: "KI-POWERED"
    },
    {
      id: "map",
      icon: Map,
      title: "🗺️ Spielwelt-Karte", 
      description: "Erkunde die Welt von KryptoMurat und schalte neue Level frei",
      link: "/map",
      color: "bg-gradient-electric",
      badge: "ENTDECKEN"
    },
    {
      id: "battle",
      icon: Swords,
      title: "⚔️ Meme-Battle Arena",
      description: "Kämpfe in epischen Meme-Battles und gewinne Belohnungen",
      link: "/battle",
      color: "bg-red-600",
      badge: "LIVE BATTLE"
    },
    {
      id: "vault",
      icon: Vault,
      title: "💼 Dein Inventar",
      description: "Verwalte deine NFTs, Token und Achievements",
      link: "/vault",
      color: "bg-purple-600",
      badge: "SAMMLUNG"
    },
    {
      id: "nft",
      icon: Trophy,
      title: "🎫 NFT-Zugang",
      description: "Erhalte Premium-Zugang mit MURAT oder JÄGER NFTs",
      link: "/nft",
      color: "bg-green-600",
      badge: "PREMIUM"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-crypto-dark to-slate-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-bitcoin text-crypto-dark px-6 py-2 text-lg font-bold">
            🎮 NEUES NFT-SPIEL
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-bitcoin via-bitcoin-glow to-electric-blue bg-clip-text text-transparent">
            KryptoMurat NFT-Spiel
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Erlebe die ultimative Jagd auf den Bitcoin! Spiele als Murat oder der Jäger, sammle NFTs und erobere die Krypto-Welt.
          </p>
          
          {/* Quick Start Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-gradient-primary hover:bg-gradient-primary/90 text-white px-8" asChild>
              <Link to="/game">
                <Play className="mr-2" size={20} />
                Spiel starten
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" className="px-8" asChild>
              <Link to="/nft">
                <Trophy className="mr-2" size={20} />
                NFT prüfen
              </Link>
            </Button>
          </div>
        </div>

        {/* Game Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {gameFeatures.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <Link key={feature.id} to={feature.link} className="block">
                <Card className="bg-card/80 backdrop-blur border-border hover:border-bitcoin hover:shadow-xl transition-all duration-300 group cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-full ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="text-white" size={24} />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {feature.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-foreground group-hover:text-bitcoin transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Game Stats */}
        <div className="bg-card/50 backdrop-blur rounded-2xl border border-border p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-bitcoin mb-2">6</div>
              <p className="text-muted-foreground">Spiel-Modi</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-500 mb-2">50+</div>
              <p className="text-muted-foreground">Einzigartige NFTs</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-500 mb-2">10</div>
              <p className="text-muted-foreground">Charaktere</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-electric-blue mb-2">∞</div>
              <p className="text-muted-foreground">Möglichkeiten</p>
            </div>
          </div>
        </div>

          <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-bitcoin/10 to-electric-blue/10 rounded-2xl border border-bitcoin/20 p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Bereit für das Abenteuer?
            </h3>
            <p className="text-muted-foreground mb-6">
              Verbinde dein Wallet und starte die ultimative Bitcoin-Jagd!
            </p>
            <Button size="lg" className="bg-bitcoin hover:bg-bitcoin/90 text-crypto-dark px-8 font-bold" asChild>
              <Link to="/game">
                <Zap className="mr-2" size={20} />
                Jetzt spielen
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};