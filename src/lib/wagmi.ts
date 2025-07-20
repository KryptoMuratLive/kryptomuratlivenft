import { createConfig, http } from 'wagmi'
import { polygon, polygonMumbai } from 'wagmi/chains'
import { walletConnect, metaMask } from 'wagmi/connectors'

const walletConnectProjectId = '4d6552f8a5d85b900455fb644bab328e'

export const config = createConfig({
  chains: [polygon, polygonMumbai],
  connectors: [
    walletConnect({ projectId: walletConnectProjectId }),
    metaMask(),
  ],
  transports: {
    [polygon.id]: http(),
    [polygonMumbai.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}