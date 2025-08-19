import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WagmiWrapper } from './components/WagmiProvider';
import { LiveProvider } from './contexts/LiveContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Index from "./pages/Index";
import LiveStream from "./pages/LiveStream";
import Voting from "./pages/Voting";
import Staking from "./pages/Staking";
import Mint from "./pages/Mint";
import Gallery from "./pages/Gallery";
import Organizer from "./pages/Organizer";
import Login from "./pages/Login";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import Barrierefreiheit from "./pages/Barrierefreiheit";
import Whitepaper from "./pages/Whitepaper";
import AdminPanel from "./pages/AdminPanel";
import MemeGenerator from "./pages/MemeGenerator";
import MemeBattle from "./pages/MemeBattle";
import MemeGallery from "./pages/MemeGallery";
import BattlePage from "./pages/BattlePage";
import Game from "./pages/Game";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <WagmiWrapper>
      <LanguageProvider>
        <LiveProvider>
          <TooltipProvider>
            <BrowserRouter>
              <Toaster />
              <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/livestream" element={<LiveStream />} />
              <Route path="/voting" element={<Voting />} />
              <Route path="/staking" element={<Staking />} />
              <Route path="/mint" element={<Mint />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/organizer" element={<Organizer />} />
              <Route path="/login" element={<Login />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/datenschutz" element={<Datenschutz />} />
              <Route path="/barrierefreiheit" element={<Barrierefreiheit />} />
              <Route path="/whitepaper" element={<Whitepaper />} />
              <Route path="/admin-panel" element={<AdminPanel />} />
              <Route path="/memes" element={<MemeGenerator />} />
              <Route path="/meme-battle" element={<MemeBattle />} />
              <Route path="/meme-gallery" element={<MemeGallery />} />
              <Route path="/game" element={<Game />} />
              <Route path="/battle" element={<BattlePage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LiveProvider>
    </LanguageProvider>
  </WagmiWrapper>
</QueryClientProvider>
);

export default App;
