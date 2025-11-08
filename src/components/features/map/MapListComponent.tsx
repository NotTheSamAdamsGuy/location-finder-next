"use client";

import { useEffect, useReducer, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { MapListAction, MapListState } from "@/types/maps.types";
import { getNearbyLocations } from "@/lib/api/locations";
import FeatureCard from "./FeatureCard";
import Marker from "./Marker";
import Popup from "./Popup";
import { LocationFeature } from "@notthesamadamsguy/location-finder-types";

export default function MapListComponent() {
  const searchParams = useSearchParams();
  const reducer = (state: MapListState, action: MapListAction) => {
    switch (action.type) {
      case "ZOOM":
        return {
          ...state,
          zoom: (state.zoom = action.payload),
        };
      case "LOAD_LOCATIONS":
        return {
          ...state,
          featureCollection: action.payload,
        };
      case "REPOSITION_MAP":
        return {
          ...state,
          coordinates: action.payload,
        };
      case "SELECT_LOCATION":
        return {
          ...state,
          selectedFeature: action.payload,
          // displayPopup: true,
        };
      case "MAP_LOADED":
        return {
          ...state,
          mapLoaded: action.payload,
        };
      default:
        return state;
    }
  };

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

  const initialState: MapListState = {
    zoom: parseInt(process.env.NEXT_PUBLIC_DEFAULT_ZOOMLEVEL || "13", 10),
    featureCollection: { type: "FeatureCollection", features: [] },
    coordinates: {
      latitude: parseFloat(searchParams.get("lat")!),
      longitude: parseFloat(searchParams.get("lon")!),
    },
    selectedFeature: null,
    displayPopup: false,
    mapLoaded: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const handleFeatureCardClick = (evt: React.MouseEvent<HTMLDivElement>) => {
    const selectedLocation =
      state.featureCollection.features.find(
        (feature) => feature.id === evt.currentTarget.dataset["id"]
      ) || null;

    dispatch({
      type: "SELECT_LOCATION",
      payload: selectedLocation as LocationFeature | null,
    });
  };

  // Load map data
  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/standard",
      center: [
        initialState.coordinates.longitude,
        initialState.coordinates.latitude,
      ],
      zoom: initialState.zoom,
      attributionControl: false,
      logoPosition: "bottom-right",
    });

    mapRef.current.addControl(
      new mapboxgl.NavigationControl({ showCompass: false })
    );

    mapRef.current.on("load", () => {
      dispatch({ type: "MAP_LOADED", payload: true });
    });

    mapRef.current.on("moveend", () => {
      const center = mapRef.current?.getCenter();
      dispatch({
        type: "REPOSITION_MAP",
        payload: { latitude: center!.lat, longitude: center!.lng },
      });
    });

    mapRef.current.on("zoomend", () => {
      const zoomlevel = mapRef.current?.getZoom();
      dispatch({ type: "ZOOM", payload: zoomlevel! });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [
    initialState.coordinates.latitude,
    initialState.coordinates.longitude,
    initialState.zoom,
    mapContainerRef,
  ]);

  // Load locations data
  useEffect(() => {
    const unitOfDistance = process.env.NEXT_PUBLIC_LOCATIONS_UNIT_OF_DISTANCE!;
    const sort = process.env.NEXT_PUBLIC_LOCATIONS_SORT!;
    const mapRect = mapContainerRef.current!.getBoundingClientRect();
    const mapWidthInPx = mapRect.width;
    const mapHeightInPx = mapRect.height;

    // get location data
    async function fetchLocationsData() {
      const getLocationsParams = {
        latitude: state.coordinates.latitude,
        longitude: state.coordinates.longitude,
        zoomlevel: state.zoom,
        mapHeightInPx: mapHeightInPx,
        mapWidthInPx: mapWidthInPx,
        unitOfDistance: unitOfDistance,
        sort: sort,
      };
      const locations = await getNearbyLocations(getLocationsParams);
      dispatch({ type: "LOAD_LOCATIONS", payload: locations });
    }
    fetchLocationsData();
  }, [state.coordinates.latitude, state.coordinates.longitude, state.zoom]);

  const locationCards = state.featureCollection.features.map((feature) => (
    <FeatureCard
      key={`card-${feature.id}`}
      feature={feature as LocationFeature}
      onClick={handleFeatureCardClick}
    />
  ));

  const handleMarkerClick = (evt: React.MouseEvent<HTMLDivElement>) => {
    const id = evt.currentTarget.dataset["id"];
    const payload =
      state.featureCollection.features!.find((feature) => feature.id === id) ||
      null;
    dispatch({
      type: "SELECT_LOCATION",
      payload: payload as LocationFeature | null,
    });
  };

  return (
    <div className="flex w-full h-[calc(100vh-64px)]">
      <div className="flex w-full sm:w-1/2 h-full">
        <div
          id="map-container"
          ref={mapContainerRef}
          className={twMerge("w-full h-full")}
        />
        {mapRef.current &&
          state.featureCollection.features?.map((feature) => {
            return (
              <Marker
                key={`marker-${feature.id}`}
                map={mapRef.current!}
                feature={feature as LocationFeature}
                isActive={state.selectedFeature === feature}
                onClick={handleMarkerClick}
              />
            );
          })}
        {mapRef.current && (
          <Popup map={mapRef.current} activeFeature={state.selectedFeature} />
        )}
      </div>
      <div className="flex flex-col w-full sm:w-1/2 h-full">
        {locationCards}
      </div>
    </div>
  );
}
