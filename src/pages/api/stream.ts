// API route for Livepeer stream management
// This would be implemented as a Supabase Edge Function in production

import { createStream, getStream, getAllStreams } from '@/lib/livepeer';

export default async function handler(req: any, res: any) {
  try {
    switch (req.method) {
      case 'GET':
        if (req.query.id) {
          // Get specific stream
          const stream = await getStream(req.query.id);
          if (!stream) {
            return res.status(404).json({ error: 'Stream not found' });
          }
          res.status(200).json(stream);
        } else {
          // Get all streams
          const streams = await getAllStreams();
          res.status(200).json(streams);
        }
        break;

      case 'POST':
        // Create new stream
        const { name } = req.body;
        if (!name) {
          return res.status(400).json({ error: 'Stream name is required' });
        }

        const newStream = await createStream(name);
        res.status(201).json(newStream);
        break;

      default:
        res.status(405).json({ error: 'Method not allowed' });
        break;
    }
  } catch (error) {
    console.error('Stream API error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}