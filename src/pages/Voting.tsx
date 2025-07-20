import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { VotingPanel } from "@/components/VotingPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Vote, Clock, Trophy } from "lucide-react";

const Voting = () => {
  const [timeLeft, setTimeLeft] = useState(15); // minutes

  const activeVote = {
    question: "Murat steht vor einer Entscheidung: Wie soll er dem Bitcoin-Jäger entkommen?",
    options: [
      { id: 1, text: "Durch die U-Bahn-Tunnel flüchten", votes: 234, percentage: 45 },
      { id: 2, text: "Sich in der Menschenmenge verstecken", votes: 178, percentage: 34 },
      { id: 3, text: "Den Jäger direkt konfrontieren", votes: 109, percentage: 21 }
    ],
    totalVotes: 521
  };

  const pastVotes = [
    {
      episode: "Episode 2",
      question: "Welche Krypto-Wallet soll Murat verwenden?",
      winner: "Hardware Wallet",
      impact: "Murat ist jetzt sicherer vor Hackern"
    },
    {
      episode: "Episode 1",
      question: "Wo soll Murat seine ersten Bitcoins kaufen?",
      winner: "Dezentrale Exchange",
      impact: "Murat bleibt anonym"
    }
  ];

  return (
    <div className="min-h-screen bg-crypto-dark">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20 pb-12">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="bg-green-600 text-white mb-4">
            <Vote className="mr-1" size={16} />
            ABSTIMMUNG AKTIV
          </Badge>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Live Story Voting
          </h1>
          <p className="text-xl text-muted-foreground">
            Entscheide über den Verlauf der Geschichte - Deine Stimme zählt!
          </p>
        </div>

        {/* Timer and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="flex items-center justify-center p-6">
              <Clock className="mr-2 text-bitcoin" size={24} />
              <div>
                <p className="text-2xl font-bold text-foreground">{timeLeft}m</p>
                <p className="text-sm text-muted-foreground">Zeit übrig</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="flex items-center justify-center p-6">
              <Vote className="mr-2 text-bitcoin" size={24} />
              <div>
                <p className="text-2xl font-bold text-foreground">{activeVote.totalVotes}</p>
                <p className="text-sm text-muted-foreground">Stimmen</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="flex items-center justify-center p-6">
              <Trophy className="mr-2 text-bitcoin" size={24} />
              <div>
                <p className="text-2xl font-bold text-foreground">45%</p>
                <p className="text-sm text-muted-foreground">Führend</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Active Voting Panel */}
          <Card className="bg-card border-border mb-8">
            <CardHeader>
              <CardTitle className="text-foreground">Episode 3 - Live Abstimmung</CardTitle>
            </CardHeader>
            <CardContent>
              <VotingPanel vote={activeVote} />
            </CardContent>
          </Card>

          {/* Past Votes Impact */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Vergangene Entscheidungen & Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pastVotes.map((vote, index) => (
                  <div key={index} className="border-l-4 border-bitcoin pl-4">
                    <h4 className="font-semibold text-foreground">{vote.episode}</h4>
                    <p className="text-sm text-muted-foreground mb-1">{vote.question}</p>
                    <p className="text-sm text-bitcoin mb-1">Gewinner: {vote.winner}</p>
                    <p className="text-sm text-green-400">Auswirkung: {vote.impact}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Voting;