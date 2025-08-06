import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { NFTGameSection } from "@/components/nft-game-section";
import { LiveStreamSection } from "@/components/live-stream-section";
import { VotingSection } from "@/components/voting-section";
import { Footer } from "@/components/Footer";
import { NFTGallerySection } from "@/components/nft-gallery-section";
import { CommunityHubSection } from "@/components/community-hub-section";
import { TokenPurchaseSection } from "@/components/token-purchase-section";

const Index = () => {
  return (
    <div className="min-h-screen bg-crypto-dark">
      <Navigation />
      <HeroSection />
      <LiveStreamSection />
      <NFTGameSection />
      <CommunityHubSection />
      <Footer />
    </div>
  );
};

export default Index;