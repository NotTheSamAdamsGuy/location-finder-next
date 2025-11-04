export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type MapListState = {
  zoom: number;
  featureCollection: GeoJSON.FeatureCollection;
  coordinates: Coordinates;
  selectedFeature: GeoJSON.Feature | null;
  displayPopup: boolean;
  mapLoaded: boolean;
};

export type MapListAction =
  | { type: "ZOOM"; payload: number }
  | { type: "LOAD_FEATURES"; payload: GeoJSON.FeatureCollection }
  | { type: "REPOSITION_MAP"; payload: Coordinates }
  | { type: "SELECT_FEATURE"; payload: GeoJSON.Feature | null }
  | { type: "MAP_LOADED"; payload: boolean };