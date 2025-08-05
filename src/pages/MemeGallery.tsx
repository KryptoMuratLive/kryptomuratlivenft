import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/Footer';

interface Meme {
  id: string;
  top_text: string;
  image_data: string;
  created_at: string;
}

export default function MemeGallery() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMemes();
  }, []);

  const fetchMemes = async () => {
    const { data, error } = await supabase
      .from('memes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) {
      setMemes(data);
    }
    if (error) {
      console.error('Fehler beim Laden der Memes:', error);
    }
    setLoading(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Lade Meme-Galerie...</p>
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
            🖼️ Meme-Galerie
          </h1>
          <p className="text-xl text-muted-foreground">
            Hier findest du alle Memes, die von Spielern generiert wurden.
          </p>
          <p className="text-lg text-muted-foreground mt-2">
            Insgesamt {memes.length} Memes
          </p>
        </div>

        {memes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Noch keine Memes vorhanden
            </h2>
            <p className="text-muted-foreground">
              Sei der erste und erstelle ein Meme!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {memes.map((meme) => (
              <Card key={meme.id} className="bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-card-foreground line-clamp-2">
                    {meme.top_text}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {formatDate(meme.created_at)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img 
                      src={meme.image_data} 
                      alt={meme.top_text}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {memes.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-muted-foreground">
              Du hast das Ende der Galerie erreicht! 🎉
            </p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}