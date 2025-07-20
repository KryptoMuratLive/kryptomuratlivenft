export const EVENT_NFT_CONTRACT = {
  address: '0x...' as const, // Replace with actual deployed contract address
  abi: [
    {
      "inputs": [
        { "name": "to", "type": "address" },
        { "name": "title", "type": "string" },
        { "name": "startTime", "type": "string" },
        { "name": "eventType", "type": "string" },
        { "name": "organizer", "type": "address" },
        { "name": "ipfsHash", "type": "string" }
      ],
      "name": "mintEventNFT",
      "outputs": [{ "name": "tokenId", "type": "uint256" }],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{ "name": "tokenId", "type": "uint256" }],
      "name": "tokenURI",
      "outputs": [{ "name": "", "type": "string" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "nextTokenId",
      "outputs": [{ "name": "", "type": "uint256" }],
      "stateMutability": "view",
      "type": "function"
    }
  ] as const,
} as const;

export const ORGANIZER_ADDRESS = '0x1234567890123456789012345678901234567890' as const;