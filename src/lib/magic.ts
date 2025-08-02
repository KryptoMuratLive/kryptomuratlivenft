import { Magic } from 'magic-sdk';
import { ConnectExtension } from '@magic-ext/connect';

let magicInstance: Magic | null = null;

export const getMagic = () => {
  if (typeof window === 'undefined') return null;
  
  if (!magicInstance) {
    magicInstance = new Magic('pk_live_your_magic_key', { // Replace with actual Magic publishable key
      extensions: [new ConnectExtension()],
      network: {
        rpcUrl: 'https://polygon-rpc.com',
        chainId: 137,
      },
    });
  }
  
  return magicInstance;
};

export const connectMagic = async () => {
  const magic = getMagic();
  if (!magic) return null;
  
  try {
    await magic.wallet.connectWithUI();
    const isLoggedIn = await magic.user.isLoggedIn();
    if (isLoggedIn) {
      return 'magic_connected';
    }
    return null;
  } catch (error) {
    console.error('Magic connection error:', error);
    return null;
  }
};

export const disconnectMagic = async () => {
  const magic = getMagic();
  if (!magic) return;
  
  try {
    await magic.user.logout();
  } catch (error) {
    console.error('Magic disconnect error:', error);
  }
};

export const isMagicConnected = async (): Promise<boolean> => {
  const magic = getMagic();
  if (!magic) return false;
  
  try {
    return await magic.user.isLoggedIn();
  } catch (error) {
    console.error('Magic connection check error:', error);
    return false;
  }
};