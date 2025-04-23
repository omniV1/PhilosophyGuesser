import { useCallback, useState } from 'react';
import Map, { Marker, ViewState, MapProps } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapComponentProps {
  locations?: Array<{ latitude: number; longitude: number; name: string }>;
  onLocationSelect?: (location: { latitude: number; longitude: number; name: string }) => void;
}

export default function MapComponent({ locations = [], onLocationSelect }: MapComponentProps) {
  const [viewState, setViewState] = useState<ViewState>({
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
    bearing: 0,
    pitch: 0,
    padding: { top: 0, bottom: 0, left: 0, right: 0 }
  });

  const handleMove = useCallback((evt: { viewState: ViewState }) => {
    setViewState(evt.viewState);
  }, []);

  return (
    <Map
      {...viewState}
      onMove={handleMove}
      style={{ width: '100%', height: '100vh' }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken="pk.eyJ1Ijoib21uaXYiLCJhIjoiY205dG04Y3A0MDBicDJtb3NkbXh3eTF5cCJ9.3Lm115mk6sbFUlL-mto-eQ"
    >
      {locations.map((location, index) => (
        <Marker
          key={index}
          longitude={location.longitude}
          latitude={location.latitude}
        >
          <div 
            style={{ cursor: 'pointer' }}
            onClick={() => onLocationSelect?.(location)}
          >
            📍
          </div>
        </Marker>
      ))}
    </Map>
  );
} 