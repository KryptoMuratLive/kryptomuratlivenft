import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingUp, Clock, Coins } from "lucide-react";

interface StakePool {
  duration: number;
  apy: string;
  minStake: string;
  status: string;
}

interface StakeFormProps {
  pools: StakePool[];
}

export const StakeForm = ({ pools }: StakeFormProps) => {
  const [selectedPool, setSelectedPool] = useState<string>("");
  const [stakeAmount, setStakeAmount] = useState<string>("");
  const [isStaking, setIsStaking] = useState(false);
  
  const selectedPoolData = pools.find(pool => pool.duration.toString() === selectedPool);
  
  // Calculate estimated rewards
  const calculateRewards = () => {
    if (!selectedPoolData || !stakeAmount) return { daily: 0, total: 0 };
    
    const amount = parseFloat(stakeAmount);
    const apy = parseFloat(selectedPoolData.apy.replace('%', '')) / 100;
    const duration = selectedPoolData.duration;
    
    const totalReward = (amount * apy * duration) / 365;
    const dailyReward = totalReward / duration;
    
    return { daily: dailyReward, total: totalReward };
  };

  const rewards = calculateRewards();

  const handleStake = async () => {
    if (!selectedPoolData || !stakeAmount) return;
    
    setIsStaking(true);
    
    // Simulate staking transaction
    setTimeout(() => {
      setIsStaking(false);
      alert(`${stakeAmount} MURAT Token erfolgreich gestaked für ${selectedPoolData.duration} Tage!`);
      setStakeAmount("");
      setSelectedPool("");
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Pool Selection */}
      <div className="space-y-2">
        <Label htmlFor="pool" className="text-foreground">Staking Pool wählen</Label>
        <Select value={selectedPool} onValueChange={setSelectedPool}>
          <SelectTrigger className="bg-background border-border">
            <SelectValue placeholder="Pool auswählen" />
          </SelectTrigger>
          <SelectContent>
            {pools.map((pool) => (
              <SelectItem key={pool.duration} value={pool.duration.toString()}>
                {pool.duration} Tage - {pool.apy} APY
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Selected Pool Info */}
      {selectedPoolData && (
        <Card className="bg-secondary/20 border-bitcoin/20">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="text-bitcoin" size={16} />
                <div>
                  <p className="text-muted-foreground">Laufzeit</p>
                  <p className="text-foreground font-medium">{selectedPoolData.duration} Tage</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="text-bitcoin" size={16} />
                <div>
                  <p className="text-muted-foreground">APY</p>
                  <p className="text-foreground font-medium">{selectedPoolData.apy}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Coins className="text-bitcoin" size={16} />
                <div>
                  <p className="text-muted-foreground">Min. Stake</p>
                  <p className="text-foreground font-medium">{selectedPoolData.minStake} MURAT</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-green-600 text-white">
                  {selectedPoolData.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Amount Input */}
      <div className="space-y-2">
        <Label htmlFor="amount" className="text-foreground">Stake Betrag (MURAT)</Label>
        <Input
          id="amount"
          type="number"
          placeholder="0.00"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(e.target.value)}
          className="bg-background border-border"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Balance: 50,000 MURAT</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-auto p-0 text-bitcoin"
            onClick={() => setStakeAmount("50000")}
          >
            Max
          </Button>
        </div>
      </div>

      {/* Rewards Calculator */}
      {selectedPoolData && stakeAmount && (
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Calculator className="text-bitcoin" size={20} />
              <h4 className="font-semibold text-foreground">Geschätzte Belohnungen</h4>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Täglich</p>
                <p className="text-green-400 font-bold">+{rewards.daily.toFixed(2)} USDC</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total nach {selectedPoolData.duration} Tagen</p>
                <p className="text-green-400 font-bold">+{rewards.total.toFixed(2)} USDC</p>
              </div>
            </div>
            
            <div className="mt-3 text-xs text-muted-foreground">
              <p>* Belohnungen werden in USDC ausgezahlt</p>
              <p>* Tatsächliche Belohnungen können variieren</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stake Button */}
      <Button 
        className="w-full" 
        variant="default"
        onClick={handleStake}
        disabled={!selectedPoolData || !stakeAmount || isStaking || parseFloat(stakeAmount) < parseFloat(selectedPoolData?.minStake || "0")}
      >
        {isStaking ? (
          "Stake wird erstellt..."
        ) : (
          <>
            <Coins className="mr-2" size={20} />
            {stakeAmount} MURAT staken
          </>
        )}
      </Button>

      {/* Minimum Stake Warning */}
      {selectedPoolData && stakeAmount && parseFloat(stakeAmount) < parseFloat(selectedPoolData.minStake) && (
        <Card className="bg-red-600/10 border-red-600/20">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-red-400">
              ⚠️ Minimum Stake: {selectedPoolData.minStake} MURAT
            </p>
          </CardContent>
        </Card>
      )}

      {/* Terms */}
      <div className="text-xs text-muted-foreground space-y-1">
        <p>• Gestakte Token sind für die gewählte Laufzeit gesperrt</p>
        <p>• Vorzeitige Auszahlung führt zu Strafgebühren</p>
        <p>• Belohnungen werden täglich berechnet und bei Auszahlung übertragen</p>
      </div>
    </div>
  );
};