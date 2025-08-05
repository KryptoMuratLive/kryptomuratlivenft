-- Create game_progress table for saving story mode progress
CREATE TABLE public.game_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT NOT NULL UNIQUE,
  current_step INTEGER NOT NULL DEFAULT 0,
  inventory JSONB DEFAULT '[]'::jsonb,
  choices_history JSONB DEFAULT '[]'::jsonb,
  has_jaeger_nft BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.game_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for game progress access
CREATE POLICY "Users can view their own progress" 
ON public.game_progress 
FOR SELECT 
USING (true);

CREATE POLICY "Users can insert their own progress" 
ON public.game_progress 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update their own progress" 
ON public.game_progress 
FOR UPDATE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_game_progress_updated_at
  BEFORE UPDATE ON public.game_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance on wallet queries
CREATE INDEX idx_game_progress_wallet ON public.game_progress(wallet_address);