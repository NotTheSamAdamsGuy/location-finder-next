export type User = {
  username: string;
  role: string;
  firstName: string;
  lastName: string;
  password: string;
  lastLoginTimestamp: number;
};

export type SelectOption = {
  key: string;
  value: string;
};

export type Image = {
  originalFilename: string;
  filename: string;
  description?: string;
};

export type Location = {
  id: string;
  name: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  coordinates: Coordinates;
  description: string;
  images: Image[];
  tags?: string[];
  displayOnSite: boolean;
};

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type TableData = {
  headers?: React.ReactNode[];
  values: Array<React.ReactNode[]>;
  footers?: React.ReactNode[];
};

export type FileCard = {
  file: File;
  description: string | null;
};

export type LocationFeature = {
  id: string;
  name: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  images?: string[];
  description?: string;
  tags?: string[];
  coordinates: {
    longitude: number;
    latitude: number;
  },
  type: string;
};

export type MapLocation = {
  id: string;
  name: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  images?: string[];
  description?: string;
  tags?: string[];
  coordinates: {
    longitude: number;
    latitude: number;
  },
  type: string;
};

type MapboxContextBase = {
  id: string;
  name: string;
};

type MapboxContext = {
  country?: MapboxContextBase & {
    country_code: string;
    country_code_alpha_3: string;
  };
  region?: MapboxContextBase & {
    region_code: string;
    region_code_full: string;
  };
  postcode?: MapboxContextBase;
  district?: MapboxContextBase;
  place?: MapboxContextBase;
  locality?: MapboxContextBase;
  neighborhood?: MapboxContextBase;
  address?: MapboxContextBase & {
    address_number: string;
    street_name: string;
  };
  street?: MapboxContextBase;
};

export type MapboxSuggestion = {
  name: string;
  name_preferred?: string;
  mapbox_id: string;
  feature_type: string;
  address?: string;
  full_address?: string;
  place_formatted: string;
  context: MapboxContext;
  language: string;
  maki?: string;
  poi_category?: string[];
  poi_category_ids?: string[];
};

export type MapboxSuggestionReply = {
  suggestions: MapboxSuggestion[];
  attribution: string;
};

type MapboxRoutablePoint = {
  name: string;
  latitude: number;
  longitude: number;
};

export type MapboxFeature = {
  type: string;
  geometry: {
    coordinates: number[],
    type: string
  };
  properties: MapboxSuggestion & {
    coordinates: {
      latitude: number,
      longitude: number,
      accuracy?: string,
      routable_points?: MapboxRoutablePoint[]
    },
  };
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

export const ImageFileTypes = ["png", "jpg", "jpeg", "webp"];

export const USStates = [
  { abbreviation: "AK", name: "Alaska" },
  { abbreviation: "AL", name: "Alabama" },
  { abbreviation: "AR", name: "Arkansas" },
  { abbreviation: "AZ", name: "Arizona" },
  { abbreviation: "CA", name: "California" },
  { abbreviation: "CO", name: "Colorado" },
  { abbreviation: "CT", name: "Connecticut" },
  { abbreviation: "DE", name: "Delaware" },
  { abbreviation: "FL", name: "Florida" },
  { abbreviation: "GA", name: "Georgia" },
  { abbreviation: "HI", name: "Hawaii" },
  { abbreviation: "IA", name: "Iowa" },
  { abbreviation: "ID", name: "Idaho" },
  { abbreviation: "IL", name: "Illinois" },
  { abbreviation: "IN", name: "Indiana" },
  { abbreviation: "KS", name: "Kansas" },
  { abbreviation: "KY", name: "Kentucky" },
  { abbreviation: "LA", name: "Louisiana" },
  { abbreviation: "MA", name: "Massachusetts" },
  { abbreviation: "MD", name: "Maryland" },
  { abbreviation: "ME", name: "Maine" },
  { abbreviation: "MI", name: "Michigan" },
  { abbreviation: "MN", name: "Minnesota" },
  { abbreviation: "MO", name: "Missouri" },
  { abbreviation: "MS", name: "Mississippi" },
  { abbreviation: "MT", name: "Montana" },
  { abbreviation: "NC", name: "North Carolina" },
  { abbreviation: "ND", name: "North Dakota" },
  { abbreviation: "NE", name: "Nebraska" },
  { abbreviation: "NH", name: "New Hampshire" },
  { abbreviation: "NJ", name: "New Jersey" },
  { abbreviation: "NM", name: "New Mexico" },
  { abbreviation: "NV", name: "Nevada" },
  { abbreviation: "NY", name: "New York" },
  { abbreviation: "OH", name: "Ohio" },
  { abbreviation: "OK", name: "Oklahoma" },
  { abbreviation: "OR", name: "Oregon" },
  { abbreviation: "PA", name: "Pennsylvania" },
  { abbreviation: "RI", name: "Rhode Island" },
  { abbreviation: "SC", name: "South Carolina" },
  { abbreviation: "SD", name: "South Dakota" },
  { abbreviation: "TN", name: "Tennessee" },
  { abbreviation: "TX", name: "Texas" },
  { abbreviation: "UT", name: "Utah" },
  { abbreviation: "VA", name: "Virginia" },
  { abbreviation: "VT", name: "Vermont" },
  { abbreviation: "WA", name: "Washington" },
  { abbreviation: "WI", name: "Wisconsin" },
  { abbreviation: "WV", name: "West Virginia" },
  { abbreviation: "WY", name: "Wyoming" },
];

export const UserRoles = [
  { name: "USER", value: "User" },
  { name: "ADMIN", value: "Admin" },
];
