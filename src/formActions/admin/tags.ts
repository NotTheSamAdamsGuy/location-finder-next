"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { deleteTag, postTag, putTag } from "@/lib/api/tags";

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
  currentTag: z.string().trim(),
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

  const response = await postTag(postData);

  if (response.ok) {
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
  const putData = {
    newTag: tag,
    currentTag: currentTag,
  };

  const response = await putTag(putData);

  if (response.ok) {
    redirect("/admin/tags");
  } else {
    throw new Error("Unable to add new tag");
  }
};

/**
 * Delete a tag from the database
 * @param tag the tag to delete
 * @returns Response
 */
export const removeTag = async (tag: string) => {
  const response = await deleteTag(tag);
  return response.json();
};
