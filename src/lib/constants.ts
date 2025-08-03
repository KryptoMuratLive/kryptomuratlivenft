// Contract addresses and constants
export const MURAT_TOKEN_ADDRESS = "0xF6A10e806d38b0c12E022a5f7A8b161937760A51" as const;

export const SUPPORTED_CHAINS = {
  POLYGON: 137,
  POLYGON_MUMBAI: 80001,
  ETHEREUM: 1,
} as const;

export const QUICKSWAP_URL = "https://dapp.quickswap.exchange/swap/best/ETH/0xF6A10e806d38b0c12E022a5f7A8b161937760A51";
export const CROSSMINT_URL = "https://www.crossmint.com/";

export const ERC20_ABI = [
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "owner", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "decimals",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint8" }],
  },
] as const;