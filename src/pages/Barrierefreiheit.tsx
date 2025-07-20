import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TranslatedText } from '@/hooks/useTranslation';
import { 
  Accessibility, 
  Keyboard, 
  Eye, 
  Volume2, 
  Monitor, 
  Mail,
  Calendar,
  CheckCircle 
} from 'lucide-react';

const Barrierefreiheit = () => {
  const currentDate = new Date().toLocaleDateString('de-DE');

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
          <Accessibility className="w-8 h-8 text-blue-600" />
          <TranslatedText>Barrierefreiheit</TranslatedText>
        </h1>
        <p className="text-muted-foreground">
          <TranslatedText>Unsere Verpflichtung zu einer zugänglichen Web3-Plattform für alle</TranslatedText>
        </p>
      </div>

      {/* Compliance Statement */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="text-blue-800 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <TranslatedText>BITV 2.0 Konformität</TranslatedText>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-700 leading-relaxed">
            <TranslatedText>
              Diese Plattform ist nach den Richtlinien der Barrierefreien 
              Informationstechnik-Verordnung (BITV) 2.0 und den Web Content 
              Accessibility Guidelines (WCAG) 2.1 Level AA entwickelt.
            </TranslatedText>
          </p>
        </CardContent>
      </Card>

      {/* Accessibility Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Keyboard Navigation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Keyboard className="w-5 h-5 text-green-600" />
              <TranslatedText>Tastaturnavigation</TranslatedText>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground text-sm">
              <TranslatedText>
                Vollständige Navigation ohne Maus möglich
              </TranslatedText>
            </p>
            <ul className="text-sm space-y-1">
              <li>• <TranslatedText>Tab: Nächstes Element</TranslatedText></li>
              <li>• <TranslatedText>Shift + Tab: Vorheriges Element</TranslatedText></li>
              <li>• <TranslatedText>Enter/Space: Aktivieren</TranslatedText></li>
              <li>• <TranslatedText>Escape: Schließen/Abbrechen</TranslatedText></li>
            </ul>
          </CardContent>
        </Card>

        {/* Screen Reader */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-purple-600" />
              <TranslatedText>Screenreader-Kompatibilität</TranslatedText>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground text-sm">
              <TranslatedText>
                Optimiert für gängige Screenreader
              </TranslatedText>
            </p>
            <ul className="text-sm space-y-1">
              <li>• <TranslatedText>NVDA (Windows)</TranslatedText></li>
              <li>• <TranslatedText>JAWS (Windows)</TranslatedText></li>
              <li>• <TranslatedText>VoiceOver (macOS/iOS)</TranslatedText></li>
              <li>• <TranslatedText>TalkBack (Android)</TranslatedText></li>
            </ul>
          </CardContent>
        </Card>

        {/* Visual Design */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-orange-600" />
              <TranslatedText>Kontrastreiches Design</TranslatedText>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground text-sm">
              <TranslatedText>
                Hohe Kontraste für bessere Lesbarkeit
              </TranslatedText>
            </p>
            <ul className="text-sm space-y-1">
              <li>• <TranslatedText>WCAG AA Konformität (4.5:1)</TranslatedText></li>
              <li>• <TranslatedText>Skalierbare Schriftgrößen</TranslatedText></li>
              <li>• <TranslatedText>Fokus-Indikatoren</TranslatedText></li>
              <li>• <TranslatedText>Dark/Light Mode</TranslatedText></li>
            </ul>
          </CardContent>
        </Card>

        {/* Technical Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="w-5 h-5 text-cyan-600" />
              <TranslatedText>Technische Umsetzung</TranslatedText>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground text-sm">
              <TranslatedText>
                Semantische HTML-Struktur und ARIA-Labels
              </TranslatedText>
            </p>
            <ul className="text-sm space-y-1">
              <li>• <TranslatedText>Semantische HTML5-Elemente</TranslatedText></li>
              <li>• <TranslatedText>ARIA-Attribute</TranslatedText></li>
              <li>• <TranslatedText>Responsive Design</TranslatedText></li>
              <li>• <TranslatedText>Zoom bis 200%</TranslatedText></li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Language Support */}
      <Card>
        <CardHeader>
          <CardTitle>
            <TranslatedText>Mehrsprachige Barrierefreiheit</TranslatedText>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            <TranslatedText>
              Unsere Plattform bietet automatische KI-Übersetzungen in 
              mehrere Sprachen, um Sprachbarrieren zu überwinden.
            </TranslatedText>
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-lg">🇩🇪</span>
              <span>Deutsch</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🇺🇸</span>
              <span>English</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🇹🇷</span>
              <span>Türkçe</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🇪🇸</span>
              <span>Español</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🇸🇦</span>
              <span>العربية</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Testing Information */}
      <Card>
        <CardHeader>
          <CardTitle>
            <TranslatedText>Barrierefreiheit-Tests</TranslatedText>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            <TranslatedText>
              Die Plattform wird regelmäßig auf Barrierefreiheit getestet 
              und kontinuierlich verbessert.
            </TranslatedText>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-3 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-1">
                <TranslatedText>Automatisierte Tests</TranslatedText>
              </h4>
              <p className="text-xs text-green-700">
                <TranslatedText>axe-core, WAVE, Lighthouse</TranslatedText>
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-1">
                <TranslatedText>Manuelle Tests</TranslatedText>
              </h4>
              <p className="text-xs text-blue-700">
                <TranslatedText>Screenreader, Tastaturnavigation</TranslatedText>
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-1">
                <TranslatedText>Nutzer-Feedback</TranslatedText>
              </h4>
              <p className="text-xs text-purple-700">
                <TranslatedText>Community-Tests und Rückmeldungen</TranslatedText>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feedback Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            <TranslatedText>Feedback und Unterstützung</TranslatedText>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            <TranslatedText>
              Haben Sie Schwierigkeiten bei der Nutzung oder Verbesserungsvorschläge? 
              Wir freuen uns über Ihr Feedback!
            </TranslatedText>
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild variant="default">
              <a href="mailto:info@kryptomur.at?subject=Barrierefreiheit%20Feedback">
                <Mail className="w-4 h-4 mr-2" />
                <TranslatedText>Feedback senden</TranslatedText>
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="mailto:info@kryptomur.at?subject=Barrierefreiheit%20Hilfe">
                <TranslatedText>Hilfe anfordern</TranslatedText>
              </a>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            <TranslatedText>
              Antwortzeit für Barrierefreiheit-Anfragen: 24-48 Stunden
            </TranslatedText>
          </p>
        </CardContent>
      </Card>

      {/* Commitment Statement */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <blockquote className="text-center italic text-muted-foreground leading-relaxed">
            <TranslatedText>
              "Wir verpflichten uns, eine Plattform zu schaffen, die für alle 
              Menschen zugänglich ist – unabhängig von ihren Fähigkeiten, 
              ihrer Sprache oder ihrer technischen Ausstattung."
            </TranslatedText>
          </blockquote>
          <p className="text-center text-sm text-muted-foreground mt-4">
            — <TranslatedText>KryptoMurat Team</TranslatedText>
          </p>
        </CardContent>
      </Card>

      {/* Last Updated */}
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Calendar className="w-3 h-3" />
        <span>
          <TranslatedText>Stand:</TranslatedText> {currentDate}
        </span>
      </div>

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

export default Barrierefreiheit;