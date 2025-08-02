import { createConfig, http } from 'wagmi'
import { polygon, polygonMumbai, mainnet } from 'wagmi/chains'
import { metaMask, injected, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [polygon, polygonMumbai, mainnet],
  connectors: [
    metaMask(),
    injected(),
    walletConnect({
      projectId: 'your-walletconnect-project-id', // Replace with actual project ID
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