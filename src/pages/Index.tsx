import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { LiveStreamSection } from "@/components/live-stream-section";
import { VotingSection } from "@/components/voting-section";
import { NFTGallerySection } from "@/components/nft-gallery-section";
import { StakingSection } from "@/components/staking-section";

const Index = () => {
  return (
    <div className="min-h-screen bg-crypto-dark">
      <Navigation />
      <HeroSection />
      <LiveStreamSection />
      <VotingSection />
      <NFTGallerySection />
      <StakingSection />
      
      {/* Footer */}
      <footer className="bg-crypto-darker border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-bitcoin rounded-full flex items-center justify-center shadow-bitcoin">
                  <span className="text-crypto-dark font-bold text-lg">₿</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">KryptoMurat</h3>
                  <p className="text-xs text-muted-foreground">Live Jagd auf Bitcoin</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Die erste interaktive Web3-Serie, bei der die Community den Verlauf der Geschichte bestimmt.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Live Streaming</li>
                <li>Community Voting</li>
                <li>NFT Collections</li>
                <li>Token Staking</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Discord Server</li>
                <li>Telegram Gruppe</li>
                <li>Twitter Updates</li>
                <li>YouTube Kanal</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Rechtliches</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/legal/impressum" className="hover:text-bitcoin">Impressum</a></li>
                <li><a href="/legal/datenschutz" className="hover:text-bitcoin">Datenschutz</a></li>
                <li><a href="/legal/nutzungsbedingungen" className="hover:text-bitcoin">AGB</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 KryptoMurat Live. Powered by Web3 & Community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
