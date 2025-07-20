import React, { createContext, useContext, useState, ReactNode } from 'react';

export type LiveMode = 'none' | 'event' | 'community';

interface LiveContextType {
  liveMode: LiveMode;
  eventData: {
    title?: string;
    startTime?: string;
    nftTokenId?: string;
    organizer?: string;
  } | null;
  startEvent: (title: string, nftTokenId?: string, organizer?: string) => void;
  startCommunity: () => void;
  stopLive: () => void;
}

const LiveContext = createContext<LiveContextType | undefined>(undefined);

export const LiveProvider = ({ children }: { children: ReactNode }) => {
  const [liveMode, setLiveMode] = useState<LiveMode>('none');
  const [eventData, setEventData] = useState<LiveContextType['eventData']>(null);

  const startEvent = (title: string, nftTokenId?: string, organizer?: string) => {
    setLiveMode('event');
    setEventData({
      title,
      startTime: new Date().toISOString(),
      nftTokenId,
      organizer,
    });
  };

  const startCommunity = () => {
    setLiveMode('community');
    setEventData(null);
  };

  const stopLive = () => {
    setLiveMode('none');
    setEventData(null);
  };

  return (
    <LiveContext.Provider value={{
      liveMode,
      eventData,
      startEvent,
      startCommunity,
      stopLive,
    }}>
      {children}
    </LiveContext.Provider>
  );
};

export const useLive = () => {
  const context = useContext(LiveContext);
  if (context === undefined) {
    throw new Error('useLive must be used within a LiveProvider');
  }
  return context;
};