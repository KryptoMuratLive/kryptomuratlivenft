import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@/hooks/useWallet";
import { useMuratToken } from "@/hooks/useMuratToken";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface TokenGateProps {
  children: React.ReactNode;
  minBalance?: number;
}

export default function TokenGate({ children, minBalance = 10 }: TokenGateProps) {
  const [hasAccess, setHasAccess] = useState(false);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();
  const { isConnected, connectWallet } = useWallet();
  const { balance, hasAccess: tokenAccess, isLoading, isCorrectChain } = useMuratToken();

  useEffect(() => {
    if (!isConnected) {
      setChecking(false);
      setHasAccess(false);
      return;
    }

    if (!isCorrectChain) {
      setChecking(false);
      setHasAccess(false);
      return;
    }

    if (!isLoading) {
      const balanceNum = parseFloat(balance);
      const hasMinBalance = balanceNum >= minBalance;
      setHasAccess(hasMinBalance);
      setChecking(false);
      
      if (!hasMinBalance) {
        navigate("/no-access");
      }
    }
  }, [isConnected, isCorrectChain, isLoading, balance, minBalance, navigate]);

  if (checking || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Token-Berechtigung wird geprüft…</h2>
            <p className="text-muted-foreground">Bitte warten Sie einen Moment.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">🔐 Wallet erforderlich</h2>
            <p className="text-muted-foreground mb-6">
              Bitte verbinden Sie Ihre Wallet, um auf diesen Bereich zuzugreifen.
            </p>
            <Button onClick={connectWallet} className="w-full">
              Wallet verbinden
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isCorrectChain) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">⚠️ Falsches Netzwerk</h2>
            <p className="text-muted-foreground mb-6">
              Bitte wechseln Sie zum Polygon-Netzwerk, um fortzufahren.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return hasAccess ? <>{children}</> : null;
}