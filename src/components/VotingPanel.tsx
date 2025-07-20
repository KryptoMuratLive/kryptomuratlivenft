import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { useToast } from "@/hooks/use-toast";
import { sendVoteWebhook, sendTelegramNotification } from "@/lib/api";

interface VoteOption {
  id: number;
  text: string;
  votes: number;
  percentage: number;
}

interface Vote {
  question: string;
  options: VoteOption[];
  totalVotes: number;
}

interface VotingPanelProps {
  vote: Vote;
}

export const VotingPanel = ({ vote }: VotingPanelProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { address, isConnected } = useWallet();
  const { toast } = useToast();

  const handleVote = async () => {
    if (selectedOption === null || !isConnected || !address) {
      toast({
        title: "Voting Error",
        description: "Please connect your wallet and select an option",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const selectedOptionText = vote.options.find(opt => opt.id === selectedOption)?.text || '';
      
      const voteData = {
        wallet: address,
        choice: selectedOptionText,
        timestamp: new Date().toISOString(),
        votingId: `vote_${Date.now()}`,
      };

      // Send webhook
      await sendVoteWebhook(voteData);
      
      // Send Telegram notification
      const message = `🗳️ New Vote Cast!\nWallet: ${address.slice(0, 6)}...${address.slice(-4)}\nChoice: ${selectedOptionText}\nTime: ${new Date().toLocaleString()}`;
      await sendTelegramNotification(message);

      setHasVoted(true);
      toast({
        title: "Vote Submitted!",
        description: `Your vote for "${selectedOptionText}" has been recorded`,
      });
    } catch (error) {
      toast({
        title: "Vote Failed",
        description: "Failed to submit vote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-foreground mb-2">
          {vote.question}
        </h3>
        <p className="text-sm text-muted-foreground">
          Wähle eine Option und bestimme den Verlauf der Geschichte
        </p>
      </div>

      <div className="space-y-4">
        {vote.options.map((option) => (
          <Card 
            key={option.id} 
            className={`cursor-pointer transition-colors ${
              selectedOption === option.id ? 'ring-2 ring-bitcoin' : ''
            } ${hasVoted ? 'cursor-default' : 'hover:bg-secondary/50'}`}
            onClick={() => !hasVoted && setSelectedOption(option.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-foreground">{option.text}</span>
                {hasVoted && selectedOption === option.id && (
                  <CheckCircle className="text-green-400" size={20} />
                )}
              </div>
              
              {hasVoted && (
                <div className="space-y-2">
                  <Progress value={option.percentage} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{option.votes} Stimmen</span>
                    <span className="text-foreground font-medium">{option.percentage}%</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {!isConnected ? (
        <div className="mt-6 p-4 bg-muted rounded-lg text-center">
          <p className="text-sm text-muted-foreground">
            Verbinde deine Wallet, um abstimmen zu können
          </p>
        </div>
      ) : (
        <Button 
          onClick={handleVote}
          disabled={selectedOption === null || hasVoted || isSubmitting}
          size="lg"
          className="w-full mt-6"
        >
          {hasVoted ? (
            <>
              <CheckCircle className="mr-2" size={20} />
              Stimme abgegeben
            </>
          ) : isSubmitting ? (
            "Wird übertragen..."
          ) : (
            "Stimme abgeben"
          )}
        </Button>
      )}

      <div className="text-center text-xs text-muted-foreground">
        <p>Nur NFT-Holder können abstimmen • 1 NFT = 1 Stimme</p>
      </div>
    </div>
  );
};