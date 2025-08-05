import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Download, Share2, Zap } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { useToast } from "@/hooks/use-toast";

const MemeGenerator = () => {
  const { isConnected } = useWallet();
  const { toast } = useToast();
  const [selectedCharacter, setSelectedCharacter] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [memeText, setMemeText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMeme, setGeneratedMeme] = useState<string | null>(null);

  const characters = [
    { 
      id: "murat-happy", 
      name: "Murat (Happy)", 
      description: "Der fröhliche Bitcoin-Jäger",
      image: "/lovable-uploads/d36d5880-d1ca-418d-a062-fb9da79c00c4.png",
      category: "Hero"
    },
    { 
      id: "cryptonerd", 
      name: "CryptoNerd", 
      description: "Der kluge Analyst",
      image: "/lovable-uploads/61ea4fc5-4d61-43de-a337-42538027d5a7.png",
      category: "Hero"
    },
    { 
      id: "dj-decentral", 
      name: "DJ DECENTRAL", 
      description: "Der Musik-Crypto-Guru",
      image: "/lovable-uploads/61ea4fc5-4d61-43de-a337-42538027d5a7.png",
      category: "Hero"
    },
    { 
      id: "krypto-queen", 
      name: "KryptoQueen", 
      description: "Die Königin der Kryptowelt",
      image: "/lovable-uploads/61ea4fc5-4d61-43de-a337-42538027d5a7.png",
      category: "Hero"
    },
    { 
      id: "tiktok-gigachad", 
      name: "TikTok Gigachad", 
      description: "Der Social Media König",
      image: "/lovable-uploads/61ea4fc5-4d61-43de-a337-42538027d5a7.png",
      category: "Hero"
    },
    { 
      id: "terminal-tom", 
      name: "TerminalTom", 
      description: "Der besorgte Entwickler",
      image: "/lovable-uploads/61ea4fc5-4d61-43de-a337-42538027d5a7.png",
      category: "Neutral"
    },
    { 
      id: "skull-rider", 
      name: "Skull Rider", 
      description: "Der dunkle Reiter",
      image: "/lovable-uploads/1139925c-a258-4040-8931-e72b699f3960.png",
      category: "Villain"
    },
    { 
      id: "jaeger-boss", 
      name: "Jäger Boss", 
      description: "Der mysteriöse Anführer",
      image: "/lovable-uploads/1139925c-a258-4040-8931-e72b699f3960.png",
      category: "Villain"
    },
    { 
      id: "anonymeme", 
      name: "AnonyMeme", 
      description: "Der anonyme Memer",
      image: "/lovable-uploads/61ea4fc5-4d61-43de-a337-42538027d5a7.png",
      category: "Mystery"
    },
    { 
      id: "murat-serious", 
      name: "Murat (Serious)", 
      description: "Der ernste Bitcoin-Jäger",
      image: "/lovable-uploads/d36d5880-d1ca-418d-a062-fb9da79c00c4.png",
      category: "Hero"
    }
  ];

  const handleGenerateMeme = async () => {
    if (!selectedCharacter || !memeText.trim()) {
      toast({
        title: "Eingabe unvollständig",
        description: "Bitte wähle einen Charakter und gib einen Meme-Text ein",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate meme generation (later replace with AI)
    setTimeout(() => {
      setGeneratedMeme("https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&h=600&fit=crop");
      setIsGenerating(false);
      
      toast({
        title: "Meme generiert!",
        description: "Dein KryptoMurat Meme ist bereit",
      });
    }, 3000);
  };

  const handleDownload = () => {
    toast({
      title: "Download startet",
      description: "Meme wird heruntergeladen...",
    });
  };

  const handleShare = () => {
    toast({
      title: "Teilen",
      description: "Meme in Zwischenablage kopiert",
    });
  };

  const categories = ["all", "Hero", "Villain", "Neutral", "Mystery"];
  const filteredCharacters = selectedCategory === "all" 
    ? characters 
    : characters.filter(char => char.category === selectedCategory);

  return (
    <div className="min-h-screen bg-crypto-dark">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <section className="p-6 max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <Sparkles className="mx-auto mb-4 text-bitcoin" size={64} />
            <h1 className="text-3xl font-bold mb-4 text-foreground">
              🖼️ Meme-Generator
            </h1>
            <p className="mb-4 text-muted-foreground">
              Wähle einen Charakter & schreibe deinen Meme-Text für epische KryptoMurat Memes
            </p>
            
            {!isConnected && (
              <Badge variant="outline" className="mb-4">
                💡 Tipp: Verbinde deine Wallet für NFT-Belohnungen
              </Badge>
            )}
          </div>

          <Card className="bg-card border-border mb-6">
            <CardHeader>
              <CardTitle className="text-foreground text-xl">Charakter auswählen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-bitcoin text-crypto-dark" : ""}
                  >
                    {category === "all" ? "Alle" : category}
                  </Button>
                ))}
              </div>

              <Select value={selectedCharacter} onValueChange={setSelectedCharacter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Wähle deinen Meme-Charakter..." />
                </SelectTrigger>
                <SelectContent>
                  {filteredCharacters.map((character) => (
                    <SelectItem key={character.id} value={character.id}>
                      <div className="flex items-center gap-2">
                        <span>{character.name}</span>
                        <span className="text-muted-foreground text-sm">
                          - {character.description}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedCharacter && (
                <div className="flex justify-center">
                  <div className="text-center">
                    <img 
                      src={filteredCharacters.find(c => c.id === selectedCharacter)?.image} 
                      alt={filteredCharacters.find(c => c.id === selectedCharacter)?.name}
                      className="w-24 h-24 rounded-full mx-auto mb-2 object-cover border-2 border-bitcoin"
                    />
                    <p className="text-sm text-muted-foreground">
                      {filteredCharacters.find(c => c.id === selectedCharacter)?.description}
                    </p>
                    <Badge variant="outline" className="mt-1">
                      {filteredCharacters.find(c => c.id === selectedCharacter)?.category}
                    </Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card border-border mb-6">
            <CardHeader>
              <CardTitle className="text-foreground text-xl">Meme-Text</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Gib hier deinen epischen Meme-Text ein... 🚀"
                value={memeText}
                onChange={(e) => setMemeText(e.target.value)}
                className="w-full h-24 resize-none"
                maxLength={200}
              />
              <div className="text-right mt-2">
                <span className="text-xs text-muted-foreground">
                  {memeText.length}/200 Zeichen
                </span>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleGenerateMeme}
            disabled={!selectedCharacter || !memeText.trim() || isGenerating}
            className="w-full bg-gradient-primary hover:bg-gradient-primary/90 text-white mb-6"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Zap className="mr-2 animate-spin" size={20} />
                Meme wird generiert...
              </>
            ) : (
              <>
                <Sparkles className="mr-2" size={20} />
                🎉 Meme generieren
              </>
            )}
          </Button>

          {generatedMeme && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground text-xl flex items-center gap-2">
                  <Sparkles className="text-bitcoin" size={20} />
                  Dein generiertes Meme
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <img 
                    src={generatedMeme} 
                    alt="Generated Meme"
                    className="w-full rounded-xl shadow-lg"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-3 rounded-lg">
                    <p className="font-bold text-center">{memeText}</p>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-4">
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    className="flex-1"
                  >
                    <Download className="mr-2" size={16} />
                    Download
                  </Button>
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    className="flex-1"
                  >
                    <Share2 className="mr-2" size={16} />
                    Teilen
                  </Button>
                </div>

                {isConnected && (
                  <div className="mt-4 p-3 bg-bitcoin/10 rounded-lg border border-bitcoin/20">
                    <p className="text-sm text-bitcoin">
                      🎁 Als NFT-Holder erhältst du Bonus-Punkte für jedes generierte Meme!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              🤖 Powered by KI • Bald verfügbar: DALL·E Integration
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MemeGenerator;