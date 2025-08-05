import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Swords, Vote, Timer, Trophy, Users, Zap, Crown } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { useToast } from "@/hooks/use-toast";

const BattlePage = () => {
  const { isConnected, connectWallet, address } = useWallet();
  const { toast } = useToast();
  
  const [currentBattle, setCurrentBattle] = useState({
    id: "battle-001",
    title: "Epic Meme Showdown #47",
    timeLeft: 180, // 3 minutes in seconds
    status: "active", // active, finished, upcoming
    totalVotes: 1247,
    rewards: {
      winner: "500 MURAT + Rare NFT",
      participation: "50 XP"
    }
  });

  const [memes, setMemes] = useState([
    {
      id: "meme-a",
      title: "Bitcoin to the Moon 🚀",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&h=600&fit=crop",
      creator: "CryptoMurat",
      votes: 723,
      userVoted: false,
      description: "Der klassische HODL-Meme mit Bitcoin-Twist"
    },
    {
      id: "meme-b", 
      title: "Jäger vs. Murat Showdown",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=600&fit=crop",
      creator: "MemeHunter",
      votes: 524,
      userVoted: false,
      description: "Das ultimative Duell der Legenden"
    }
  ]);

  const [userNFTAccess] = useState(true); // Mock NFT access
  const [hasVoted, setHasVoted] = useState(false);
  const [userVote, setUserVote] = useState<string | null>(null);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBattle(prev => ({
        ...prev,
        timeLeft: Math.max(0, prev.timeLeft - 1)
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVote = (memeId: string) => {
    if (!isConnected) {
      toast({
        title: "Wallet verbinden",
        description: "Verbinde deine Wallet, um abstimmen zu können",
        variant: "destructive",
      });
      return;
    }

    if (!userNFTAccess) {
      toast({
        title: "NFT erforderlich",
        description: "Du benötigst ein NFT, um an der Battle teilzunehmen",
        variant: "destructive",
      });
      return;
    }

    if (hasVoted) {
      toast({
        title: "Bereits abgestimmt",
        description: "Du hast bereits für diese Battle abgestimmt",
        variant: "destructive",
      });
      return;
    }

    if (currentBattle.timeLeft === 0) {
      toast({
        title: "Battle beendet",
        description: "Diese Battle ist bereits beendet",
        variant: "destructive",
      });
      return;
    }

    // Update votes
    setMemes(prev => prev.map(meme => 
      meme.id === memeId 
        ? { ...meme, votes: meme.votes + 1, userVoted: true }
        : { ...meme, userVoted: false }
    ));

    setHasVoted(true);
    setUserVote(memeId);

    toast({
      title: "Stimme abgegeben!",
      description: "Deine Stimme wurde erfolgreich registriert",
    });
  };

  const getVotePercentage = (votes: number) => {
    const total = memes.reduce((sum, meme) => sum + meme.votes, 0);
    return total > 0 ? Math.round((votes / total) * 100) : 0;
  };

  const getWinningMeme = () => {
    return memes.reduce((winner, current) => 
      current.votes > winner.votes ? current : winner
    );
  };

  const leaderboard = [
    { rank: 1, user: "CryptoKing", votes: 47, rewards: "2,450 MURAT" },
    { rank: 2, user: "MemeQueen", votes: 43, rewards: "1,890 MURAT" },
    { rank: 3, user: "BitcoinBro", votes: 39, rewards: "1,230 MURAT" },
    { rank: 4, user: "HODLMaster", votes: 35, rewards: "890 MURAT" },
    { rank: 5, user: "You", votes: 23, rewards: "450 MURAT" }
  ];

  return (
    <div className="min-h-screen bg-crypto-dark">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <section className="p-6 max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <Swords className="mx-auto mb-4 text-bitcoin" size={64} />
            <h1 className="text-3xl font-bold mb-4 text-foreground">
              ⚔️ Meme-Battle Arena
            </h1>
            <p className="mb-4 text-muted-foreground max-w-2xl mx-auto">
              Wähle dein Meme & Stimme ab – das beste Meme gewinnt Token oder NFTs!
            </p>
          </div>

          {/* Battle Status */}
          <Card className="bg-card border-border mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Timer className="text-bitcoin" size={20} />
                  {currentBattle.title}
                </CardTitle>
                <Badge 
                  variant={currentBattle.timeLeft > 0 ? "default" : "destructive"}
                  className="text-white"
                >
                  {currentBattle.timeLeft > 0 ? "LIVE" : "BEENDET"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-bitcoin mb-1">
                    {formatTime(currentBattle.timeLeft)}
                  </div>
                  <p className="text-sm text-muted-foreground">Zeit verbleibt</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {currentBattle.totalVotes}
                  </div>
                  <p className="text-sm text-muted-foreground">Gesamtstimmen</p>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-500 mb-1">
                    {currentBattle.rewards.winner}
                  </div>
                  <p className="text-sm text-muted-foreground">Gewinner-Belohnung</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Battle Memes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {memes.map((meme, index) => (
              <Card 
                key={meme.id} 
                className={`bg-card border-border transition-all duration-200 ${
                  meme.userVoted ? "border-bitcoin shadow-lg" : "hover:border-bitcoin/50"
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-foreground">{meme.title}</CardTitle>
                    {meme.userVoted && <Crown className="text-bitcoin" size={20} />}
                  </div>
                  <p className="text-sm text-muted-foreground">von {meme.creator}</p>
                </CardHeader>
                <CardContent>
                  <div className="relative mb-4">
                    <img 
                      src={meme.image} 
                      alt={meme.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    {currentBattle.timeLeft === 0 && meme.id === getWinningMeme().id && (
                      <div className="absolute inset-0 bg-bitcoin/20 rounded-lg flex items-center justify-center">
                        <div className="bg-bitcoin text-crypto-dark px-4 py-2 rounded-full font-bold">
                          GEWINNER! 🏆
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4">{meme.description}</p>
                  
                  {/* Vote Progress */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Stimmen</span>
                      <span className="font-semibold text-foreground">
                        {meme.votes} ({getVotePercentage(meme.votes)}%)
                      </span>
                    </div>
                    <Progress 
                      value={getVotePercentage(meme.votes)} 
                      className="h-2"
                    />
                  </div>

                  <Button
                    onClick={() => handleVote(meme.id)}
                    disabled={hasVoted || currentBattle.timeLeft === 0 || !isConnected || !userNFTAccess}
                    className={`w-full ${
                      meme.userVoted 
                        ? "bg-bitcoin text-crypto-dark" 
                        : "bg-gradient-primary hover:bg-gradient-primary/90"
                    } text-white`}
                  >
                    {meme.userVoted ? (
                      <>
                        <Vote className="mr-2" size={16} />
                        Deine Stimme
                      </>
                    ) : hasVoted ? (
                      "Bereits abgestimmt"
                    ) : currentBattle.timeLeft === 0 ? (
                      "Battle beendet"
                    ) : !isConnected ? (
                      "Wallet verbinden"
                    ) : !userNFTAccess ? (
                      "NFT erforderlich"
                    ) : (
                      <>
                        <Vote className="mr-2" size={16} />
                        ✅ Stimme ab
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Access Requirements */}
          {(!isConnected || !userNFTAccess) && (
            <Card className="bg-card border-border mb-8">
              <CardContent className="p-6 text-center">
                <Users className="mx-auto mb-4 text-muted-foreground" size={48} />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Battle-Zugang erforderlich
                </h3>
                <p className="text-muted-foreground mb-4">
                  Nur mit Wallet + NFT-Stimme gültig. Die Community entscheidet live.
                </p>
                {!isConnected ? (
                  <Button 
                    onClick={connectWallet}
                    className="bg-gradient-primary hover:bg-gradient-primary/90 text-white mr-2"
                  >
                    Wallet verbinden
                  </Button>
                ) : (
                  <Button 
                    variant="outline"
                    onClick={() => window.open("/nft", "_blank")}
                  >
                    NFT erhalten
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Leaderboard */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Trophy className="text-bitcoin" size={20} />
                Battle Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((entry) => (
                  <div 
                    key={entry.rank}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      entry.user === "You" ? "bg-bitcoin/10 border border-bitcoin/20" : "bg-muted/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        entry.rank === 1 ? "bg-yellow-500 text-black" :
                        entry.rank === 2 ? "bg-slate-400 text-black" :
                        entry.rank === 3 ? "bg-amber-600 text-black" :
                        "bg-muted text-foreground"
                      }`}>
                        {entry.rank}
                      </div>
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>{entry.user[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground">{entry.user}</p>
                        <p className="text-sm text-muted-foreground">{entry.votes} Votes</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-bitcoin">{entry.rewards}</p>
                      <p className="text-xs text-muted-foreground">Belohnung</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BattlePage;