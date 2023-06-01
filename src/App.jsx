import '@rainbow-me/rainbowkit/styles.css';
import React, { useState } from "react"
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { ConnectButton } from '@rainbow-me/rainbowkit';

// import PhaserGame from './pages/Game';
import Game2 from './pages/Game2';

const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

function App() {
  const [count, setCount] = useState(0);

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <ConnectButton />
        <Game2 count={count} setCount={setCount} />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App;
