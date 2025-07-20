import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useToast } from '@/hooks/use-toast'

export const useWallet = () => {
  const { address, isConnected, isConnecting } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { toast } = useToast()

  const connectWallet = async () => {
    try {
      const connector = connectors.find(c => c.name === 'MetaMask') || connectors[0]
      connect({ connector })
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Failed to connect wallet",
        variant: "destructive",
      })
    }
  }

  const disconnectWallet = () => {
    disconnect()
    toast({
      title: "Disconnected",
      description: "Wallet disconnected successfully",
    })
  }

  return {
    address,
    isConnected,
    isConnecting,
    connectWallet,
    disconnectWallet,
  }
}