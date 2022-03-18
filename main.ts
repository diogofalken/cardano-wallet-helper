import { wallets } from "./wallets.ts";

type Wallet = {
  addr: string;
  itn_reward: number;
  lovelaces: number;
  pool: string;
  reward: number;
  synched: number;
  tokens: {
    fingerprint: string;
    metadata: unknown;
    minted: number;
    name: string;
    policy: string;
    quantity: number;
  }[];
  utxos: number;
  vote_reward: number;
  withdrawal: number;
};

async function fetchWallet(wallet: string) {
  const walletJson = await fetch(`https://pool.pm/wallet/${wallet}`);
  if (walletJson.status !== 200) {
    return null;
  }
  const jsonWallet: Wallet = await walletJson.json();
  return jsonWallet;
}

function convertAda(price: number) {
  return Math.round(price / 1000000);
}

async function getWallet(addr: string) {
  const wallet = await fetchWallet(addr);

  if (!wallet) {
    return null;
  }

  return wallet;
}

async function main() {
  let totalAda = 0;
  const walletArr: Record<string, string> = wallets;

  for (const key in walletArr as Record<string, string>) {
    if (walletArr.hasOwnProperty(key)) {
      const wallet = await fetchWallet(walletArr[key]);
      const ada = wallet === null ? 0 : convertAda(wallet.lovelaces);

      console.log(`${key} - ${ada}A - ${wallet?.tokens?.length} NFTs`);
      totalAda += ada;
    }
  }
  console.log(totalAda);
}

main();
