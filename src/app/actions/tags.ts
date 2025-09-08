"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";

type AddTagFormState =
  | {
      errors?: {
        tag?: string[];
      };
      message?: string;
    }
  | undefined;

const AddTagFormSchema = z.object({
  tag: z.string().trim().nonempty("Tag is required"),
});

const UpdateTagFormSchema = z.object({
  tag: z.string().trim().nonempty("Tag is required"),
  currentTag: z.string().trim()
});

/**
 * Add a tag to the database if the provided values are valid, otherwise return error messages
 * @param formState an AddTagFormState object containing error messages or undefined
 * @param formData form data submitted by the user
 * @returns a Promise resolving to an AddTagFormState object
 */
export const addTag = async (
  formState: AddTagFormState,
  formData: FormData
) => {
  // validate form fields
  const validatedFields = AddTagFormSchema.safeParse({
    tag: formData.get("tag"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { tag } = validatedFields.data;

  // attempt to post data to the server
  const postData = {
    tag: tag,
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
      `${process.env.SITE_HOST}:${process.env.SITE_PORT}/tags`,
      requestOptions
    );

    if (response.ok) {
      success = true;
    }
  } catch (err) {
    // TODO: make this work properly - it isn't writing to the console - do we need to return something?
    console.log(err);
    throw err;
  }

  if (success) {
    redirect("/admin/tags");
  } else {
    throw new Error("Unable to add new tag");
  }
};

/**
 * Add a tag to the database if the provided values are valid, otherwise return error messages
 * @param formState an AddTagFormState object containing error messages or undefined
 * @param formData form data submitted by the user
 * @returns a Promise resolving to an AddTagFormState object
 */
export const updateTag = async (
  formState: AddTagFormState,
  formData: FormData
) => {
  // validate form fields
  const validatedFields = UpdateTagFormSchema.safeParse({
    currentTag: formData.get("currentTag"),
    tag: formData.get("tag"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { tag, currentTag } = validatedFields.data;

  // attempt to post data to the server
  const postData = {
    newTag: tag,
    currentTag: currentTag
  };

  const token = (await cookies()).get("token")?.value;

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  };

  console.log(postData);

  // we can't include a redirect in a try/catch block, so use a variable to track if we should redirect
  let success = false;

  try {
    const response = await fetch(
      `${process.env.SITE_HOST}:${process.env.SITE_PORT}/tags`,
      requestOptions
    );

    if (response.ok) {
      success = true;
    }
  } catch (err) {
    // TODO: make this work properly - it isn't writing to the console - do we need to return something?
    console.log(err);
    throw err;
  }

  if (success) {
    redirect("/admin/tags");
  } else {
    throw new Error("Unable to add new tag");
  }
};
