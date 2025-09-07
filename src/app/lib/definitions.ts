export type User = {
  username: string;
  role: string;
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
