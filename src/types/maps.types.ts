import { Coordinates, LocationFeature, LocationFeatureCollection } from "@notthesamadamsguy/location-finder-types";

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
  | { type: "LOAD_LOCATIONS"; payload: LocationFeatureCollection }
  | { type: "REPOSITION_MAP"; payload: Coordinates }
  | { type: "SELECT_LOCATION"; payload: LocationFeature | null }
  | { type: "MAP_LOADED"; payload: boolean };