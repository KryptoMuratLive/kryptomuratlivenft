import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Vote, 
  Clock, 
  Users, 
  TrendingUp, 
  ArrowLeft, 
  ArrowRight, 
  ArrowUp,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { useState } from "react";

export const VotingSection = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [timeLeft] = useState(180); // 3 minutes in seconds

  const votingOptions = [
    {
      id: "tunnel",
      title: "🚇 Durch die Metro-Tunnel",
      description: "Riskant aber schnell - Murat nutzt die unterirdischen Tunnel",
      votes: 342,
      percentage: 45,
      icon: ArrowLeft,
      risk: "Hoch"
    },
    {
      id: "rooftop", 
      title: "🏢 Über die Dächer",
      description: "Sicherer Weg mit guter Übersicht über die Stadt",
      votes: 298,
      percentage: 39,
      icon: ArrowUp,
      risk: "Mittel"
    },
    {
      id: "street",
      title: "🛣️ Auf der Straße",
      description: "Direkter Weg aber sehr gefährlich - der Jäger könnte ihn sehen",
      votes: 122,
      percentage: 16,
      icon: ArrowRight,
      risk: "Sehr Hoch"
    }
  ];

  const totalVotes = votingOptions.reduce((sum, option) => sum + option.votes, 0);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVote = (optionId: string) => {
    if (hasVoted) return;
    setSelectedOption(optionId);
    setHasVoted(true);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Hoch": return "text-orange-400";
      case "Sehr Hoch": return "text-red-400";
      default: return "text-yellow-400";
    }
  };

  return (
    <section id="voting" className="py-20 bg-crypto-dark">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="bg-electric-blue text-background mb-4 animate-pulse">
            <Vote className="mr-2" size={16} />
            LIVE VOTING
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-electric-blue to-bitcoin bg-clip-text text-transparent">
            Entscheide Murats Schicksal
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Die Community bestimmt den weiteren Verlauf der Geschichte. Jede Stimme zählt!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Current Situation */}
          <div className="lg:col-span-1">
            <Card className="bg-card/80 backdrop-blur border-border h-fit">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <AlertTriangle className="mr-2 text-orange-400" />
                  Aktuelle Situation
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">EPISODE 5 - LIVE</p>
                    <p className="text-foreground leading-relaxed">
                      Murat hat sich in einem verlassenen Gebäude verschanzt. 
                      Der Bitcoin-Jäger ist nur noch 3 Blocks entfernt. 
                      <span className="text-bitcoin font-semibold"> Welchen Fluchtweg soll er wählen?</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="mr-1" size={16} />
                      Voting endet in:
                    </div>
                    <div className="text-bitcoin font-mono text-lg">
                      {formatTime(timeLeft)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Users className="mr-1" size={16} />
                      Teilnehmer:
                    </div>
                    <div className="text-electric-blue font-semibold">
                      {totalVotes.toLocaleString()}
                    </div>
                  </div>

                  <div className="bg-secondary/30 rounded-lg p-3">
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <TrendingUp className="mr-1" size={16} />
                      Live Trend
                    </div>
                    <p className="text-xs">
                      🔥 Metro-Tunnel führt aktuell, aber Dächer holen auf!
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Voting Options */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {votingOptions.map((option) => {
                const isSelected = selectedOption === option.id;
                const isWinning = option.percentage === Math.max(...votingOptions.map(o => o.percentage));
                
                return (
                  <Card 
                    key={option.id} 
                    className={`
                      border transition-all duration-300 cursor-pointer
                      ${isSelected 
                        ? 'border-electric-blue shadow-electric bg-electric-blue/10' 
                        : 'border-border hover:border-bitcoin/50 hover:shadow-bitcoin/20'
                      }
                      ${isWinning && !hasVoted ? 'border-bitcoin/50 bg-bitcoin/5' : ''}
                    `}
                    onClick={() => handleVote(option.id)}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className={`
                              w-10 h-10 rounded-full flex items-center justify-center
                              ${isSelected 
                                ? 'bg-electric-blue text-background' 
                                : 'bg-secondary'
                              }
                            `}>
                              <option.icon size={20} />
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold">{option.title}</h4>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-muted-foreground">Risiko:</span>
                                <span className={`text-sm font-medium ${getRiskColor(option.risk)}`}>
                                  {option.risk}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm mb-3">
                            {option.description}
                          </p>
                        </div>

                        {hasVoted && isSelected && (
                          <CheckCircle className="text-electric-blue ml-4" size={24} />
                        )}
                        
                        {isWinning && !hasVoted && (
                          <Badge variant="secondary" className="bg-bitcoin text-crypto-dark ml-4">
                            FÜHRT
                          </Badge>
                        )}
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {option.votes.toLocaleString()} Stimmen
                          </span>
                          <span className="font-semibold">
                            {option.percentage}%
                          </span>
                        </div>
                        <Progress 
                          value={option.percentage} 
                          className="h-2"
                          style={{
                            background: 'hsl(var(--secondary))'
                          }}
                        />
                      </div>

                      {!hasVoted && (
                        <Button 
                          variant={isSelected ? "electric" : "outline"} 
                          className="w-full mt-4"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleVote(option.id);
                          }}
                        >
                          <Vote className="mr-2" size={16} />
                          {isSelected ? 'Stimme abgeben' : 'Für diese Option stimmen'}
                        </Button>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>

            {hasVoted && (
              <Card className="mt-6 bg-electric-blue/10 border-electric-blue">
                <div className="p-6 text-center">
                  <CheckCircle className="text-electric-blue mx-auto mb-3" size={48} />
                  <h3 className="text-xl font-semibold mb-2">Stimme erfolgreich abgegeben!</h3>
                  <p className="text-muted-foreground mb-4">
                    Deine Entscheidung wurde registriert. Das Voting läuft noch {formatTime(timeLeft)}.
                  </p>
                  <Badge variant="secondary" className="bg-electric-blue text-background">
                    +5 $MURAT Token erhalten
                  </Badge>
                </div>
              </Card>
            )}

            {!hasVoted && (
              <Card className="mt-6 bg-card/50 border-border">
                <div className="p-6 text-center">
                  <p className="text-muted-foreground">
                    💎 <span className="text-bitcoin">Wallet verbinden</span> um an der Abstimmung teilzunehmen und $MURAT Token zu verdienen
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};