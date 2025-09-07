"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";

import { createSession } from "../lib/session";

type LoginFormState =
  | {
      errors?: {
        username?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

const LoginFormSchema = z.object({
  username: z.string().trim().min(1, "Username is required"),
  password: z.string().trim().min(1, "Password is required"),
});

/**
 * Authenticate a user's credentials.
 * @param username a username string
 * @param password a password string
 * @returns a JWT token string if the user was authenticated, otherwise throws an error
 */
const authenticateUser = async (
  username: string,
  password: string
): Promise<string | null> => {
  const postData = {
    username: username,
    password: password,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  };

  try {
    const response = await fetch(
      `${process.env.SITE_HOST}:${process.env.SITE_PORT}/authentication/login`,
      requestOptions
    );
    const data = await response.json();
    const token = data.token;
    return token;
  } catch (err) {
    // TODO: make this work properly - it isn't writing to the console - do we need to return something?
    console.log(err);
    throw err;
  }
};

/**
 * Log the user in if valid credentials are provided, otherwise return error messages
 * @param formState a LoginFormState object containing error messages or undefined
 * @param formData form data submitted by the user
 * @returns a Promise resolving to a LoginFormState object
 */
export async function login(formState: LoginFormState, formData: FormData) {
  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, password } = validatedFields.data;
  const token = await authenticateUser(username, password);

  if (!token) {
    return {
      message: "Please provide a valid username and password.",
    };
  }

  await createSession(token);

  redirect("/");
}

/**
 * Log the user out of the application and return them to the login page
 */
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");

  redirect("/login");
}
