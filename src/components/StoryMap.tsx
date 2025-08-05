import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MapPin, Navigation, Target } from 'lucide-react';

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
}

const StoryMap: React.FC<StoryMapProps> = ({ locations, onLocationSelect }) => {
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    // Prüfe Geolocation Support
    if (!navigator.geolocation) {
      console.error('Geolocation wird von diesem Browser nicht unterstützt');
      return;
    }

    // Starte Standort-Tracking
    startLocationTracking();

    return () => {
      stopLocationTracking();
    };
  }, []);

  const startLocationTracking = () => {
    if (!navigator.geolocation) return;

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000 // Cache für 1 Minute
    };

    const successCallback = (position: GeolocationPosition) => {
      setUserLocation(position);
      setLocationPermission('granted');
      setIsTracking(true);
    };

    const errorCallback = (error: GeolocationPositionError) => {
      console.error('Geolocation Fehler:', error);
      setLocationPermission('denied');
      setIsTracking(false);
    };

    const id = navigator.geolocation.watchPosition(
      successCallback,
      errorCallback,
      options
    );

    setWatchId(id);
  };

  const stopLocationTracking = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      setIsTracking(false);
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Erdradius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Entfernung in km
    return distance * 1000; // Entfernung in Metern
  };

  const getLocationDistance = (location: StoryLocation) => {
    if (!userLocation) return null;
    
    const distance = calculateDistance(
      userLocation.coords.latitude,
      userLocation.coords.longitude,
      location.coordinates[1], // lat
      location.coordinates[0]  // lng
    );
    
    return Math.round(distance);
  };

  const isLocationNearby = (location: StoryLocation, threshold = 100) => {
    const distance = getLocationDistance(location);
    return distance !== null && distance <= threshold;
  };

  if (locationPermission === 'denied') {
    return (
      <div className="bg-card border border-border rounded-lg p-6 text-center">
        <div className="mb-4">
          <MapPin className="mx-auto mb-2 text-muted-foreground" size={32} />
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            Standortzugriff erforderlich
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Um die Story-Locations zu erkunden, wird Ihr Standort benötigt.
            <br />
            Bitte erlauben Sie den Standortzugriff in Ihrem Browser.
          </p>
        </div>
        
        <Button onClick={startLocationTracking}>
          <Target className="mr-2" size={16} />
          Standort aktivieren
        </Button>
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
      
      <div className="relative w-full min-h-64 rounded-lg overflow-hidden shadow-lg bg-card border border-border">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">GPS-Navigation</h3>
            <div className="flex items-center gap-2 text-sm">
              {isTracking ? (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-muted-foreground">Live-Tracking</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span className="text-muted-foreground">Offline</span>
                </>
              )}
            </div>
          </div>

          {userLocation && (
            <div className="mb-4 p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">Deine Position:</div>
              <div className="font-mono text-xs">
                {userLocation.coords.latitude.toFixed(6)}, {userLocation.coords.longitude.toFixed(6)}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Genauigkeit: ±{Math.round(userLocation.coords.accuracy)}m
              </div>
            </div>
          )}

          <div className="space-y-3">
            {locations.map((location, index) => {
              const distance = getLocationDistance(location);
              const isNearby = isLocationNearby(location);
              
              return (
                <div 
                  key={location.id}
                  className={`p-3 rounded-lg border transition-all ${
                    location.isCurrentLocation 
                      ? 'bg-yellow-500/10 border-yellow-500/30' 
                      : location.isUnlocked 
                        ? 'bg-green-500/10 border-green-500/30 hover:bg-green-500/20 cursor-pointer' 
                        : 'bg-gray-500/10 border-gray-500/30 opacity-60'
                  }`}
                  onClick={() => location.isUnlocked && onLocationSelect(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        location.isCurrentLocation 
                          ? 'bg-yellow-500 animate-pulse' 
                          : location.isUnlocked 
                            ? 'bg-green-500' 
                            : 'bg-gray-500'
                      }`}></div>
                      <div>
                        <div className="font-semibold flex items-center gap-2">
                          {location.label}
                          {!location.isUnlocked && '🔒'}
                          {isNearby && '📍'}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Lat: {location.coordinates[1].toFixed(4)}, Lng: {location.coordinates[0].toFixed(4)}
                        </div>
                      </div>
                    </div>
                    
                    {distance !== null && (
                      <div className="text-right">
                        <div className={`text-sm font-semibold ${
                          distance <= 100 ? 'text-green-500' : 
                          distance <= 500 ? 'text-yellow-500' : 'text-muted-foreground'
                        }`}>
                          {distance < 1000 ? `${distance}m` : `${(distance/1000).toFixed(1)}km`}
                        </div>
                        {isNearby && (
                          <div className="text-xs text-green-500">In Reichweite!</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {!isTracking && (
          <div className="absolute inset-0 bg-muted/50 flex items-center justify-center">
            <div className="text-center">
              <Navigation className="mx-auto mb-2 animate-spin" size={32} />
              <p className="text-sm text-muted-foreground">GPS wird aktiviert...</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-2 text-xs text-muted-foreground text-center">
        🟢 Verfügbar • 🟡 Aktuelle Position • 🔒 Verschlossen • 📍 In Reichweite
      </div>
    </div>
  );
};

export default StoryMap;