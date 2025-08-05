import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { RefreshCw, ExternalLink, Users, Trophy, Database } from 'lucide-react';

interface NFTClaim {
  id: string;
  wallet_address: string;
  claimed: boolean;
  tx_hash: string | null;
  created_at: string;
  updated_at: string;
}

interface GameProgress {
  id: string;
  wallet_address: string;
  current_step: number;
  inventory: any;
  choices_history: any;
  has_jaeger_nft: boolean;
  created_at: string;
  updated_at: string;
}

export default function AdminPanel() {
  const [claims, setClaims] = useState<NFTClaim[]>([]);
  const [gameProgress, setGameProgress] = useState<GameProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'claims' | 'progress'>('claims');
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch NFT Claims
      const { data: claimsData, error: claimsError } = await supabase
        .from('nft_claims')
        .select('*')
        .order('updated_at', { ascending: false });

      if (claimsError) {
        console.error('Error fetching claims:', claimsError);
      } else {
        setClaims(claimsData || []);
      }

      // Fetch Game Progress
      const { data: progressData, error: progressError } = await supabase
        .from('game_progress')
        .select('*')
        .order('updated_at', { ascending: false });

      if (progressError) {
        console.error('Error fetching progress:', progressError);
      } else {
        setGameProgress(progressData || []);
      }

      toast({
        title: "Daten geladen",
        description: `${claimsData?.length || 0} Claims und ${progressData?.length || 0} Spielstände gefunden.`,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Fehler beim Laden",
        description: "Die Daten konnten nicht geladen werden.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('de-DE');
  };

  const getTxLink = (txHash: string) => {
    return `https://polygonscan.com/tx/${txHash}`;
  };

  const getSuccessfulClaims = () => {
    return claims.filter(claim => claim.claimed).length;
  };

  const getActiveUsers = () => {
    return gameProgress.length;
  };

  const getAverageProgress = () => {
    if (gameProgress.length === 0) return 0;
    const totalSteps = gameProgress.reduce((sum, progress) => sum + progress.current_step, 0);
    return Math.round(totalSteps / gameProgress.length);
  };

  return (
    <div className="min-h-screen bg-crypto-dark">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                🛠️ Admin Panel
              </h1>
              <p className="text-muted-foreground">
                NFT Claims und Spielfortschritte Übersicht
              </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-card-foreground">
                    Erfolgreiche Claims
                  </CardTitle>
                  <Trophy className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {getSuccessfulClaims()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    von {claims.length} total
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-card-foreground">
                    Aktive Spieler
                  </CardTitle>
                  <Users className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {getActiveUsers()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    mit gespeichertem Fortschritt
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-card-foreground">
                    Durchschnittlicher Step
                  </CardTitle>
                  <Database className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {getAverageProgress()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    von 8 möglichen Steps
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Refresh Button */}
            <div className="flex justify-center mb-6">
              <Button
                onClick={fetchData}
                disabled={loading}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Lädt...' : 'Daten aktualisieren'}
              </Button>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-6">
              <div className="flex bg-muted rounded-lg p-1">
                <Button
                  variant={activeTab === 'claims' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('claims')}
                  className="rounded-md"
                >
                  NFT Claims
                </Button>
                <Button
                  variant={activeTab === 'progress' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('progress')}
                  className="rounded-md"
                >
                  Spielfortschritt
                </Button>
              </div>
            </div>

            {/* NFT Claims Table */}
            {activeTab === 'claims' && (
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-xl text-card-foreground">
                    🏆 NFT Claims Übersicht
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-8">
                      <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Lade Claims...</p>
                    </div>
                  ) : claims.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Noch keine Claims vorhanden.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left p-3 text-muted-foreground font-medium">
                              Wallet
                            </th>
                            <th className="text-left p-3 text-muted-foreground font-medium">
                              Status
                            </th>
                            <th className="text-left p-3 text-muted-foreground font-medium">
                              TX Hash
                            </th>
                            <th className="text-left p-3 text-muted-foreground font-medium">
                              Datum
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {claims.map((claim) => (
                            <tr key={claim.id} className="border-b border-border hover:bg-muted/50">
                              <td className="p-3">
                                <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                                  {formatAddress(claim.wallet_address)}
                                </code>
                              </td>
                              <td className="p-3">
                                <Badge variant={claim.claimed ? "default" : "secondary"}>
                                  {claim.claimed ? '✅ Geclaimed' : '⏳ Pending'}
                                </Badge>
                              </td>
                              <td className="p-3">
                                {claim.tx_hash ? (
                                  <a
                                    href={getTxLink(claim.tx_hash)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-primary hover:underline"
                                  >
                                    <code className="text-xs">
                                      {claim.tx_hash.slice(0, 8)}...
                                    </code>
                                    <ExternalLink className="h-3 w-3" />
                                  </a>
                                ) : (
                                  <span className="text-muted-foreground">–</span>
                                )}
                              </td>
                              <td className="p-3 text-sm text-muted-foreground">
                                {formatDate(claim.created_at)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Game Progress Table */}
            {activeTab === 'progress' && (
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-xl text-card-foreground">
                    🎮 Spielfortschritt Übersicht
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-8">
                      <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Lade Fortschritt...</p>
                    </div>
                  ) : gameProgress.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Noch keine Spielstände vorhanden.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left p-3 text-muted-foreground font-medium">
                              Wallet
                            </th>
                            <th className="text-left p-3 text-muted-foreground font-medium">
                              Current Step
                            </th>
                            <th className="text-left p-3 text-muted-foreground font-medium">
                              Inventar
                            </th>
                            <th className="text-left p-3 text-muted-foreground font-medium">
                              JÄGER NFT
                            </th>
                            <th className="text-left p-3 text-muted-foreground font-medium">
                              Letztes Update
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {gameProgress.map((progress) => (
                            <tr key={progress.id} className="border-b border-border hover:bg-muted/50">
                              <td className="p-3">
                                <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                                  {formatAddress(progress.wallet_address)}
                                </code>
                              </td>
                              <td className="p-3">
                                <Badge variant="outline">
                                  Step {progress.current_step}/8
                                </Badge>
                              </td>
                              <td className="p-3">
                                <Badge variant="secondary">
                                  {Array.isArray(progress.inventory) ? progress.inventory.length : 0} Items
                                </Badge>
                              </td>
                              <td className="p-3">
                                <Badge variant={progress.has_jaeger_nft ? "default" : "secondary"}>
                                  {progress.has_jaeger_nft ? '🎯 Ja' : '❌ Nein'}
                                </Badge>
                              </td>
                              <td className="p-3 text-sm text-muted-foreground">
                                {formatDate(progress.updated_at)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}