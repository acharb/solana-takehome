import { useState, useCallback } from "react";

import { useWallet } from "#lib/solanaWallet";
import { truncatedAddress } from "#lib/utils";

import { Modal } from "@/components/modal";

import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";

import { WalletLogin } from "@/WalletConnect/ui/login";
import { WalletAssets } from "@/WalletConnect/ui/assets";
import { Drawer } from "@/components/drawer";

import { Adapter, WalletError } from "@solana/wallet-adapter-base";
import clsx from "clsx";

export interface WalletConnectProps {
  variant?: WalletConnectVariant;
  options?: WalletConnectOptions;
  onError?: (err: WalletError) => void;
  className?: string;
}

export interface WalletConnectOptions {
  defaultWallets: Adapter[];
  otherWallets: Adapter[];
}

export enum WalletConnectVariant {
  Drawer = "drawer",
  Dropdown = "dropdown",
}

export const WalletConnect = ({
  options,
  variant = WalletConnectVariant.Dropdown,
  onError,
  className,
}: WalletConnectProps) => {
  const [open, setOpen] = useState(false);

  const { publicKey } = useWallet();

  const handleClick = useCallback(() => {
    if (publicKey && variant === WalletConnectVariant.Dropdown) return;
    setOpen(true);
  }, [setOpen, publicKey, variant]);

  return (
    <div className="">
      <WalletConnectButton
        variant={variant}
        onClick={handleClick}
        className={className}
      />
      <WalletConnectUI
        variant={variant}
        open={open}
        setOpen={setOpen}
        options={options}
        onError={onError}
      />
    </div>
  );
};

const WalletConnectButton = ({
  onClick,
  variant,
  className,
}: {
  onClick: () => void;
  variant?: WalletConnectVariant;
  className?: string;
}) => {
  const { wallet, publicKey } = useWallet();

  const commonClasses = clsx(
    "cursor-pointer rounded-full inline-flex items-center gap-x-2 px-4 py-2.5 text-sm font-medium transition-all duration-200 outline-none",
    publicKey
      ? "bg-slate-900 text-white hover:ring-2 hover:ring-violet-500/50"
      : "bg-violet-600 text-white hover:bg-violet-700",
    className
  );

  const content = (
    <>
      {publicKey ? (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6">
            <img
              src={wallet?.adapter.icon}
              alt={wallet?.adapter.name || "Wallet icon"}
              aria-hidden={!wallet?.adapter.name}
            />
          </div>
          <div className="truncate">
            {truncatedAddress(publicKey.toBase58())}
          </div>
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
      ) : (
        <span>Connect</span>
      )}
    </>
  );

  let walletButton;
  if (variant === WalletConnectVariant.Dropdown) {
    walletButton = (
      <Menu>
        <MenuButton
          className={commonClasses}
          onClick={onClick}
          aria-haspopup="true"
          aria-label={"Connect wallet"}
        >
          {content}
        </MenuButton>
        {publicKey && (
          <MenuItems
            transition
            className="absolute right-0 z-10 m-4 mt-2 lg:w-70 origin-top-right rounded-md bg-slate-900 border border-slate-800 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            anchor="bottom start"
          >
            <WalletAssets publicKey={publicKey} />
          </MenuItems>
        )}
      </Menu>
    );
  } else {
    walletButton = (
      <button
        onClick={onClick}
        className={commonClasses}
        aria-label={publicKey ? "Wallet menu" : "Connect wallet"}
      >
        {content}
      </button>
    );
  }

  return walletButton;
};

const WalletConnectUI = ({
  variant,
  open,
  setOpen,
  options,
  onError,
}: {
  variant?: WalletConnectVariant;
  open: boolean;
  setOpen: (open: boolean) => void;
  options?: WalletConnectOptions;
  onError?: (err: WalletError) => void;
}) => {
  const { publicKey } = useWallet();
  const [isClosing, setIsClosing] = useState(false);

  // slight delay to prevent content flash
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setOpen(false);

    setTimeout(() => {
      setIsClosing(false);
    }, 500);
  }, [setOpen]);

  // if closing, don't show content to prevent content flash
  const content =
    !isClosing && publicKey ? (
      <WalletAssets publicKey={publicKey} handleClose={handleClose} />
    ) : (
      <WalletLogin
        options={options}
        handleClose={handleClose}
        onError={onError}
      />
    );

  let walletUI;
  if (variant === WalletConnectVariant.Dropdown) {
    walletUI = (
      <Modal open={open} setOpen={setOpen}>
        {content}
      </Modal>
    );
  } else {
    walletUI = (
      <Drawer open={open} setOpen={setOpen}>
        {content}
      </Drawer>
    );
  }

  return walletUI;
};
