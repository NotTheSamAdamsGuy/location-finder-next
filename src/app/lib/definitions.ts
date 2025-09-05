import { z } from "zod";

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z.string().trim(),
});

export const LoginFormSchema = z.object({
  username: z.string().min(1, "Username is required").trim(),
  password: z.string().min(1, "Password is required").trim(),
});

export const AddLocationFormSchema = z.object({
  name: z.string().trim(),
  description: z.string().trim(),
  streetAddress: z.string().trim(),
  city: z.string().trim(),
  state: z.string().trim(),
  zip: z.string().trim(),
});

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        userNotFound?: boolean;
      };
      message?: string;
    }
  | undefined;

export type LoginFormState =
  | {
      errors?: {
        username?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type AddLocationFormState =
  | {
      errors?: {
        name?: string[];
        description?: string[];
        streetAddress?: string[];
        city?: string[];
        state?: string[];
        zip?: string[];
      };
    }
  | undefined;

export const GuessFormSchema = z.object({
  email: z.string().trim(),
  guess: z.string().trim(),
});

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

export const US_STATES = [
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
