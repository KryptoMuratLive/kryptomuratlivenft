import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { character, situation } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // 1. Generate meme text with GPT
    const textPrompt = `Erstelle einen witzigen zweizeiligen Meme-Text über ${character} in folgender Situation: ${situation}. Maximal 100 Zeichen pro Zeile. Format:
Text oben:
Text unten:`;

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

    const gptData = await gptResponse.json();
    const memeText = gptData.choices?.[0]?.message?.content || "Fehler beim Text generieren";

    // 2. Generate meme image with DALL·E
    const imagePrompt = `Cartoon style meme illustration of ${character} in the situation: ${situation}. Funny, colorful, high quality, digital art style`;

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

    const dalleData = await dalleResponse.json();
    const imageUrl = dalleData?.data?.[0]?.url || "";

    return new Response(JSON.stringify({ 
      memeText, 
      memeImage: imageUrl 
    }), {
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