# How to use

It can be used with all default settings.

```typescript
<WalletConnect />
```

You can also customize which wallets appear in the default and secondary sections, and choose between a modal with dropdown or a drawer-style UX.

```typescript
<WalletConnect
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
```
