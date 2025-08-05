import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useWallet } from '@/hooks/useWallet';
import { checkNFTOwnership } from '@/lib/checkNFTOwnership';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/Footer';
import { Progress } from '@/components/ui/progress';
import { Clock, Star, Gift, MapPin, Zap, Lock, Trophy, Play, Crown, Timer, Image } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface QuizOption {
  label: string;
  image?: string;
}

interface MiniQuest {
  id: number;
  title: string;
  description: string;
  reward: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  category: 'exploration' | 'puzzle' | 'stealth' | 'knowledge';
  requirements?: string;
  completed: boolean;
  progress: number;
  type?: 'text' | 'image' | 'timer';
  question?: string;
  options?: string[] | QuizOption[];
  answer?: string;
  duration?: number;
}

const MINI_QUESTS: MiniQuest[] = [
  {
    id: 1,
    title: "💣 Finde den versteckten Meme-Safe!",
    description: "Erkunde den verlassenen Serverraum und knacke den Meme-Code. Suche nach Hinweisen in den Schatten der digitalen Welt.",
    reward: "🧠 Bonusfrage + 50 XP",
    difficulty: "medium",
    estimatedTime: "5-10 Min",
    category: "exploration",
    completed: false,
    progress: 0,
    type: "text",
    question: "Was war das erste bekannte Meme mit einem Hund?",
    options: ["Doge", "ShibaSwap", "Pepe"],
    answer: "Doge"
  },
  {
    id: 2,
    title: "🚨 Entkomme der Motorradgang!",
    description: "Schaffst du es, unbemerkt am Motorrad-Stützpunkt vorbeizukommen? Nutze Stealth und Strategie für die perfekte Flucht.",
    reward: "🏍️ Fluchtbonus + Level Skip",
    difficulty: "hard",
    estimatedTime: "10-15 Min",
    category: "stealth",
    requirements: "Level 3 erreicht",
    completed: false,
    progress: 0,
    type: "image",
    question: "Wähle das richtige Fahrzeug für die Flucht:",
    options: [
      { label: "Motorrad", image: "/lovable-uploads/8659deab-9234-4128-998d-97563a74bc19.png" },
      { label: "Auto", image: "/lovable-uploads/b2fe4902-9a19-45b8-9bb7-58973b181eef.png" },
      { label: "LKW", image: "/lovable-uploads/cba50bdb-cb2b-48b5-b69c-a8662f60f0d7.png" }
    ],
    answer: "Motorrad"
  },
  {
    id: 3,
    title: "🧩 Entschlüssele ein altes Meme-Fragment",
    description: "Ein verschlüsseltes Bild wurde in deiner Wallet entdeckt. Nutze dein Krypto-Wissen um das Rätsel zu lösen.",
    reward: "🔓 NFT-Fragment",
    difficulty: "easy",
    estimatedTime: "3-5 Min",
    category: "puzzle",
    completed: false,
    progress: 0,
    type: "text",
    question: "Was bedeutet 'NFT'?",
    options: ["Nice Fun Token", "Non-Fungible Token", "New Future Trade"],
    answer: "Non-Fungible Token"
  },
  {
    id: 4,
    title: "🚇 Flucht durch die U-Bahn!",
    description: "Schaffst du es, unentdeckt in die Tunnel zu fliehen – mit Livestream der Zuschauer? Die Community verfolgt jeden deiner Schritte!",
    reward: "🎥 Zuschauer-Boost + Live-Fame",
    difficulty: "hard",
    estimatedTime: "12-18 Min",
    category: "stealth",
    requirements: "Livestream aktiv",
    completed: false,
    progress: 0,
    type: "timer",
    question: "Schnell! Welchen Tunnel wählst du?",
    options: ["Links", "Rechts", "Geradeaus"],
    answer: "Links",
    duration: 5000
  },
  {
    id: 5,
    title: "🗳️ Live-Voting im Tunnel",
    description: "Die Zuschauer entscheiden deinen nächsten Schritt. Überlebst du ihre Wahl? Democracy meets Survival!",
    reward: "🔮 Bonus-Entscheidung + Community Power",
    difficulty: "medium",
    estimatedTime: "8-12 Min",
    category: "knowledge",
    requirements: "Community Voting",
    completed: false,
    progress: 0,
    type: "text",
    question: "Wie nennt man eine Entscheidung durch die Mehrheit?",
    options: ["Wahl", "Blockchain", "Voting"],
    answer: "Voting"
  },
  {
    id: 6,
    title: "👹 Boss-Level: Der Endgegner erscheint!",
    description: "Nur wer alle vorherigen Missionen abgeschlossen hat, kann sich dem finalen Gegner stellen. Das ultimative Meme-Battle wartet!",
    reward: "🏆 Legendärer NFT + Meister-Titel",
    difficulty: "hard",
    estimatedTime: "20-30 Min",
    category: "knowledge",
    requirements: "Alle 5 Quests abgeschlossen",
    completed: false,
    progress: 0,
    type: "text",
    question: "Was ist das Symbol von MURAT?",
    options: ["M", "🪙", "∞"],
    answer: "M"
  }
];

export default function MiniSidequests() {
  const { isConnected, connectWallet, address } = useWallet();
  const [hasAccess, setHasAccess] = useState(false);
  const [quests, setQuests] = useState<MiniQuest[]>(MINI_QUESTS);
  const [completedQuests, setCompletedQuests] = useState<number[]>([]);
  const [selectedQuest, setSelectedQuest] = useState<MiniQuest | null>(null);
  const [loading, setLoading] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [timerActive, setTimerActive] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (address && isConnected) {
      checkAccess();
      loadQuestProgress();
    }
  }, [address, isConnected]);

  const checkAccess = async () => {
    if (!address) return;
    
    try {
      const nftData = await checkNFTOwnership(address);
      setHasAccess(nftData.hasNFT);
    } catch (error) {
      console.error('Error checking NFT access:', error);
    }
  };

  const loadQuestProgress = async () => {
    if (!address) return;
    
    try {
      const { data } = await supabase
        .from('sidequest_progress')
        .select('quest_ids')
        .eq('wallet_address', address)
        .single();
      
      if (data?.quest_ids && Array.isArray(data.quest_ids)) {
        const questIds = data.quest_ids as number[];
        setCompletedQuests(questIds);
        // Update quests state with completion status
        const updatedQuests = quests.map(q => ({
          ...q,
          completed: questIds.includes(q.id),
          progress: questIds.includes(q.id) ? 100 : 0
        }));
        setQuests(updatedQuests);
      }
    } catch (error) {
      console.error('Error loading quest progress:', error);
    }
  };

  const startQuest = async (quest: MiniQuest) => {
    if (!address || !hasAccess) return;
    
    setSelectedQuest(quest);
    setCurrentAnswer('');
    setShowQuizModal(true);
    
    // Start timer for timer-based quests
    if (quest.type === 'timer' && quest.duration) {
      setTimeLeft(quest.duration);
      setTimerActive(true);
    }
  };

  // Timer effect for timer-based quests
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1000) {
            setTimerActive(false);
            handleAnswerSubmit(currentAnswer);
            return 0;
          }
          return prev - 100;
        });
      }, 100);
    }
    
    return () => clearInterval(interval);
  }, [timerActive, timeLeft, currentAnswer]);

  const handleAnswerSubmit = (answer: string) => {
    if (!selectedQuest) return;
    
    const isCorrect = answer === selectedQuest.answer;
    setShowQuizModal(false);
    setTimerActive(false);
    
    if (isCorrect) {
      completeQuest(selectedQuest.id);
    } else {
      toast({
        title: "❌ Falsche Antwort!",
        description: "Versuche es noch einmal. Die Quest bleibt verfügbar.",
        variant: "destructive",
      });
    }
    
    setSelectedQuest(null);
    setCurrentAnswer('');
  };

  const completeQuest = async (questId: number) => {
    if (!address) return;
    
    try {
      const updatedQuests = quests.map(q => 
        q.id === questId ? { ...q, completed: true, progress: 100 } : q
      );
      setQuests(updatedQuests);
      setCompletedQuests(prev => [...prev, questId]);
      
      const completedQuest = quests.find(q => q.id === questId);
      
      // Special handling for boss quest
      if (questId === 6) {
        await claimBossNFT();
      } else {
        toast({
          title: "🎉 Quest abgeschlossen!",
          description: `Belohnung erhalten: ${completedQuest?.reward}`,
        });
      }
      
      // Save progress to database
      const newCompletedQuests = [...completedQuests, questId];
      await supabase
        .from('sidequest_progress')
        .upsert({
          wallet_address: address,
          quest_ids: newCompletedQuests,
          updated_at: new Date().toISOString()
        });
        
    } catch (error) {
      console.error('Error completing quest:', error);
    }
  };

  const claimBossNFT = async () => {
    try {
      // Record the boss NFT claim in database
      await supabase
        .from('nft_claims')
        .upsert({
          wallet_address: address,
          claimed: true,
          tx_hash: `boss_nft_${Date.now()}`, // Placeholder for real transaction
          updated_at: new Date().toISOString()
        });

      toast({
        title: "🏆 Boss besiegt!",
        description: "Legendärer NFT wird zu deiner Wallet gesendet! Du bist jetzt ein wahrer Meme-Meister!",
        duration: 5000,
      });
    } catch (error) {
      console.error('Error claiming boss NFT:', error);
      toast({
        title: "⚔️ Boss besiegt!",
        description: "Herzlichen Glückwunsch! Dein legendärer NFT wird vorbereitet...",
        variant: "default",
      });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-500 border-green-500';
      case 'medium': return 'text-yellow-500 border-yellow-500';
      case 'hard': return 'text-red-500 border-red-500';
      default: return 'text-muted-foreground border-muted';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'exploration': return <MapPin className="h-4 w-4" />;
      case 'puzzle': return <Zap className="h-4 w-4" />;
      case 'stealth': return <Clock className="h-4 w-4" />;
      case 'knowledge': return <Star className="h-4 w-4" />;
      default: return <Gift className="h-4 w-4" />;
    }
  };

  const getCompletedQuestsCount = () => {
    return quests.filter(q => q.completed).length;
  };

  const getTotalXP = () => {
    return getCompletedQuestsCount() * 50; // 50 XP per quest
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-crypto-dark">
        <Navigation />
        <main className="pt-20 pb-16">
          <div className="p-6 text-center max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-foreground">🧩 Sidequests</h1>
            <p className="mb-6 text-muted-foreground">Bitte Wallet verbinden um Mini-Missionen zu starten:</p>
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
            <p className="text-muted-foreground">Du brauchst einen <strong>MURAT NFT</strong> um Sidequests zu spielen.</p>
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
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                🧩 Mini-Sidequests
              </h1>
              <p className="text-muted-foreground mb-6">
                Wähle eine Sidequest und erhalte Bonuspunkte, Items oder NFT-Belohnungen
              </p>
              
              {/* Progress Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="bg-card border-border">
                  <CardContent className="pt-4 text-center">
                    <Trophy className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
                    <div className="text-xl font-bold text-foreground">
                      {getCompletedQuestsCount()}/{quests.length}
                    </div>
                    <p className="text-sm text-muted-foreground">Quests abgeschlossen</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-card border-border">
                  <CardContent className="pt-4 text-center">
                    <Star className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                    <div className="text-xl font-bold text-foreground">
                      {getTotalXP()} XP
                    </div>
                    <p className="text-sm text-muted-foreground">Gesammelte Erfahrung</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-card border-border">
                  <CardContent className="pt-4 text-center">
                    <Gift className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                    <div className="text-xl font-bold text-foreground">
                      {getCompletedQuestsCount()}
                    </div>
                    <p className="text-sm text-muted-foreground">Belohnungen erhalten</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Quest List */}
            <div className="space-y-4">
              {quests.map((quest) => {
                const isBossQuest = quest.id === 6;
                const bossUnlocked = completedQuests.length >= 5;
                const isLocked = isBossQuest && !bossUnlocked;
                
                if (isLocked) {
                  return (
                    <Card key={quest.id} className="bg-muted/30 border-dashed opacity-50">
                      <CardContent className="pt-6 text-center">
                        <h3 className="text-lg font-semibold text-muted-foreground mb-2 flex items-center justify-center gap-2">
                          <Lock className="h-5 w-5" />
                          {quest.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          🔒 Diese Boss-Mission wird freigeschaltet, wenn du alle anderen 5 Quests abgeschlossen hast.
                        </p>
                        <Badge variant="outline" className="mt-3">
                          {completedQuests.length}/5 Quests abgeschlossen
                        </Badge>
                      </CardContent>
                    </Card>
                  );
                }
                
                return (
                  <Card key={quest.id} className={`bg-card border-border transition-all hover:shadow-lg ${quest.completed ? 'opacity-75' : ''}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg text-card-foreground flex items-center gap-2">
                            {getCategoryIcon(quest.category)}
                            {quest.title}
                            {quest.completed && <Badge className="bg-green-500">✅ Abgeschlossen</Badge>}
                          </CardTitle>
                          <p className="text-muted-foreground mt-2">{quest.description}</p>
                        </div>
                      </div>
                    
                      <div className="flex flex-wrap items-center gap-2 mt-4">
                        <Badge variant="outline" className={getDifficultyColor(quest.difficulty)}>
                          {quest.difficulty.toUpperCase()}
                        </Badge>
                        <Badge variant="secondary">
                          <Clock className="h-3 w-3 mr-1" />
                          {quest.estimatedTime}
                        </Badge>
                        <Badge variant="outline">
                          🎁 {quest.reward}
                        </Badge>
                        {quest.requirements && (
                          <Badge variant="outline" className="text-orange-500 border-orange-500">
                            <Lock className="h-3 w-3 mr-1" />
                            {quest.requirements}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      {quest.progress > 0 && quest.progress < 100 && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Fortschritt</span>
                            <span className="text-foreground">{quest.progress}%</span>
                          </div>
                          <Progress value={quest.progress} className="h-2" />
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        {!quest.completed ? (
                          <Button
                            onClick={() => startQuest(quest)}
                            disabled={loading || (quest.requirements && !quest.requirements.includes('JÄGER'))}
                            className="flex items-center gap-2"
                          >
                            <Play className="h-4 w-4" />
                            {loading && selectedQuest?.id === quest.id ? 'Startet...' : 'Quest starten'}
                          </Button>
                        ) : (
                          <Button variant="outline" disabled>
                            ✅ Abgeschlossen
                          </Button>
                        )}
                        
                        <Button variant="ghost" size="sm">
                          📋 Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Coming Soon */}
            <Card className="mt-8 bg-muted/50 border-dashed">
              <CardContent className="pt-6 text-center">
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                  🚀 Weitere Quests kommen bald!
                </h3>
                <p className="text-sm text-muted-foreground">
                  Halte deine NFTs bereit für noch mehr aufregende Mini-Missionen und exklusive Belohnungen.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />

      {/* Quiz Modal */}
      <Dialog open={showQuizModal} onOpenChange={setShowQuizModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedQuest?.type === 'timer' && <Timer className="h-5 w-5 text-red-500" />}
              {selectedQuest?.type === 'image' && <Image className="h-5 w-5 text-blue-500" />}
              {selectedQuest?.title}
            </DialogTitle>
          </DialogHeader>

          {selectedQuest && (
            <div className="space-y-6">
              {/* Timer Display */}
              {selectedQuest.type === 'timer' && timerActive && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-500 mb-2">
                    ⏱️ {Math.ceil(timeLeft / 1000)}s
                  </div>
                  <Progress value={(timeLeft / (selectedQuest.duration || 5000)) * 100} className="h-3" />
                </div>
              )}

              {/* Question */}
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">{selectedQuest.question}</h3>
              </div>

              {/* Answer Options */}
              <div className="space-y-3">
                {selectedQuest.type === 'image' ? (
                  // Image-based options
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {(selectedQuest.options as QuizOption[])?.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSubmit(option.label)}
                        className={`p-4 border-2 rounded-lg transition-all hover:border-primary ${
                          currentAnswer === option.label ? 'border-primary bg-primary/10' : 'border-border'
                        }`}
                      >
                        <img 
                          src={option.image} 
                          alt={option.label}
                          className="w-full h-32 object-cover rounded mb-2"
                        />
                        <p className="font-medium">{option.label}</p>
                      </button>
                    ))}
                  </div>
                ) : (
                  // Text-based options
                  <div className="space-y-2">
                    {(selectedQuest.options as string[])?.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => selectedQuest.type === 'timer' ? handleAnswerSubmit(option) : setCurrentAnswer(option)}
                        className={`w-full p-4 text-left border-2 rounded-lg transition-all hover:border-primary ${
                          currentAnswer === option ? 'border-primary bg-primary/10' : 'border-border'
                        }`}
                      >
                        <span className="font-medium">{String.fromCharCode(65 + index)})</span> {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Manual Submit for non-timer quests */}
              {selectedQuest.type !== 'timer' && currentAnswer && (
                <div className="text-center">
                  <Button onClick={() => handleAnswerSubmit(currentAnswer)} size="lg">
                    Antwort bestätigen
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}