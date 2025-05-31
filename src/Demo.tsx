import { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletConnect } from "@/WalletConnect";
import { useAlert } from "@/context/AlertContext";
import { WalletConnectVariant } from "@/WalletConnect";

import * as WalletOptions from "@solana/wallet-adapter-wallets";

export const Demo = () => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const { showAlert } = useAlert();

  const wallets = useMemo(
    () => [new UnsafeBurnerWalletAdapter()],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider
        wallets={wallets}
        autoConnect
        onError={(error, adapter) => {
          console.error({ error, adapter });
          showAlert(`Failed to connect wallet. ${error.message}`);
        }}
      >
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col">
          <div className="w-full lg:w-4xl mx-auto relative flex-grow">
            <div className="absolute top-4 right-4">
              <div className="relative">
                <WalletConnect
                  className="rounded-lg"
                  variant={WalletConnectVariant.Drawer}
                  options={{
                    defaultWallets: [
                      new WalletOptions.PhantomWalletAdapter(),
                      new WalletOptions.SolflareWalletAdapter(),
                    ],
                    otherWallets: [
                      new WalletOptions.CoinbaseWalletAdapter(),
                      new WalletOptions.AvanaWalletAdapter(),
                    ],
                  }}
                  onError={(err: WalletError) => {
                    console.error(err);
                    showAlert(err.message);
                  }}
                />
                <div className="absolute hidden md:block top-[10px] left-[-240px] w-[220px]">
                  <img src="/images/arrow2.png" alt="Arrow" />
                </div>
              </div>
            </div>

            <div className="mx-auto px-4 py-16">
              <div className="text-5xl mt-24 font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-purple-400 to-purple-500">
                Solana Wallet Connect
              </div>
              <div className="mt-2 text-center text-sm text-gray-400">
                (A demo on devnet only)
              </div>
            </div>
            <div className="mt-12 flex justify-center items-center">
              <div className="relative">
                <WalletConnect
                  options={{
                    defaultWallets: [
                      new WalletOptions.PhantomWalletAdapter(),
                      new WalletOptions.SolflareWalletAdapter(),
                    ],
                    otherWallets: [
                      new WalletOptions.CoinbaseWalletAdapter(),
                      new WalletOptions.AvanaWalletAdapter(),
                    ],
                  }}
                  onError={(err: WalletError) => {
                    console.error(err);
                    showAlert(err.message);
                  }}
                />
                <div className="absolute hidden md:block top-0 left-[-260px] w-[240px]">
                  <img src="/images/arrow1.png" alt="Arrow" />
                </div>
              </div>
            </div>
          </div>
          <footer className="text-center py-8 text-gray-400 text-base">
            Built with love by{" "}
            <a
              href="https://www.linkedin.com/in/aleccharbonneau"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Alec
            </a>
          </footer>
        </div>
      </WalletProvider>
    </ConnectionProvider>
  );
};
