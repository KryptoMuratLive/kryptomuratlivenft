-- Create memes table
CREATE TABLE public.memes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  top_text TEXT NOT NULL,
  image_data TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create votes table
CREATE TABLE public.votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  meme_id UUID NOT NULL REFERENCES public.memes(id),
  voter_ip TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(meme_id, voter_ip)
);

-- Enable Row Level Security
ALTER TABLE public.memes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;

-- Create policies for memes (everyone can view)
CREATE POLICY "Everyone can view memes" 
ON public.memes 
FOR SELECT 
USING (true);

-- Create policies for votes (everyone can view and insert)
CREATE POLICY "Everyone can view votes" 
ON public.votes 
FOR SELECT 
USING (true);

CREATE POLICY "Everyone can insert votes" 
ON public.votes 
FOR INSERT 
WITH CHECK (true);

-- Insert some sample memes
INSERT INTO public.memes (top_text, image_data) VALUES 
('Wenn du denkst du bist schnell', '/lovable-uploads/1139925c-a258-4040-8931-e72b699f3960.png'),
('Murat beim Racing', '/lovable-uploads/13bf4ef5-1c70-42e9-9ea1-a297b15d7aca.png');