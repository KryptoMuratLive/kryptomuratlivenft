import { translateWithAI } from '@/lib/translation';

interface TranslateRequest {
  text: string;
  from: string;
  to: string;
}

interface TranslateResponse {
  translation: string;
  confidence: number;
}

export default async function handler(
  req: Request
): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const body = await req.json();
    const { text, from, to } = body;

    if (!text || !from || !to) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const translation = await translateWithAI(text, from, to);

    return new Response(JSON.stringify({ 
      translation,
      confidence: 0.95 // Mock confidence score
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Translation API error:', error);
    return new Response(JSON.stringify({ error: 'Translation failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}