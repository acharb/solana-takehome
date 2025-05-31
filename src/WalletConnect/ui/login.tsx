import { useState, useMemo } from "react";

import { useWallet, type Wallet } from "@solana/wallet-adapter-react";
import {
  Adapter,
  WalletError,
  WalletReadyState,
} from "@solana/wallet-adapter-base";

import { ChevronDownIcon } from "@heroicons/react/20/solid";

import { WalletConnectOptions } from "@/WalletConnect";

export const WalletLogin = ({
  options,
  handleClose,
  onError,
}: {
  options?: WalletConnectOptions;
  handleClose: () => void;
  onError?: (err: WalletError) => void;
}) => {
  const [showOtherWallets, setShowOtherWallets] = useState(false);
  const { wallets, select, connecting } = useWallet();
  const { defaultWallets = [], otherWallets = [] } = options || {};

  const isDetectedWallet = (wallet: Adapter) => {
    return wallet.readyState === WalletReadyState.Installed;
  };

  // Includes detected wallets not found in options.
  // A bit confusing here, comparing Wallet type from solana SDK to Adapter.
  // A production ready app might create an easier way for users to select wallets instead of choosing adapters.
  const allOtherWallets = useMemo(() => {
    const newDetectedWallets = wallets
      .filter((wallet: Wallet) => {
        return ![...defaultWallets, ...otherWallets].some(
          (adapter: Adapter) => adapter.name === wallet.adapter.name
        );
      })
      .map((wallet: Wallet) => wallet.adapter);

    return [...otherWallets, ...newDetectedWallets];
  }, [wallets, defaultWallets, otherWallets]);

  const handleSelect = async (wallet: Adapter) => {
    // Check if the wallet is installed
    if (
      wallet.readyState !== WalletReadyState.Installed &&
      wallet.readyState !== WalletReadyState.Loadable
    ) {
      if (onError) {
        onError(
          new WalletError(
            `Wallet not installed: ${wallet.name}`,
            `Wallet not installed: ${wallet.name}`
          )
        );
      } else {
        console.error(`Wallet not installed: ${wallet.name}`);
      }

      handleClose();
      return;
    }

    select(wallet.name);
    handleClose();
  };

  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-purple-400 to-purple-500">
          Solana
        </h2>
        <p className="mt-2 text-slate-400">Connect</p>
      </div>

      <div className="space-y-3">
        {defaultWallets.map((wallet: Adapter) => (
          <button
            key={wallet.name}
            className="w-full cursor-pointer flex items-center justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors group"
            onClick={() => handleSelect(wallet)}
            disabled={connecting}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-900/50 p-2">
                <img
                  src={wallet.icon}
                  alt={wallet.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-medium text-white group-hover:text-violet-400 transition-colors">
                {wallet.name}
              </span>
            </div>
            {isDetectedWallet(wallet) && (
              <div className="flex items-center gap-1.5 px-2 py-1 text-emerald-500">
                <span className="text-xs font-medium">Detected</span>
              </div>
            )}
          </button>
        ))}

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-slate-700/30 mt-1"></div>
          </div>
          <div className="relative flex justify-center">
            <button
              onClick={() => setShowOtherWallets(!showOtherWallets)}
              className="cursor-pointer px-4 py-2 bg-slate-900 rounded-lg text-slate-400 hover:text-violet-400 transition-colors flex items-center gap-2"
            >
              <span>Other wallets</span>
              <ChevronDownIcon
                className={`h-5 w-5 transition-transform duration-300 ${
                  showOtherWallets ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>

        <div
          className={`grid transition-all duration-300 ease-in-out ${
            showOtherWallets
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="space-y-3">
              {allOtherWallets.map((wallet: Adapter) => (
                <button
                  key={wallet.name}
                  className="w-full cursor-pointer flex items-center justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors group"
                  onClick={() => handleSelect(wallet)}
                  disabled={connecting}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-900/50 p-2">
                      <img
                        src={wallet.icon}
                        alt={wallet.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="font-medium text-white group-hover:text-violet-400 transition-colors">
                      {wallet.name}
                    </span>
                  </div>
                  {isDetectedWallet(wallet) && (
                    <div className="flex items-center gap-1.5 px-2 py-1 text-emerald-500">
                      <span className="text-xs font-medium">Detected</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
