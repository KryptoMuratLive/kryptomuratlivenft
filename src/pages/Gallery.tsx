import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, ExternalLink, Heart } from "lucide-react";

const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRarity, setSelectedRarity] = useState("all");

  const nftCollection = [
    {
      id: "001",
      name: "Murat's Escape",
      image: "/placeholder.svg",
      rarity: "Common",
      episode: "Episode 1",
      owner: "0x1234...5678",
      price: "0.05 ETH",
      isOwned: true
    },
    {
      id: "002", 
      name: "Bitcoin Jäger",
      image: "/placeholder.svg",
      rarity: "Rare",
      episode: "Episode 1",
      owner: "0x9876...4321",
      price: "0.15 ETH",
      isOwned: false
    },
    {
      id: "003",
      name: "The Underground",
      image: "/placeholder.svg", 
      rarity: "Epic",
      episode: "Episode 2",
      owner: "0x5555...9999",
      price: "0.25 ETH",
      isOwned: false
    },
    {
      id: "004",
      name: "Digital Wallet",
      image: "/placeholder.svg",
      rarity: "Common", 
      episode: "Episode 2",
      owner: "0x1111...2222",
      price: "0.08 ETH",
      isOwned: true
    },
    {
      id: "005",
      name: "Master Key",
      image: "/placeholder.svg",
      rarity: "Legendary",
      episode: "Episode 3",
      owner: "0x7777...8888",
      price: "1.5 ETH",
      isOwned: false
    },
    {
      id: "006",
      name: "Satoshi's Legacy",
      image: "/placeholder.svg",
      rarity: "Legendary",
      episode: "Episode 3", 
      owner: "You",
      price: "2.0 ETH",
      isOwned: true
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common": return "bg-gray-600";
      case "Rare": return "bg-blue-600";
      case "Epic": return "bg-purple-600";
      case "Legendary": return "bg-yellow-600";
      default: return "bg-gray-600";
    }
  };

  const filteredNFTs = nftCollection.filter(nft => {
    const matchesSearch = nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         nft.episode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRarity = selectedRarity === "all" || nft.rarity.toLowerCase() === selectedRarity;
    return matchesSearch && matchesRarity;
  });

  const myNFTs = filteredNFTs.filter(nft => nft.isOwned);
  const allNFTs = filteredNFTs;

  return (
    <div className="min-h-screen bg-crypto-dark">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20 pb-12">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="bg-purple-600 text-white mb-4">
            <Heart className="mr-1" size={16} />
            NFT COLLECTION
          </Badge>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            KryptoMurat Gallery
          </h1>
          <p className="text-xl text-muted-foreground">
            Entdecke und sammle einzigartige NFTs aus der Serie
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="flex items-center justify-center p-6">
              <div>
                <p className="text-2xl font-bold text-foreground">346</p>
                <p className="text-sm text-muted-foreground">Total NFTs</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="flex items-center justify-center p-6">
              <div>
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-sm text-muted-foreground">Meine NFTs</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="flex items-center justify-center p-6">
              <div>
                <p className="text-2xl font-bold text-foreground">12.5 ETH</p>
                <p className="text-sm text-muted-foreground">Floor Price</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="flex items-center justify-center p-6">
              <div>
                <p className="text-2xl font-bold text-foreground">156</p>
                <p className="text-sm text-muted-foreground">Unique Holder</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-card border-border mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                  <Input
                    placeholder="Suche nach Name oder Episode..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-background border-border"
                  />
                </div>
              </div>
              <Select value={selectedRarity} onValueChange={setSelectedRarity}>
                <SelectTrigger className="w-full md:w-48 bg-background border-border">
                  <SelectValue placeholder="Rarity Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Raritäten</SelectItem>
                  <SelectItem value="common">Common</SelectItem>
                  <SelectItem value="rare">Rare</SelectItem>
                  <SelectItem value="epic">Epic</SelectItem>
                  <SelectItem value="legendary">Legendary</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* NFT Grid */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all">Alle NFTs ({allNFTs.length})</TabsTrigger>
            <TabsTrigger value="owned">Meine NFTs ({myNFTs.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allNFTs.map((nft) => (
                <Card key={nft.id} className="bg-card border-border overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-secondary relative">
                    <img 
                      src={nft.image} 
                      alt={nft.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge 
                      className={`absolute top-2 right-2 ${getRarityColor(nft.rarity)} text-white`}
                    >
                      {nft.rarity}
                    </Badge>
                    {nft.isOwned && (
                      <Badge className="absolute top-2 left-2 bg-green-600 text-white">
                        Owned
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-1">{nft.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">#{nft.id} • {nft.episode}</p>
                    
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-muted-foreground">Owner:</span>
                      <span className="text-sm text-foreground">{nft.owner}</span>
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-bold text-bitcoin">{nft.price}</span>
                      <Button variant="outline" size="sm">
                        <ExternalLink size={16} className="mr-1" />
                        OpenSea
                      </Button>
                    </div>
                    
                    {!nft.isOwned && (
                      <Button className="w-full" variant="default">
                        Kaufen
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="owned" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myNFTs.map((nft) => (
                <Card key={nft.id} className="bg-card border-border overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-secondary relative">
                    <img 
                      src={nft.image} 
                      alt={nft.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge 
                      className={`absolute top-2 right-2 ${getRarityColor(nft.rarity)} text-white`}
                    >
                      {nft.rarity}
                    </Badge>
                    <Badge className="absolute top-2 left-2 bg-green-600 text-white">
                      Owned
                    </Badge>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-1">{nft.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">#{nft.id} • {nft.episode}</p>
                    
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-bold text-bitcoin">{nft.price}</span>
                      <Button variant="outline" size="sm">
                        <ExternalLink size={16} className="mr-1" />
                        Details
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        Transfer
                      </Button>
                      <Button variant="outline" size="sm">
                        Verkaufen
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Gallery;