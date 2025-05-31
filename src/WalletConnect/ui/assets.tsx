import { useEffect, useState } from "react";

import { useWallet } from "@solana/wallet-adapter-react";

import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/20/solid";
import { CopyIconButton } from "@/components/clipboard";

import { truncatedAddress } from "#lib/utils";
import {
  AssetResponse,
  fetchAssets,
  AssetBalance,
} from "#lib/assets/fetchAssets";
import { Loader } from "@/components/loader";
import { PublicKey } from "@solana/web3.js";

export const WalletAssets = ({
  publicKey,
  handleClose,
}: {
  publicKey: PublicKey;
  handleClose?: () => void;
}) => {
  const { disconnect, wallet } = useWallet();
  const [isFetching, setIsFetching] = useState(false);
  const [assets, setAssets] = useState<AssetBalance[]>([]);
  const [balance, setBalance] = useState<string>("");

  useEffect(() => {
    if (!publicKey) return;

    const loadAssets = async () => {
      setIsFetching(true);
      const resp: AssetResponse = await fetchAssets(publicKey);
      setAssets(resp.assets);
      setBalance(resp.totalUsdValue);
      setIsFetching(false);
    };

    loadAssets();
  }, [publicKey]);

  return (
    <div className="flex flex-col text-white p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="w-8 h-8">
          <img
            src={wallet?.adapter.icon}
            alt={wallet?.adapter.name}
            className="w-full h-full"
          />
        </div>
        <button
          onClick={() => {
            disconnect();
            handleClose?.();
          }}
          className="cursor-pointer flex items-center gap-2 text-slate-400 hover:text-violet-400 transition-colors"
        >
          <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <CopyIconButton text={publicKey.toBase58()}>
          {truncatedAddress(publicKey.toBase58())}
        </CopyIconButton>
      </div>

      <div className="mb-4">
        <div className="text-3xl font-bold text-white">
          ${Number(balance).toLocaleString()}
        </div>
      </div>

      <div className="h-px bg-slate-700/30 mb-4" />

      <div className="space-y-3">
        {isFetching ? (
          <div className="flex justify-center py-4">
            <Loader />
          </div>
        ) : (
          assets.map((asset) => (
            <a
              key={asset.symbol}
              className="flex items-center p-2 justify-between rounded-lg hover:bg-slate-800/50 transition-colors"
              href={`https://solscan.io/token/${asset.mint}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8">
                  <img
                    src={asset.icon}
                    alt={asset.symbol}
                    className="w-full h-full"
                  />
                </div>
                <div>
                  <div className="font-medium">{asset.symbol}</div>
                  <div className="text-sm text-slate-400">
                    {asset.amount} {asset.symbol}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-400">
                  ${asset.usdValue.toLocaleString()}
                </div>
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
};
