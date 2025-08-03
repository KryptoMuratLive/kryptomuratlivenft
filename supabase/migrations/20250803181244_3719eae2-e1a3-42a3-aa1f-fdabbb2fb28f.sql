-- Create live chat messages table
CREATE TABLE public.live_chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_address TEXT NOT NULL,
  username TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.live_chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view chat messages" 
ON public.live_chat_messages 
FOR SELECT 
USING (true);

CREATE POLICY "Connected users can send messages" 
ON public.live_chat_messages 
FOR INSERT 
WITH CHECK (user_address IS NOT NULL);

-- Enable realtime
ALTER TABLE public.live_chat_messages REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.live_chat_messages;