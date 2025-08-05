import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/Footer';

interface Meme {
  id: string;
  top_text: string;
  image_data: string;
  created_at: string;
}

interface Vote {
  meme_id: string;
  count: number;
}

export default function MemeBattle() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchMemes();
    fetchVotes();
  }, []);

  const fetchMemes = async () => {
    const { data, error } = await supabase
      .from('memes')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(2);
    
    if (data) {
      setMemes(data);
    }
    if (error) {
      console.error('Fehler beim Laden der Memes:', error);
    }
    setLoading(false);
  };

  const fetchVotes = async () => {
    const { data, error } = await supabase
      .from('votes')
      .select('meme_id')
      .order('created_at', { ascending: false });
    
    if (data) {
      // Stimmen pro Meme zählen
      const voteCounts = data.reduce((acc, vote) => {
        acc[vote.meme_id] = (acc[vote.meme_id] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const voteArray = Object.entries(voteCounts).map(([meme_id, count]) => ({
        meme_id,
        count
      }));
      
      setVotes(voteArray);
    }
  };

  const submitVote = async (memeId: string) => {
    try {
      // IP-Adresse abrufen
      const ipResponse = await fetch('https://api64.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const voterIp = ipData.ip;

      const { error } = await supabase.from('votes').insert([
        {
          meme_id: memeId,
          voter_ip: voterIp,
          created_at: new Date().toISOString()
        }
      ]);

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Bereits abgestimmt",
            description: "Du hast bereits für ein Meme in dieser Schlacht abgestimmt!",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Fehler",
            description: "Voting fehlgeschlagen. Bitte versuche es erneut.",
            variant: "destructive",
          });
        }
        console.error('Voting Error:', error);
      } else {
        setVoted(true);
        fetchVotes(); // Aktualisiere die Stimmen
        toast({
          title: "Erfolgreich abgestimmt!",
          description: "Deine Stimme wurde gezählt.",
        });
      }
    } catch (error) {
      console.error('Error submitting vote:', error);
      toast({
        title: "Fehler",
        description: "Unerwarteter Fehler beim Abstimmen.",
        variant: "destructive",
      });
    }
  };

  const getVoteCount = (memeId: string) => {
    const vote = votes.find(v => v.meme_id === memeId);
    return vote ? vote.count : 0;
  };

  const getTotalVotes = () => {
    return votes.reduce((total, vote) => total + vote.count, 0);
  };

  const getVotePercentage = (memeId: string) => {
    const totalVotes = getTotalVotes();
    if (totalVotes === 0) return 0;
    return Math.round((getVoteCount(memeId) / totalVotes) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Lade Meme-Schlacht...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            🏁 Meme-Schlacht – Wer gewinnt die Verfolgung?
          </h1>
          <p className="text-xl text-muted-foreground">
            Stimme für dein Lieblings-Meme ab!
          </p>
          {getTotalVotes() > 0 && (
            <p className="text-lg text-muted-foreground mt-2">
              Gesamtstimmen: {getTotalVotes()}
            </p>
          )}
        </div>

        {!voted ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {memes.map((meme) => (
              <Card key={meme.id} className="bg-card border-border shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl text-card-foreground">
                    {meme.top_text}
                  </CardTitle>
                  <CardDescription>
                    Stimmen: {getVoteCount(meme.id)} ({getVotePercentage(meme.id)}%)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <img 
                      src={meme.image_data} 
                      alt="Meme" 
                      className="rounded-lg w-full h-64 object-cover"
                    />
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-muted rounded-full h-3">
                      <div 
                        className="bg-primary h-3 rounded-full transition-all duration-500"
                        style={{ width: `${getVotePercentage(meme.id)}%` }}
                      ></div>
                    </div>
                    
                    <Button
                      onClick={() => submitVote(meme.id)}
                      className="w-full"
                      size="lg"
                    >
                      🗳️ Für dieses Meme stimmen
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <Card className="max-w-md mx-auto bg-card border-border">
              <CardContent className="pt-6">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-card-foreground mb-2">
                  Danke für deine Stimme!
                </h2>
                <p className="text-muted-foreground">
                  Deine Abstimmung wurde erfolgreich registriert.
                </p>
                
                {/* Ergebnisse anzeigen */}
                <div className="mt-6 space-y-3">
                  <h3 className="font-semibold text-card-foreground">Aktuelle Ergebnisse:</h3>
                  {memes.map((meme) => (
                    <div key={meme.id} className="text-left">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-card-foreground">{meme.top_text}</span>
                        <span className="text-sm text-muted-foreground">
                          {getVoteCount(meme.id)} Stimmen ({getVotePercentage(meme.id)}%)
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${getVotePercentage(meme.id)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}