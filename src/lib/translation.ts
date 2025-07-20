// AI Translation Service - OpenAI GPT-4 based translation

const OPENAI_API_KEY = 'your-openai-api-key'; // In production, use Supabase secrets

export interface TranslationRequest {
  text: string;
  from: string;
  to: string;
}

export interface TranslationResponse {
  translation: string;
  confidence: number;
}

// Language names mapping
const LANGUAGE_NAMES = {
  'de': 'German',
  'en': 'English', 
  'tr': 'Turkish',
  'es': 'Spanish',
  'ar': 'Arabic'
};

export const translateWithAI = async (
  text: string, 
  fromLang: string, 
  toLang: string
): Promise<string> => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are a professional translator. Translate the given text from ${LANGUAGE_NAMES[fromLang as keyof typeof LANGUAGE_NAMES]} to ${LANGUAGE_NAMES[toLang as keyof typeof LANGUAGE_NAMES]}. 
            
            Important rules:
            - Maintain the tone and context of the original text
            - For UI elements, keep it concise and user-friendly  
            - For technical terms related to cryptocurrency, NFTs, or blockchain, use commonly accepted terms in the target language
            - If the text contains emojis, preserve them
            - Return ONLY the translated text, no explanations
            - For right-to-left languages like Arabic, ensure proper text direction`
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0.3,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content?.trim() || text;
  } catch (error) {
    console.error('AI Translation failed:', error);
    // Fallback to original text
    return text;
  }
};

// Batch translation for multiple texts
export const translateBatch = async (
  texts: string[],
  fromLang: string,
  toLang: string
): Promise<string[]> => {
  try {
    const batchText = texts.join('\n---SEPARATOR---\n');
    const translated = await translateWithAI(batchText, fromLang, toLang);
    return translated.split('\n---SEPARATOR---\n');
  } catch (error) {
    console.error('Batch translation failed:', error);
    return texts; // Return original texts on error
  }
};

// Live translation for streaming content
export const translateLiveText = async (
  text: string,
  targetLanguage: string
): Promise<string> => {
  // Optimized for real-time translation with lower latency
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // Faster model for live translation
        messages: [
          {
            role: 'system',
            content: `Translate this live stream text to ${LANGUAGE_NAMES[targetLanguage as keyof typeof LANGUAGE_NAMES]} quickly and accurately. Keep it natural and conversational.`
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0.2,
        max_tokens: 200,
        stream: false
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content?.trim() || text;
  } catch (error) {
    console.error('Live translation failed:', error);
    return text;
  }
};