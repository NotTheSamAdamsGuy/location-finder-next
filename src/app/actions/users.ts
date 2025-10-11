"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

type UserFormState =
  | {
      errors?: {
        username?: string[];
        password?: string[];
        firstName?: string[];
        lastName?: string[];
        role?: string[];
      };
      message?: string;
    }
  | undefined;

const UserFormSchema = z.object({
  username: z.string().trim().nonempty("Username is required"),
  password: z.string().trim().nonempty("Password is required"),
  firstName: z.string().trim().nonempty("First Name is required"),
  lastName: z.string().trim().nonempty("Last Name is required"),
  role: z.string().trim().nonempty("Role is required"),
});

/**
 * Add a user to the database if the provided values are valid, otherwise return error messages
 * @param formState an UserFormState object containing error messages or undefined
 * @param formData form data submitted by the user
 * @returns a Promise resolving to an UserFormState object
 */
export const addUser = async (
  formState: UserFormState,
  formData: FormData
) => {
  // validate form fields
  const validatedFields = UserFormSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    role: formData.get("role"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      fields: {
        username: formData.get("username"),
        password: formData.get("password"),
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        role: formData.get("role")
      },
    };
  }

  const { username, password, firstName, lastName, role } = validatedFields.data;

  // attempt to post data to the server
  const postData = {
    username: username,
    password: password,
    firstName: firstName,
    lastName: lastName,
    role: role
  };

  const token = (await cookies()).get("token")?.value;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  };

  // we can't include a redirect in a try/catch block, so use a variable to track if we should redirect
  let success = false;

  try {
    const response = await fetch(
      `${process.env.SITE_HOST}:${process.env.SITE_PORT}/users`,
      requestOptions
    );

    if (response.ok) {
      success = true;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }

  if (success) {
    redirect("/admin/users");
  } else {
    throw new Error("Unable to add new user");
  }
};

/**
 * Update a user in the database if the provided values are valid, otherwise return error messages
 * @param formState an UserFormState object containing error messages or undefined
 * @param formData form data submitted by the user
 * @returns a Promise resolving to an UserFormState object
 */
export const updateUser = async (
  formState: UserFormState,
  formData: FormData
) => {
  // validate form fields
  const validatedFields = UserFormSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    role: formData.get("role"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      fields: {
        username: formData.get("username"),
        password: formData.get("password"),
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        role: formData.get("role")
      },
    };
  }

  const { username, password, firstName, lastName, role } = validatedFields.data;

  // attempt to post data to the server
  const putData = {
    username: username,
    password: password,
    firstName: firstName,
    lastName: lastName,
    role: role
  };

  const token = (await cookies()).get("token")?.value;

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(putData),
  };

  // we can't include a redirect in a try/catch block, so use a variable to track if we should redirect
  let success = false;

  try {
    const response = await fetch(
      `${process.env.SITE_HOST}:${process.env.SITE_PORT}/users`,
      requestOptions
    );

    if (response.ok) {
      success = true;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }

  if (success) {
    redirect("/admin/users");
  } else {
    throw new Error("Unable to update user");
  }
};