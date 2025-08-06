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
            📜 Whitepaper – MURAT Token
          </h1>
          <p className="text-xl text-muted-foreground">
            Interaktive, dezentrale Web3-Plattform mit MURAT-Token
          </p>
          <Badge variant="outline" className="mt-4">
            Stand: August 2025
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
                MURAT ist mehr als ein Token – es ist das Herzstück einer interaktiven, dezentralen Web3-Plattform, die Livestreaming, Community-Voting, Meme-Kultur und NFTs in einem einzigartigen Konzept vereint.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Das Hauptspiel: „Jagd auf den Bitcoin" – eine Mischung aus Live-Abenteuer, Meme-Battle und Community-Voting – verbindet Unterhaltung, Partizipation und Krypto-Ökonomie auf neue Weise.
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
                Unser Ziel ist es, ein globales, nutzerzentriertes Web3-Ökosystem zu schaffen, bei dem Creator und Community gemeinsam agieren, entscheiden und profitieren.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Die Plattform ist so gestaltet, dass Nutzer durch:
              </p>
              <ul className="space-y-2 text-muted-foreground ml-4">
                <li>• NFTs</li>
                <li>• Token-Besitz</li>
                <li>• Live-Interaktion</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                aktiv am Geschehen teilnehmen – nicht nur passiv zuschauen.
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
                  <p className="text-muted-foreground">10.000.000 (10 Millionen Tokens)</p>
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
                      <td className="border border-border p-3">Community Airdrops</td>
                      <td className="border border-border p-3">20 %</td>
                      <td className="border border-border p-3">2.000.000 Token - Airdrops, Belohnungen, Community-Initiativen</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Staking Rewards</td>
                      <td className="border border-border p-3">20 %</td>
                      <td className="border border-border p-3">2.000.000 Token - Laufende Belohnungen für Token-Halter</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Ecosystem Fund</td>
                      <td className="border border-border p-3">15 %</td>
                      <td className="border border-border p-3">1.500.000 Token - Plattformwachstum, Partnerschaften, Entwicklung</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Team & Founders</td>
                      <td className="border border-border p-3">15 %</td>
                      <td className="border border-border p-3">1.500.000 Token - Team-Allocation mit Vesting-Zeitraum</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">AI & Dev Innovation</td>
                      <td className="border border-border p-3">10 %</td>
                      <td className="border border-border p-3">1.000.000 Token - KI-Integration, technische Innovationen</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Treasury / DAO</td>
                      <td className="border border-border p-3">10 %</td>
                      <td className="border border-border p-3">1.000.000 Token - DAO-Governance, langfristige Stabilität</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Initial Liquidity Pool</td>
                      <td className="border border-border p-3">10 %</td>
                      <td className="border border-border p-3">1.000.000 Token - DEX-Liquidität auf Polygon (gelockt)</td>
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
                5. Einnahmemodell
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-muted-foreground ml-4">
                <li>🧠 Plattformnutzung (Zugang nur für Tokenholder)</li>
                <li>🖼 NFT-Minting (z. B. Meme-NFTs, Spielkarten, Sammlerstücke)</li>
                <li>📊 1 % Transaktionsgebühr → fließt in die Treasury</li>
                <li>🔐 Kein zentrales Halten von User-Funds</li>
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
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">✅ Anti-Dump</h4>
                    <p className="text-sm text-muted-foreground">Verkaufsbegrenzung pro Wallet / Zeitfenster</p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">✅ Sell-Tax 3 %</h4>
                    <p className="text-sm text-muted-foreground">Aufgeteilt auf Treasury, Burn (1 %), Community</p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">✅ Cooldown</h4>
                    <p className="text-sm text-muted-foreground">Wartezeit zwischen Trades</p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">✅ Blacklist-Funktion</h4>
                    <p className="text-sm text-muted-foreground">Schutz vor böswilligen Wallets</p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">✅ Token-Gate-Prüfung</h4>
                    <p className="text-sm text-muted-foreground">Zugang zu Inhalten nur mit mind. 10 MURAT Token</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* NFT- & Game-Integration */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                7. NFT- und Game-Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  🎮 Spiel: „Jagd auf den Bitcoin"
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Ein interaktives Livestream-Game, in dem der Creator auf der Flucht ist – und die Community live entscheidet, was passiert. Spieler mit NFTs haben Voting-Rechte, Belohnungen, Einfluss auf Story-Entscheidungen.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  📦 NFT-Arten:
                </h3>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li>🎫 Zugangspässe (Jagdpass)</li>
                  <li>🧠 Creator-Memes</li>
                  <li>🏆 Belohnungen aus Rätseln & Battles</li>
                  <li>🎨 Limitierte Sammel-NFTs</li>
                  <li>🤖 Automatisch generierte Meme-NFTs (KI-basiert)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Meme Generator + Minting-Modul */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                8. Meme Generator + Minting-Modul
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-muted-foreground ml-4">
                <li>📸 Bilder & Memes werden automatisiert erzeugt (GPT + DALL·E)</li>
                <li>🪙 NFT-Minting-Logik vorhanden, aber bewusst später aktiviert</li>
                <li>🎭 Charaktere wiederverwendbar für Branding & Wiedererkennung</li>
              </ul>
            </CardContent>
          </Card>

          {/* Multichain & Wallet-Kompatibilität */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                9. Multichain & Wallet-Kompatibilität
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Polygon</h4>
                  <p className="text-sm text-muted-foreground">Hauptchain für Token + NFT</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Ethereum L1 (optional)</h4>
                  <p className="text-sm text-muted-foreground">CEX-Zugang & Premium-Assets</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Base / Arbitrum / Solana</h4>
                  <p className="text-sm text-muted-foreground">Geplante Brücken für Zielgruppen-Erweiterung</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Wallet-Support</h4>
                  <p className="text-sm text-muted-foreground">MetaMask, Rabby, Phantom, Trust - Voller Zugang mit WalletConnect v2</p>
                </div>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-primary">
                <p className="text-sm text-muted-foreground">
                  Email Login / Crossmint – Optional für nicht-kryptoaffine User
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Globale Community & Zugänge */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                10. Globale Community & Zugänge
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-muted-foreground ml-4">
                <li>🌐 Wallet-Login via WalletConnect / MetaMask</li>
                <li>🗳️ Voting auf der Seite nur mit NFT/MURAT</li>
                <li>🎥 Livestream per Livepeer + KI-Sprachübersetzung (Whisper + MarianMT)</li>
                <li>🌍 Webseite in Deutsch + Englisch</li>
              </ul>
            </CardContent>
          </Card>

          {/* Website-Zugang via Token-Gate */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                11. Website-Zugang via Token-Gate
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Bereiche wie /game, /stream, /airdrop, /vote und /mint sind nur nutzbar, wenn ein Wallet mindestens 10 MURAT Token hält.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Verknüpfung erfolgt clientseitig über Lovable (React, Vite, Tailwind), mit TokenCheck-Komponente.
              </p>
            </CardContent>
          </Card>

          {/* Rechtliche Struktur */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                12. Rechtliches & Transparenz
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-muted-foreground">
                <li>❌ Kein Security-Token</li>
                <li>✅ Kein Verwahrgeschäft</li>
                <li>📄 Offenlegung aller Developer-Wallets</li>
                <li>✅ Dokumentierte Contract-Verifikation (Polygonscan)</li>
                <li>⚖ EU-konform, keine Gewinnversprechen</li>
              </ul>
            </CardContent>
          </Card>

          {/* Roadmap */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                13. Roadmap
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-primary">Q3 2025</h3>
                  <p className="text-sm text-muted-foreground">
                    Token-Launch, Whitepaper, Website
                  </p>
                </div>
                <div className="border-l-4 border-muted pl-4">
                  <h3 className="font-semibold">Q4 2025</h3>
                  <p className="text-sm text-muted-foreground">
                    Meme-Battle-Spiel (Test), TikTok-Strategie
                  </p>
                </div>
                <div className="border-l-4 border-muted pl-4">
                  <h3 className="font-semibold">Q1 2026</h3>
                  <p className="text-sm text-muted-foreground">
                    NFT-Minting-Logik aktivieren
                  </p>
                </div>
                <div className="border-l-4 border-muted pl-4">
                  <h3 className="font-semibold">Q2 2026</h3>
                  <p className="text-sm text-muted-foreground">
                    DAO-Voting, Staking, Partner-Integration
                  </p>
                </div>
                <div className="border-l-4 border-muted pl-4">
                  <h3 className="font-semibold">Q3 2026</h3>
                  <p className="text-sm text-muted-foreground">
                    Mobile-App, Crossmint-Login, Community-Quests
                  </p>
                </div>
                <div className="border-l-4 border-muted pl-4">
                  <h3 className="font-semibold">Q4 2026</h3>
                  <p className="text-sm text-muted-foreground">
                    CEX-Listing, Metaverse-Demo, Streaming-Events
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Schlusswort */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                14. Schlusswort
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-6 rounded-lg border-l-4 border-primary">
                <h3 className="text-lg font-semibold mb-3">
                  MURAT steht für mehr als Krypto.
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Es ist die Bühne für Kreative, Streamer, Meme-Liebhaber und Web3-Entdecker.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Gemeinsam schaffen wir eine Plattform, in der alle teilhaben, mitentscheiden – und durch echte Beteiligung belohnt werden.
                </p>
                <p className="text-primary font-bold text-center text-xl">
                  MURAT gehört dir.
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