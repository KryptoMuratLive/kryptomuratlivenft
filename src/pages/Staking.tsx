import { Navigation } from "@/components/navigation";
import { StakeForm } from "@/components/StakeForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, TrendingUp, Lock } from "lucide-react";

const Staking = () => {
  const stakingStats = {
    totalStaked: "1,247,892",
    myStaked: "10,000",
    earned: "127.45",
    apy: "8.2%"
  };

  const stakingPools = [
    { duration: 30, apy: "3.5%", minStake: "1,000", status: "Active" },
    { duration: 90, apy: "5.2%", minStake: "5,000", status: "Active" },
    { duration: 180, apy: "6.8%", minStake: "10,000", status: "Active" },
    { duration: 360, apy: "8.0%", minStake: "25,000", status: "Active" }
  ];

  return (
    <div className="min-h-screen bg-crypto-dark">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20 pb-12">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="bg-green-600 text-white mb-4">
            <Coins className="mr-1" size={16} />
            STAKING AKTIV
          </Badge>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            $MURAT Token Staking
          </h1>
          <p className="text-xl text-muted-foreground">
            Stake deine MURAT Token und verdiene bis zu 8% APY
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="flex items-center justify-center p-6">
              <Lock className="mr-2 text-bitcoin" size={24} />
              <div>
                <p className="text-2xl font-bold text-foreground">{stakingStats.totalStaked}</p>
                <p className="text-sm text-muted-foreground">Total Staked</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="flex items-center justify-center p-6">
              <Coins className="mr-2 text-bitcoin" size={24} />
              <div>
                <p className="text-2xl font-bold text-foreground">{stakingStats.myStaked}</p>
                <p className="text-sm text-muted-foreground">Meine Stakes</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="flex items-center justify-center p-6">
              <TrendingUp className="mr-2 text-green-400" size={24} />
              <div>
                <p className="text-2xl font-bold text-foreground">{stakingStats.earned}</p>
                <p className="text-sm text-muted-foreground">Verdient (USDC)</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="flex items-center justify-center p-6">
              <TrendingUp className="mr-2 text-bitcoin" size={24} />
              <div>
                <p className="text-2xl font-bold text-foreground">{stakingStats.apy}</p>
                <p className="text-sm text-muted-foreground">Aktueller APY</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Staking Form */}
            <StakeForm />

            {/* Staking Pools */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Verfügbare Staking Pools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stakingPools.map((pool, index) => (
                    <div key={index} className="border border-border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-foreground">{pool.duration} Tage</h4>
                        <Badge variant="secondary" className="bg-green-600 text-white">
                          {pool.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">APY</p>
                          <p className="text-bitcoin font-bold">{pool.apy}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Min. Stake</p>
                          <p className="text-foreground">{pool.minStake} MURAT</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* My Stakes */}
          <Card className="bg-card border-border mt-8">
            <CardHeader>
              <CardTitle className="text-foreground">Meine aktiven Stakes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Lock className="mx-auto mb-4" size={48} />
                <p>Keine aktiven Stakes vorhanden</p>
                <p className="text-sm">Erstelle deine erste Stake um zu beginnen!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Staking;