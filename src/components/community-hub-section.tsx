import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  Trophy,
  Share2,
  Heart,
  ExternalLink,
  Star,
  Activity,
  TrendingUp
} from "lucide-react";

export const CommunityHubSection = () => {
  const communityStats = [
    {
      label: "Community Mitglieder",
      value: "12,847",
      icon: Users,
      color: "text-bitcoin"
    },
    {
      label: "Aktive Diskussionen",
      value: "342",
      icon: MessageSquare,
      color: "text-electric-blue"
    },
    {
      label: "Events diese Woche",
      value: "8",
      icon: Calendar,
      color: "text-bitcoin"
    },
    {
      label: "NFT Gewinne",
      value: "156",
      icon: Trophy,
      color: "text-electric-blue"
    }
  ];

  const latestPosts = [
    {
      author: "CryptoMurat",
      content: "Mega spannende Episode heute! Was denkt ihr über den neuen Plot Twist? 🔥",
      likes: 127,
      replies: 23,
      time: "vor 2h",
      verified: true
    },
    {
      author: "BitcoinHunter92",
      content: "Hat jemand das Easter Egg in der letzten Episode gesehen? Ich glaube da war ein versteckter Hinweis...",
      likes: 89,
      replies: 31,
      time: "vor 4h",
      verified: false
    },
    {
      author: "NFTCollector",
      content: "Welches NFT aus der Serie ist euer Favorit? Ich liebe die limitierte Edition von Episode 3! ✨",
      likes: 156,
      replies: 45,
      time: "vor 6h",
      verified: true
    }
  ];

  const upcomingEvents = [
    {
      title: "Community AMA mit KryptoMurat",
      date: "Morgen, 19:00",
      type: "Live Stream",
      participants: 234
    },
    {
      title: "NFT Drop Event",
      date: "25. Juli, 15:00", 
      type: "Exclusive",
      participants: 567
    },
    {
      title: "Voting Power Workshop",
      date: "28. Juli, 20:00",
      type: "Tutorial",
      participants: 123
    }
  ];

  return (
    <section id="community" className="py-20 bg-crypto-dark">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="bg-electric-blue text-background mb-4">
            <Users className="mr-2" size={16} />
            COMMUNITY HUB
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-bitcoin to-electric-blue bg-clip-text text-transparent">
            Werde Teil der Community
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Diskutiere mit anderen Fans, nehme an Events teil und forme die Zukunft der Serie mit!
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {communityStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-card/80 backdrop-blur border-border hover:shadow-card-glow transition-all duration-300">
                <div className="p-6 text-center">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-bitcoin flex items-center justify-center`}>
                    <Icon className="text-crypto-dark" size={24} />
                  </div>
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Latest Community Posts */}
          <div className="lg:col-span-2">
            <Card className="bg-card/80 backdrop-blur border-border">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center">
                    <MessageSquare className="mr-2 text-electric-blue" />
                    Neueste Diskussionen
                  </h3>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="mr-2" size={16} />
                    Alle anzeigen
                  </Button>
                </div>

                <div className="space-y-4">
                  {latestPosts.map((post, index) => (
                    <div key={index} className="bg-secondary/30 rounded-lg p-4 hover:bg-secondary/40 transition-colors">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-gradient-bitcoin rounded-full flex items-center justify-center text-crypto-dark font-bold">
                          {post.author[0]}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-semibold">{post.author}</span>
                            {post.verified && (
                              <Star className="text-bitcoin" size={14} fill="currentColor" />
                            )}
                            <span className="text-xs text-muted-foreground">{post.time}</span>
                          </div>
                          <p className="text-sm mb-3">{post.content}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <button className="flex items-center space-x-1 hover:text-electric-blue transition-colors">
                              <Heart size={14} />
                              <span>{post.likes}</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-electric-blue transition-colors">
                              <MessageSquare size={14} />
                              <span>{post.replies}</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-electric-blue transition-colors">
                              <Share2 size={14} />
                              <span>Teilen</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <Button variant="bitcoin" className="w-full">
                    <MessageSquare className="mr-2" />
                    An Diskussion teilnehmen
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card className="bg-card/80 backdrop-blur border-border">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Calendar className="mr-2 text-bitcoin" />
                  Kommende Events
                </h3>

                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="bg-secondary/30 rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-sm">{event.title}</h4>
                          <p className="text-xs text-muted-foreground">{event.date}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {event.type}
                        </Badge>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Users size={12} className="mr-1" />
                        {event.participants} interessiert
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-4" size="sm">
                  <Calendar className="mr-2" size={16} />
                  Alle Events anzeigen
                </Button>
              </div>
            </Card>

            {/* Community Features */}
            <Card className="bg-card/80 backdrop-blur border-border">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Activity className="mr-2 text-electric-blue" />
                  Community Features
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="text-bitcoin" size={16} />
                      <span className="text-sm">Leaderboard</span>
                    </div>
                    <Button size="sm" variant="ghost">
                      Anzeigen
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Trophy className="text-electric-blue" size={16} />
                      <span className="text-sm">Achievements</span>
                    </div>
                    <Button size="sm" variant="ghost">
                      Sammeln
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="text-bitcoin" size={16} />
                      <span className="text-sm">Discord</span>
                    </div>
                    <Button size="sm" variant="ghost">
                      Beitreten
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-card/80 backdrop-blur border-border">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                
                <div className="space-y-3">
                  <Button variant="bitcoin" className="w-full" size="sm">
                    <MessageSquare className="mr-2" size={16} />
                    Neuen Post erstellen
                  </Button>
                  
                  <Button variant="outline" className="w-full" size="sm">
                    <Users className="mr-2" size={16} />
                    Freunde einladen
                  </Button>
                  
                  <Button variant="outline" className="w-full" size="sm">
                    <Star className="mr-2" size={16} />
                    Feedback geben
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};