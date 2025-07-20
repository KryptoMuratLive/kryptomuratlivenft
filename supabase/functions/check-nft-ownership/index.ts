import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { walletAddress, contractAddress, chain = 'polygon' } = await req.json()
    
    if (!walletAddress) {
      return new Response(
        JSON.stringify({ error: 'Wallet address is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get Moralis API key from secrets
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const moralisApiKey = Deno.env.get('MORALIS_API_KEY')
    if (!moralisApiKey) {
      return new Response(
        JSON.stringify({ error: 'Moralis API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get NFTs for the wallet
    const response = await fetch(
      `https://deep-index.moralis.io/api/v2/${walletAddress}/nft?chain=${chain}&format=decimal&limit=100`,
      {
        headers: {
          'Accept': 'application/json',
          'X-API-Key': moralisApiKey,
        },
      }
    )

    if (!response.ok) {
      throw new Error(`Moralis API error: ${response.status}`)
    }

    const data = await response.json()
    
    // Filter NFTs by contract address if provided
    let nfts = data.result || []
    if (contractAddress) {
      nfts = nfts.filter((nft: any) => 
        nft.token_address.toLowerCase() === contractAddress.toLowerCase()
      )
    }

    const nftCount = nfts.length
    const nftTokenIds = nfts.map((nft: any) => nft.token_id)

    return new Response(
      JSON.stringify({
        hasNFT: nftCount > 0,
        nftCount,
        nftTokenIds,
        contractAddress: contractAddress || 'all',
        nfts: nfts.map((nft: any) => ({
          tokenId: nft.token_id,
          contractAddress: nft.token_address,
          name: nft.name || `NFT #${nft.token_id}`,
          image: nft.normalized_metadata?.image || nft.metadata?.image,
          description: nft.normalized_metadata?.description || nft.metadata?.description,
          attributes: nft.normalized_metadata?.attributes || nft.metadata?.attributes || []
        }))
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error checking NFT ownership:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to check NFT ownership' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})