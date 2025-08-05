import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gamepad2, Zap, Trophy, ArrowRight, Lock } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { checkNFTOwnership } from "@/lib/checkNFTOwnership";

interface GameAnswer {
  id: number;
  text: string;
  correct: boolean;
  action?: string;
}

const Game = () => {
  const { isConnected, connectWallet, address } = useWallet();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [currentPhase, setCurrentPhase] = useState(1);
  const [hasNFTAccess, setHasNFTAccess] = useState(false);
  const [gameProgress, setGameProgress] = useState({
    level: 1,
    inventory: [] as string[],
    completedQuizzes: [] as number[]
  });
  const { toast } = useToast();

  // Definiere die Spiel-Phasen
  const gamePhases = [
    {
      id: 1,
      title: "🧠 Level 1 – Meme-Rätsel",
      question: "Welcher Meme-Hund wurde zuerst weltberühmt?",
      answers: [
        { id: 1, text: "🐶 Doge", correct: true },
        { id: 2, text: "🦊 ShibaSwap", correct: false },
        { id: 3, text: "🐸 Pepe", correct: false }
      ] as GameAnswer[],
      reward: "🧩 Meme-Wissen Level 1"
    },
    {
      id: 2,
      title: "💰 Level 2 – Bitcoin Geschichte",
      question: "In welchem Jahr wurde Bitcoin veröffentlicht?",
      answers: [
        { id: 1, text: "2008", correct: false },
        { id: 2, text: "2009", correct: true },
        { id: 3, text: "2010", correct: false }
      ] as GameAnswer[],
      reward: "💎 Bitcoin-Experte"
    },
    {
      id: 3,
      title: "🎯 Level 3 – NFT Mission",
      question: "Du hast alle Rätsel gelöst! Wähle deinen nächsten Schritt:",
      answers: [
        { id: 1, text: "🗺️ Zur Story-Map", correct: true, action: "goto-story" },
        { id: 2, text: "🎮 Neues Spiel starten", correct: true, action: "restart" },
        { id: 3, text: "🏆 Erfolge anzeigen", correct: true, action: "show-achievements" }
      ] as GameAnswer[],
      reward: "🏅 Spiel-Meister"
    }
  ];

  const currentPhaseData = gamePhases[currentPhase - 1];

  // Load NFT access and game progress
  useEffect(() => {
    if (address && isConnected) {
      loadGameData();
    }
  }, [address, isConnected]);

  const loadGameData = async () => {
    try {
      // Check NFT access
      const nftData = await checkNFTOwnership(address || '');
      setHasNFTAccess(nftData.hasNFT);

      // Load game progress from Supabase
      const { data } = await supabase
        .from('game_progress')
        .select('*')
        .eq('wallet_address', address)
        .single();

      if (data) {
        const progress = {
          level: data.current_step + 1,
          inventory: Array.isArray(data.inventory) ? data.inventory as string[] : [],
          completedQuizzes: [] // Neue Eigenschaft für abgeschlossene Quiz
        };
        setGameProgress(progress);
        
        // Setze aktuelle Phase basierend auf Fortschritt
        if (progress.level > gamePhases.length) {
          setCurrentPhase(gamePhases.length);
        } else {
          setCurrentPhase(progress.level);
        }
      }
    } catch (error) {
      console.error('Error loading game data:', error);
    }
  };

  const handleAnswerSelect = (answerId: number) => {
    setSelectedAnswer(answerId);
  };

  const handleSubmitAnswer = async () => {
    if (!selectedAnswer || !currentPhaseData) return;

    const selectedAnswerData = currentPhaseData.answers.find(a => a.id === selectedAnswer);
    
    if (selectedAnswerData?.correct) {
      // Richtige Antwort
      const newInventory = [...gameProgress.inventory, currentPhaseData.reward];
      const newProgress = {
        ...gameProgress,
        level: currentPhase + 1,
        inventory: newInventory,
        completedQuizzes: [...gameProgress.completedQuizzes, currentPhase]
      };
      
      setGameProgress(newProgress);
      
      // Speichere Fortschritt in Supabase
      await saveGameProgress(newProgress);
      
      toast({
        title: "🎉 Richtig!",
        description: `Du hast ${currentPhaseData.reward} erhalten!`,
      });

      // Behandle spezielle Aktionen
      if (selectedAnswerData.action) {
        setTimeout(() => {
          handleSpecialAction(selectedAnswerData.action);
        }, 2000);
      } else if (currentPhase < gamePhases.length) {
        // Nächste Phase
        setTimeout(() => {
          setCurrentPhase(currentPhase + 1);
          setSelectedAnswer(null);
        }, 2000);
      }
    } else {
      // Falsche Antwort
      toast({
        title: "❌ Falsch!",
        description: "Versuche es nochmal!",
        variant: "destructive",
      });
      setSelectedAnswer(null);
    }
  };

  const saveGameProgress = async (progress: any) => {
    if (!address) return;
    
    try {
      await supabase
        .from('game_progress')
        .upsert({
          wallet_address: address,
          current_step: progress.level - 1,
          inventory: progress.inventory,
          choices_history: [],
          has_jaeger_nft: hasNFTAccess
        });
    } catch (error) {
      console.error('Error saving game progress:', error);
    }
  };

  const handleSpecialAction = (action: string) => {
    switch (action) {
      case 'goto-story':
        window.location.href = '/game-story-new';
        break;
      case 'restart':
        setCurrentPhase(1);
        setGameProgress({ level: 1, inventory: [], completedQuizzes: [] });
        setSelectedAnswer(null);
        break;
      case 'show-achievements':
        toast({
          title: "🏆 Deine Erfolge",
          description: `Inventar: ${gameProgress.inventory.join(', ')}`,
        });
        break;
    }
  };

  return (
    <div className="min-h-screen bg-crypto-dark">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <section className="p-6 text-center max-w-2xl mx-auto">
          <div className="mb-8">
            <Gamepad2 className="mx-auto mb-4 text-bitcoin" size={64} />
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              🎮 Jagd auf den Bitcoin
            </h1>
            <p className="mb-6 text-lg text-muted-foreground">
              Starte dein Abenteuer als <strong className="text-bitcoin">Murat</strong> oder{" "}
              <strong className="text-bitcoin">der Jäger</strong>. Löse Meme-Rätsel,
              sichere dir NFTs und beeinflusse die Story mit deiner Wallet.
            </p>
          </div>

          {!isConnected ? (
            <Button 
              onClick={connectWallet}
              className="bg-bitcoin hover:bg-bitcoin/90 text-crypto-dark px-6 py-3 text-lg mb-8"
              size="lg"
            >
              <Zap className="mr-2" size={20} />
              🔓 Wallet verbinden
            </Button>
          ) : (
            <div className="mb-8 p-4 bg-muted rounded-xl">
              <div className="flex items-center justify-center gap-2 text-bitcoin">
                <Trophy size={20} />
                <span className="font-semibold">Wallet verbunden - Spiel bereit!</span>
              </div>
            </div>
          )}

          {/* Zeige aktuelle Phase und Progress */}
          <div className="mb-6 flex justify-center items-center gap-4">
            <Badge variant="secondary">Phase {currentPhase}/{gamePhases.length}</Badge>
            {gameProgress.inventory.length > 0 && (
              <Badge variant="outline">🧳 {gameProgress.inventory.length} Items</Badge>
            )}
          </div>

          <Card className="bg-card border-border text-left">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground flex items-center gap-2">
                {currentPhaseData?.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-muted-foreground text-lg">
                {currentPhaseData?.question}
              </p>
              
              <div className="space-y-3">
                {currentPhaseData?.answers.map((answer) => (
                  <Button
                    key={answer.id}
                    variant={selectedAnswer === answer.id ? "default" : "outline"}
                    className={`w-full py-3 text-left justify-start ${
                      selectedAnswer === answer.id 
                        ? "bg-bitcoin text-crypto-dark" 
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => handleAnswerSelect(answer.id)}
                    disabled={!isConnected}
                  >
                    {answer.text}
                  </Button>
                ))}
              </div>

              {selectedAnswer && isConnected && (
                <div className="mt-6 pt-4 border-t border-border">
                  <Button 
                    onClick={handleSubmitAnswer}
                    className="w-full bg-gradient-primary hover:bg-gradient-primary/90 text-white"
                    size="lg"
                  >
                    Antwort bestätigen
                  </Button>
                </div>
              )}

              {!isConnected && (
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground text-center">
                    Verbinde deine Wallet, um am Spiel teilzunehmen
                  </p>
                </div>
              )}

              {/* Progress Anzeige */}
              {gameProgress.inventory.length > 0 && (
                <div className="mt-6 pt-4 border-t border-border">
                  <h4 className="font-semibold mb-2">🧳 Dein Inventar:</h4>
                  <div className="flex flex-wrap gap-2">
                    {gameProgress.inventory.map((item, index) => (
                      <Badge key={index} variant="secondary">{item}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Game;