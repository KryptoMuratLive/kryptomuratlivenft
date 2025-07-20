import { supabase } from '@/integrations/supabase/client'

export interface NFTOwnership {
  hasNFT: boolean;
  nftCount: number;
  nftTokenIds: string[];
  contractAddress: string;
}

// Default KryptoMurat NFT contract address (placeholder)
const DEFAULT_NFT_CONTRACT = "0x123456789abcdef123456789abcdef1234567890" as `0x${string}`

export const checkNFTOwnership = async (
  walletAddress: string, 
  contractAddress?: string,
  chain: string = 'polygon'
): Promise<NFTOwnership> => {
  if (!walletAddress) {
    return {
      hasNFT: false,
      nftCount: 0,
      nftTokenIds: [],
      contractAddress: contractAddress || ''
    };
  }

  try {
    // Call our edge function to check NFT ownership via Moralis
    const { data, error } = await supabase.functions.invoke('check-nft-ownership', {
      body: { 
        walletAddress, 
        contractAddress,
        chain 
      }
    });

    if (error) {
      throw new Error(error.message);
    }

    return {
      hasNFT: data.hasNFT,
      nftCount: data.nftCount,
      nftTokenIds: data.nftTokenIds,
      contractAddress: data.contractAddress
    };
  } catch (error) {
    console.error("Error checking NFT ownership:", error);
    
    // Fallback to mock for demo purposes
    const mockOwnership: NFTOwnership = {
      hasNFT: Math.random() > 0.3, // 70% chance for demo
      nftCount: Math.floor(Math.random() * 3) + 1,
      nftTokenIds: ["001", "045", "122"],
      contractAddress: contractAddress || ''
    };
    
    return mockOwnership;
  }
};

// Check if wallet owns specific NFT tier
export const checkNFTTier = async (
  walletAddress: string,
  requiredTier: "common" | "rare" | "epic" | "legendary" = "common"
): Promise<boolean> => {
  try {
    const ownership = await checkNFTOwnership(walletAddress);
    
    // Mock tier checking logic
    // In real implementation, this would check NFT metadata
    return ownership.hasNFT;
  } catch (error) {
    console.error("Error checking NFT tier:", error);
    return false;
  }
};

// Get user's NFT collection
export const getUserNFTCollection = async (walletAddress: string) => {
  try {
    const ownership = await checkNFTOwnership(walletAddress);
    
    if (!ownership.hasNFT) {
      return [];
    }
    
    // Mock NFT metadata - replace with actual metadata fetching
    return ownership.nftTokenIds.map(tokenId => ({
      tokenId,
      name: `KryptoMurat NFT #${tokenId}`,
      image: `/placeholder.svg`,
      rarity: Math.random() > 0.8 ? "rare" : "common",
      episode: `Episode ${Math.floor(Math.random() * 3) + 1}`,
      attributes: [
        { trait_type: "Character", value: "Murat" },
        { trait_type: "Season", value: "1" },
        { trait_type: "Type", value: "Story NFT" }
      ]
    }));
  } catch (error) {
    console.error("Error fetching NFT collection:", error);
    return [];
  }
};

// Validate NFT access for specific features
export const validateNFTAccess = async (
  walletAddress: string,
  feature: "livestream" | "voting" | "premium" | "exclusive"
): Promise<boolean> => {
  const ownership = await checkNFTOwnership(walletAddress);
  
  // Define access requirements for different features
  const accessRequirements = {
    livestream: 1, // Need at least 1 NFT
    voting: 1,     // Need at least 1 NFT
    premium: 2,    // Need at least 2 NFTs
    exclusive: 3   // Need at least 3 NFTs
  };
  
  return ownership.nftCount >= accessRequirements[feature];
};