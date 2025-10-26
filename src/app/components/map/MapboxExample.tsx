"use client"

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

type MapParams = {
  latitude?: number;
  longitude?: number;
  zoom?: number;
};

const MAP_DEFAULTS = {
  latitude: 0,
  longitude: 0,
  zoom: 13
}

const MapboxExample = ({ latitude, longitude, zoom }: MapParams) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current as HTMLDivElement,
      center: [longitude || MAP_DEFAULTS.longitude, latitude || MAP_DEFAULTS.latitude], // starting position [lng, lat]
      zoom: zoom || MAP_DEFAULTS.zoom // starting zoom
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl());

    const popup = new mapboxgl.Popup({ offset: 25 }).setText(
      'Current location'
    );

    new mapboxgl.Marker()
      .setLngLat([-122.342682, 47.627663])
      .setPopup(popup)
      .addTo(mapRef.current);
      
    return () => mapRef.current?.remove();
  }, []);

  return (
    <div
      className="map-container w-full h-full"
      ref={mapContainerRef}
    />
  );
};

export default MapboxExample;