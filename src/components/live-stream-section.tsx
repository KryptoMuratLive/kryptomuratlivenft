import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  MessageCircle, 
  Heart,
  Share2,
  Users,
  Eye
} from "lucide-react";
import { useState } from "react";

export const LiveStreamSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [viewers] = useState(1247);
  const [likes] = useState(342);

  return (
    <section id="stream" className="py-20 bg-gradient-crypto">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="bg-red-600 text-white animate-pulse mb-4">
            <div className="w-2 h-2 bg-white rounded-full mr-2 animate-ping" />
            LIVE STREAM
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-bitcoin to-electric-blue bg-clip-text text-transparent">
            Verfolge Murats Flucht
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Erlebe die spannende Jagd live mit und entscheide über den weiteren Verlauf der Geschichte
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Stream Player */}
          <div className="lg:col-span-3">
            <Card className="bg-crypto-darker border-border overflow-hidden shadow-card-glow">
              {/* Stream Header */}
              <div className="bg-secondary/50 px-6 py-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Badge variant="secondary" className="bg-red-600 text-white">
                      LIVE
                    </Badge>
                    <h3 className="text-xl font-semibold">Episode 5: Der Bitcoin-Jäger schlägt zu</h3>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Eye size={16} />
                      <span>{viewers.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart size={16} />
                      <span>{likes}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stream Player */}
              <div className="relative aspect-video bg-crypto-darker">
                {/* Placeholder for Livepeer Player */}
                <div className="absolute inset-0 bg-gradient-to-br from-crypto-dark to-crypto-darker flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-bitcoin rounded-full flex items-center justify-center mx-auto mb-4 shadow-bitcoin">
                      <Play className="text-crypto-dark" size={32} />
                    </div>
                    <p className="text-xl font-semibold mb-2">Live Stream wird geladen...</p>
                    <p className="text-muted-foreground">NFT-Zugang erforderlich für Premium-Inhalte</p>
                  </div>
                </div>

                {/* Stream Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-crypto-dark/90 to-transparent p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="hover:bg-bitcoin/20"
                      >
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setIsMuted(!isMuted)}
                        className="hover:bg-bitcoin/20"
                      >
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                      </Button>
                      
                      <div className="w-20 h-1 bg-secondary rounded-full">
                        <div className="w-12 h-1 bg-bitcoin rounded-full"></div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="hover:bg-bitcoin/20">
                        <Share2 size={20} />
                      </Button>
                      <Button variant="ghost" size="sm" className="hover:bg-bitcoin/20">
                        <Maximize size={20} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Stream Info */}
            <Card className="mt-6 bg-card/80 backdrop-blur border-border">
              <div className="p-6">
                <h4 className="text-lg font-semibold mb-3">Was bisher geschah...</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Murat ist dem Bitcoin-Jäger nur knapp entkommen und versteckt sich nun in den 
                  unterirdischen Tunneln der Stadt. Die Community hat entschieden, dass er den 
                  Weg über die alte Metro-Station nehmen soll. Doch der Jäger ist ihm dicht auf den Fersen...
                </p>
                
                <div className="mt-4 flex items-center space-x-4">
                  <Badge variant="outline" className="border-bitcoin text-bitcoin">
                    #JagdAufBitcoin
                  </Badge>
                  <Badge variant="outline" className="border-electric-blue text-electric-blue">
                    Episode 5
                  </Badge>
                  <Badge variant="outline">
                    42:30 min
                  </Badge>
                </div>
              </div>
            </Card>
          </div>

          {/* Live Chat Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-card/80 backdrop-blur border-border h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="border-b border-border p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold flex items-center">
                    <MessageCircle className="mr-2" size={20} />
                    Live Chat
                  </h4>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users size={16} className="mr-1" />
                    {viewers.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <div className="text-sm">
                  <span className="text-bitcoin font-semibold">CryptoHunter23:</span>
                  <span className="text-muted-foreground ml-2">Murat soll links gehen! 🏃‍♂️</span>
                </div>
                <div className="text-sm">
                  <span className="text-electric-blue font-semibold">BitcoinBabe:</span>
                  <span className="text-muted-foreground ml-2">NEU: Metro-Station ist zu gefährlich!</span>
                </div>
                <div className="text-sm">
                  <span className="text-bitcoin font-semibold">MuratFan2024:</span>
                  <span className="text-muted-foreground ml-2">₿ Voted für Dachboden! 🔥</span>
                </div>
                <div className="text-sm">
                  <span className="text-electric-blue font-semibold">JägerAlert:</span>
                  <span className="text-muted-foreground ml-2">VORSICHT! Jäger in der Nähe gesichtet 👀</span>
                </div>
                <div className="text-sm">
                  <span className="text-bitcoin font-semibold">StakingKing:</span>
                  <span className="text-muted-foreground ml-2">Meine $MURAT Stakes laufen perfekt! 📈</span>
                </div>
              </div>

              {/* Chat Input */}
              <div className="border-t border-border p-4">
                <div className="bg-secondary/50 rounded-lg p-3 text-center text-sm text-muted-foreground">
                  💎 Verbinde deine Wallet für Chat-Zugang
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};