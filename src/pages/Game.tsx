import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gamepad2, Zap, Trophy } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";

const Game = () => {
  const { isConnected, connectWallet } = useWallet();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const answers = [
    { id: 1, text: "🐶 Doge", emoji: "🐶" },
    { id: 2, text: "🦊 ShibaSwap", emoji: "🦊" },
    { id: 3, text: "🐸 Pepe", emoji: "🐸" }
  ];

  const handleAnswerSelect = (answerId: number) => {
    setSelectedAnswer(answerId);
  };

  return (
    <div className="min-h-screen bg-crypto-dark">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <section className="p-6 text-center max-w-2xl mx-auto">
          <div className="mb-8">
            <Gamepad2 className="mx-auto mb-4 text-bitcoin" size={64} />
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              🎮 Jagd auf den Bitcoin
            </h1>
            <p className="mb-6 text-lg text-muted-foreground">
              Starte dein Abenteuer als <strong className="text-bitcoin">Murat</strong> oder{" "}
              <strong className="text-bitcoin">der Jäger</strong>. Löse Meme-Rätsel,
              sichere dir NFTs und beeinflusse die Story mit deiner Wallet.
            </p>
          </div>

          {!isConnected ? (
            <Button 
              onClick={connectWallet}
              className="bg-bitcoin hover:bg-bitcoin/90 text-crypto-dark px-6 py-3 text-lg mb-8"
              size="lg"
            >
              <Zap className="mr-2" size={20} />
              🔓 Wallet verbinden
            </Button>
          ) : (
            <div className="mb-8 p-4 bg-muted rounded-xl">
              <div className="flex items-center justify-center gap-2 text-bitcoin">
                <Trophy size={20} />
                <span className="font-semibold">Wallet verbunden - Spiel bereit!</span>
              </div>
            </div>
          )}

          <Card className="bg-card border-border text-left">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground flex items-center gap-2">
                🧠 Level 1 – Meme-Rätsel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-muted-foreground text-lg">
                Welcher Meme-Hund wurde zuerst weltberühmt?
              </p>
              
              <div className="space-y-3">
                {answers.map((answer) => (
                  <Button
                    key={answer.id}
                    variant={selectedAnswer === answer.id ? "default" : "outline"}
                    className={`w-full py-3 text-left justify-start ${
                      selectedAnswer === answer.id 
                        ? "bg-bitcoin text-crypto-dark" 
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => handleAnswerSelect(answer.id)}
                    disabled={!isConnected}
                  >
                    {answer.text}
                  </Button>
                ))}
              </div>

              {selectedAnswer && isConnected && (
                <div className="mt-6 pt-4 border-t border-border">
                  <Button 
                    className="w-full bg-gradient-primary hover:bg-gradient-primary/90 text-white"
                    size="lg"
                  >
                    Antwort bestätigen
                  </Button>
                </div>
              )}

              {!isConnected && (
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground text-center">
                    Verbinde deine Wallet, um am Spiel teilzunehmen
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Game;