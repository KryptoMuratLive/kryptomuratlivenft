// Telegram Bot API integration via Supabase Edge Function
import { supabase } from "@/integrations/supabase/client";

export interface TelegramMessage {
  chat_id: string | number;
  text: string;
  parse_mode?: 'HTML' | 'Markdown';
}

export const sendMessage = async (chatId: string | number, text: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase.functions.invoke('telegram', {
      body: { chatId, message: text }
    });

    if (error) {
      console.error('Telegram edge function error:', error);
      return false;
    }

    return Boolean(data?.success);
  } catch (err) {
    console.error('Error invoking telegram function:', err);
    return false;
  }
};

export const sendVoteNotification = async (chatId: string | number, voteData: {
  wallet: string;
  choice: string;
  timestamp: string;
}): Promise<boolean> => {
  try {
    const { data, error } = await supabase.functions.invoke('telegram', {
      body: { chatId, type: 'vote', data: voteData }
    });

    if (error) {
      console.error('Telegram edge function error (vote):', error);
      return false;
    }

    return Boolean(data?.success);
  } catch (err) {
    console.error('Error invoking telegram function (vote):', err);
    return false;
  }
};

export const sendStreamNotification = async (chatId: string | number, streamData: {
  title: string;
  viewerCount: number;
  isLive: boolean;
}): Promise<boolean> => {
  try {
    const { data, error } = await supabase.functions.invoke('telegram', {
      body: { chatId, type: 'stream', data: streamData }
    });

    if (error) {
      console.error('Telegram edge function error (stream):', error);
      return false;
    }

    return Boolean(data?.success);
  } catch (err) {
    console.error('Error invoking telegram function (stream):', err);
    return false;
  }
};

export const sendNFTMintNotification = async (chatId: string | number, mintData: {
  wallet: string;
  tokenId: string;
  transactionHash: string;
}): Promise<boolean> => {
  try {
    const { data, error } = await supabase.functions.invoke('telegram', {
      body: { chatId, type: 'mint', data: mintData }
    });

    if (error) {
      console.error('Telegram edge function error (mint):', error);
      return false;
    }

    return Boolean(data?.success);
  } catch (err) {
    console.error('Error invoking telegram function (mint):', err);
    return false;
  }
};
