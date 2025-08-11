import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const token = Deno.env.get('TELEGRAM_BOT_TOKEN');
    if (!token) {
      console.error('Missing TELEGRAM_BOT_TOKEN secret');
      return new Response(JSON.stringify({ success: false, error: 'Server misconfigured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json();
    const { message, chatId, type, data } = body ?? {};

    const targetChatId = chatId || '@KryptoMurat_Live';
    const apiUrl = `https://api.telegram.org/bot${token}/sendMessage`;

    const sendMessage = async (text: string) => {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: targetChatId, text, parse_mode: 'HTML' }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error('Telegram API error:', res.status, err);
        return false;
      }
      return true;
    };

    const formatVote = (voteData: { wallet: string; choice: string; timestamp: string; }) => `
🗳️ <b>Neue Abstimmung!</b>

👤 Wallet: <code>${voteData.wallet.slice(0, 6)}...${voteData.wallet.slice(-4)}</code>
✅ Wahl: <b>${voteData.choice}</b>
🕐 Zeit: ${new Date(voteData.timestamp).toLocaleString('de-DE')}

#KryptoMurat #LiveVoting`.trim();

    const formatStream = (streamData: { title: string; viewerCount: number; isLive: boolean; }) => `
🔴 <b>Live Stream Update!</b>

📺 ${streamData.title}
👥 ${streamData.viewerCount} Zuschauer
${streamData.isLive ? '🟢 LIVE' : '🔴 OFFLINE'}

Jetzt einschalten: /livestream

#KryptoMurat #LiveStream`.trim();

    const formatMint = (mintData: { wallet: string; tokenId: string; transactionHash: string; }) => `
💎 <b>Neues NFT geminted!</b>

👤 Wallet: <code>${mintData.wallet.slice(0, 6)}...${mintData.wallet.slice(-4)}</code>
🎫 Token ID: #${mintData.tokenId}
🔗 TX: <code>${mintData.transactionHash.slice(0, 10)}...</code>

#KryptoMurat #NFT #Mint`.trim();

    let success = false;

    if (type === 'vote' && data) {
      success = await sendMessage(formatVote(data));
    } else if (type === 'stream' && data) {
      success = await sendMessage(formatStream(data));
    } else if (type === 'mint' && data) {
      success = await sendMessage(formatMint(data));
    } else if (typeof message === 'string' && message.length > 0) {
      success = await sendMessage(message);
    } else {
      return new Response(JSON.stringify({ success: false, error: 'Invalid request' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in telegram function:', error);
    return new Response(JSON.stringify({ success: false, error: error.message || 'Internal error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});