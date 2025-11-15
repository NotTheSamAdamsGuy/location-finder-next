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
import { faMap } from "@fortawesome/free-regular-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      case "SWITCH_VIEW":
        return {
          ...state,
          activeView: state.activeView === "list" ? "map" : "list",
        };
      default:
        return state;
    }
  };

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

  const initialState: MapListState = {
    zoom: parseInt(
      searchParams.get("zoom") ||
        process.env.NEXT_PUBLIC_DEFAULT_ZOOMLEVEL ||
        "13",
      10
    ),
    featureCollection: { type: "FeatureCollection", features: [] },
    coordinates: {
      latitude: parseFloat(searchParams.get("lat")!),
      longitude: parseFloat(searchParams.get("lon")!),
    },
    selectedFeature: null,
    displayPopup: false,
    mapLoaded: false,
    activeView: "list",
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const handleFeatureCardClick = (evt: React.MouseEvent<HTMLDivElement>) => {
    const selectedLocation =
      state.featureCollection.features.find(
        (feature) => feature.id === evt.currentTarget.dataset["id"]
      ) || null;

    // TODO: take user to detail page; determine if we need to set the selected location or not
  };

  // Load map
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

      // add the user's location if prompted
      if (searchParams.get("userLocation") === "true") {
        const userLocation: LocationFeature = {
          id: "user-location",
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [
              parseFloat(searchParams.get("lon")!),
              parseFloat(searchParams.get("lat")!)
            ],
          },
          properties: {
            type: "user-location",
          },
        };

        locations.features.push(userLocation);
      }

      dispatch({ type: "LOAD_LOCATIONS", payload: locations });
    }
    fetchLocationsData();
  }, [
    state.coordinates.latitude,
    state.coordinates.longitude,
    state.zoom,
    searchParams,
  ]);

  const locationCards = state.featureCollection.features
    .filter((feature) => feature.properties?.type !== "user-location")
    .map((feature) => (
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

  const handleButtonClick = () => {
    dispatch({ type: "SWITCH_VIEW", payload: null });
  };

  const buttonText = state.activeView === "list" ? "Map" : "List";
  const buttonIcon = state.activeView === "list" ? faMap : faList;

  return (
    <div
      className={twMerge(
        "flex w-full h-[calc(100vh-64px)] relative overflow-hidden",
        "md:overflow-auto"
      )}
    >
      <div
        className={twMerge(
          "flex flex-col h-full w-full",
          "md:flex-1",
          state.activeView === "map"
            ? ""
            : "absolute right-[-2000px] md:static md:right-0 overflow-hidden"
        )}
      >
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
                type={feature.properties?.type === "user-location" ? "user" : "feature"}
                onClick={handleMarkerClick}
              />
            );
          })}
        {mapRef.current && (
          <Popup map={mapRef.current} activeFeature={state.selectedFeature} />
        )}
      </div>
      <div
        className={twMerge(
          "flex min-h-[calc(100vh-64px)] w-full p-4 overflow-auto",
          "md:flex-none md:w-96 md:shadow-[-2px_0_5px_0px_rgba(0,0,0,0.5)] md:z-10",
          state.activeView === "list"
            ? ""
            : "absolute right-[-2000px] md:static md:right-0"
        )}
      >
        <div
          className={twMerge(
            "flex flex-col gap-2",
            "sm:flex-row sm:justify-between sm:flex-wrap sm:gap-4 sm-h-[100px]",
            "md:flex-col md:flex-nowrap md:h-0"
          )}
        >
          {locationCards}
        </div>
      </div>
      <div className="fixed bottom-16 w-full flex justify-center z-10 md:hidden">
        <button className="btn" onClick={handleButtonClick}>
          <FontAwesomeIcon icon={buttonIcon} /> {buttonText}
        </button>
      </div>
    </div>
  );
}
