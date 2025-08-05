-- Create nft_claims table for tracking NFT claims
CREATE TABLE public.nft_claims (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT NOT NULL,
  claimed BOOLEAN NOT NULL DEFAULT false,
  tx_hash TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(wallet_address)
);

-- Enable RLS
ALTER TABLE public.nft_claims ENABLE ROW LEVEL SECURITY;

-- Create policies for nft_claims
CREATE POLICY "Users can view their own claims" 
ON public.nft_claims 
FOR SELECT 
USING (true);

CREATE POLICY "Users can insert their own claims" 
ON public.nft_claims 
FOR INSERT 
WITH CHECK (wallet_address IS NOT NULL);

CREATE POLICY "Users can update their own claims" 
ON public.nft_claims 
FOR UPDATE 
USING (wallet_address IS NOT NULL);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_nft_claims_updated_at
BEFORE UPDATE ON public.nft_claims
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();