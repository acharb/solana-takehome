// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.
import type { Meta, StoryObj } from "@storybook/react-vite";

import { WalletConnect, WalletConnectVariant } from "./index";
import { Adapter } from "@solana/wallet-adapter-base";

const meta = {
  component: WalletConnect,
} satisfies Meta<typeof WalletConnect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Modal: Story = {
  args: {
    options: {
      defaultWallets: [
        {
          name: "Phantom",
          icon: "/wallets/phantom.png",
        } as unknown as Adapter,
      ],
      otherWallets: [
        {
          name: "Solflare",
          icon: "https://solflare.com/favicon.ico",
        } as unknown as Adapter,
      ],
    },
    variant: WalletConnectVariant.Dropdown,
  },
};

export const Drawer: Story = {
  args: {
    options: {
      defaultWallets: [
        {
          name: "Phantom",
          icon: "/wallets/phantom.png",
        } as unknown as Adapter,
      ],
      otherWallets: [
        {
          name: "Solflare",
          icon: "https://solflare.com/favicon.ico",
        } as unknown as Adapter,
      ],
    },
    variant: WalletConnectVariant.Drawer,
  },
};
