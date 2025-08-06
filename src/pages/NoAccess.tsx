import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ShieldX, Coins } from "lucide-react";
import { Link } from "react-router-dom";
import { QUICKSWAP_URL } from "@/lib/constants";

export default function NoAccess() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
            <ShieldX className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold text-destructive">
            🚫 Kein Zugang
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="space-y-2">
            <p className="text-lg font-medium">
              Sie benötigen mindestens <strong>10 MURAT-Token</strong>
            </p>
            <p className="text-muted-foreground">
              um diesen exklusiven Bereich zu betreten.
            </p>
          </div>

          <div className="bg-secondary/50 rounded-lg p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Coins className="h-5 w-5 text-primary" />
              <span className="font-medium">MURAT Token</span>
            </div>
            <p className="text-sm text-muted-foreground break-all">
              0xF6A10e806d38b0c12E022a5f7A8b161937760A51
            </p>
          </div>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <a href={QUICKSWAP_URL} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Token auf QuickSwap kaufen
              </a>
            </Button>

            <Button variant="outline" asChild className="w-full">
              <a 
                href="https://polygonscan.com/token/0xF6A10e806d38b0c12E022a5f7A8b161937760A51" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Token-Infos auf PolygonScan
              </a>
            </Button>

            <Button variant="ghost" asChild className="w-full">
              <Link to="/">
                Zurück zur Startseite
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}