import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TranslatedText } from '@/hooks/useTranslation';
import { Shield, Database, Eye, Wallet, Calendar } from 'lucide-react';

const Datenschutz = () => {
  const currentDate = new Date().toLocaleDateString('de-DE');

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
          <Shield className="w-8 h-8 text-primary" />
          <TranslatedText>Datenschutzerklärung</TranslatedText>
        </h1>
        <p className="text-muted-foreground">
          <TranslatedText>Transparenz über Datenverarbeitung auf unserer Web3-Plattform</TranslatedText>
        </p>
      </div>

      {/* Summary Card */}
      <Card className="border-green-200 bg-green-50/50">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center gap-2">
            <Eye className="w-5 h-5" />
            <TranslatedText>Datenschutz auf einen Blick</TranslatedText>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <TranslatedText>Keine Cookies oder Tracking</TranslatedText>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <TranslatedText>Anonyme Web3-Nutzung möglich</TranslatedText>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <TranslatedText>Keine permanente Datenspeicherung</TranslatedText>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <TranslatedText>DSGVO-konforme Umsetzung</TranslatedText>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* No Cookies Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-600" />
            <TranslatedText>1. Verzicht auf Cookies und Tracking</TranslatedText>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            <TranslatedText>
              Unsere Plattform verwendet bewusst keine Cookies, Google Analytics 
              oder andere Tracking-Technologien. Wir respektieren Ihre Privatsphäre 
              und sammeln keine Verhaltensdaten.
            </TranslatedText>
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">
              <TranslatedText>Was bedeutet das für Sie?</TranslatedText>
            </h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• <TranslatedText>Keine Cookie-Banner erforderlich</TranslatedText></li>
              <li>• <TranslatedText>Keine Verfolgung Ihres Surfverhaltens</TranslatedText></li>
              <li>• <TranslatedText>Keine Profilbildung durch Drittanbieter</TranslatedText></li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Data Processing Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            <TranslatedText>2. Datenverarbeitung bei Kontaktaufnahme</TranslatedText>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            <TranslatedText>
              Personenbezogene Daten werden nur verarbeitet, wenn Sie uns 
              diese freiwillig mitteilen, zum Beispiel bei einer Kontaktaufnahme 
              per E-Mail.
            </TranslatedText>
          </p>
          <div className="space-y-3">
            <h4 className="font-semibold">
              <TranslatedText>Verarbeitete Daten bei E-Mail-Kontakt:</TranslatedText>
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• <TranslatedText>E-Mail-Adresse (zur Antwort erforderlich)</TranslatedText></li>
              <li>• <TranslatedText>Nachrichteninhalt (zur Bearbeitung Ihrer Anfrage)</TranslatedText></li>
              <li>• <TranslatedText>Zeitpunkt der Kontaktaufnahme</TranslatedText></li>
            </ul>
            <p className="text-sm text-muted-foreground">
              <TranslatedText>
                Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung Ihrer Anfrage)
              </TranslatedText>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Web3 Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-purple-600" />
            <TranslatedText>3. Web3 und Wallet-Verbindung</TranslatedText>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            <TranslatedText>
              Die Nutzung unserer Plattform ist vollständig anonym möglich. 
              Auch bei Wallet-Verbindungen werden keine personenbezogenen Daten gespeichert.
            </TranslatedText>
          </p>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">
              <TranslatedText>Technische Funktionsweise:</TranslatedText>
            </h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• <TranslatedText>Wallet-Adressen sind öffentliche Blockchain-Kennungen</TranslatedText></li>
              <li>• <TranslatedText>Kein Personenbezug ohne zusätzliche Informationen möglich</TranslatedText></li>
              <li>• <TranslatedText>Transaktionen laufen direkt über die Blockchain</TranslatedText></li>
              <li>• <TranslatedText>Wir speichern keine Wallet-Daten auf unseren Servern</TranslatedText></li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Rights Section */}
      <Card>
        <CardHeader>
          <CardTitle>
            <TranslatedText>4. Ihre Rechte nach DSGVO</TranslatedText>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            <TranslatedText>
              Sie haben jederzeit das Recht auf Auskunft, Berichtigung, 
              Löschung oder Einschränkung der Verarbeitung Ihrer Daten.
            </TranslatedText>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-semibold mb-1">
                <TranslatedText>Auskunftsrecht (Art. 15 DSGVO)</TranslatedText>
              </h5>
              <p className="text-muted-foreground">
                <TranslatedText>Information über gespeicherte Daten</TranslatedText>
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-1">
                <TranslatedText>Löschungsrecht (Art. 17 DSGVO)</TranslatedText>
              </h5>
              <p className="text-muted-foreground">
                <TranslatedText>Löschung Ihrer Daten</TranslatedText>
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-1">
                <TranslatedText>Berichtigungsrecht (Art. 16 DSGVO)</TranslatedText>
              </h5>
              <p className="text-muted-foreground">
                <TranslatedText>Korrektur falscher Daten</TranslatedText>
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-1">
                <TranslatedText>Widerspruchsrecht (Art. 21 DSGVO)</TranslatedText>
              </h5>
              <p className="text-muted-foreground">
                <TranslatedText>Widerspruch gegen Datenverarbeitung</TranslatedText>
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            <TranslatedText>
              Kontakt für Datenschutzanfragen: info@kryptomur.at
            </TranslatedText>
          </p>
        </CardContent>
      </Card>

      {/* Contact Section */}
      <Card>
        <CardHeader>
          <CardTitle>
            <TranslatedText>5. Kontakt und Verantwortlicher</TranslatedText>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="font-semibold">KryptoMurat</p>
            <p className="text-muted-foreground">
              <TranslatedText>Herford, Deutschland</TranslatedText>
            </p>
            <p className="text-muted-foreground">
              <TranslatedText>E-Mail:</TranslatedText> info@kryptomur.at
            </p>
          </div>
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

export default Datenschutz;