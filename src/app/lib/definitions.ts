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
  username: z.string().trim(),
  password: z.string().trim(),
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

export const GuessFormSchema = z.object({
  email: z.string().trim(),
  guess: z.string().trim(),
});

export type User = {
  username: string;
  role: string;
}