import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useChainId } from 'wagmi';
import { MURAT_TOKEN_ADDRESS, ERC20_ABI, SUPPORTED_CHAINS } from '@/lib/constants';
import { formatUnits } from 'viem';

export const useMuratToken = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const [hasAccess, setHasAccess] = useState(false);
  const [isCorrectChain, setIsCorrectChain] = useState(false);

  // Check if user is on supported chain
  useEffect(() => {
    const supportedChains = Object.values(SUPPORTED_CHAINS);
    setIsCorrectChain(supportedChains.includes(chainId));
  }, [chainId]);

  // Get MURAT token balance
  const { data: balance, isLoading, refetch } = useReadContract({
    address: MURAT_TOKEN_ADDRESS,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: isConnected && !!address && isCorrectChain,
    },
  });

  // Get token decimals
  const { data: decimals } = useReadContract({
    address: MURAT_TOKEN_ADDRESS,
    abi: ERC20_ABI,
    functionName: 'decimals',
    query: {
      enabled: isCorrectChain,
    },
  });

  // Calculate formatted balance and access
  useEffect(() => {
    if (balance && decimals) {
      const formattedBalance = parseFloat(formatUnits(balance, decimals));
      setHasAccess(formattedBalance > 0);
    } else {
      setHasAccess(false);
    }
  }, [balance, decimals]);

  const formattedBalance = balance && decimals 
    ? formatUnits(balance, decimals)
    : '0';

  return {
    balance: formattedBalance,
    hasAccess,
    isLoading,
    isCorrectChain,
    chainId,
    refetch,
  };
};