import Moralis from 'moralis';

let moralisInitialized = false;

export const initializeMoralis = async (apiKey: string) => {
  if (!moralisInitialized) {
    await Moralis.start({
      apiKey: apiKey,
    });
    moralisInitialized = true;
  }
};

export const getMoralis = () => {
  if (!moralisInitialized) {
    throw new Error('Moralis not initialized. Call initializeMoralis first.');
  }
  return Moralis;
};

// Helper functions for common Web3 operations
export const getTokenBalance = async (address: string, tokenAddress: string, chain: string = 'polygon') => {
  const moralis = getMoralis();
  
  const response = await moralis.EvmApi.token.getWalletTokenBalances({
    address,
    chain,
    tokenAddresses: [tokenAddress],
  });
  
  return response.toJSON();
};

export const getNFTsByWallet = async (address: string, chain: string = 'polygon') => {
  const moralis = getMoralis();
  
  const response = await moralis.EvmApi.nft.getWalletNFTs({
    address,
    chain,
    format: 'decimal',
    limit: 100,
  });
  
  return response.toJSON();
};

export const getTokenPrice = async (tokenAddress: string, chain: string = 'polygon') => {
  const moralis = getMoralis();
  
  const response = await moralis.EvmApi.token.getTokenPrice({
    address: tokenAddress,
    chain,
  });
  
  return response.toJSON();
};