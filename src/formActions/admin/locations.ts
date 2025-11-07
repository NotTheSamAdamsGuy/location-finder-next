"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";

type AddLocationFormState =
  | {
      errors?: {
        name?: string[];
        description?: string[];
        address?: string[];
        city?: string[];
        stateAbbreviation?: string[];
        postalCode?: string[];
      };
      message?: string;
    }
  | undefined;

const AddLocationFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  description: z.string().trim(),
  address: z.string().trim().min(1, "Street address is required"),
  city: z.string().trim().min(1, "City is required"),
  stateAbbreviation: z.string("State is required").trim(),
  postalCode: z.string().trim().min(1, "ZIP code is required"),
  countryCode: z.string().trim().nonempty("Country code is required"),
  tags: z.array(z.string()),
  filenames: z.array(z.string()),
  originalFilenames: z.array(z.string()),
  imageDescriptions: z.array(z.string()),
  displayOnSite: z.union([z.string(), z.null()]),
});

const UpdateLocationFormSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(1, "Name is required"),
  description: z.string().trim(),
  address: z.string().trim().min(1, "Street address is required"),
  city: z.string().trim().min(1, "City is required"),
  stateAbbreviation: z.string("State is required").trim(),
  postalCode: z.string().trim().min(1, "ZIP code is required"),
  countryCode: z.string().trim().nonempty("Country code is required"),
  tags: z.array(z.string()),
  filenames: z.array(z.string()),
  originalFilenames: z.array(z.string()),
  imageDescriptions: z.array(z.string()),
  displayOnSite: z.union([z.string(), z.null()]),
});

/**
 * Add a location to the database if the provided values are valid, otherwise return error messages
 * @param formState an AddLocationFormState object containing error messages or undefined
 * @param formData form data submitted by the user
 * @returns a Promise resolving to an AddLocationFormState object
 */
export const addLocation = async (
  formState: AddLocationFormState,
  formData: FormData
) => {
  // validate form fields
  const validatedFields = AddLocationFormSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    address: formData.get("address"),
    city: formData.get("city"),
    stateAbbreviation: formData.get("stateAbbreviation"),
    postalCode: formData.get("postalCode"),
    countryCode: formData.get("countryCode"),
    tags: formData.getAll("tag"),
    filenames: formData.getAll("filename"),
    originalFilenames: formData.getAll("originalFilename"),
    imageDescriptions: formData.getAll("imageDescription"),
    displayOnSite: formData.get("displayOnSite"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      fields: {
        id: formData.get("id"),
        name: formData.get("name"),
        description: formData.get("description"),
        address: formData.get("address"),
        city: formData.get("city"),
        stateAbbreviation: formData.get("stateAbbreviation"),
        postalCode: formData.get("postalCode"),
        countryCode: formData.get("countryCode"),
        tags: formData.getAll("tag"),
        filenames: formData.getAll("filename"),
        originalFilenames: formData.getAll("originalFilename"),
        imageDescriptions: formData.getAll("imageDescription"),
        displayOnSite: formData.get("displayOnSite"),
      },
    };
  }

  const {
    name,
    description,
    address,
    city,
    stateAbbreviation,
    postalCode,
    countryCode,
    tags,
    filenames,
    originalFilenames,
    imageDescriptions,
    displayOnSite,
  } = validatedFields.data;

  // attempt to post data to the server
  const postData: FormData = new FormData();
  postData.append("name", name);
  postData.append("description", description);
  postData.append("address", address);
  postData.append("city", city);
  postData.append("stateAbbreviation", stateAbbreviation);
  postData.append("postalCode", postalCode);
  postData.append("countryCode", countryCode);

  // display on site toggle has values of null or "on" instead of true/false, so we need to fix this
  const correctedDisplayOnSite = displayOnSite === "on" ? true : false;
  postData.append("displayOnSite", `${correctedDisplayOnSite}`);

  tags.forEach((tag) => {
    postData.append("tag", tag);
  });

  filenames.forEach((filename) => {
    postData.append("filename", filename);
  });

  originalFilenames.forEach((originalFilename) => {
    postData.append("originalFilename", originalFilename);
  });

  imageDescriptions.forEach((imageDescription) => {
    postData.append("imageDescription", imageDescription);
  });

  // something is causing Zod validation to throw an error when we try to use
  // it for Files, so for now we are skipping validation and adding files. It
  // could be related to the DragDrop component.
  for (const [key, value] of formData.entries()) {
    if (
      key === "images" &&
      (value as File).size > 0 &&
      (value as File).name !== undefined
    ) {
      postData.append("images", value);
    }
  }

  const token = (await cookies()).get("token")?.value;

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: postData,
  };

  // we can't include a redirect in a try/catch block, so use a variable to track if we should redirect
  let success = false;
  let response;

  try {
    response = await fetch(
      `${process.env.API_HOST}:${process.env.API_PORT}/locations`,
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
    redirect("/admin/locations");
  } else {
    const data = await response.json();
    throw new Error(`Unable to add new location. ${data.message}`);
  }
};

/**
 * Update a location in the database if the provided values are valid, otherwise return error messages
 * @param formState an AddLocationFormState object containing error messages or undefined
 * @param formData form data submitted by the user
 * @returns a Promise resolving to an AddLocationFormState object
 */
export const updateLocation = async (
  formState: AddLocationFormState,
  formData: FormData
) => {
  // validate form fields
  const validatedFields = UpdateLocationFormSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    description: formData.get("description"),
    address: formData.get("address"),
    city: formData.get("city"),
    stateAbbreviation: formData.get("stateAbbreviation"),
    postalCode: formData.get("postalCode"),
    countryCode: formData.get("countryCode"),
    tags: formData.getAll("tag"),
    filenames: formData.getAll("filename"),
    originalFilenames: formData.getAll("originalFilename"),
    imageDescriptions: formData.getAll("imageDescription"),
    displayOnSite: formData.get("displayOnSite"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      fields: {
        id: formData.get("id"),
        name: formData.get("name"),
        description: formData.get("description"),
        address: formData.get("address"),
        city: formData.get("city"),
        stateAbbreviation: formData.get("stateAbbreviation"),
        postalCode: formData.get("postalCode"),
        countryCode: formData.get("countryCode"),
        tags: formData.getAll("tag"),
        filenames: formData.getAll("filename"),
        originalFilenames: formData.getAll("originalFilename"),
        imageDescriptions: formData.getAll("imageDescription"),
        displayOnSite: formData.get("displayOnSite"),
      },
    };
  }

  const {
    id,
    name,
    description,
    address,
    city,
    stateAbbreviation,
    postalCode,
    countryCode,
    tags,
    filenames,
    originalFilenames,
    imageDescriptions,
    displayOnSite,
  } = validatedFields.data;

  // attempt to submit data to the server
  const putData: FormData = new FormData();
  putData.append("id", id);
  putData.append("name", name);
  putData.append("description", description);
  putData.append("address", address);
  putData.append("city", city);
  putData.append("stateAbbreviation", stateAbbreviation);
  putData.append("postalCode", postalCode);
  putData.append("countryCode", countryCode);

  // display on site toggle has values of null or "on" instead of true/false, so we need to fix this
  const correctedDisplayOnSite = displayOnSite === "on" ? true : false;
  putData.append("displayOnSite", `${correctedDisplayOnSite}`);

  tags.forEach((tag) => {
    putData.append("tag", tag);
  });

  filenames.forEach((filename) => {
    putData.append("filename", filename);
  });

  originalFilenames.forEach((originalFilename) => {
    putData.append("originalFilename", originalFilename);
  });

  imageDescriptions.forEach((imageDescription) => {
    putData.append("imageDescription", imageDescription);
  });

  // something is causing Zod validation to throw an error when we try to use
  // it for Files, so for now we are skipping validation and adding files. It
  // could be related to the DragDrop component.
  for (const [key, value] of formData.entries()) {
    if (
      key === "images" &&
      (value as File).size > 0 &&
      (value as File).name !== undefined
    ) {
      putData.append("images", value);
    }
  }

  const token = (await cookies()).get("token")?.value;

  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: putData,
  };

  // we can't include a redirect in a try/catch block, so use a variable to track if we should redirect
  let success = false;
  let response;

  try {
    response = await fetch(
      `${process.env.API_HOST}:${process.env.API_PORT}/locations`,
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
    redirect("/admin/locations");
  } else {
    const data = await response.json();
    throw new Error(`Unable to update location. ${data.message}`);
  }
};

export const deleteLocation = async (locationId: string) => {
  const token = (await cookies()).get("token")?.value;

  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  let response;
  let success = false;

  try {
    response = await fetch(
      `${process.env.API_HOST}:${process.env.API_PORT}/locations/${locationId}`,
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
    return;
  } else {
    const data = await response.json();
    throw new Error(`Unable to delete location. ${data.message}`);
  }
};
