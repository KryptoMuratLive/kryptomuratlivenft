import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calculator, Clock, TrendingUp, Wallet } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { useToast } from "@/hooks/use-toast";

export const StakeForm = () => {
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [expectedReturn, setExpectedReturn] = useState(0);
  const { address, isConnected, connectWallet } = useWallet();
  const { toast } = useToast();

  const stakingOptions = [
    { days: "30", apy: "3%" },
    { days: "90", apy: "5%" },
    { days: "180", apy: "6.5%" },
    { days: "360", apy: "8%" }
  ];

  const calculateReturn = (amount: string, duration: string) => {
    const numAmount = parseFloat(amount);
    const days = parseInt(duration);
    const option = stakingOptions.find(opt => opt.days === duration);
    
    if (!numAmount || !days || !option) return 0;
    
    const apy = parseFloat(option.apy.replace('%', '')) / 100;
    return (numAmount * apy * days) / 365;
  };

  const handleDurationChange = (value: string) => {
    setDuration(value);
    if (amount) {
      setExpectedReturn(calculateReturn(amount, value));
    }
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    if (duration) {
      setExpectedReturn(calculateReturn(value, duration));
    }
  };

  const handleStake = () => {
    if (!isConnected) {
      connectWallet();
      return;
    }

    if (!amount || !duration) {
      toast({
        title: "Input Error",
        description: "Please enter amount and select duration",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate staking transaction
    toast({
      title: "Staking Coming Soon",
      description: `Staking ${amount} MURAT for ${duration} days will be available when smart contracts are deployed`,
    });
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">MURAT Token Staking</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Duration Selection */}
        <div className="space-y-3">
          <Label className="text-foreground">Staking-Dauer wählen</Label>
          <Select value={duration} onValueChange={handleDurationChange}>
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Dauer auswählen" />
            </SelectTrigger>
            <SelectContent>
              {stakingOptions.map((option) => (
                <SelectItem key={option.days} value={option.days}>
                  {option.days} Tage - {option.apy} APY
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Amount Input */}
        <div className="space-y-3">
          <Label className="text-foreground">Stake-Betrag (MURAT)</Label>
          <Input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            className="bg-background border-border"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Balance: 50,000 MURAT</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-auto p-0 text-bitcoin"
              onClick={() => handleAmountChange("50000")}
            >
              Max
            </Button>
          </div>
        </div>

        {/* Expected Return */}
        {amount && duration && (
          <Card className="bg-secondary/20 border-bitcoin/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Calculator className="text-bitcoin" size={20} />
                <h4 className="font-semibold text-foreground">Erwartete Rendite</h4>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    <Clock className="text-bitcoin" size={16} />
                    <span className="text-sm text-muted-foreground">Laufzeit</span>
                  </div>
                  <p className="text-foreground font-bold">{duration} Tage</p>
                </div>
                
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    <TrendingUp className="text-bitcoin" size={16} />
                    <span className="text-sm text-muted-foreground">Gesamt-Rendite</span>
                  </div>
                  <p className="text-green-400 font-bold">+{expectedReturn.toFixed(2)} USDC</p>
                </div>
              </div>
              
              <div className="mt-3 text-xs text-muted-foreground">
                <p>* Belohnungen werden in USDC ausgezahlt</p>
                <p>* Max. APY: 8% pro Jahr</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stake Button */}
        {!isConnected ? (
          <Button 
            onClick={connectWallet}
            size="lg"
            className="w-full"
            variant="outline"
          >
            <Wallet className="mr-2" size={20} />
            Wallet verbinden
          </Button>
        ) : (
          <Button 
            onClick={handleStake}
            disabled={!amount || !duration}
            size="lg"
            className="w-full"
          >
            <TrendingUp className="mr-2" size={20} />
            Coming Soon - Smart Contract wird deployed
          </Button>
        )}
        
        {isConnected && address && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              Verbunden: {address.slice(0, 6)}...{address.slice(-4)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              MURAT Token wird automatisch erkannt sobald verfügbar
            </p>
          </div>
        )}

        {/* Info */}
        <div className="space-y-2 text-xs text-muted-foreground">
          <Badge variant="secondary" className="bg-blue-600 text-white">
            <Clock className="mr-1" size={12} />
            Testnet Phase
          </Badge>
          <div className="space-y-1">
            <p>• Gestakte Token sind für die gewählte Laufzeit gesperrt</p>
            <p>• Vorzeitige Auszahlung führt zu Strafgebühren (20%)</p>
            <p>• Belohnungen werden täglich berechnet und bei Auszahlung übertragen</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};