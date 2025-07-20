import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Vote, Check } from "lucide-react";

interface VoteOption {
  id: number;
  text: string;
  votes: number;
  percentage: number;
}

interface VoteData {
  question: string;
  options: VoteOption[];
  totalVotes: number;
}

interface VotingPanelProps {
  vote: VoteData;
}

export const VotingPanel = ({ vote }: VotingPanelProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (optionId: number) => {
    if (hasVoted) return;
    
    setIsVoting(true);
    setSelectedOption(optionId);
    
    // Simulate vote submission
    setTimeout(() => {
      setHasVoted(true);
      setIsVoting(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-foreground mb-4">
          {vote.question}
        </h3>
        <Badge variant="secondary" className="bg-blue-600 text-white">
          <Vote className="mr-1" size={16} />
          {vote.totalVotes} Stimmen abgegeben
        </Badge>
      </div>

      {/* Voting Options */}
      <div className="space-y-4">
        {vote.options.map((option) => (
          <Card key={option.id} className="bg-card border-border overflow-hidden">
            <CardContent className="p-0">
              <Button
                variant="ghost"
                className="w-full h-auto p-4 justify-start text-left hover:bg-secondary/50 disabled:opacity-100"
                onClick={() => handleVote(option.id)}
                disabled={hasVoted || isVoting}
              >
                <div className="w-full space-y-3">
                  {/* Option Text and Status */}
                  <div className="flex items-center justify-between">
                    <span className="text-foreground font-medium">{option.text}</span>
                    <div className="flex items-center space-x-2">
                      {hasVoted && selectedOption === option.id && (
                        <Check className="text-green-400" size={20} />
                      )}
                      {hasVoted && (
                        <span className="text-sm text-muted-foreground">
                          {option.votes} Stimmen
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Progress Bar (only show after voting) */}
                  {hasVoted && (
                    <div className="space-y-1">
                      <Progress value={option.percentage} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{option.percentage}%</span>
                        {selectedOption === option.id && (
                          <span className="text-green-400 font-medium">Deine Wahl</span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Vote Button State */}
                  {!hasVoted && !isVoting && (
                    <div className="text-xs text-muted-foreground">
                      Klicken zum Abstimmen
                    </div>
                  )}
                  
                  {isVoting && selectedOption === option.id && (
                    <div className="text-xs text-bitcoin">
                      Abstimmung wird übertragen...
                    </div>
                  )}
                </div>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Voting Status */}
      <div className="text-center space-y-2">
        {!hasVoted ? (
          <p className="text-sm text-muted-foreference">
            Wähle eine Option um abzustimmen
          </p>
        ) : (
          <div>
            <p className="text-sm text-green-400 font-medium">
              ✓ Abstimmung erfolgreich übertragen
            </p>
            <p className="text-xs text-muted-foreference">
              Das Ergebnis wird die nächste Szene beeinflussen
            </p>
          </div>
        )}
        
        <div className="text-xs text-muted-foreground">
          <p>Nur NFT-Holder können abstimmen • 1 NFT = 1 Stimme</p>
        </div>
      </div>

      {/* Real-time Updates */}
      {hasVoted && (
        <Card className="bg-secondary/20 border-bitcoin/20">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-bitcoin">
              🔥 Die Abstimmung ist noch offen! Das Ergebnis kann sich noch ändern.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};