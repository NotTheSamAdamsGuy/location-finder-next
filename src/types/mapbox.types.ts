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