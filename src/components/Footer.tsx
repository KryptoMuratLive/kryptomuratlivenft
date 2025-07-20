import { Link } from 'react-router-dom';
import { TranslatedText } from '@/hooks/useTranslation';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">KryptoMurat</h3>
            <p className="text-sm text-muted-foreground">
              <TranslatedText>
                Ein innovatives Web3-Projekt für Gaming, NFTs und Community-Interaktion.
              </TranslatedText>
            </p>
            <p className="text-sm text-muted-foreground">
              <TranslatedText>Herford, Deutschland</TranslatedText>
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">
              <TranslatedText>Schnellzugriff</TranslatedText>
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/livestream" className="text-muted-foreground hover:text-foreground transition-colors">
                  <TranslatedText>Live Stream</TranslatedText>
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-muted-foreground hover:text-foreground transition-colors">
                  <TranslatedText>NFT Gallery</TranslatedText>
                </Link>
              </li>
              <li>
                <Link to="/staking" className="text-muted-foreground hover:text-foreground transition-colors">
                  <TranslatedText>Staking</TranslatedText>
                </Link>
              </li>
              <li>
                <Link to="/voting" className="text-muted-foreground hover:text-foreground transition-colors">
                  <TranslatedText>Voting</TranslatedText>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">
              <TranslatedText>Kontakt & Support</TranslatedText>
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">
                <TranslatedText>E-Mail:</TranslatedText>{' '}
                <a 
                  href="mailto:info@kryptomur.at" 
                  className="text-primary hover:underline"
                >
                  info@kryptomur.at
                </a>
              </p>
              <p className="text-xs text-muted-foreground">
                <TranslatedText>
                  Antwortzeit: 24-48 Stunden
                </TranslatedText>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-6 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            {/* Copyright */}
            <div className="text-xs text-muted-foreground">
              <span>© {currentYear.toString()} KryptoMurat. </span>
              <TranslatedText>Alle Rechte vorbehalten.</TranslatedText>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center sm:justify-end gap-4 text-xs">
              <Link 
                to="/impressum" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <TranslatedText>Impressum</TranslatedText>
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link 
                to="/datenschutz" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <TranslatedText>Datenschutzerklärung</TranslatedText>
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link 
                to="/barrierefreiheit" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <TranslatedText>Barrierefreiheit</TranslatedText>
              </Link>
            </div>
          </div>

          {/* Web3 Notice */}
          <div className="text-center mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              <TranslatedText>
                🌐 Dezentrale Web3-Plattform • Keine Cookies • Anonyme Nutzung möglich
              </TranslatedText>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};