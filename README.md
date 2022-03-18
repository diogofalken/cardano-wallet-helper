# Cardano-Wallet-Helper

You have to install `deno`, if you are macos user you can:

```bash
brew install deno
```

Create a `wallets.ts` file on root with the following structure:

```typescript
export const wallets = {
  main: "addr1",
  nami: "addr1",
}
```

To run the app you just have to:

```bash
deno run --allow-net main.ts
```