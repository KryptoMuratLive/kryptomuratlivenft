import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useWallet } from '@/hooks/useWallet';
import { useLive } from '@/contexts/LiveContext';
import { useToast } from '@/hooks/use-toast';
import { writeContract } from '@wagmi/core';
import { config } from '@/lib/wagmi';
import { EVENT_NFT_CONTRACT, ORGANIZER_ADDRESS } from '@/lib/contracts';
import { GamepadIcon, MessageCircle, Square, Eye } from 'lucide-react';

export const OrganizerDashboard = () => {
  const { address, isConnected } = useWallet();
  const { liveMode, eventData, startEvent, startCommunity, stopLive } = useLive();
  const { toast } = useToast();
  const [eventTitle, setEventTitle] = useState('Jagd auf den Bitcoin #12');
  const [isStartingEvent, setIsStartingEvent] = useState(false);

  // Check if current user is authorized organizer
  const isAuthorized = isConnected && address?.toLowerCase() === ORGANIZER_ADDRESS.toLowerCase();

  const handleStartEvent = async () => {
    if (!address || !eventTitle.trim()) return;

    setIsStartingEvent(true);
    try {
      // For demo purposes, simulate NFT minting
      // In production, replace this with actual contract interaction
      const mockTokenId = Math.floor(Math.random() * 10000).toString();

      // Update global state
      startEvent(eventTitle, mockTokenId, address);

      toast({
        title: "Live-Event gestartet! 🎮",
        description: `"${eventTitle}" ist jetzt live. NFT wurde geminted.`,
      });
    } catch (error) {
      console.error('Failed to start event:', error);
      toast({
        title: "Fehler beim Starten",
        description: "Event konnte nicht gestartet werden.",
        variant: "destructive",
      });
    } finally {
      setIsStartingEvent(false);
    }
  };

  const handleStartCommunity = () => {
    startCommunity();
    toast({
      title: "Community Live gestartet! 💬",
      description: "Community-Stream ist jetzt aktiv.",
    });
  };

  const handleStopLive = () => {
    stopLive();
    toast({
      title: "Live beendet",
      description: "Stream wurde erfolgreich beendet.",
    });
  };

  if (!isAuthorized) {
    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardContent className="pt-6 text-center">
          <div className="text-muted-foreground">
            {!isConnected ? (
              <p>Bitte verbinde deine Wallet um das Veranstalter-Dashboard zu sehen.</p>
            ) : (
              <p>Du bist nicht berechtigt, das Veranstalter-Dashboard zu verwenden.</p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Veranstalter-Dashboard</h1>
        <p className="text-muted-foreground">Live-Events und Community-Streams verwalten</p>
      </div>

      {/* Current Status */}
      {liveMode !== 'none' && (
        <Card className="border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Aktueller Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              {liveMode === 'event' ? (
                <Badge variant="destructive" className="bg-red-600">
                  🎮 Live-Event aktiv
                </Badge>
              ) : (
                <Badge variant="secondary" className="bg-green-600 text-white">
                  💬 Community Live aktiv
                </Badge>
              )}
            </div>
            
            {eventData && (
              <div className="space-y-2 text-sm">
                <p><strong>Titel:</strong> {eventData.title}</p>
                <p><strong>Gestartet:</strong> {new Date(eventData.startTime!).toLocaleString('de-DE')}</p>
                {eventData.nftTokenId && (
                  <p><strong>NFT Token ID:</strong> {eventData.nftTokenId}</p>
                )}
              </div>
            )}

            <Button onClick={handleStopLive} variant="outline" size="sm">
              <Square className="w-4 h-4 mr-2" />
              Live beenden
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Controls */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Live Event Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GamepadIcon className="w-5 h-5 text-orange-500" />
              Live-Event starten
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="eventTitle">Event-Titel</Label>
              <Input
                id="eventTitle"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="z.B. Jagd auf den Bitcoin #12"
              />
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>• Erstellt einen NFT als Eigentumsnachweis</p>
              <p>• Event wird on-chain gespeichert</p>
              <p>• Rotes Badge wird global angezeigt</p>
            </div>

            <Button
              onClick={handleStartEvent}
              disabled={isStartingEvent || liveMode !== 'none' || !eventTitle.trim()}
              className="w-full"
              variant="default"
            >
              {isStartingEvent ? (
                "NFT wird geminted..."
              ) : (
                <>
                  🎮 Live-Event starten
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Community Live Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-green-500" />
              Community Live starten
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground">
              <p>• Kein NFT wird erstellt</p>
              <p>• Einfacher Community-Stream</p>
              <p>• Grünes Badge wird angezeigt</p>
              <p>• Sofortiger Start ohne Blockchain</p>
            </div>

            <Button
              onClick={handleStartCommunity}
              disabled={liveMode !== 'none'}
              className="w-full"
              variant="secondary"
            >
              💬 Community Live starten
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Info Box */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="text-sm text-muted-foreground">
            <p><strong>Hinweis:</strong> Nur echte Spiel-Events erstellen NFTs als digitalen Eigentumsnachweis. 
            Community-Lives sind für einfache Gespräche und benötigen keine Blockchain-Interaktion.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};