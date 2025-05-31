import { fn } from "storybook/test";
import { PublicKey } from "@solana/web3.js";

export * from "./solanaWallet";

export const useWallet = fn(() => {
  return {
    publicKey: new PublicKey("6cPRnMsNznqHrG3JNPd5yKnyCjNqwLQV6FWc8iqcZc4T"),
    wallet: { adapter: { name: "Testing" } },
  };
}).mockName("useWallet");
