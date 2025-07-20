import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { SUPPORTED_LANGUAGES } from '@/contexts/LanguageContext';
import { Languages, ChevronDown } from 'lucide-react';

export const LanguageSelector = () => {
  const { currentLanguage, setLanguage, isTranslating } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentConfig = SUPPORTED_LANGUAGES.find(lang => lang.code === currentLanguage)!;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 relative"
          disabled={isTranslating}
        >
          <Languages className="h-4 w-4" />
          <span className="text-lg">{currentConfig.flag}</span>
          <span className="hidden sm:inline">{currentConfig.nativeName}</span>
          <ChevronDown className="h-3 w-3" />
          {isTranslating && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-48 bg-background border border-border shadow-lg z-50"
      >
        {SUPPORTED_LANGUAGES.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => {
              setLanguage(language.code);
              setIsOpen(false);
            }}
            className={`
              flex items-center gap-3 px-3 py-2 cursor-pointer
              ${currentLanguage === language.code 
                ? 'bg-muted font-medium' 
                : 'hover:bg-muted/50'
              }
            `}
          >
            <span className="text-lg">{language.flag}</span>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{language.nativeName}</span>
              <span className="text-xs text-muted-foreground">{language.name}</span>
            </div>
            {currentLanguage === language.code && (
              <div className="ml-auto w-2 h-2 bg-primary rounded-full" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};