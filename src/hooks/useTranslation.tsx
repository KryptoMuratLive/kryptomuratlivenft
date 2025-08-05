import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TranslatedTextProps {
  children: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const TranslatedText = ({ 
  children, 
  className, 
  as: Component = 'span' 
}: TranslatedTextProps) => {
  const { t, translate, currentLanguage } = useLanguage();
  const [translatedText, setTranslatedText] = useState(children);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentLanguage === 'de') {
      setTranslatedText(children);
      return;
    }

    // Check if we have a cached translation
    const cachedTranslation = t(children);
    if (cachedTranslation !== children) {
      setTranslatedText(cachedTranslation);
      return;
    }

    // Perform async translation
    setIsLoading(true);
    translate(children).then(translation => {
      setTranslatedText(translation);
      setIsLoading(false);
    });
  }, [children, currentLanguage, t, translate]);

  return (
    <Component className={className}>
      {isLoading ? (
        <span className="animate-pulse bg-muted rounded text-transparent">
          {children}
        </span>
      ) : (
        translatedText
      )}
    </Component>
  );
};

// Hook for using translations in components
export const useTranslation = () => {
  const { t, translate, currentLanguage, isTranslating } = useLanguage();

  const translateAsync = async (text: string): Promise<string> => {
    if (currentLanguage === 'de') return text; // German is main language
    return await translate(text);
  };

  return {
    t,
    translate: translateAsync,
    currentLanguage,
    isTranslating,
  };
};