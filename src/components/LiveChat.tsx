import { useState, useEffect, useRef } from 'react';
import { useWallet } from '@/hooks/useWallet';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChatMessage {
  id: string;
  user_address: string;
  username: string | null;
  message: string;
  created_at: string;
}

export function LiveChat() {
  const { address, isConnected } = useWallet();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Load initial messages
  useEffect(() => {
    loadMessages();
  }, []);

  // Subscribe to real-time updates
  useEffect(() => {
    const channel = supabase
      .channel('live_chat')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'live_chat_messages'
        },
        (payload) => {
          const newMessage = payload.new as ChatMessage;
          setMessages(prev => [...prev, newMessage]);
          scrollToBottom();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('live_chat_messages')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(100);

      if (error) throw error;
      setMessages(data || []);
      setTimeout(scrollToBottom, 100);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !isConnected || !address) {
      toast({
        title: "Fehler",
        description: "Verbinde deine Wallet um zu chatten.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('live_chat_messages')
        .insert({
          user_address: address,
          username: `${address.slice(0, 6)}...${address.slice(-4)}`,
          message: newMessage.trim()
        });

      if (error) throw error;
      
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Fehler",
        description: "Nachricht konnte nicht gesendet werden.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAvatarInitials = (username: string | null) => {
    if (!username) return '?';
    return username.slice(0, 2).toUpperCase();
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Live Chat
          <span className="text-sm font-normal text-muted-foreground">
            ({messages.length} Nachrichten)
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-4 space-y-4">
        {/* Messages */}
        <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Noch keine Nachrichten</p>
                <p className="text-sm">Sei der erste, der schreibt!</p>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className="flex gap-3 group">
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarFallback className="text-xs bg-primary/10">
                      {getAvatarInitials(message.username)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">
                        {message.username || 'Anonym'}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(message.created_at)}
                      </span>
                    </div>
                    
                    <div className="text-sm break-words">
                      {message.message}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <form onSubmit={sendMessage} className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={isConnected ? "Nachricht schreiben..." : "Wallet verbinden um zu chatten"}
            disabled={!isConnected || isLoading}
            maxLength={500}
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={!isConnected || !newMessage.trim() || isLoading}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>

        {!isConnected && (
          <p className="text-xs text-muted-foreground text-center">
            Verbinde deine Wallet um am Chat teilzunehmen
          </p>
        )}
      </CardContent>
    </Card>
  );
}