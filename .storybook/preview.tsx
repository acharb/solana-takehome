import "../src/index.css";

import React from "react";

// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.
import type { Preview } from "@storybook/react-vite";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

const network = WalletAdapterNetwork.Devnet;
const endpoint = clusterApiUrl(network);

const preview: Preview = {
  decorators: [
    (Story) => (
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={[]}>
          <Story />
        </WalletProvider>
      </ConnectionProvider>
    ),
  ],
};

export default preview;
