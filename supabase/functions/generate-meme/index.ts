import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { verifyMessage } from "https://esm.sh/ethers@6.11.1";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  console.log('Generate-meme function called with method:', req.method);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling CORS preflight request');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Processing meme generation request...');
    
    const requestBody = await req.json();
    console.log('Request body:', requestBody);
    
    const { character, situation, address, signature, nonce, issuedAt, expirationTime } = requestBody;

    if (!openAIApiKey) {
      console.error('OpenAI API key not configured');
      throw new Error('OpenAI API key not configured');
    }

    if (!character || !situation) {
      console.error('Missing character or situation:', { character, situation });
      throw new Error('Character and situation are required');
    }

    // Wallet signature verification (stateless, no user data stored)
    if (!address || !signature || !nonce || !issuedAt || !expirationTime) {
      console.error('Missing signature fields');
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const now = Date.now();
    const exp = new Date(expirationTime).getTime();
    if (!exp || exp < now) {
      console.error('Expired signature');
      return new Response(JSON.stringify({ error: 'Unauthorized (expired)' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const authMessage = `KryptoMurat Meme Access\nAddress: ${address}\nNonce: ${nonce}\nIssued At: ${issuedAt}\nExpires At: ${expirationTime}`;

    let recoveredAddress = '';
    try {
      recoveredAddress = verifyMessage(authMessage, signature);
    } catch (e) {
      console.error('Signature verification error:', e);
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!recoveredAddress || recoveredAddress.toLowerCase() !== String(address).toLowerCase()) {
      console.error('Signature does not match address');
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Authorized meme generation for ${address}. Character: ${character}, situation: ${situation}`);

    // 1. Generate meme text with GPT
    const textPrompt = `Erstelle einen witzigen zweizeiligen Meme-Text über ${character} in folgender Situation: ${situation}. Maximal 100 Zeichen pro Zeile. Format:
Text oben:
Text unten:`;

    console.log('Calling OpenAI GPT for text generation...');
    const gptResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: textPrompt }],
        temperature: 0.8,
        max_tokens: 150,
      }),
    });

    if (!gptResponse.ok) {
      console.error('GPT API error:', gptResponse.status, gptResponse.statusText);
      const errorText = await gptResponse.text();
      console.error('GPT Error details:', errorText);
      throw new Error(`GPT API error: ${gptResponse.status}`);
    }

    const gptData = await gptResponse.json();
    console.log('GPT response received:', gptData);
    const memeText = gptData.choices?.[0]?.message?.content || "Fehler beim Text generieren";

    // 2. Generate meme image with DALL·E
    const imagePrompt = `Create a high-quality, colorful, digital art style cartoon caricature meme illustration of a person named ${character} in the situation: ${situation}. The image should be funny and whimsical with exaggerated expressions to make it humorous.`;

    console.log('Calling OpenAI DALL-E for image generation...');
    const dalleResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: imagePrompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
      }),
    });

    if (!dalleResponse.ok) {
      console.error('DALL-E API error:', dalleResponse.status, dalleResponse.statusText);
      const errorText = await dalleResponse.text();
      console.error('DALL-E Error details:', errorText);
      throw new Error(`DALL-E API error: ${dalleResponse.status}`);
    }

    const dalleData = await dalleResponse.json();
    console.log('DALL-E response received:', dalleData);
    const imageUrl = dalleData?.data?.[0]?.url || "";

    const result = { 
      memeText, 
      memeImage: imageUrl 
    };
    
    console.log('Meme generation successful:', result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-meme function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Ein Fehler ist aufgetreten'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});