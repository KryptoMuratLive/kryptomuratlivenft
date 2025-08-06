import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  ArrowUpDown, 
  ExternalLink,
  TrendingUp,
  Coins,
  DollarSign
} from "lucide-react";

export const TokenPurchaseSection = () => {
  const tokenStats = {
    price: "$0.85",
    change24h: "+12.5%",
    volume: "$245,000",
    marketCap: "$8.5M"
  };

  const formatNumber = (num: string) => {
    return num;
  };

  return (
    <section id="buy-token" className="py-20 bg-crypto-dark">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="bg-bitcoin text-crypto-dark mb-4">
            <ShoppingCart className="mr-2" size={16} />
            $MURAT TOKEN KAUFEN
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-bitcoin to-electric-blue bg-clip-text text-transparent">
            Jetzt $MURAT Token kaufen
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Kaufe $MURAT Token direkt über QuickSwap und werde Teil der Community!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Token Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Price Overview */}
            <Card className="bg-card/80 backdrop-blur border-border">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <TrendingUp className="mr-2 text-bitcoin" />
                  Token Statistiken
                </h3>

                <div className="space-y-4">
                  <div className="bg-secondary/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Aktueller Preis</span>
                      <DollarSign className="text-bitcoin" size={16} />
                    </div>
                    <div className="text-2xl font-bold text-bitcoin">
                      {tokenStats.price}
                    </div>
                    <div className="text-sm text-electric-blue">
                      {tokenStats.change24h} (24h)
                    </div>
                  </div>

                  <div className="bg-secondary/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Handelsvolumen</span>
                      <Coins className="text-electric-blue" size={16} />
                    </div>
                    <div className="text-2xl font-bold text-electric-blue">
                      {tokenStats.volume}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      24h Volumen
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <div className="bg-secondary/30 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-foreground">{tokenStats.marketCap}</div>
                      <div className="text-xs text-muted-foreground">Market Cap</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Token Benefits */}
            <Card className="bg-card/80 backdrop-blur border-border">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Coins className="mr-2 text-electric-blue" />
                  Token Vorteile
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-bitcoin rounded-full mr-3"></div>
                    <span>Voting Power in Live-Abstimmungen</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-electric-blue rounded-full mr-3"></div>
                    <span>Zugang zu exklusiven NFT Drops</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-bitcoin rounded-full mr-3"></div>
                    <span>Premium Live-Stream Features</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-electric-blue rounded-full mr-3"></div>
                    <span>Community Governance Rechte</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-bitcoin rounded-full mr-3"></div>
                    <span>Früher Zugang zu neuen Features</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* QuickSwap Exchange */}
          <div className="lg:col-span-2">
            <Card className="bg-card/80 backdrop-blur border-bitcoin/50">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <ArrowUpDown className="mr-2 text-bitcoin" />
                  Token Swap über QuickSwap
                </h3>

                <div className="bg-secondary/30 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-bitcoin">Direkter Swap</h4>
                      <p className="text-sm text-muted-foreground">
                        Tausche ETH, USDT oder andere Token gegen $MURAT
                      </p>
                    </div>
                    <ExternalLink className="text-electric-blue" size={20} />
                  </div>

                  {/* QuickSwap Embed */}
                  <div className="bg-background rounded-lg overflow-hidden border border-border">
                    <iframe
                      src="https://quickswap.exchange/#/swap?outputCurrency=0x04296ee51cd6fdfEE0CB1016A818F17b8ae7a1dD"
                      className="w-full h-[600px] border-none"
                      style={{ borderRadius: '8px' }}
                      allow="clipboard-read; clipboard-write; web-share"
                      title="QuickSwap Token Exchange"
                    />
                  </div>
                </div>

                {/* External Link Button */}
                <div className="flex gap-4">
                  <Button 
                    variant="bitcoin" 
                    size="lg" 
                    className="flex-1"
                    onClick={() => window.open('https://quickswap.exchange/#/swap?outputCurrency=0x04296ee51cd6fdfEE0CB1016A818F17b8ae7a1dD', '_blank')}
                  >
                    <ExternalLink className="mr-2" size={16} />
                    In neuem Tab öffnen
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Info Section */}
        <Card className="mt-12 bg-card/50 border-border">
          <div className="p-8">
            <h3 className="text-xl font-semibold mb-6">📚 Wichtige Informationen zum Kauf</h3>
            
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-bitcoin mb-2">🔗 QuickSwap</h4>
                <p className="text-muted-foreground">
                  Dezentraler Exchange auf Polygon. Niedrige Gebühren und schnelle Transaktionen.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-electric-blue mb-2">💼 Wallet verbinden</h4>
                <p className="text-muted-foreground">
                  Verbinde deine MetaMask oder WalletConnect kompatible Wallet zum Handeln.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-bitcoin mb-2">⚡ Polygon Network</h4>
                <p className="text-muted-foreground">
                  $MURAT läuft auf Polygon. Stelle sicher, dass deine Wallet auf das richtige Netzwerk eingestellt ist.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};