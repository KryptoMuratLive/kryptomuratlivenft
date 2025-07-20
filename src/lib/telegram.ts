// Telegram Bot API integration

const BOT_TOKEN = "7862770623:AAEmy3TgM_EK-RnSo1nYIg0H78JPJOvNjS0";
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

export interface TelegramMessage {
  chat_id: string | number;
  text: string;
  parse_mode?: 'HTML' | 'Markdown';
}

export const sendMessage = async (chatId: string | number, text: string): Promise<boolean> => {
  try {
    const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Telegram API error:', errorData);
      throw new Error(`Telegram API error: ${errorData.description}`);
    }

    return true;
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    return false;
  }
};

export const sendVoteNotification = async (chatId: string | number, voteData: {
  wallet: string;
  choice: string;
  timestamp: string;
}): Promise<boolean> => {
  const message = `
🗳️ <b>Neue Abstimmung!</b>

👤 Wallet: <code>${voteData.wallet.slice(0, 6)}...${voteData.wallet.slice(-4)}</code>
✅ Wahl: <b>${voteData.choice}</b>
🕐 Zeit: ${new Date(voteData.timestamp).toLocaleString('de-DE')}

#KryptoMurat #LiveVoting
  `.trim();

  return await sendMessage(chatId, message);
};

export const sendStreamNotification = async (chatId: string | number, streamData: {
  title: string;
  viewerCount: number;
  isLive: boolean;
}): Promise<boolean> => {
  const message = `
🔴 <b>Live Stream Update!</b>

📺 ${streamData.title}
👥 ${streamData.viewerCount} Zuschauer
${streamData.isLive ? '🟢 LIVE' : '🔴 OFFLINE'}

Jetzt einschalten: /livestream

#KryptoMurat #LiveStream
  `.trim();

  return await sendMessage(chatId, message);
};

export const sendNFTMintNotification = async (chatId: string | number, mintData: {
  wallet: string;
  tokenId: string;
  transactionHash: string;
}): Promise<boolean> => {
  const message = `
💎 <b>Neues NFT geminted!</b>

👤 Wallet: <code>${mintData.wallet.slice(0, 6)}...${mintData.wallet.slice(-4)}</code>
🎫 Token ID: #${mintData.tokenId}
🔗 TX: <code>${mintData.transactionHash.slice(0, 10)}...</code>

#KryptoMurat #NFT #Mint
  `.trim();

  return await sendMessage(chatId, message);
};