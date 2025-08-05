import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { RotateCcw, Trophy, Skull, Package, Lock, Save } from 'lucide-react';
import { NFTGate } from '@/components/NFTGate';
import { checkNFTOwnership } from '@/lib/checkNFTOwnership';
import { supabase } from '@/integrations/supabase/client';
import { useWallet } from '@/hooks/useWallet';

interface StoryOption {
  text: string;
  next: number;
  requires?: 'jaeger' | 'special';
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
    options: [
      { text: '🔓 Öffne versteckte Datei', next: 6, requires: 'jaeger' },
      { text: '🚪 Normale Route fortsetzen', next: 7 }
    ],
    isEnding: false,
    isSuccess: true
  },
  {
    id: 5,
    scene: '🔒 Du hast das Gerät nicht geöffnet. Vielleicht war das klug... oder eine verpasste Chance.',
    options: [],
    isEnding: true,
    isSuccess: false
  },
  {
    id: 6,
    scene: '🧬 Die versteckte Datei enthält geheime Informationen über die nächste Mission. Du hast Zugang zu Level 3 erhalten!',
    reward: '📁 Zugangscode Level 3',
    options: [],
    isEnding: true,
    isSuccess: true
  },
  {
    id: 7,
    scene: '🛣️ Du folgst dem normalen Pfad und findest einen sicheren Ausgang. Mission erfolgreich abgeschlossen.',
    options: [],
    isEnding: true,
    isSuccess: true
  }
];

export default function GameFlow() {
  const { address, isConnected } = useWallet();
  const [step, setStep] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [hasNFTAccess, setHasNFTAccess] = useState(false);
  const [hasJaegerNFT, setHasJaegerNFT] = useState(false);
  const [inventory, setInventory] = useState<string[]>([]);
  const [choiceHistory, setChoiceHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const current = storyFlow[step];

  // Load saved progress on component mount
  useEffect(() => {
    if (address && hasNFTAccess) {
      loadGameProgress();
    }
  }, [address, hasNFTAccess]);

  const loadGameProgress = async () => {
    if (!address) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('game_progress')
        .select('*')
        .eq('wallet_address', address)
        .single();
      
      if (data && !error) {
        setStep(data.current_step);
        setInventory(Array.isArray(data.inventory) ? data.inventory as string[] : []);
        setChoiceHistory(Array.isArray(data.choices_history) ? data.choices_history as string[] : []);
        setHasJaegerNFT(data.has_jaeger_nft || false);
        
        toast({
          title: "Spielstand geladen!",
          description: "Dein gespeicherter Fortschritt wurde wiederhergestellt.",
        });
      }
    } catch (error) {
      console.error('Error loading game progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveGameProgress = async () => {
    if (!address) return;
    
    try {
      const { error } = await supabase
        .from('game_progress')
        .upsert({
          wallet_address: address,
          current_step: step,
          inventory: inventory,
          choices_history: choiceHistory,
          has_jaeger_nft: hasJaegerNFT
        });
      
      if (!error) {
        toast({
          title: "Spielstand gespeichert!",
          description: "Dein Fortschritt wurde automatisch gespeichert.",
        });
      }
    } catch (error) {
      console.error('Error saving game progress:', error);
      toast({
        title: "Speichern fehlgeschlagen",
        description: "Der Spielstand konnte nicht gespeichert werden.",
        variant: "destructive",
      });
    }
  };

  const startGame = async () => {
    setGameStarted(true);
    setStep(0);
    setChoiceHistory([]);
    
    // Check for special NFTs when starting the game
    await checkSpecialNFTs();
    
    toast({
      title: "Spiel gestartet!",
      description: "Treffe weise Entscheidungen um zu überleben.",
    });
  };

  const checkSpecialNFTs = async () => {
    try {
      // This would check for JÄGER NFT - using mock logic for now
      // In a real implementation, you'd check specific NFT contracts
      const mockJaegerOwnership = Math.random() > 0.7; // 30% chance for demo
      setHasJaegerNFT(mockJaegerOwnership);
      
      if (mockJaegerOwnership) {
        toast({
          title: "🎯 JÄGER NFT erkannt!",
          description: "Du hast Zugang zu speziellen Story-Optionen!",
        });
      }
    } catch (error) {
      console.error('Error checking special NFTs:', error);
    }
  };

  const nextStep = async (nextId: number, choiceText: string) => {
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
      
      // Auto-save progress after each step
      setTimeout(() => {
        saveGameProgress();
      }, 500);
      
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
  if (!isConnected || !hasNFTAccess) {
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
            <div className="flex justify-center items-center gap-2 mb-4">
              <Badge variant="secondary">
                Schritt {step + 1} von {storyFlow.length}
              </Badge>
              {hasJaegerNFT && (
                <Badge variant="default" className="bg-yellow-500 text-black">
                  🎯 JÄGER NFT aktiv
                </Badge>
              )}
            </div>
            
            {/* Manual Save Button */}
            <div className="flex justify-center mb-4">
              <Button 
                onClick={saveGameProgress}
                variant="outline"
                size="sm"
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <Save size={16} />
                {isLoading ? 'Lade...' : 'Spielstand speichern'}
              </Button>
            </div>
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
                {current.options.map((option, index) => {
                  const isLocked = option.requires === 'jaeger' && !hasJaegerNFT;
                  return (
                    <Button
                      key={index}
                      onClick={() => !isLocked && nextStep(option.next, option.text)}
                      variant={isLocked ? "ghost" : "outline"}
                      disabled={isLocked}
                      className={`w-full text-left justify-start p-4 h-auto ${
                        isLocked ? 'opacity-50 cursor-not-allowed border-dashed' : ''
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {isLocked && <Lock size={16} className="text-muted-foreground" />}
                        <span className="text-base">{option.text}</span>
                        {isLocked && (
                          <Badge variant="outline" className="ml-auto text-xs">
                            🎯 JÄGER NFT erforderlich
                          </Badge>
                        )}
                      </span>
                    </Button>
                  );
                })}
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