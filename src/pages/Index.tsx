import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { LiveStreamSection } from "@/components/live-stream-section";
import { Footer } from "@/components/Footer";
import { CommunityHubSection } from "@/components/community-hub-section";
import { TokenPurchaseSection } from "@/components/token-purchase-section";

const Index = () => {
  return (
    <div className="min-h-screen bg-crypto-dark">
      <Navigation />
      <HeroSection />
      <LiveStreamSection />
      <div id="buy-token">
        <TokenPurchaseSection />
      </div>
      <CommunityHubSection />
      <Footer />
    </div>
  );
};

export default Index;