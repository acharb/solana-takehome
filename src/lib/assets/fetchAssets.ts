import { PublicKey } from "@solana/web3.js";

export interface AssetBalance {
  mint: string;
  symbol: string;
  name: string;
  amount: string;
  decimals: number;
  usdValue: string;
  icon: string;
}

export interface AssetResponse {
  totalUsdValue: string;
  assets: AssetBalance[];
}

// Mock data for demo
export const fetchAssets = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  publicKey: PublicKey
): Promise<AssetResponse> => {
  const mockAssets: AssetResponse = {
    totalUsdValue: "1621.65",
    assets: [
      {
        mint: "So11111111111111111111111111111111111111112",
        symbol: "SOL",
        name: "Solana",
        amount: "5.271132102",
        decimals: 9,
        usdValue: "895.90",
        icon: "/assets/sol.png",
      },
      {
        mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        symbol: "USDC",
        name: "USD Coin",
        amount: "500.0",
        decimals: 6,
        usdValue: "500.0",
        icon: "/assets/usdc.png",
      },
      {
        mint: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
        symbol: "BONK",
        name: "Bonk",
        amount: "1000000",
        decimals: 5,
        usdValue: "225.75",
        icon: "/assets/bonk.png",
      },
    ],
  };

  return mockAssets;
};
