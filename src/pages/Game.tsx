import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gamepad2, Users, Trophy, Coins } from "lucide-react";

const Game = () => {
  return (
    <div className="min-h-screen bg-crypto-dark">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            🏃‍♂️ Chase for Crypto
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Das ultimative Krypto-Verfolgungsspiel! Sammle Coins, weiche Hindernissen aus und erreiche das nächste Level.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Gamepad2 className="h-6 w-6 text-primary" />
                <CardTitle>Spiel Features</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Endloses Gameplay</li>
                <li>• Coin-Sammeln System</li>
                <li>• Power-ups & Boosts</li>
                <li>• Verschiedene Charaktere</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-primary" />
                <CardTitle>Multiplayer</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Globale Bestenlisten</li>
                <li>• Tägliche Challenges</li>
                <li>• Freunde herausfordern</li>
                <li>• Turniere & Events</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Trophy className="h-6 w-6 text-primary" />
                <CardTitle>Belohnungen</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• MURAT Token verdienen</li>
                <li>• Exklusive NFTs</li>
                <li>• Achievements freischalten</li>
                <li>• Seltene Sammlerstücke</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-8">
              <Coins className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Spiel startet bald!
              </h3>
              <p className="text-muted-foreground mb-6">
                Das neue Chase for Crypto Spiel wird gerade integriert. Bleib dran für das ultimative Gaming-Erlebnis!
              </p>
              <Button size="lg" className="mr-4">
                Benachrichtigen wenn bereit
              </Button>
              <Button variant="outline" size="lg">
                Mehr erfahren
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Game;