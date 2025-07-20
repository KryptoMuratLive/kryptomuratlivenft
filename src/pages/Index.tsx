import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { LiveStreamSection } from "@/components/live-stream-section";
import { VotingSection } from "@/components/voting-section";
import { Footer } from "@/components/Footer";
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
      <Footer />
    </div>
  );
};

export default Index;
