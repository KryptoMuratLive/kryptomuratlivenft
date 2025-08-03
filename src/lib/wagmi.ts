import { createConfig, http } from 'wagmi'
import { polygon, polygonMumbai, mainnet } from 'wagmi/chains'
import { metaMask, injected, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [polygon, polygonMumbai, mainnet],
  connectors: [
    metaMask(),
    injected(),
    walletConnect({
      projectId: '2f5a1a5c8f4d3e2b1a9c8d7e6f5a4b3c', // Temporary project ID
    }),
  ],
  transports: {
    [polygon.id]: http(),
    [polygonMumbai.id]: http(),
    [mainnet.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}