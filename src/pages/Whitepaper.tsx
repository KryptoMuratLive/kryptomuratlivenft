import { TranslatedText } from '@/hooks/useTranslation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const Whitepaper = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            📄 <TranslatedText>Whitepaper: KryptoMurat Live – Jagd auf den Bitcoin</TranslatedText>
          </h1>
          <p className="text-xl text-muted-foreground">
            <TranslatedText>Interaktive, dezentrale Web3-Plattform mit MURAT-Token</TranslatedText>
          </p>
          <Badge variant="outline" className="mt-4">
            <TranslatedText>Version 1.0 - Januar 2025</TranslatedText>
          </Badge>
        </div>

        <div className="space-y-8">
          {/* Projektübersicht */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                1. <TranslatedText>Projektübersicht</TranslatedText>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                <TranslatedText>
                  KryptoMurat Live – Jagd auf den Bitcoin ist eine interaktive, dezentrale Web3-Plattform 
                  mit dem Ziel, Livestream-Events, NFT-Verkäufe, spielerisches Entertainment und Bildung 
                  im Bereich Blockchain/Web3 zu vereinen. Im Zentrum steht der "MURAT"-Token, ein 
                  Multi(chain)-Rational Token mit eigener Tokenökonomie.
                </TranslatedText>
              </p>
            </CardContent>
          </Card>

          {/* Vision */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                2. <TranslatedText>Vision</TranslatedText>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                <TranslatedText>
                  Wir glauben an eine transparente, faire und unterhaltsame Zukunft des Web3. Unser Ziel 
                  ist es, mit KryptoMurat eine Plattform zu schaffen, die:
                </TranslatedText>
              </p>
              <ul className="space-y-2 text-muted-foreground ml-4">
                <li>• <TranslatedText>Nutzer in Echtzeit einbindet</TranslatedText></li>
                <li>• <TranslatedText>den Wert digitaler Assets erlebbar macht</TranslatedText></li>
                <li>• <TranslatedText>Bildung, Unterhaltung und Einkommen dezentral verbindet</TranslatedText></li>
              </ul>
            </CardContent>
          </Card>

          {/* Tokenomics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                3. <TranslatedText>Tokenomics – MURAT Token</TranslatedText>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2"><TranslatedText>Tokenname</TranslatedText></h4>
                  <p className="text-muted-foreground">MURAT</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2"><TranslatedText>Supply</TranslatedText></h4>
                  <p className="text-muted-foreground">1.000.000.000 (1 Milliarde)</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2"><TranslatedText>Chain (Start)</TranslatedText></h4>
                  <p className="text-muted-foreground">Polygon</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2"><TranslatedText>Multichain-Unterstützung</TranslatedText></h4>
                  <p className="text-muted-foreground">Geplant (z. B. via LayerZero)</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2"><TranslatedText>Transaktionsgebühr</TranslatedText></h4>
                  <p className="text-muted-foreground">3 % (5 % bei Rückverkauf &lt; 24h)</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2"><TranslatedText>Burn-Mechanismus</TranslatedText></h4>
                  <p className="text-muted-foreground">0.5–1 % je Transaktion</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2"><TranslatedText>Staking-Laufzeiten</TranslatedText></h4>
                  <p className="text-muted-foreground">30, 90, 180, 360 Tage</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2"><TranslatedText>Whale-Schutz</TranslatedText></h4>
                  <p className="text-muted-foreground">Kein Wallet &gt;2 % der Gesamtmenge</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sicherheitsmechanismen */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                4. <TranslatedText>Sicherheitsmechanismen</TranslatedText>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-muted-foreground">
                <li>• <TranslatedText>Anti-Dump-Protokoll: Zeitbasierte Verkaufsgebühren und Limits</TranslatedText></li>
                <li>• <TranslatedText>Whale-Kontrolle: Maximale Wallet-Limitierung</TranslatedText></li>
                <li>• <TranslatedText>Staking-Automation: Smart Contract-gesteuerte Belohnungen</TranslatedText></li>
              </ul>
            </CardContent>
          </Card>

          {/* Das Spiel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                5. <TranslatedText>Das Spiel: Jagd auf den Bitcoin</TranslatedText>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                <TranslatedText>
                  Ein comic-inspiriertes NFT-Spiel mit Echtzeit-Elementen:
                </TranslatedText>
              </p>
              <ul className="space-y-2 text-muted-foreground ml-4">
                <li>• <TranslatedText>Spieler sammeln & verteidigen Bitcoin vor dem Jäger</TranslatedText></li>
                <li>• <TranslatedText>Community entscheidet über Maps, Missionen & Inhalte</TranslatedText></li>
                <li>• <TranslatedText>Livestreams mit Wallet-Zugang</TranslatedText></li>
                <li>• <TranslatedText>NFT-Karten & Belohnungssysteme</TranslatedText></li>
              </ul>
            </CardContent>
          </Card>

          {/* NFT-Marktplatz & Live-Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                6. <TranslatedText>NFT-Marktplatz & Live-Events</TranslatedText>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  <TranslatedText>Marktplatz für:</TranslatedText>
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <TranslatedText>Event-Zugang (Livestreams)</TranslatedText></li>
                  <li>• <TranslatedText>Avatare & Items (im Spiel nutzbar)</TranslatedText></li>
                  <li>• <TranslatedText>Proof-of-Attendance NFTs</TranslatedText></li>
                </ul>
              </div>
              <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground">
                  <TranslatedText>
                    Integration über https://github.com/KryptoMuratLive/kryptomuratlivenft
                  </TranslatedText>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Einnahmequellen */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                7. <TranslatedText>Einnahmequellen</TranslatedText>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-muted-foreground">
                <li>• <TranslatedText>NFT-Verkäufe</TranslatedText></li>
                <li>• <TranslatedText>Token-Staking</TranslatedText></li>
                <li>• <TranslatedText>Livestream-Events</TranslatedText></li>
                <li>• <TranslatedText>Affiliate-Programme (z. B. KI-Tools, Alurea)</TranslatedText></li>
                <li>• <TranslatedText>Werbepartner im Spiel und Livestream</TranslatedText></li>
              </ul>
            </CardContent>
          </Card>

          {/* Governance & DAO */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                8. <TranslatedText>Governance & DAO</TranslatedText>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-muted-foreground">
                <li>• <TranslatedText>Community-Abstimmungen</TranslatedText></li>
                <li>• <TranslatedText>Token-basierte Vorschlagsrechte</TranslatedText></li>
                <li>• <TranslatedText>Einnahmenbeteiligung über DAO-Strukturen (z. B. bei Game-NFTs)</TranslatedText></li>
              </ul>
            </CardContent>
          </Card>

          {/* Roadmap */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                9. <TranslatedText>Roadmap</TranslatedText>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-primary">Q3 2024</h3>
                  <p className="text-sm text-muted-foreground">
                    <TranslatedText>Whitepaper, Plattformstart, NFT-Shop online</TranslatedText>
                  </p>
                </div>
                <div className="border-l-4 border-muted pl-4">
                  <h3 className="font-semibold">Q4 2024</h3>
                  <p className="text-sm text-muted-foreground">
                    <TranslatedText>Spiel-Demo, Telegram-Bot, Livestream-Alpha</TranslatedText>
                  </p>
                </div>
                <div className="border-l-4 border-muted pl-4">
                  <h3 className="font-semibold">Q1 2025</h3>
                  <p className="text-sm text-muted-foreground">
                    <TranslatedText>Staking-System, Voting, Multichain-Bridge</TranslatedText>
                  </p>
                </div>
                <div className="border-l-4 border-muted pl-4">
                  <h3 className="font-semibold">Q3 2025</h3>
                  <p className="text-sm text-muted-foreground">
                    <TranslatedText>Launch Mobile Game, Creator-Marktplatz</TranslatedText>
                  </p>
                </div>
                <div className="border-l-4 border-muted pl-4">
                  <h3 className="font-semibold">Q1 2026</h3>
                  <p className="text-sm text-muted-foreground">
                    <TranslatedText>DAO-Einführung, eigenes Blockchain-Testnet</TranslatedText>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rechtlicher Hinweis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                10. <TranslatedText>Rechtlicher Hinweis</TranslatedText>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-destructive">
                <h3 className="text-lg font-semibold text-destructive mb-3">
                  <TranslatedText>Wichtiger Hinweis</TranslatedText>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <TranslatedText>
                    Dieses Whitepaper dient ausschließlich Informationszwecken und stellt keine 
                    Finanz- oder Anlageberatung dar. Das Projekt berücksichtigt DSGVO-Standards 
                    und ermöglicht Wallet-basierten Zugang ohne personenbezogene Daten.
                  </TranslatedText>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            <TranslatedText>© 2025 KryptoMurat. Alle Rechte vorbehalten.</TranslatedText>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            <TranslatedText>Kontakt: info@kryptomur.at</TranslatedText>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Whitepaper;