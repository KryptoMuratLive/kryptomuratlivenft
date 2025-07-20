import { WagmiProvider } from 'wagmi'
import { config } from '@/lib/wagmi'

export function WagmiWrapper({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      {children}
    </WagmiProvider>
  )
}