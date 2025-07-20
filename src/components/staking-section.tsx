import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Coins, 
  Lock,
  Unlock,
  Clock,
  Award,
  DollarSign
} from "lucide-react";
import { useState } from "react";

export const StakingSection = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [stakedAmount] = useState(1500);
  const [totalEarned] = useState(127.5);

  const stakingPlans = [
    {
      id: "30",
      duration: "30 Tage",
      apy: "3%",
      multiplier: "1x",
      minStake: 100,
      reward: "Basis Belohnungen",
      popular: false,
      lockIcon: Clock
    },
    {
      id: "90", 
      duration: "90 Tage",
      apy: "5%",
      multiplier: "1.5x",
      minStake: 250,
      reward: "Voting Power Boost",
      popular: true,
      lockIcon: Lock
    },
    {
      id: "180",
      duration: "180 Tage", 
      apy: "6.5%",
      multiplier: "2x",
      minStake: 500,
      reward: "Exklusive NFT Drops",
      popular: false,
      lockIcon: Lock
    },
    {
      id: "360",
      duration: "360 Tage",
      apy: "8%", 
      multiplier: "3x",
      minStake: 1000,
      reward: "Premium Access + NFTs",
      popular: false,
      lockIcon: Award
    }
  ];

  const activeStakes = [
    {
      amount: 1000,
      plan: "90 Tage",
      started: "2024-01-15",
      ends: "2024-04-15", 
      earned: 87.5,
      progress: 65
    },
    {
      amount: 500,
      plan: "180 Tage",
      started: "2023-12-01",
      ends: "2024-05-30",
      earned: 40,
      progress: 85
    }
  ];

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('de-DE').format(num);
  };

  const calculateReward = (amount: number, apy: string, days: number) => {
    const rate = parseFloat(apy) / 100;
    return (amount * rate * days) / 365;
  };

  return (
    <section id="staking" className="py-20 bg-crypto-dark">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="bg-bitcoin text-crypto-dark mb-4">
            <BarChart3 className="mr-2" size={16} />
            $MURAT STAKING
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-bitcoin to-electric-blue bg-clip-text text-transparent">
            Verdiene mit deinen Token
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stake deine $MURAT Token und erhalte passive Einkommen. Je länger du stakest, desto höher die Belohnungen!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Staking Dashboard */}
          <div className="lg:col-span-1 space-y-6">
            {/* Portfolio Overview */}
            <Card className="bg-card/80 backdrop-blur border-border">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <TrendingUp className="mr-2 text-bitcoin" />
                  Dein Portfolio
                </h3>

                <div className="space-y-4">
                  <div className="bg-secondary/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Gestakte Token</span>
                      <Coins className="text-bitcoin" size={16} />
                    </div>
                    <div className="text-2xl font-bold text-bitcoin">
                      {formatNumber(stakedAmount)} $MURAT
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ≈ ${formatNumber(stakedAmount * 0.85)} USD
                    </div>
                  </div>

                  <div className="bg-secondary/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Verdient</span>
                      <DollarSign className="text-electric-blue" size={16} />
                    </div>
                    <div className="text-2xl font-bold text-electric-blue">
                      {formatNumber(totalEarned)} $MURAT
                    </div>
                    <div className="text-sm text-muted-foreground">
                      +8.5% dieses Jahr
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-secondary/30 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-foreground">2</div>
                      <div className="text-xs text-muted-foreground">Aktive Stakes</div>
                    </div>
                    <div className="bg-secondary/30 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-foreground">5.7%</div>
                      <div className="text-xs text-muted-foreground">Ø APY</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Active Stakes */}
            <Card className="bg-card/80 backdrop-blur border-border">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Lock className="mr-2 text-electric-blue" />
                  Aktive Stakes
                </h3>

                <div className="space-y-4">
                  {activeStakes.map((stake, index) => (
                    <div key={index} className="bg-secondary/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold">{formatNumber(stake.amount)} $MURAT</div>
                        <Badge variant="outline" className="text-xs">
                          {stake.plan}
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-muted-foreground mb-3">
                        <div>Gestartet: {stake.started}</div>
                        <div>Endet: {stake.ends}</div>
                      </div>

                      <div className="mb-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{stake.progress}%</span>
                        </div>
                        <Progress value={stake.progress} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Verdient:</span>
                        <span className="text-sm font-semibold text-bitcoin">
                          +{stake.earned} $MURAT
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Staking Plans */}
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {stakingPlans.map((plan) => {
                const isSelected = selectedPlan === plan.id;
                const Icon = plan.lockIcon;
                
                return (
                  <Card 
                    key={plan.id}
                    className={`
                      cursor-pointer transition-all duration-300 border
                      ${isSelected 
                        ? 'border-bitcoin shadow-bitcoin bg-bitcoin/5' 
                        : 'border-border hover:border-bitcoin/50 hover:shadow-bitcoin/20'
                      }
                      ${plan.popular ? 'border-electric-blue/50 bg-electric-blue/5' : ''}
                    `}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    <div className="p-6">
                      {/* Popular Badge */}
                      {plan.popular && (
                        <Badge className="mb-4 bg-electric-blue text-background">
                          🔥 BELIEBT
                        </Badge>
                      )}

                      {/* Plan Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold">{plan.duration}</h3>
                          <p className="text-sm text-muted-foreground">Mindestablage: {formatNumber(plan.minStake)} $MURAT</p>
                        </div>
                        <div className={`
                          w-12 h-12 rounded-full flex items-center justify-center
                          ${isSelected ? 'bg-bitcoin text-crypto-dark' : 'bg-secondary'}
                        `}>
                          <Icon size={24} />
                        </div>
                      </div>

                      {/* APY */}
                      <div className="text-center mb-6">
                        <div className="text-4xl font-bold text-bitcoin mb-1">
                          {plan.apy}
                        </div>
                        <div className="text-sm text-muted-foreground">APY</div>
                      </div>

                      {/* Features */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Voting Multiplier:</span>
                          <span className="font-semibold">{plan.multiplier}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Belohnung:</span>
                          <span className="font-semibold text-bitcoin">{plan.reward}</span>
                        </div>
                      </div>

                      {/* Calculation Example */}
                      <div className="bg-secondary/30 rounded-lg p-3 mb-4">
                        <div className="text-xs text-muted-foreground mb-1">Beispiel (1000 $MURAT):</div>
                        <div className="text-sm font-semibold">
                          = {formatNumber(Math.round(calculateReward(1000, plan.apy, parseInt(plan.duration))))} $MURAT Gewinn
                        </div>
                      </div>

                      {/* Action Button */}
                      <Button 
                        variant={isSelected ? "bitcoin" : "outline"} 
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPlan(plan.id);
                        }}
                      >
                        {isSelected ? 'Plan auswählen' : 'Details ansehen'}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Staking Form */}
            {selectedPlan && (
              <Card className="bg-card/80 backdrop-blur border-bitcoin/50">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-6 flex items-center">
                    <Coins className="mr-2 text-bitcoin" />
                    Stake {stakingPlans.find(p => p.id === selectedPlan)?.duration}
                  </h3>

                  <div className="space-y-6">
                    {/* Amount Input */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Stake Amount ($MURAT)
                      </label>
                      <div className="bg-secondary/50 rounded-lg p-4 border border-border">
                        <div className="flex items-center justify-between">
                          <input 
                            type="number" 
                            placeholder="1000"
                            className="bg-transparent text-xl font-semibold outline-none flex-1"
                            min={stakingPlans.find(p => p.id === selectedPlan)?.minStake}
                          />
                          <div className="text-muted-foreground text-sm">
                            Balance: 2,450 $MURAT
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Amount Buttons */}
                    <div className="flex gap-2">
                      {['25%', '50%', '75%', 'MAX'].map((percent) => (
                        <Button key={percent} variant="outline" size="sm" className="flex-1">
                          {percent}
                        </Button>
                      ))}
                    </div>

                    {/* Summary */}
                    <div className="bg-secondary/30 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Erwarteter Gewinn:</span>
                        <span className="font-semibold text-bitcoin">+87 $MURAT</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Lock Period:</span>
                        <span>{stakingPlans.find(p => p.id === selectedPlan)?.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Unlock Date:</span>
                        <span>15. April 2024</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <Button variant="bitcoin" size="lg" className="flex-1">
                        <Lock className="mr-2" size={16} />
                        Jetzt Staken
                      </Button>
                      <Button variant="outline" size="lg">
                        Abbrechen
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Info Section */}
        <Card className="mt-12 bg-card/50 border-border">
          <div className="p-8">
            <h3 className="text-xl font-semibold mb-6">📚 Wichtige Informationen zum Staking</h3>
            
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-bitcoin mb-2">🔒 Lock Period</h4>
                <p className="text-muted-foreground">
                  Gestakte Token sind für die gewählte Dauer gesperrt. Früher Ausstieg mit Penalty möglich.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-electric-blue mb-2">💰 Belohnungen</h4>
                <p className="text-muted-foreground">
                  Belohnungen werden täglich berechnet und können jederzeit beansprucht werden.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-bitcoin mb-2">🗳️ Voting Power</h4>
                <p className="text-muted-foreground">
                  Gestakte Token erhöhen deine Voting Power in der Live-Serie entsprechend dem Multiplier.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};