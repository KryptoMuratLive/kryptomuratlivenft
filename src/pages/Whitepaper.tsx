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
            📄 <TranslatedText>Whitepaper</TranslatedText>
          </h1>
          <p className="text-xl text-muted-foreground">
            <TranslatedText>KryptoMurat - Das dezentrale Web3-Gaming-Ökosystem</TranslatedText>
          </p>
          <Badge variant="outline" className="mt-4">
            <TranslatedText>Version 1.0 - Januar 2025</TranslatedText>
          </Badge>
        </div>

        <div className="space-y-8">
          {/* Vision & Hintergrund */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                1. <TranslatedText>Vision & Hintergrund</TranslatedText>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                <TranslatedText>
                  KryptoMurat entsteht aus der Vision, Gaming und Blockchain-Technologie zu vereinen, 
                  um eine transparente, dezentrale Community-Plattform zu schaffen. Unser Ziel ist es, 
                  traditionelle Gaming-Grenzen zu überwinden und eine neue Ära der Spieler-Interaktion 
                  einzuläuten.
                </TranslatedText>
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <TranslatedText>
                  Die Plattform kombiniert Live-Streaming, NFT-Integration, Community-Governance und 
                  innovative Tokenomics, um ein nachhaltiges Ökosystem für Gamer, Sammler und 
                  Blockchain-Enthusiasten zu schaffen.
                </TranslatedText>
              </p>
            </CardContent>
          </Card>

          {/* MURAT Token */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                2. <TranslatedText>Der MURAT-Token</TranslatedText>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  <TranslatedText>Definition & Zweck</TranslatedText>
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  <TranslatedText>
                    Der MURAT-Token ist das native Utility-Token des KryptoMurat-Ökosystems. 
                    Er dient als primäres Zahlungsmittel für Plattform-Interaktionen, Governance-Teilnahme 
                    und als Belohnungsmechanismus für aktive Community-Mitglieder.
                  </TranslatedText>
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">
                  <TranslatedText>Token-Mechanik</TranslatedText>
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <TranslatedText>Staking-Belohnungen für langfristige Halter</TranslatedText></li>
                  <li>• <TranslatedText>Voting-Power für Governance-Entscheidungen</TranslatedText></li>
                  <li>• <TranslatedText>NFT-Minting und Marketplace-Transaktionen</TranslatedText></li>
                  <li>• <TranslatedText>Exklusive Event-Zugang und Premium-Features</TranslatedText></li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">
                  <TranslatedText>Nutzen & Vorteile</TranslatedText>
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  <TranslatedText>
                    Token-Halter profitieren von reduzierten Gebühren, Early Access zu neuen Features, 
                    passivem Einkommen durch Staking und direkter Teilnahme an der Plattform-Entwicklung 
                    durch das Governance-System.
                  </TranslatedText>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Sicherheit & Anti-Dump */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                3. <TranslatedText>Sicherheit & Anti-Dump-Maßnahmen</TranslatedText>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  <TranslatedText>Smart Contract Sicherheit</TranslatedText>
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <TranslatedText>Audits durch renommierte Sicherheitsfirmen</TranslatedText></li>
                  <li>• <TranslatedText>Timelock-Mechanismen für kritische Funktionen</TranslatedText></li>
                  <li>• <TranslatedText>Multi-Signature Wallets für Treasury-Management</TranslatedText></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">
                  <TranslatedText>Anti-Dump-Mechanismen</TranslatedText>
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <TranslatedText>Graduelle Token-Freigabe (Vesting)</TranslatedText></li>
                  <li>• <TranslatedText>Staking-Belohnungen für langfristige Halter</TranslatedText></li>
                  <li>• <TranslatedText>Buy-back und Burn-Mechanismen</TranslatedText></li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Roadmap */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                4. <TranslatedText>Roadmap</TranslatedText>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-primary">Q1 2025</h3>
                  <p className="text-sm text-muted-foreground">
                    <TranslatedText>Platform Launch, NFT Marketplace, Basic Staking</TranslatedText>
                  </p>
                </div>
                <div className="border-l-4 border-muted pl-4">
                  <h3 className="font-semibold">Q2 2025</h3>
                  <p className="text-sm text-muted-foreground">
                    <TranslatedText>Advanced Governance, Cross-Chain Integration</TranslatedText>
                  </p>
                </div>
                <div className="border-l-4 border-muted pl-4">
                  <h3 className="font-semibold">Q3 2025</h3>
                  <p className="text-sm text-muted-foreground">
                    <TranslatedText>Gaming Integration, DAO Formation</TranslatedText>
                  </p>
                </div>
                <div className="border-l-4 border-muted pl-4">
                  <h3 className="font-semibold">Q4 2025</h3>
                  <p className="text-sm text-muted-foreground">
                    <TranslatedText>Eigene Blockchain-Entwicklung, Testnet Launch</TranslatedText>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technologische Basis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                5. <TranslatedText>Technologische Basis</TranslatedText>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  <TranslatedText>Multichain-Architektur</TranslatedText>
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  <TranslatedText>
                    KryptoMurat nutzt eine Multichain-Strategie für maximale Interoperabilität. 
                    Initial auf Ethereum und Polygon, mit geplanter Expansion zu Solana, 
                    Binance Smart Chain und anderen führenden Blockchains.
                  </TranslatedText>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">
                  <TranslatedText>NFT-Standards</TranslatedText>
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <TranslatedText>ERC-721 für einzigartige Sammelgegenstände</TranslatedText></li>
                  <li>• <TranslatedText>ERC-1155 für Gaming-Assets</TranslatedText></li>
                  <li>• <TranslatedText>IPFS für dezentrale Metadaten-Speicherung</TranslatedText></li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Risiken & Rechtliches */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                6. <TranslatedText>Risiken & Rechtlicher Hinweis</TranslatedText>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-destructive">
                <h3 className="text-lg font-semibold text-destructive mb-3">
                  <TranslatedText>Wichtiger Hinweis</TranslatedText>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <TranslatedText>
                    Dieses Dokument stellt keine Finanzberatung dar. Investitionen in Kryptowährungen 
                    und NFTs sind mit erheblichen Risiken verbunden. Der Wert von Token kann stark 
                    schwanken oder auf null fallen. Investieren Sie nur, was Sie sich leisten können 
                    zu verlieren.
                  </TranslatedText>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">
                  <TranslatedText>Technische Risiken</TranslatedText>
                </h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• <TranslatedText>Smart Contract Vulnerabilities</TranslatedText></li>
                  <li>• <TranslatedText>Blockchain-Netzwerk-Risiken</TranslatedText></li>
                  <li>• <TranslatedText>Regulatorische Unsicherheiten</TranslatedText></li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Governance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                7. <TranslatedText>Governance</TranslatedText>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                <TranslatedText>
                  Das KryptoMurat-Ökosystem wird durch eine dezentrale autonome Organisation (DAO) 
                  verwaltet. Token-Halter können über wichtige Plattform-Entscheidungen abstimmen, 
                  einschließlich Feature-Entwicklung, Treasury-Allokation und strategische Partnerschaften.
                </TranslatedText>
              </p>

              <div>
                <h3 className="text-lg font-semibold mb-3">
                  <TranslatedText>Abstimmungsverfahren</TranslatedText>
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <TranslatedText>Quadratisches Voting für faire Repräsentation</TranslatedText></li>
                  <li>• <TranslatedText>Minimum-Quorum für gültige Abstimmungen</TranslatedText></li>
                  <li>• <TranslatedText>Transparente On-Chain-Protokollierung</TranslatedText></li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Zukunftsvision */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                8. <TranslatedText>Zukunft: Eigene Blockchain</TranslatedText>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                <TranslatedText>
                  Langfristig plant KryptoMurat die Entwicklung einer eigenen, Gaming-optimierten 
                  Blockchain. Diese wird speziell für niedrige Latenz, hohen Durchsatz und 
                  nahtlose Gaming-Experiences konzipiert.
                </TranslatedText>
              </p>

              <div>
                <h3 className="text-lg font-semibold mb-3">
                  <TranslatedText>Blockchain-Features</TranslatedText>
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <TranslatedText>Sub-Sekunden-Finality für Gaming</TranslatedText></li>
                  <li>• <TranslatedText>Native NFT- und DeFi-Integration</TranslatedText></li>
                  <li>• <TranslatedText>Cross-Chain-Bridges zu allen Major-Blockchains</TranslatedText></li>
                  <li>• <TranslatedText>Carbon-neutral durch Proof-of-Stake</TranslatedText></li>
                </ul>
              </div>

              <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground">
                  <TranslatedText>
                    Die eigene Blockchain wird volle Interoperabilität mit bestehenden 
                    Netzwerken gewährleisten und als Brücke zwischen Web2-Gaming und 
                    Web3-Innovation fungieren.
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