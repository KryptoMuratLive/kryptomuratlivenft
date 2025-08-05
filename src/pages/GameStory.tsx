import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { RotateCcw, Trophy, Skull, Package } from 'lucide-react';
import { NFTGate } from '@/components/NFTGate';

interface StoryOption {
  text: string;
  next: number;
}

interface StoryStep {
  id: number;
  scene: string;
  options: StoryOption[];
  reward?: string;
  isEnding?: boolean;
  isSuccess?: boolean;
}

const storyFlow: StoryStep[] = [
  {
    id: 1,
    scene: '🚧 Du stehst in einer engen Altstadtgasse. Plötzlich taucht der Jäger auf! Was tust du?',
    options: [
      { text: '🔀 In die nächste Gasse fliehen', next: 2 },
      { text: '🗑️ In der Mülltonne verstecken', next: 3 }
    ]
  },
  {
    id: 2,
    scene: '🏃 Du läufst durch eine dunkle Gasse und entkommst knapp. Du findest einen USB-Stick. Was jetzt?',
    options: [
      { text: '📂 Öffnen und analysieren', next: 4 },
      { text: '🛑 Nicht anfassen, es könnte eine Falle sein', next: 5 }
    ]
  },
  {
    id: 3,
    scene: '🤢 Leider war die Mülltonne voll. Der Jäger hat dich gerochen. GAME OVER!',
    options: [],
    isEnding: true,
    isSuccess: false
  },
  {
    id: 4,
    scene: '🧠 Der USB-Stick enthält ein geheimes Meme! Du hast Level 2 erreicht und ein Item erhalten.',
    reward: '🧩 Meme Decoder',
    options: [],
    isEnding: true,
    isSuccess: true
  },
  {
    id: 5,
    scene: '🔒 Du hast das Gerät nicht geöffnet. Vielleicht war das klug... oder eine verpasste Chance.',
    options: [],
    isEnding: true,
    isSuccess: false
  }
];

export default function GameFlow() {
  const [step, setStep] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [hasNFTAccess, setHasNFTAccess] = useState(false);
  const [inventory, setInventory] = useState<string[]>([]);
  const [choiceHistory, setChoiceHistory] = useState<string[]>([]);
  const { toast } = useToast();
  
  const current = storyFlow[step];

  const startGame = () => {
    setGameStarted(true);
    setStep(0);
    setChoiceHistory([]);
    toast({
      title: "Spiel gestartet!",
      description: "Treffe weise Entscheidungen um zu überleben.",
    });
  };

  const nextStep = (nextId: number, choiceText: string) => {
    const index = storyFlow.findIndex(s => s.id === nextId);
    if (index >= 0) {
      setStep(index);
      setChoiceHistory(prev => [...prev, choiceText]);
      
      const nextStory = storyFlow[index];
      
      // Add reward to inventory if exists
      if (nextStory.reward) {
        setInventory(prev => [...prev, nextStory.reward!]);
        toast({
          title: "Item erhalten!",
          description: `Du hast ${nextStory.reward} erhalten!`,
        });
      }
      
      if (nextStory.isEnding) {
        if (nextStory.isSuccess) {
          toast({
            title: "Erfolgreich!",
            description: "Du hast das Level geschafft!",
          });
        } else {
          toast({
            title: "Game Over",
            description: "Versuche es nochmal!",
            variant: "destructive",
          });
        }
      }
    }
  };

  const resetGame = () => {
    setStep(0);
    setGameStarted(false);
    setInventory([]);
    setChoiceHistory([]);
  };

  const handleNFTAccess = (hasNFT: boolean) => {
    setHasNFTAccess(hasNFT);
    if (hasNFT) {
      toast({
        title: "Zugriff gewährt!",
        description: "NFT verifiziert. Du kannst das Spiel starten.",
      });
    }
  };

  // NFT Gate Screen
  if (!hasNFTAccess) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                🎮 KryptoMurat – Story Mode
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                NFT-exklusives Abenteuer-Spiel
              </p>
              <Badge variant="outline" className="mb-6">
                🔐 NFT Zugang erforderlich
              </Badge>
            </div>
            
            <NFTGate onConnect={handleNFTAccess} />
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                🎮 KryptoMurat – Story Mode
              </h1>
              <p className="text-xl text-muted-foreground">
                Interaktives Abenteuer-Spiel
              </p>
              <Badge variant="secondary" className="mt-2">
                ✅ NFT Zugang verifiziert
              </Badge>
            </div>
            
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-2xl text-card-foreground">
                  Willkommen zur Jagd!
                </CardTitle>
                <CardDescription>
                  Erlebe eine interaktive Geschichte voller Entscheidungen und Konsequenzen.
                  Jede Wahl beeinflusst deinen Weg durch die Welt von KryptoMurat.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-left space-y-2">
                    <h3 className="font-semibold text-card-foreground">Spielregeln:</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Treffe Entscheidungen durch Klicken der Optionen</li>
                      <li>• Jede Wahl führt zu unterschiedlichen Ergebnissen</li>
                      <li>• Sammle Items für dein Inventar</li>
                      <li>• Versuche das beste Ende zu erreichen</li>
                      <li>• Bei Game Over kannst du neu starten</li>
                    </ul>
                  </div>
                  
                  <Button 
                    onClick={startGame}
                    size="lg"
                    className="w-full"
                  >
                    🚀 Spiel starten
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              🎮 KryptoMurat – Story Mode
            </h1>
            <Badge variant="secondary" className="mb-4">
              Schritt {step + 1} von {storyFlow.length}
            </Badge>
          </div>

          {/* Story Card */}
          <Card className="bg-card border-border mb-6">
            <CardHeader>
              <CardTitle className="text-xl text-card-foreground">
                Aktuelle Situation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-card-foreground leading-relaxed">
                {current.scene}
              </p>
            </CardContent>
          </Card>

          {/* Options or End Screen */}
          <div className="space-y-4">
            {current.options.length > 0 ? (
              <>
                <h3 className="text-lg font-semibold text-foreground text-center">
                  Was ist deine Entscheidung?
                </h3>
                {current.options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => nextStep(option.next, option.text)}
                    variant="outline"
                    className="w-full text-left justify-start p-4 h-auto"
                  >
                    <span className="text-base">{option.text}</span>
                  </Button>
                ))}
              </>
            ) : (
              <Card className={`border-2 ${current.isSuccess ? 'border-green-500 bg-green-50 dark:bg-green-950' : 'border-red-500 bg-red-50 dark:bg-red-950'}`}>
                <CardContent className="pt-6 text-center">
                  <div className="text-6xl mb-4">
                    {current.isSuccess ? <Trophy className="mx-auto text-yellow-500" size={64} /> : <Skull className="mx-auto text-red-500" size={64} />}
                  </div>
                  <h2 className="text-2xl font-bold mb-4">
                    {current.isSuccess ? '🎉 Erfolgreich!' : '💀 Game Over!'}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {current.isSuccess 
                      ? 'Glückwunsch! Du hast das Level gemeistert.'
                      : 'Nicht aufgeben! Versuche es nochmal mit einer anderen Strategie.'
                    }
                  </p>
                  
                  <Button 
                    onClick={resetGame}
                    variant="default"
                    className="mr-2"
                  >
                    <RotateCcw className="mr-2" size={16} />
                    Neues Spiel
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Inventory */}
          {inventory.length > 0 && (
            <Card className="mt-6 bg-muted/50">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                  <Package size={16} />
                  Dein Inventar:
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {inventory.map((item, index) => (
                    <Badge key={index} variant="secondary" className="mr-2">
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Choice History */}
          {choiceHistory.length > 0 && (
            <Card className="mt-6 bg-muted/50">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">
                  Deine bisherigen Entscheidungen:
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {choiceHistory.map((choice, index) => (
                    <div key={index} className="text-sm text-muted-foreground">
                      {index + 1}. {choice}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}