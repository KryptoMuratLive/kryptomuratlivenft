import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { WalletSelector } from '@/components/WalletSelector';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/Footer';

const Login = () => {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  // Redirect authenticated users to home
  useEffect(() => {
    if (isConnected) {
      navigate('/');
    }
  }, [isConnected, navigate]);

  return (
    <div className="min-h-screen bg-crypto-dark">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-crypto-primary mb-2">
              Join KryptoMurat Live
            </h1>
            <p className="text-crypto-text/80">
              Connect your wallet to access exclusive content and features
            </p>
          </div>
          
          <WalletSelector />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;