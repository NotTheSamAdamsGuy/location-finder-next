"use server";

import { redirect } from "next/navigation";
import z from "zod";

import { deleteUser, postUser, putUser } from "@/lib/api/users";

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

type UpdateUserFormState =
  | {
      errors?: {
        password?: string[];
        newPassword?: string[];
        firstName?: string[];
        lastName?: string[];
        role?: string[];
      };
      message?: string;
    }
  | undefined;

const UpdateUserFormSchema = z.object({
  password: z.string(),
  newPassword: z.string(),
  firstName: z.string().trim().nonempty("First Name is required"),
  lastName: z.string().trim().nonempty("Last Name is required"),
  role: z.string().trim().nonempty("Role is required"),
}).superRefine((data, ctx) => {
  if (data.password !== "" && data.newPassword === "") {
    ctx.addIssue({
      code: "custom",
      message: "New Password is required when a password is provided.",
      path: ['newPassword']
    });
  }
  if (data.password === "" && data.newPassword !== "") {
    ctx.addIssue({
      code: "custom",
      message: "Existing password is required when a new password is provided.",
      path: ['password']
    });
  }
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
  
  const response = await postUser(postData);

  if (response.ok) {
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
  formState: UpdateUserFormState,
  formData: FormData
) => {
  // validate form fields
  const validatedFields = UpdateUserFormSchema.safeParse({
    password: formData.get("password"),
    newPassword: formData.get("newPassword"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    role: formData.get("role"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      fields: {
        password: formData.get("password"),
        newPassword: formData.get("newPassword"),
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        role: formData.get("role")
      },
    };
  }

  const { password, newPassword, firstName, lastName, role } = validatedFields.data;

  const putData = {
    username: formData.get("username") as string,
    password: password,
    newPassword: newPassword,
    firstName: firstName,
    lastName: lastName,
    role: role
  };

  const response = await putUser(putData);

  if (response.ok) {
    redirect("/admin/users");
  } else {
    throw new Error("Unable to update user");
  }
};

/**
 * Remove a user from the database.
 * @param {string} username 
 * @returns 
 */
export const removeUser = async (username: string) => {
  const response = await deleteUser(username);

  if (response.ok) {
    return;
  } else {
    const data = await response.json();
    throw new Error(`Unable to delete user. ${data.message}`);
  }
};