import { Coordinates } from "./maps.types";

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