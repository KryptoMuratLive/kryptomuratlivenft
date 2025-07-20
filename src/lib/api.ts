// API utilities for webhooks and external integrations

export interface VoteData {
  wallet: string;
  choice: string;
  timestamp: string;
  votingId: string;
}

export const sendVoteWebhook = async (voteData: VoteData) => {
  try {
    const response = await fetch('/api/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(voteData),
    });

    if (!response.ok) {
      throw new Error('Failed to send vote webhook');
    }

    return await response.json();
  } catch (error) {
    console.error('Vote webhook error:', error);
    throw error;
  }
};

export const sendTelegramNotification = async (message: string) => {
  try {
    // Placeholder for Telegram bot integration
    // Will be implemented when bot token is configured
    console.log('Telegram notification:', message);
    
    const response = await fetch('/api/telegram', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    return response.ok;
  } catch (error) {
    console.error('Telegram notification error:', error);
    return false;
  }
};