import { LocationFeature, LocationFeatureCollection } from "@notthesamadamsguy/location-finder-types";

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type MapListState = {
  zoom: number;
  featureCollection: LocationFeatureCollection;
  coordinates: Coordinates;
  selectedFeature: LocationFeature | null;
  displayPopup: boolean;
  mapLoaded: boolean;
};

export type MapListAction =
  | { type: "ZOOM"; payload: number }
  | { type: "LOAD_FEATURES"; payload: LocationFeatureCollection }
  | { type: "REPOSITION_MAP"; payload: Coordinates }
  | { type: "SELECT_FEATURE"; payload: LocationFeature | null }
  | { type: "MAP_LOADED"; payload: boolean };