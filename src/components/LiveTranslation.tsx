import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translateLiveText } from '@/lib/translation';

interface LiveTranslationProps {
  originalText: string;
  className?: string;
  enableAutoTranslation?: boolean;
}

export const LiveTranslation = ({ 
  originalText, 
  className, 
  enableAutoTranslation = true 
}: LiveTranslationProps) => {
  const { currentLanguage } = useLanguage();
  const [translatedText, setTranslatedText] = useState(originalText);
  const [isTranslating, setIsTranslating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!enableAutoTranslation || currentLanguage === 'de') {
      setTranslatedText(originalText);
      return;
    }

    // Debounce translation for live text updates
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsTranslating(true);
      translateLiveText(originalText, currentLanguage)
        .then(translation => {
          setTranslatedText(translation);
          setIsTranslating(false);
        })
        .catch(() => {
          setTranslatedText(originalText);
          setIsTranslating(false);
        });
    }, 1000); // 1 second debounce

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [originalText, currentLanguage, enableAutoTranslation]);

  return (
    <div className={className}>
      <div className="relative">
        {translatedText}
        {isTranslating && (
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
        )}
      </div>
      {currentLanguage !== 'de' && (
        <div className="text-xs text-muted-foreground mt-1">
          📡 Live-Übersetzung aktiv
        </div>
      )}
    </div>
  );
};

// Hook for live translation in custom components
export const useLiveTranslation = () => {
  const { currentLanguage } = useLanguage();
  const [translations, setTranslations] = useState<Map<string, string>>(new Map());

  const translateLive = async (text: string): Promise<string> => {
    if (currentLanguage === 'de') return text;

    const cached = translations.get(text);
    if (cached) return cached;

    try {
      const translation = await translateLiveText(text, currentLanguage);
      setTranslations(prev => new Map(prev.set(text, translation)));
      return translation;
    } catch (error) {
      console.error('Live translation failed:', error);
      return text;
    }
  };

  return { translateLive, currentLanguage };
};