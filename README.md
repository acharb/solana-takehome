See live preview:

# Running

## Run local dev

```
npm i
npm run dev
```

## Run storyboard

```
npm run storybook
```

# Design Decisions

## WalletConnect component

I built a customizable WalletConnect component, a common need across Solana dApps.

It supports two key customizations:

### 1. Default wallet prioritization

Devs can highlight preferred wallets as "default"—useful when a product wants to promote or deprioritize certain wallets.

### 2. Flexible UI Variants

The component supports two common UX patterns:

1. Modal + dropdown when logged in
2. A drawer

This allows developers to easily switch between connection flows via a simple API, depending on their app’s design needs.

Right now there's just 2 variants, but it can easily be extended to more.

## Style / Animation Library Choice

I used Tailwind and Headless UI for styling and basic animations. Tailwind is the go-to for modern UIs, and Headless UI offers simple transitions. For production, I’d consider custom CSS or Framer Motion for finer animation control.

## Theming

The component uses a dark theme with Solana colors, but styling is easily customizable as well.

## Future improvements

Make default wallet selection clearer—using Adapter classes can be unintuitive. A predefined list of selectable wallets would improve usability.
