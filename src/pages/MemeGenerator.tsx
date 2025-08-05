import { useState, useRef } from "react";
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

  // Canvas-basierte Meme-Erstellung
  const createMeme = async (characterImage: string, text: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        reject(new Error('Canvas not available'));
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }

      // Set canvas size
      canvas.width = 600;
      canvas.height = 600;

      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw character image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Add text overlay
        if (text.trim()) {
          // Text styling
          ctx.fillStyle = 'white';
          ctx.strokeStyle = 'black';
          ctx.lineWidth = 3;
          ctx.font = 'bold 36px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          // Split text into lines if too long
          const maxWidth = canvas.width - 40;
          const lines = wrapText(ctx, text.toUpperCase(), maxWidth);
          
          // Calculate starting Y position
          const lineHeight = 45;
          const totalHeight = lines.length * lineHeight;
          const startY = canvas.height - 80 - totalHeight/2;
          
          // Draw text with outline
          lines.forEach((line, index) => {
            const y = startY + (index * lineHeight);
            
            // Draw stroke (outline)
            ctx.strokeText(line, canvas.width / 2, y);
            // Draw fill (text)
            ctx.fillText(line, canvas.width / 2, y);
          });
        }
        
        // Convert to data URL
        const dataUrl = canvas.toDataURL('image/png');
        resolve(dataUrl);
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load character image'));
      };
      
      img.src = characterImage;
    });
  };

  // Text wrapping helper function
  const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(currentLine + ' ' + word).width;
      if (width < maxWidth) {
        currentLine += ' ' + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  };

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
    
    try {
      const selectedChar = filteredCharacters.find(c => c.id === selectedCharacter);
      if (!selectedChar) {
        throw new Error('Charakter nicht gefunden');
      }

      const memeDataUrl = await createMeme(selectedChar.image, memeText);
      setGeneratedMeme(memeDataUrl);
      
      toast({
        title: "Meme generiert!",
        description: `Dein ${selectedChar.name} Meme ist bereit`,
      });
    } catch (error) {
      console.error('Meme generation error:', error);
      toast({
        title: "Fehler beim Generieren",
        description: "Meme konnte nicht erstellt werden. Versuche es erneut.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedMeme) return;
    
    const link = document.createElement('a');
    link.download = `meme-${selectedCharacter}-${Date.now()}.png`;
    link.href = generatedMeme;
    link.click();
    
    toast({
      title: "Download gestartet",
      description: "Dein Meme wird heruntergeladen...",
    });
  };

  const handleShare = async () => {
    if (!generatedMeme) return;
    
    try {
      if (navigator.share) {
        // Web Share API für mobile Geräte
        const response = await fetch(generatedMeme);
        const blob = await response.blob();
        const file = new File([blob], 'meme.png', { type: 'image/png' });
        
        await navigator.share({
          files: [file],
          title: 'KryptoMurat Meme',
          text: memeText
        });
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(generatedMeme);
        toast({
          title: "In Zwischenablage kopiert",
          description: "Meme-Link wurde kopiert",
        });
      }
    } catch (error) {
      toast({
        title: "Teilen fehlgeschlagen",
        description: "Meme konnte nicht geteilt werden",
        variant: "destructive",
      });
    }
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
                <div className="relative mb-4">
                  <img 
                    src={generatedMeme} 
                    alt="Generated Meme"
                    className="w-full rounded-xl shadow-lg"
                  />
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

          {/* Hidden Canvas für Meme-Erstellung */}
          <canvas 
            ref={canvasRef} 
            style={{ display: 'none' }}
            width="600" 
            height="600"
          />

          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              🤖 Powered by Canvas • Echte Meme-Erstellung mit deinen Charakteren
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MemeGenerator;