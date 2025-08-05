import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Play, Vote, Trophy, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import heroBanner from "@/assets/hero-banner.jpg";

export const HeroSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroBanner} 
          alt="KryptoMurat Hero" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-crypto-dark/50 via-crypto-dark/20 to-crypto-dark/80" />
      </div>

      {/* Floating Bitcoin Animation */}
      <div className="absolute top-20 left-10 animate-bounce">
        <div className="w-8 h-8 rounded-full bg-gradient-bitcoin shadow-bitcoin opacity-70" />
      </div>
      <div className="absolute top-40 right-20 animate-pulse">
        <div className="w-6 h-6 rounded-full bg-electric-blue shadow-electric opacity-50" />
      </div>
      <div className="absolute bottom-32 left-20 animate-bounce delay-300">
        <div className="w-10 h-10 rounded-full bg-gradient-bitcoin shadow-bitcoin opacity-60" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-4xl">
          {/* Live Badge */}
          <div className="flex justify-center mb-6">
            <Badge variant="secondary" className="bg-red-600 text-white animate-pulse px-4 py-2">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-ping" />
              {t('hero.live_now')}
            </Badge>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-bitcoin via-bitcoin-glow to-electric-blue bg-clip-text text-transparent">
            {t('hero.title')}
          </h1>
          
          <h2 className="text-2xl md:text-4xl font-semibold mb-8 text-foreground">
            {t('hero.subtitle')}
          </h2>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button variant="bitcoin" size="lg" className="text-lg px-8" asChild>
              <Link to="/game">
                <Play className="mr-2" />
                {t('hero.game_start')}
              </Link>
            </Button>
            
            <Button variant="wallet" size="lg" className="text-lg px-8" asChild>
              <Link to="/livestream">
                <Wallet className="mr-2" />
                {t('wallet.connect')}
              </Link>
            </Button>
            
            <Button variant="voting" size="lg" className="text-lg px-8" asChild>
              <Link to="/voting">
                <Vote className="mr-2" />
                {t('hero.vote_now')}
              </Link>
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="bg-card/80 backdrop-blur border-border hover:shadow-card-glow transition-all duration-300 group">
              <div className="p-6 text-center">
                <div className="bg-gradient-bitcoin w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-bitcoin transition-all duration-300">
                  <Trophy className="text-crypto-dark" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">NFT Belohnungen</h3>
                <p className="text-muted-foreground">
                  Sammle exklusive Story-NFTs und beeinflusse den Verlauf der Serie
                </p>
              </div>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border hover:shadow-card-glow transition-all duration-300 group">
              <div className="p-6 text-center">
                <div className="bg-gradient-electric w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-electric transition-all duration-300">
                  <Vote className="text-background" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Live Voting</h3>
                <p className="text-muted-foreground">
                  Entscheide in Echtzeit über Murats nächste Schritte in der Geschichte
                </p>
              </div>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border hover:shadow-card-glow transition-all duration-300 group">
              <div className="p-6 text-center">
                <div className="bg-gradient-electric w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-electric transition-all duration-300">
                  <Zap className="text-background" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Exklusive Community</h3>
                <p className="text-muted-foreground">
                  Werde Teil der $MURAT Community und erhalte Zugang zu privaten Streams
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-bitcoin rounded-full flex justify-center">
          <div className="w-1 h-3 bg-bitcoin rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};