// Livepeer API integration for live streaming

const LIVEPEER_API_KEY = "0b8aedbd-2eca-494c-a5fd-2e5b3770b382";
const LIVEPEER_BASE_URL = "https://livepeer.studio/api";

export interface StreamData {
  id: string;
  name: string;
  playbackId: string;
  isActive: boolean;
  streamKey: string;
}

export const createStream = async (name: string): Promise<StreamData> => {
  try {
    const response = await fetch(`${LIVEPEER_BASE_URL}/stream`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LIVEPEER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        profiles: [
          {
            name: "720p",
            bitrate: 2000000,
            fps: 30,
            width: 1280,
            height: 720,
          },
          {
            name: "480p", 
            bitrate: 1000000,
            fps: 30,
            width: 854,
            height: 480,
          }
        ]
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create stream');
    }

    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      playbackId: data.playbackId,
      isActive: data.isActive,
      streamKey: data.streamKey,
    };
  } catch (error) {
    console.error('Error creating stream:', error);
    throw error;
  }
};

export const getStream = async (streamId: string): Promise<StreamData | null> => {
  try {
    const response = await fetch(`${LIVEPEER_BASE_URL}/stream/${streamId}`, {
      headers: {
        'Authorization': `Bearer ${LIVEPEER_API_KEY}`,
      },
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to get stream');
    }

    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      playbackId: data.playbackId,
      isActive: data.isActive,
      streamKey: data.streamKey,
    };
  } catch (error) {
    console.error('Error getting stream:', error);
    return null;
  }
};

export const getAllStreams = async (): Promise<StreamData[]> => {
  try {
    const response = await fetch(`${LIVEPEER_BASE_URL}/stream`, {
      headers: {
        'Authorization': `Bearer ${LIVEPEER_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get streams');
    }

    const data = await response.json();
    return data.map((stream: any) => ({
      id: stream.id,
      name: stream.name,
      playbackId: stream.playbackId,
      isActive: stream.isActive,
      streamKey: stream.streamKey,
    }));
  } catch (error) {
    console.error('Error getting streams:', error);
    return [];
  }
};

// Get playback URL for a stream
export const getPlaybackUrl = (playbackId: string, quality: '720p' | '480p' | 'source' = 'source'): string => {
  return `https://livepeercdn.studio/hls/${playbackId}/index.m3u8`;
};