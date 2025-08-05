-- Create table for sidequest progress tracking
CREATE TABLE public.sidequest_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT NOT NULL,
  quest_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(wallet_address)
);

-- Enable Row Level Security
ALTER TABLE public.sidequest_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own sidequest progress" 
ON public.sidequest_progress 
FOR SELECT 
USING (true);

CREATE POLICY "Users can insert their own sidequest progress" 
ON public.sidequest_progress 
FOR INSERT 
WITH CHECK (wallet_address IS NOT NULL);

CREATE POLICY "Users can update their own sidequest progress" 
ON public.sidequest_progress 
FOR UPDATE 
USING (wallet_address IS NOT NULL);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_sidequest_progress_updated_at
BEFORE UPDATE ON public.sidequest_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();