// API route for Telegram notifications
// This would be implemented as a Supabase Edge Function in production

import { sendMessage, sendVoteNotification } from '@/lib/telegram';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, chatId, type, data } = req.body;

    if (!message && !data) {
      return res.status(400).json({ 
        error: 'Missing required field: message or data' 
      });
    }

    // Default chat ID (channel or group)
    const targetChatId = chatId || '@KryptoMurat_Live'; // Replace with your actual channel

    let success = false;

    if (type === 'vote' && data) {
      // Send formatted vote notification
      success = await sendVoteNotification(targetChatId, data);
    } else if (message) {
      // Send simple message
      success = await sendMessage(targetChatId, message);
    }

    if (success) {
      res.status(200).json({
        success: true,
        message: 'Telegram notification sent successfully'
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to send Telegram notification'
      });
    }

  } catch (error) {
    console.error('Telegram API error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}