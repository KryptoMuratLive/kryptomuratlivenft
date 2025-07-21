import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type SupportedLanguage = 'de' | 'en' | 'tr' | 'es' | 'fr';

export interface LanguageConfig {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  rtl?: boolean;
}

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
];

interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  translate: (text: string) => Promise<string>;
  t: (text: string) => string;
  isRTL: boolean;
  isTranslating: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'preferred-language';

// Browser language detection
const detectBrowserLanguage = (): SupportedLanguage => {
  const browserLang = navigator.language.split('-')[0] as SupportedLanguage;
  const supportedCodes = SUPPORTED_LANGUAGES.map(lang => lang.code);
  
  if (supportedCodes.includes(browserLang)) {
    return browserLang;
  }
  
  return 'en'; // fallback to English
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(() => {
    // Try to get from localStorage first, then detect browser language
    const stored = localStorage.getItem(STORAGE_KEY) as SupportedLanguage;
    if (stored && SUPPORTED_LANGUAGES.find(lang => lang.code === stored)) {
      return stored;
    }
    return detectBrowserLanguage();
  });

  const [translationCache, setTranslationCache] = useState<Map<string, string>>(new Map());
  const [isTranslating, setIsTranslating] = useState(false);

  const currentConfig = SUPPORTED_LANGUAGES.find(lang => lang.code === currentLanguage)!;
  const isRTL = currentConfig.rtl || false;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, currentLanguage);
    
    // Set document direction and language
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage, isRTL]);

  const setLanguage = (language: SupportedLanguage) => {
    setCurrentLanguage(language);
  };

  // AI-powered translation function
  const translate = async (text: string): Promise<string> => {
    if (currentLanguage === 'de') return text; // Original language is German
    
    const cacheKey = `${text}-${currentLanguage}`;
    if (translationCache.has(cacheKey)) {
      return translationCache.get(cacheKey)!;
    }

    setIsTranslating(true);
    try {
      // For demo purposes, we'll use a simple translation
      // In production, this would call OpenAI API or DeepL
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          from: 'de',
          to: currentLanguage,
        }),
      });

      if (response.ok) {
        const { translation } = await response.json();
        setTranslationCache(prev => new Map(prev.set(cacheKey, translation)));
        return translation;
      }
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsTranslating(false);
    }

    // Fallback: return original text
    return text;
  };

  // Synchronous translation function for immediate UI needs
  const t = (text: string): string => {
    if (currentLanguage === 'de') return text;
    
    const cacheKey = `${text}-${currentLanguage}`;
    if (translationCache.has(cacheKey)) {
      return translationCache.get(cacheKey)!;
    }

    // For immediate rendering, we'll trigger async translation
    translate(text);
    return text; // Return original until translation is ready
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setLanguage,
      translate,
      t,
      isRTL,
      isTranslating,
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};