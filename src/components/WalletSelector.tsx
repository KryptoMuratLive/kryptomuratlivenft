import { useState } from 'react';
import { useConnect, useAccount, useSwitchChain } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, Smartphone, Globe, Mail, AlertTriangle, CheckCircle } from 'lucide-react';
import { connectMagic } from '@/lib/magic';
import { useMuratToken } from '@/hooks/useMuratToken';
import { SUPPORTED_CHAINS, QUICKSWAP_URL, CROSSMINT_URL } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';

interface WalletOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  type: 'wallet' | 'email' | 'mobile';
}

const walletOptions: WalletOption[] = [
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: <Wallet className="w-6 h-6" />,
    description: 'Most popular Ethereum wallet',
    type: 'wallet',
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    icon: <Smartphone className="w-6 h-6" />,
    description: 'Connect any mobile wallet',
    type: 'mobile',
  },
  {
    id: 'injected',
    name: 'Browser Wallet',
    icon: <Globe className="w-6 h-6" />,
    description: 'Rabby, Trust Wallet, or others',
    type: 'wallet',
  },
  {
    id: 'magic',
    name: 'Email Login',
    icon: <Mail className="w-6 h-6" />,
    description: 'Login with email or Google',
    type: 'email',
  },
];

export const WalletSelector = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { switchChain } = useSwitchChain();
  const { hasAccess, isCorrectChain, balance, isLoading, chainId } = useMuratToken();
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);
  const { toast } = useToast();

  const handleWalletConnect = async (walletId: string) => {
    setConnectingWallet(walletId);
    
    try {
      if (walletId === 'magic') {
        const magicAddress = await connectMagic();
        if (magicAddress) {
          toast({
            title: "Connected",
            description: "Successfully connected with Magic",
          });
        }
      } else {
        const connector = connectors.find(c => 
          c.name.toLowerCase().includes(walletId) || 
          (walletId === 'injected' && c.name === 'Injected')
        );
        
        if (connector) {
          connect({ connector });
        } else {
          toast({
            title: "Wallet not found",
            description: `Please install ${walletOptions.find(w => w.id === walletId)?.name}`,
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Connection failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setConnectingWallet(null);
    }
  };

  const handleSwitchToPolygon = () => {
    switchChain({ chainId: SUPPORTED_CHAINS.POLYGON });
  };

  const AccessStatus = () => {
    if (!isConnected) return null;

    return (
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Access Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Wallet Address:</span>
            <Badge variant="outline" className="font-mono text-xs">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Network:</span>
            <Badge variant={isCorrectChain ? "default" : "destructive"}>
              Chain ID: {chainId}
            </Badge>
          </div>

          {!isCorrectChain && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <div className="flex items-center gap-2 text-destructive mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-medium">Wrong Network</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Please switch to Polygon network to check your MURAT balance.
              </p>
              <Button size="sm" onClick={handleSwitchToPolygon} className="w-full">
                Switch to Polygon
              </Button>
            </div>
          )}

          {isCorrectChain && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">MURAT Balance:</span>
                <Badge variant={hasAccess ? "default" : "secondary"}>
                  {isLoading ? "Loading..." : `${parseFloat(balance).toFixed(4)} MURAT`}
                </Badge>
              </div>

              {hasAccess ? (
                <div className="p-3 bg-primary/10 border border-primary/20 rounded-md">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Access Granted</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You have MURAT tokens and can access all premium features!
                  </p>
                </div>
              ) : (
                <div className="p-3 bg-muted/50 border border-border rounded-md">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm font-medium">No Access</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    You need MURAT tokens to access premium features.
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => window.open(QUICKSWAP_URL, '_blank')}
                    >
                      Buy on QuickSwap
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => window.open(CROSSMINT_URL, '_blank')}
                    >
                      Get via Crossmint
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-center">Connect Your Wallet</CardTitle>
          <p className="text-center text-sm text-muted-foreground">
            Choose your preferred way to connect and access MURAT features
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {walletOptions.map((wallet) => (
            <Button
              key={wallet.id}
              variant="outline"
              className="w-full h-auto p-4 justify-start"
              onClick={() => handleWalletConnect(wallet.id)}
              disabled={isPending || connectingWallet === wallet.id}
            >
              <div className="flex items-center gap-3 w-full">
                {wallet.icon}
                <div className="text-left">
                  <div className="font-medium">{wallet.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {wallet.description}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>

      <AccessStatus />

      {!isConnected && (
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <p className="text-center text-sm text-muted-foreground">
              Don't have a wallet? Use <strong>Email Login</strong> to get started instantly,
              or visit <a href={CROSSMINT_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Crossmint</a> to create one.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};