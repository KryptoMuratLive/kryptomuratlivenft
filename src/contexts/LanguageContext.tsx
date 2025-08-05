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
  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [isTranslating, setIsTranslating] = useState(false);

  const currentConfig = SUPPORTED_LANGUAGES.find(lang => lang.code === currentLanguage)!;
  const isRTL = currentConfig.rtl || false;

  // Load translation files
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/locales/${currentLanguage}/common.json`);
        if (response.ok) {
          const data = await response.json();
          setTranslations(data);
        }
      } catch (error) {
        console.error(`Failed to load translations for ${currentLanguage}:`, error);
      }
    };

    loadTranslations();
  }, [currentLanguage]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, currentLanguage);
    
    // Set document direction and language
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage, isRTL]);

  const setLanguage = (language: SupportedLanguage) => {
    setCurrentLanguage(language);
  };

  // Function to get nested translation
  const getNestedTranslation = (key: string): string => {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return original key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  // AI-powered translation function (now uses JSON files as fallback)
  const translate = async (text: string): Promise<string> => {
    if (currentLanguage === 'de') return text; // Original language is German
    
    const cacheKey = `${text}-${currentLanguage}`;
    if (translationCache.has(cacheKey)) {
      return translationCache.get(cacheKey)!;
    }

    // First try to find in loaded translations
    const translation = getNestedTranslation(text);
    if (translation !== text) {
      setTranslationCache(prev => new Map(prev.set(cacheKey, translation)));
      return translation;
    }

    // If not found, return original text (in production you could call AI API here)
    return text;
  };

  // Synchronous translation function for immediate UI needs
  const t = (key: string): string => {
    if (currentLanguage === 'de') return key;
    
    const cacheKey = `${key}-${currentLanguage}`;
    if (translationCache.has(cacheKey)) {
      return translationCache.get(cacheKey)!;
    }

    // Try to get from loaded translations
    const translation = getNestedTranslation(key);
    if (translation !== key) {
      setTranslationCache(prev => new Map(prev.set(cacheKey, translation)));
      return translation;
    }

    return key; // Return original key if no translation found
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