import { Badge } from '@/components/ui/badge';
import { useLive } from '@/contexts/LiveContext';

export const LiveStatusBadge = () => {
  const { liveMode, eventData } = useLive();

  if (liveMode === 'none') return null;

  if (liveMode === 'event') {
    return (
      <Badge variant="destructive" className="bg-red-600 text-white animate-pulse">
        <div className="w-2 h-2 bg-white rounded-full mr-2 animate-ping" />
        🎮 Live-Event aktiv
        {eventData?.title && (
          <span className="ml-2 font-normal">• {eventData.title}</span>
        )}
      </Badge>
    );
  }

  if (liveMode === 'community') {
    return (
      <Badge variant="secondary" className="bg-green-600 text-white animate-pulse">
        <div className="w-2 h-2 bg-white rounded-full mr-2 animate-ping" />
        💬 Community Live aktiv
      </Badge>
    );
  }

  return null;
};