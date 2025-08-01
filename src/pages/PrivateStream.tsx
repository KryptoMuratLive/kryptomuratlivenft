import { useState, useEffect } from 'react';
import { useWallet } from '@/hooks/useWallet';
import { checkNFTOwnership } from '@/lib/checkNFTOwnership';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LivePlayer } from '@/components/LivePlayer';
import { Navigation } from '@/components/navigation';
import { Eye, Users, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function PrivateStream() {
  const { address, isConnected, connectWallet } = useWallet();
  const [hasAccess, setHasAccess] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [viewerCount, setViewerCount] = useState(127);
  const { toast } = useToast();

  const checkAccess = async () => {
    if (!address) return;
    
    setIsChecking(true);
    try {
      const ownership = await checkNFTOwnership(address);
      setHasAccess(ownership.hasNFT);
      
      if (ownership.hasNFT) {
        toast({
          title: "Zugang gewährt!",
          description: "Du hast Zugang zum privaten Stream.",
        });
      }
    } catch (error) {
      console.error('Error checking access:', error);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      checkAccess();
    }
  }, [isConnected, address]);

  // Simulate viewer count updates
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="max-w-md">
              <h1 className="text-3xl font-bold mb-4">Privater Live-Stream</h1>
              <p className="text-muted-foreground mb-6">
                Verbinde deine Wallet um zu prüfen, ob du Zugang zum privaten Stream hast.
              </p>
              <Button onClick={connectWallet} size="lg">
                Wallet Verbinden
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!hasAccess && !isChecking) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="max-w-md">
              <h1 className="text-3xl font-bold mb-4">Kein Zugang</h1>
              <p className="text-muted-foreground mb-6">
                Du benötigst einen Murat NFT um Zugang zum privaten Stream zu erhalten.
              </p>
              <div className="space-y-3">
                <Button onClick={checkAccess} variant="outline">
                  Zugang erneut prüfen
                </Button>
                <Button asChild>
                  <a href="/mint">Murat NFT minten</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="destructive" className="animate-pulse">
                  🔴 LIVE
                </Badge>
                <Badge variant="secondary">Privater Stream</Badge>
              </div>
              <h1 className="text-3xl font-bold">Murat's Privater Live-Stream</h1>
              <p className="text-muted-foreground">
                Exklusiv für Murat NFT-Halter
              </p>
            </div>
          </div>

          {/* Stream Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Live Zuschauer
                </CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{viewerCount}</div>
                <p className="text-xs text-muted-foreground">
                  +12% seit heute
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  NFT-Halter online
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89</div>
                <p className="text-xs text-muted-foreground">
                  Von 156 Gesamthaltern
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Stream-Dauer
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2h 34m</div>
                <p className="text-xs text-muted-foreground">
                  Seit 14:30 Uhr
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Live Stream Player */}
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="destructive" className="animate-pulse">
                  🔴 LIVE
                </Badge>
                Live Stream
              </CardTitle>
              <CardDescription>
                Privater Stream für die Murat Community
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <LivePlayer />
            </CardContent>
          </Card>

          {/* Stream Info */}
          <Card>
            <CardHeader>
              <CardTitle>Stream Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">🎯 Heutige Themen:</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Bitcoin Marktanalyse</li>
                    <li>• NFT Drop Strategie</li>
                    <li>• Community Q&A</li>
                    <li>• Exklusive Alpha-Calls</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">💎 Exklusive Vorteile:</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Direkter Chat mit Murat</li>
                    <li>• Frühzeitiger Zugang zu neuen NFTs</li>
                    <li>• Private Trading-Signale</li>
                    <li>• Wöchentliche AMAs</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}