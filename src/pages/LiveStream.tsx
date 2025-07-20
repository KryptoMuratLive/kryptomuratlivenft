import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { NFTGate } from "@/components/NFTGate";
// import { LivePlayer } from "@/components/LivePlayer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Users, MessageCircle } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";

const LiveStream = () => {
  const [hasNFT, setHasNFT] = useState(false);
  const { isConnected } = useWallet();

  const handleNFTVerification = (nftStatus: boolean) => {
    setHasNFT(nftStatus);
  };

  return (
    <div className="min-h-screen bg-crypto-dark">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20 pb-12">
        {/* Live Stream Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="bg-red-600 text-white animate-pulse mb-4">
            <div className="w-2 h-2 bg-white rounded-full mr-2 animate-ping" />
            LIVE JETZT
          </Badge>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            KryptoMurat Live Stream
          </h1>
          <p className="text-xl text-muted-foreground">
            Verfolge Murats Flucht vor dem Bitcoin-Jäger in Echtzeit
          </p>
        </div>

        {/* Stream Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="flex items-center justify-center p-6">
              <Eye className="mr-2 text-bitcoin" size={24} />
              <div>
                <p className="text-2xl font-bold text-foreground">1,247</p>
                <p className="text-sm text-muted-foreground">Zuschauer</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="flex items-center justify-center p-6">
              <Users className="mr-2 text-bitcoin" size={24} />
              <div>
                <p className="text-2xl font-bold text-foreground">892</p>
                <p className="text-sm text-muted-foreground">NFT Holder</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="flex items-center justify-center p-6">
              <MessageCircle className="mr-2 text-bitcoin" size={24} />
              <div>
                <p className="text-2xl font-bold text-foreground">156</p>
                <p className="text-sm text-muted-foreground">Live Votes</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* NFT Gate or Stream */}
        <div className="max-w-4xl mx-auto">
          {!isConnected ? (
            <NFTGate onConnect={handleNFTVerification} />
          ) : !hasNFT ? (
            <div className="text-center p-12 bg-card rounded-xl border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Exklusiver Zugang erforderlich
              </h3>
              <p className="text-muted-foreground mb-6">
                Du benötigst ein Jäger-NFT, um den Live-Stream zu sehen.
              </p>
              <div className="space-y-4">
                <Button variant="default" size="lg" onClick={() => window.location.href = '/mint'}>
                  NFT jetzt minten
                </Button>
                <Button variant="outline" onClick={() => window.location.reload()}>
                  NFT-Zugang erneut prüfen
                </Button>
              </div>
            </div>
          ) : (
            <div className="aspect-video bg-black rounded-xl overflow-hidden">
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-16 h-16 bg-bitcoin rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="text-black" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Live Stream</h3>
                  <p className="text-gray-300">Willkommen beim KryptoMurat Live Stream!</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex justify-center space-x-4 mt-8">
          <Button variant="outline" onClick={() => window.location.href = '/voting'}>
            Zur Live-Abstimmung
          </Button>
          <Button variant="outline" onClick={() => window.location.href = '/gallery'}>
            NFT Gallery
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LiveStream;