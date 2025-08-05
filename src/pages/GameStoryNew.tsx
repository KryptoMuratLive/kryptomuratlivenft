import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useWallet } from '@/hooks/useWallet';
import { checkNFTOwnership } from '@/lib/checkNFTOwnership';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import StoryMap from '@/components/StoryMap';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/Footer';

// NFT Contract Addresses
const MURAT_NFT_ADDRESS = "0x04296ee51cd6fdfEE0CB1016A818F17b8ae7a1dD";
const JAEGER_NFT_ADDRESS = "0x1234567890abcdef1234567890abcdef12345678";
const MEME_NFT_ADDRESS = "0xc4D64540D638138D142115F97A559024c9ba2bc0";

// Story Flow mit NFT-Claim
const storyFlow = [
  { 
    id: 1, 
    label: 'Altstadtgasse', 
    coordinates: [11.576, 48.137] as [number, number],
    scene: '🚧 Du stehst in einer engen Altstadtgasse...', 
    options: [ 
      { text: '🔀 In die nächste Gasse fliehen', next: 2 }, 
      { text: '🗑️ In der Mülltonne verstecken', next: 3 } 
    ] 
  },
  { 
    id: 2, 
    label: 'Dunkle Gasse', 
    coordinates: [11.580, 48.140] as [number, number],
    scene: '🏃 Du läufst durch eine dunkle Gasse...', 
    options: [ 
      { text: '📂 Öffnen und analysieren', next: 4 }, 
      { text: '🛑 Nicht anfassen', next: 5 } 
    ] 
  },
  { 
    id: 3, 
    label: 'Mülltonne', 
    coordinates: [11.574, 48.135] as [number, number],
    scene: '🤢 Mülltonne voll. Der Jäger hat dich gerochen. GAME OVER!', 
    options: [
      { text: '🔄 Neuer Versuch', next: 1 }
    ] 
  },
  { 
    id: 4, 
    label: 'USB-Stick', 
    coordinates: [11.585, 48.145] as [number, number],
    scene: '🧠 Geheimes Meme gefunden. Item: "Meme Decoder"', 
    reward: '🧩 Meme Decoder', 
    options: [ 
      { text: '🔓 Datei öffnen (nur JÄGER NFT)', next: 6, requires: 'jaeger' },
      { text: '🚶 Weiter ohne öffnen', next: 5 }
    ] 
  },
  { 
    id: 5, 
    label: 'Zögern', 
    coordinates: [11.570, 48.130] as [number, number],
    scene: '🔒 Du hast nichts geöffnet. Vielleicht klug...', 
    options: [
      { text: '🔄 Zurück zum Start', next: 1 }
    ] 
  },
  { 
    id: 6, 
    label: 'Versteckte Datei', 
    coordinates: [11.590, 48.150] as [number, number],
    scene: '🧬 Datei enthält Zugang zu Level 3. Item: "Zugangscode"', 
    reward: '📁 Zugangscode Level 3', 
    options: [ 
      { text: '❓ Meme-Rätsel lösen', next: 7 } 
    ] 
  },
  { 
    id: 7, 
    label: 'Meme-Quiz', 
    coordinates: [11.595, 48.155] as [number, number],
    scene: '🧠 Meme-Rätsel: Welcher Meme-Hund wurde zuerst berühmt?', 
    quiz: true, 
    question: 'Welcher Meme-Hund wurde zuerst berühmt?', 
    answers: ['Doge', 'ShibaSwap', 'Pepe'], 
    correct: 'Doge', 
    nextCorrect: 8, 
    nextWrong: 9 
  },
  { 
    id: 8, 
    label: 'Erfolg', 
    coordinates: [11.600, 48.160] as [number, number],
    scene: '✅ Richtig! Du hast das Meme-Level bestanden. Du kannst jetzt den Meme-Profi NFT claimen.', 
    reward: '🏅 Meme-Profi', 
    nftClaim: true,
    options: [
      { text: '🔄 Neues Spiel starten', next: 1 }
    ] 
  },
  { 
    id: 9, 
    label: 'Fail', 
    coordinates: [11.565, 48.125] as [number, number],
    scene: '❌ Falsch. Du kannst es später erneut versuchen.', 
    options: [
      { text: '🔄 Nochmal versuchen', next: 7 },
      { text: '🏠 Zurück zum Start', next: 1 }
    ] 
  }
];

export default function GameStoryNew() {
  const { isConnected, connectWallet, address } = useWallet();
  const [hasAccess, setHasAccess] = useState(false);
  const [hasJaeger, setHasJaeger] = useState(false);
  const [inventory, setInventory] = useState<string[]>([]);
  const [step, setStep] = useState(0);
  const [unlockedSteps, setUnlockedSteps] = useState<number[]>([0]);
  const [claimed, setClaimed] = useState(false);
  const [isClaimLoading, setIsClaimLoading] = useState(false);
  const { toast } = useToast();
  
  const current = storyFlow[step];

  useEffect(() => {
    if (address && isConnected) {
      loadGameData();
    }
  }, [address, isConnected]);

  const loadGameData = async () => {
    if (!address) return;
    
    try {
      // Check NFT access
      const nftData = await checkNFTOwnership(address);
      setHasAccess(nftData.hasNFT);
      // For simplicity, assume jaeger NFT check would be similar
      setHasJaeger(false); // You'd implement similar check for JAEGER NFT

      // Load game progress from Supabase
      const { data: progressData } = await supabase
        .from('game_progress')
        .select('*')
        .eq('wallet_address', address)
        .single();

      if (progressData) {
        setStep(progressData.current_step || 0);
        setInventory(Array.isArray(progressData.inventory) ? progressData.inventory as string[] : []);
        // Create unlocked steps based on current progress
        const unlocked = [];
        for (let i = 0; i <= (progressData.current_step || 0); i++) {
          unlocked.push(i);
        }
        setUnlockedSteps(unlocked);
      }

      // Check NFT claim status
      const { data: claimData } = await supabase
        .from('nft_claims')
        .select('*')
        .eq('wallet_address', address)
        .single();
        
      if (claimData?.claimed) {
        setClaimed(true);
      }
    } catch (error) {
      console.error('Error loading game data:', error);
    }
  };

  const saveProgress = async (newStep: number, newInventory: string[], newUnlocked: number[]) => {
    if (!address) return;
    
    try {
      await supabase
        .from('game_progress')
        .upsert({
          wallet_address: address,
          current_step: newStep,
          inventory: newInventory,
          choices_history: [], // Keep existing structure
          has_jaeger_nft: hasJaeger,
          unlocked_steps: newUnlocked
        });
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const nextStep = (nextId: number) => {
    const index = storyFlow.findIndex(s => s.id === nextId);
    if (index >= 0) {
      const nextScene = storyFlow[index];
      const updatedInventory = nextScene.reward ? [...inventory, nextScene.reward] : inventory;
      const updatedUnlocked = [...new Set([...unlockedSteps, index])];
      setInventory(updatedInventory);
      setStep(index);
      setUnlockedSteps(updatedUnlocked);
      saveProgress(index, updatedInventory, updatedUnlocked);
      
      // Show reward toast
      if (nextScene.reward) {
        toast({
          title: "🎉 Gegenstand erhalten!",
          description: `Du hast "${nextScene.reward}" zu deinem Inventar hinzugefügt.`,
        });
      }
    }
  };

  const goToStep = (index: number) => {
    if (unlockedSteps.includes(index)) {
      setStep(index);
    }
  };

  const handleQuizAnswer = (answer: string) => {
    if (!current || !current.quiz) return;
    
    if (answer === current.correct) {
      toast({
        title: "✅ Richtig!",
        description: "Du hast das Meme-Rätsel gelöst!",
      });
      nextStep(current.nextCorrect!);
    } else {
      toast({
        title: "❌ Falsch!",
        description: "Versuche es nochmal!",
        variant: "destructive",
      });
      nextStep(current.nextWrong!);
    }
  };

  const claimNFT = async () => {
    if (!address || claimed || isClaimLoading) return;
    
    setIsClaimLoading(true);
    
    try {
      // Simulate NFT minting process
      // In production, this would integrate with actual NFT contract
      const mockTxHash = `0x${Math.random().toString(16).substr(2, 64)}`;
      
      await supabase
        .from('nft_claims')
        .upsert({
          wallet_address: address,
          claimed: true,
          tx_hash: mockTxHash
        });
        
      setClaimed(true);
      
      toast({
        title: "🎉 NFT erfolgreich geclaimed!",
        description: `Meme-Profi NFT wurde zu deiner Wallet hinzugefügt. TX: ${mockTxHash.substring(0, 10)}...`,
      });
    } catch (error) {
      console.error('Claim failed:', error);
      toast({
        title: "❌ Claim fehlgeschlagen",
        description: "Versuche es später erneut.",
        variant: "destructive",
      });
    } finally {
      setIsClaimLoading(false);
    }
  };

  // Convert storyFlow to map locations
  const mapLocations = storyFlow.map((story, index) => ({
    id: story.id,
    label: story.label,
    coordinates: story.coordinates || [11.576, 48.137] as [number, number],
    isUnlocked: unlockedSteps.includes(index),
    isCurrentLocation: index === step
  }));

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-crypto-dark">
        <Navigation />
        <main className="pt-20 pb-16">
          <div className="p-6 text-center max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-foreground">🎮 Story Mode</h1>
            <p className="mb-6 text-muted-foreground">Bitte Wallet verbinden:</p>
            <Button onClick={connectWallet} size="lg">
              Wallet verbinden
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-crypto-dark">
        <Navigation />
        <main className="pt-20 pb-16">
          <div className="p-6 text-center max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-foreground">🔐 Kein Zugriff</h1>
            <p className="text-muted-foreground">Du brauchst einen <strong>MURAT NFT</strong>.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-crypto-dark">
      <Navigation />
      <main className="pt-20 pb-16">
        <div className="p-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-foreground">🎮 Story Mode</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Inventar */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  🧳 Inventar
                  <Badge variant="secondary">{inventory.length} Items</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {inventory.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {inventory.map((item, idx) => (
                      <Badge key={idx} variant="outline">{item}</Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Noch leer</p>
                )}
              </CardContent>
            </Card>

            {/* Progress */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">📊 Fortschritt</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Aktuelle Location:</span>
                    <Badge>{current?.label}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Freigeschaltete Orte:</span>
                    <Badge variant="secondary">{unlockedSteps.length}/{storyFlow.length}</Badge>
                  </div>
                  {claimed && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">NFT Status:</span>
                      <Badge className="bg-green-500">✅ Geclaimed</Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Karte */}
          <Card className="mb-6 bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">🗺️ Story-Karte</CardTitle>
            </CardHeader>
            <CardContent>
              <StoryMap 
                locations={mapLocations}
                onLocationSelect={goToStep}
              />
            </CardContent>
          </Card>

          {/* Aktuelle Szene */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                {current?.label}
                {step === 8 && <Badge className="bg-yellow-500">🏆 Boss Level</Badge>}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-card-foreground">{current?.scene}</p>

              {/* NFT Claim Button */}
              {current?.nftClaim && !claimed && (
                <Button 
                  onClick={claimNFT}
                  disabled={isClaimLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  size="lg"
                >
                  {isClaimLoading ? '⏳ Claiming...' : '🎉 Claim dein Meme-Profi NFT'}
                </Button>
              )}

              {/* Bereits geclaimed */}
              {current?.nftClaim && claimed && (
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-center">
                  <p className="text-green-500 font-semibold">✅ Du hast deinen NFT bereits geclaimed!</p>
                </div>
              )}

              {/* Quiz */}
              {current?.quiz && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-card-foreground">❓ {current.question}</h4>
                  {current.answers?.map((answer, i) => (
                    <Button
                      key={i}
                      onClick={() => handleQuizAnswer(answer)}
                      variant="outline"
                      className="w-full text-left justify-start hover:bg-yellow-500/20"
                    >
                      {answer}
                    </Button>
                  ))}
                </div>
              )}

              {/* Standard Options */}
              {current?.options && current.options.length > 0 && !current.quiz && (
                <div className="space-y-3">
                  {current.options.map((opt, i) => {
                    const disabled = opt.requires === 'jaeger' && !hasJaeger;
                    return (
                      <Button
                        key={i}
                        onClick={() => !disabled && nextStep(opt.next)}
                        disabled={disabled}
                        variant={disabled ? "outline" : "default"}
                        className="w-full text-left justify-start"
                      >
                        {opt.text} {disabled && '(Nur mit JÄGER NFT)'}
                      </Button>
                    );
                  })}
                </div>
              )}

              {/* Game Over */}
              {current?.options?.length === 0 && !current.quiz && !current.nftClaim && (
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">
                    {step === 8 ? '🎉 Glückwunsch! Du hast die Story abgeschlossen!' : '🎯 Ende erreicht'}
                  </p>
                  <Button 
                    onClick={() => {
                      setStep(0);
                      setUnlockedSteps([0]);
                    }}
                    variant="outline"
                  >
                    🔄 Neuer Durchlauf
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}