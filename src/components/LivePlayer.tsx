import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Volume2, Maximize, MessageCircle, Settings, Eye } from "lucide-react";
import { getPlaybackUrl } from "@/lib/livepeer";

export const LivePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(80);
  const [viewers, setViewers] = useState(1247);
  const [isLive, setIsLive] = useState(true);
  const [quality, setQuality] = useState<'720p' | '480p' | 'source'>('source');
  
  // Demo playback ID - replace with actual stream data
  const demoPlaybackId = "bafybeigtqixgtb5gkr7zbfyghbtlqddxhceewjsxzem7rvybqmzn3dxf5e";
  
  const [chatMessages, setChatMessages] = useState([
    { user: "CryptoFan123", message: "Murat läuft direkt in die Falle! 😱", time: "12:34" },
    { user: "BitcoinHODLer", message: "Er sollte die U-Bahn nehmen!", time: "12:35" },
    { user: "NFTCollector", message: "Spannung pur! 🔥", time: "12:35" }
  ]);

  useEffect(() => {
    // Simulate viewer count changes
    const interval = setInterval(() => {
      setViewers(prev => prev + Math.floor(Math.random() * 10 - 5));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      {/* Main Video Player */}
      <Card className="bg-card border-border overflow-hidden">
        <CardContent className="p-0">
          {/* Video Container */}
          <div className="relative aspect-video bg-black">
            {isLive ? (
              <video
                className="w-full h-full object-cover"
                controls
                muted={volume === 0}
                autoPlay
                playsInline
              >
                <source 
                  src={getPlaybackUrl(demoPlaybackId, quality)} 
                  type="application/x-mpegURL" 
                />
                <p className="text-white p-4">
                  Dein Browser unterstützt HTML5 Video nicht. 
                  <a href={getPlaybackUrl(demoPlaybackId, quality)} className="text-bitcoin underline">
                    Direkten Link öffnen
                  </a>
                </p>
              </video>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Eye className="mx-auto mb-4 text-white" size={64} />
                  <p className="text-white text-lg">Stream Offline</p>
                  <p className="text-white/60 text-sm">Murat bereitet sich auf die nächste Episode vor...</p>
                </div>
              </div>
            )}
            
            {/* Live Badge */}
            <Badge className="absolute top-4 left-4 bg-red-600 text-white animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-ping" />
              LIVE
            </Badge>
            
            {/* Viewer Count */}
            <Badge className="absolute top-4 right-4 bg-black/50 text-white">
              {viewers.toLocaleString()} Zuschauer
            </Badge>
            
            {/* Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-white hover:bg-white/20"
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </Button>
                  
                  <div className="flex items-center space-x-2">
                    <Volume2 className="text-white" size={20} />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => setVolume(parseInt(e.target.value))}
                      className="w-20"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                  >
                    <Settings size={20} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                  >
                    <Maximize size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stream Info & Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Stream Information */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-2">
              Episode 3: Die Verfolgungsjagd
            </h3>
            <p className="text-muted-foreground mb-4">
              Murat muss eine schwierige Entscheidung treffen. Der Bitcoin-Jäger kommt immer näher und die Zeit läuft ab. Was wird er tun?
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">#Bitcoin</Badge>
              <Badge variant="secondary">#Krypto</Badge>
              <Badge variant="secondary">#LiveSeries</Badge>
              <Badge variant="secondary">#Web3</Badge>
            </div>
            
            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => window.location.href = '/voting'}>
                <MessageCircle className="mr-2" size={16} />
                Zur Abstimmung
              </Button>
              <Button variant="outline">
                Episode teilen
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Live Chat */}
        <Card className="bg-card border-border">
          <CardContent className="p-0">
            <div className="border-b border-border p-4">
              <h4 className="font-semibold text-foreground">Live Chat</h4>
            </div>
            
            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg, index) => (
                <div key={index} className="text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-bitcoin">{msg.user}</span>
                    <span className="text-xs text-muted-foreground">{msg.time}</span>
                  </div>
                  <p className="text-muted-foreground">{msg.message}</p>
                </div>
              ))}
            </div>
            
            <div className="border-t border-border p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Nachricht eingeben..."
                  className="flex-1 px-3 py-2 bg-background border border-border rounded-md text-foreground"
                />
                <Button size="sm">Senden</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};