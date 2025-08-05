import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MapPin, Navigation } from 'lucide-react';

interface StoryLocation {
  id: number;
  label: string;
  coordinates: [number, number];
  isUnlocked: boolean;
  isCurrentLocation: boolean;
}

interface StoryMapProps {
  locations: StoryLocation[];
  onLocationSelect: (locationIndex: number) => void;
  mapboxToken?: string;
}

const StoryMap: React.FC<StoryMapProps> = ({ locations, onLocationSelect, mapboxToken }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [showTokenInput, setShowTokenInput] = useState(!mapboxToken);
  const [inputToken, setInputToken] = useState('');

  const initializeMap = (token: string) => {
    if (!mapContainer.current || !token) return;

    try {
      mapboxgl.accessToken = token;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [11.576, 48.137], // Munich coordinates
        zoom: 12,
        pitch: 45,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      map.current.on('load', () => {
        setIsMapReady(true);
        addMarkersToMap();
      });

    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  const addMarkersToMap = () => {
    if (!map.current) return;

    locations.forEach((location, index) => {
      // Create marker element
      const markerEl = document.createElement('div');
      markerEl.className = `w-8 h-8 rounded-full border-2 cursor-pointer transition-all duration-300 flex items-center justify-center ${
        location.isCurrentLocation 
          ? 'bg-yellow-500 border-yellow-300 scale-125 animate-pulse' 
          : location.isUnlocked 
            ? 'bg-green-500 border-green-300 hover:scale-110' 
            : 'bg-gray-500 border-gray-400 opacity-50'
      }`;
      
      markerEl.innerHTML = location.isUnlocked ? '📍' : '🔒';
      
      // Add click handler for unlocked locations
      if (location.isUnlocked) {
        markerEl.addEventListener('click', () => {
          onLocationSelect(index);
        });
      }

      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<div class="text-center p-2">
          <h3 class="font-semibold text-sm">${location.label}</h3>
          <p class="text-xs mt-1">${location.isUnlocked ? 'Verfügbar' : 'Verschlossen'}</p>
        </div>`
      );

      // Add marker to map
      new mapboxgl.Marker(markerEl)
        .setLngLat(location.coordinates)
        .setPopup(popup)
        .addTo(map.current!);
    });
  };

  useEffect(() => {
    if (mapboxToken && !showTokenInput) {
      initializeMap(mapboxToken);
    }

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, showTokenInput]);

  useEffect(() => {
    if (isMapReady) {
      // Clear existing markers and re-add them
      const markers = document.querySelectorAll('.mapboxgl-marker');
      markers.forEach(marker => marker.remove());
      addMarkersToMap();
    }
  }, [locations, isMapReady]);

  const handleTokenSubmit = () => {
    if (inputToken.trim()) {
      setShowTokenInput(false);
      initializeMap(inputToken.trim());
    }
  };

  if (showTokenInput) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 text-center">
        <div className="mb-4">
          <MapPin className="mx-auto mb-2 text-muted-foreground" size={32} />
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            Mapbox Token erforderlich
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Um die interaktive Karte anzuzeigen, wird ein Mapbox Public Token benötigt.
            <br />
            Holen Sie sich Ihren kostenlosen Token von{' '}
            <a 
              href="https://mapbox.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              mapbox.com
            </a>
          </p>
        </div>
        
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Mapbox Public Token eingeben..."
            value={inputToken}
            onChange={(e) => setInputToken(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
          />
          <Button onClick={handleTokenSubmit} disabled={!inputToken.trim()}>
            Karte laden
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="mb-4 flex flex-wrap gap-2 justify-center">
        {locations.map((location, index) => (
          <Badge
            key={location.id}
            variant={location.isCurrentLocation ? "default" : location.isUnlocked ? "secondary" : "outline"}
            className={`cursor-pointer transition-all ${
              location.isUnlocked ? 'hover:scale-105' : 'opacity-50 cursor-not-allowed'
            }`}
            onClick={() => location.isUnlocked && onLocationSelect(index)}
          >
            {location.isCurrentLocation && '👤 '}
            {location.label}
            {!location.isUnlocked && ' 🔒'}
          </Badge>
        ))}
      </div>
      
      <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
        <div ref={mapContainer} className="absolute inset-0" />
        {!isMapReady && (
          <div className="absolute inset-0 bg-muted/50 flex items-center justify-center">
            <div className="text-center">
              <Navigation className="mx-auto mb-2 animate-spin" size={32} />
              <p className="text-sm text-muted-foreground">Karte wird geladen...</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-2 text-xs text-muted-foreground text-center">
        🟢 Verfügbar • 🟡 Aktuelle Position • 🔒 Verschlossen
      </div>
    </div>
  );
};

export default StoryMap;