"use server"

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";

type AddLocationFormState =
  | {
      errors?: {
        name?: string[];
        description?: string[];
        streetAddress?: string[];
        city?: string[];
        state?: string[];
        zip?: string[];
      };
      message?: string;
    }
  | undefined;

const AddLocationFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  description: z.string().trim(),
  streetAddress: z.string().trim().min(1, "Street address is required"),
  city: z.string().trim().min(1, "City is required"),
  state: z.string("State is required").trim(),
  zip: z.string().trim().min(1, "ZIP code is required"),
  images: z.array(z.file()),
  imageDescriptions: z.array(z.string()),
  tags: z.array(z.string())
});

/**
 * Add a location to the database if the provided values are valid, otherwise return error messages
 * @param formState an AddLocationFormState object containing error messages or undefined
 * @param formData form data submitted by the user
 * @returns a Promise resolving to an AddLocationFormState object
 */
export const addLocation = async (formState: AddLocationFormState, formData: FormData) => {
  // validate form fields
  const validatedFields = AddLocationFormSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    streetAddress: formData.get("street-address"),
    city: formData.get("city"),
    state: formData.get("state"),
    zip: formData.get("zip"),
    images: formData.getAll("images"),
    imageDescriptions: formData.getAll("imageDescription"),
    tags: formData.getAll("tag")
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, description, streetAddress, city, state, zip, images, imageDescriptions, tags } =
    validatedFields.data;

  // attempt to post data to the server
  const postData: FormData = new FormData();
  postData.append("name", name);
  postData.append("description", description);
  postData.append("streetAddress", streetAddress);
  postData.append("city", city);
  postData.append("state", state);
  postData.append("zip", zip);

  images.forEach((image) => {
    postData.append("images", image);
  });

  imageDescriptions.forEach((description) => {
    postData.append("imageDescription", description);
  });

  tags.forEach((tag) => {
    postData.append("tag", tag);
  })

  for (const [key, value] of formData.entries()) {
    if (key === "images") {
      postData.append("images", value);
    }

    if (key === "imageDescription") {
      postData.append("imageDescription", value);
    }
  }

  const token = (await cookies()).get("token")?.value;

  const requestOptions = {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: postData
  };

  // we can't include a redirect in a try/catch block, so use a variable to track if we should redirect
  let success = false;

  try {
    const response = await fetch(
      `${process.env.SITE_HOST}:${process.env.SITE_PORT}/locations`,
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
    redirect("/admin/locations");
  } else {
    throw new Error("Unable to add new location");
  }
};
