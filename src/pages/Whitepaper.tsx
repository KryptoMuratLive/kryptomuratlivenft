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
            🧾 Whitepaper – MURAT Token
          </h1>
          <p className="text-xl text-muted-foreground">
            Interaktive, dezentrale Web3-Plattform mit MURAT-Token
          </p>
          <Badge variant="outline" className="mt-4">
            Version 2.0 - Januar 2025
          </Badge>
        </div>

        <div className="space-y-8">
          {/* Einleitung */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                1. Einleitung
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                MURAT ist mehr als ein Token – es ist die Grundlage eines interaktiven, dezentralen Entertainment- und Community-Ökosystems.
                Unser Ziel ist es, ein globales Web3-Erlebnis zu erschaffen, bei dem Zuschauer nicht nur konsumieren, sondern live teilnehmen, mitentscheiden und profitieren – durch Livestreams, Abstimmungen, NFTs und ein einzigartiges Game-Konzept: "Jagd auf den Bitcoin".
              </p>
            </CardContent>
          </Card>

          {/* Vision */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                2. Vision
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                MURAT ist die Basis einer Web3-Plattform, auf der ein dezentral gesteuertes Live-Spiel stattfindet – mit realen Elementen, Live-Voting, NFT-Zugang und einem Token, der nicht nur als Währung dient, sondern als Schlüssel zur Mitgestaltung.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Zuschauer weltweit – ob aus Deutschland, der Türkei, den USA oder Japan – können live in das Geschehen eingreifen. Ob im Voting, durch NFT-Besitz oder mit eigenen Inhalten: Web3 gehört der Community, nicht zentralen Plattformen.
              </p>
            </CardContent>
          </Card>

          {/* Technische Grundlage */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                3. Technische Grundlage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Token-Name</h4>
                  <p className="text-muted-foreground">MURAT</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Symbol</h4>
                  <p className="text-muted-foreground">MURAT</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Chain</h4>
                  <p className="text-muted-foreground">Polygon (MATIC)</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Supply</h4>
                  <p className="text-muted-foreground">1.000.000.000 (1 Milliarde Tokens)</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Typ</h4>
                  <p className="text-muted-foreground">ERC-20, multichain-fähig</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Decimals</h4>
                  <p className="text-muted-foreground">18</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Mintbarkeit</h4>
                  <p className="text-muted-foreground">Nein (feste Menge)</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Upgrades</h4>
                  <p className="text-muted-foreground">Deaktiviert (sicher)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tokenomics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                4. Tokenomics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="border border-border p-3 text-left">Zweck</th>
                      <th className="border border-border p-3 text-left">Anteil</th>
                      <th className="border border-border p-3 text-left">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border p-3">Community</td>
                      <td className="border border-border p-3">40 %</td>
                      <td className="border border-border p-3">Airdrops, Belohnungen, Spiel-Beteiligung, Creator-Initiativen</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Liquidity (gelockt)</td>
                      <td className="border border-border p-3">20 %</td>
                      <td className="border border-border p-3">DEX-Pools auf Polygon & später Base/Arbitrum</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Projektentwicklung</td>
                      <td className="border border-border p-3">15 %</td>
                      <td className="border border-border p-3">Creator, Infrastruktur, Tools</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Marketing & Partner</td>
                      <td className="border border-border p-3">10 %</td>
                      <td className="border border-border p-3">Launch-Strategien, Web3-Influencer, Kollaborationen</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Staking Rewards</td>
                      <td className="border border-border p-3">10 %</td>
                      <td className="border border-border p-3">Laufende Belohnung für Halter</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Reserve & Treasury</td>
                      <td className="border border-border p-3">5 %</td>
                      <td className="border border-border p-3">Für langfristige Systemstabilität</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-primary">
                <p className="text-sm text-muted-foreground">
                  → Alle Entwickler- und Treasury-Wallets werden mit Vesting & Sperrfristen versehen, um Vertrauen und Fairness sicherzustellen.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Einnahmemodell */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                5. Einnahmemodell (Fair und nachhaltig)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Der Creator verdient nicht über Preismanipulation, sondern über:
              </p>
              <ul className="space-y-2 text-muted-foreground ml-4">
                <li>📦 Plattformnutzung (NFTs, Zugang, Voting)</li>
                <li>📊 1 % Transaktionsgebühr als Treasury-Zufluss</li>
                <li>🔐 Treasury-Wallets mit Sperrzeit & Offenlegung</li>
                <li>👥 Community-Einnahmen durch Aktivität & Belohnungen</li>
              </ul>
            </CardContent>
          </Card>

          {/* Sicherheit & Schutzmechanismen */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                6. Sicherheit & Schutzmechanismen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-muted-foreground">
                <li>✅ Anti-Dump-Funktion: Verkaufsbegrenzung pro Wallet / Zeit</li>
                <li>✅ Sell-Tax (3 %): Aufgeteilt auf Treasury, Burn, Community</li>
                <li>✅ Cooldown zwischen Käufen/Verkäufen</li>
                <li>✅ LP wird gelockt über Drittanbieter (Unicrypt, Pinksale)</li>
                <li>✅ Keine Mint-Funktion, kein versteckter Admin-Zugriff</li>
                <li>✅ Contract wird auf Polygonscan verifiziert & öffentlich dokumentiert</li>
              </ul>
            </CardContent>
          </Card>

          {/* NFT- & Game-Integration */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                7. NFT- & Game-Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  🎮 Spiel: „Jagd auf den Bitcoin"
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Ein reales Game, bei dem Zuschauer über den Ausgang mitentscheiden. Der „Gejagte" (Creator) muss Herausforderungen bestehen – die Community entscheidet per Live-Voting, wie der Weg verläuft. NFT-Pässe geben Einflussrechte, Voting-Stimmen, Belohnungen und Zugang zu exklusiven Inhalten.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  📦 NFT Use Cases:
                </h3>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li>• Zugangs-NFTs („Jagdpass")</li>
                  <li>• Creator Cards & Memes</li>
                  <li>• Belohnungs-NFTs</li>
                  <li>• Sammlerstücke mit Seriencharakter</li>
                  <li>• Custom-NFTs mit Creator-Interaktion</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Multichain-Strategie */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                8. Multichain-Strategie
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Das Projekt ist von Beginn an multichain-kompatibel geplant:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="border border-border p-3 text-left">Chain</th>
                      <th className="border border-border p-3 text-left">Rolle</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border p-3">Polygon</td>
                      <td className="border border-border p-3">Hauptchain für Token & NFTs (niedrige Gebühren)</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Base / Arbitrum</td>
                      <td className="border border-border p-3">Erweiterung für neue Zielgruppen</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Ethereum L1</td>
                      <td className="border border-border p-3">Für Premium-NFTs / CEX-Kompatibilität</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Solana (optional)</td>
                      <td className="border border-border p-3">Crossover-Zugang für Game-Items</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Globale Beteiligung */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                9. Globale Beteiligung
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>Grenzenlos:</strong> Die Plattform ist so konzipiert, dass Nutzer weltweit teilnehmen können – unabhängig von Sprache oder Standort:
              </p>
              <ul className="space-y-2 text-muted-foreground ml-4">
                <li>🌐 Wallet-Login per MetaMask / WalletConnect</li>
                <li>🗳️ Voting per Token- oder NFT-Ownership</li>
                <li>🎥 Livestream mit KI-gestützter Sprachübersetzung (Whisper + Marian + Piper)</li>
                <li>🛠️ Webseite & Inhalte auf mehreren Sprachen verfügbar</li>
              </ul>
            </CardContent>
          </Card>

          {/* Rechtliche Struktur */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                10. Rechtliche Struktur & Schutz
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-muted-foreground">
                <li>• Rechtssichere Tokenstruktur nach EU-Maßstab (kein Security-Token, kein Versprechen auf Gewinne)</li>
                <li>• Creator haftet nicht für Verluste der Käufer</li>
                <li>• NFTs sind als digitale Sammelobjekte klassifiziert</li>
                <li>• Keine zentralisierte Verwahrung oder Kontrolle über User-Funds</li>
                <li>• Alle Wallets werden dezentral verwaltet</li>
              </ul>
              <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-primary mt-4">
                <p className="text-sm text-muted-foreground">
                  Der Creator bleibt ideengebender Host, nicht Herausgeber einer Finanzdienstleistung. Plattform = Community-getrieben.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Roadmap */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                11. Roadmap (2025–2026)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-primary">Q3 2025</h3>
                  <p className="text-sm text-muted-foreground">
                    Token-Launch auf Polygon, Whitepaper, Website live
                  </p>
                </div>
                <div className="border-l-4 border-muted pl-4">
                  <h3 className="font-semibold">Q4 2025</h3>
                  <p className="text-sm text-muted-foreground">
                    NFT-Kollektion, Voting-System, TikTok-Kampagne
                  </p>
                </div>
                <div className="border-l-4 border-muted pl-4">
                  <h3 className="font-semibold">Q1 2026</h3>
                  <p className="text-sm text-muted-foreground">
                    Livestream-Gate & Community-Spiel-Voting
                  </p>
                </div>
                <div className="border-l-4 border-muted pl-4">
                  <h3 className="font-semibold">Q2 2026</h3>
                  <p className="text-sm text-muted-foreground">
                    Multichain-Integration & CoinGecko/CMC Listing
                  </p>
                </div>
                <div className="border-l-4 border-muted pl-4">
                  <h3 className="font-semibold">Q3 2026</h3>
                  <p className="text-sm text-muted-foreground">
                    Staking, Creator-NFT-Markt, Launch auf BitMart/MEXC
                  </p>
                </div>
                <div className="border-l-4 border-muted pl-4">
                  <h3 className="font-semibold">Q4 2026</h3>
                  <p className="text-sm text-muted-foreground">
                    Metaverse-Testzugänge, Crosschain-Brücke, Mobile-App
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Schlusswort */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                12. Schlusswort
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-6 rounded-lg border-l-4 border-primary">
                <h3 className="text-lg font-semibold mb-3">
                  MURAT ist nicht einfach nur ein Token.
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Es ist der Eintritt in ein neues, aktives Web3-Erlebnis, das Creator, Community und Technologie auf eine neue Stufe bringt.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Mit MURAT baust du keine Plattform für Konsumenten, sondern ein System für Mitgestalter. Jeder kann etwas beitragen. Jeder kann Teil der Geschichte werden. 
                </p>
                <p className="text-primary font-semibold">
                  Und du bist der Erste, der das startet.
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