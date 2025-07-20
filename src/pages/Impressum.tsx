import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TranslatedText } from '@/hooks/useTranslation';
import { Mail, Calendar } from 'lucide-react';

const Impressum = () => {
  const currentDate = new Date().toLocaleDateString('de-DE');

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">
          <TranslatedText>Impressum</TranslatedText>
        </h1>
        <p className="text-muted-foreground">
          <TranslatedText>Angaben gemäß § 5 TMG</TranslatedText>
        </p>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TranslatedText>Verantwortlich für den Inhalt dieser Webseite</TranslatedText>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">KryptoMurat</h3>
              <p className="text-muted-foreground">
                <TranslatedText>Herford, Deutschland</TranslatedText>
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                <TranslatedText>E-Mail:</TranslatedText>
              </span>
              <a 
                href="mailto:info@kryptomur.at" 
                className="text-primary hover:underline"
              >
                info@kryptomur.at
              </a>
            </div>
          </div>

          {/* Legal Notice */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">
              <TranslatedText>Rechtlicher Hinweis</TranslatedText>
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <TranslatedText>
                Diese Website ist ein künstlerisches, interaktives Web3-Projekt. 
                Es besteht keine Verpflichtung zur Offenlegung einer vollständigen 
                ladungsfähigen Adresse gemäß § 5 Abs. 1 TMG Absatz 2, da keine 
                journalistisch-redaktionellen Inhalte vorliegen.
              </TranslatedText>
            </p>
          </div>

          {/* Project Description */}
          <div className="space-y-3">
            <h4 className="font-semibold">
              <TranslatedText>Über das Projekt</TranslatedText>
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <TranslatedText>
                KryptoMurat ist eine innovative Web3-Plattform, die Gaming, NFTs, 
                Live-Streaming und Community-Interaktion miteinander verbindet. 
                Die Plattform ermöglicht dezentrale Teilnahme ohne Preisgabe 
                persönlicher Daten.
              </TranslatedText>
            </p>
          </div>

          {/* Disclaimer */}
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">
              <TranslatedText>Haftungsausschluss</TranslatedText>
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <TranslatedText>
                Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. 
                Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte 
                können wir jedoch keine Gewähr übernehmen. Die Nutzung erfolgt 
                auf eigene Verantwortung.
              </TranslatedText>
            </p>
          </div>

          {/* Last Updated */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground pt-4 border-t">
            <Calendar className="w-3 h-3" />
            <span>
              <TranslatedText>Stand:</TranslatedText> {currentDate}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Back Navigation */}
      <div className="text-center">
        <a 
          href="/" 
          className="text-sm text-primary hover:underline inline-flex items-center gap-1"
        >
          ← <TranslatedText>Zurück zur Startseite</TranslatedText>
        </a>
      </div>
    </div>
  );
};

export default Impressum;