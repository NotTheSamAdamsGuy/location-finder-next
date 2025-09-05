// export const addLocation = async (formData: FormData) => {
//   console.log(formData);
//   // const postData = {
//   //   username: username,
//   //   password: password,
//   // };

"use server"

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import {
  AddLocationFormSchema,
  AddLocationFormState,
} from "../lib/definitions";

//   // const requestOptions = {
//   //   method: "POST",
//   //   headers: {
//   //     "Content-Type": "application/json",
//   //   },
//   //   body: JSON.stringify(postData),
//   // };

//   // try {
//   //   const response = await fetch(
//   //     `${process.env.SITE_HOST}:${process.env.SITE_PORT}/authentication/login`,
//   //     requestOptions
//   //   );
//   //   const data = await response.json();
//   //   const token = data.token;
//   //   return token;
//   // } catch (err) {
//   //   // TODO: make this work properly - it isn't writing to the console - do we need to return something?
//   //   console.log(err);
//   //   throw err;
//   // }
// };

export const addLocation = async (formState: AddLocationFormState, formData: FormData) => {
  // validate form fields
  const validatedFields = AddLocationFormSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    streetAddress: formData.get("street-address"),
    city: formData.get("city"),
    state: formData.get("state"),
    zip: formData.get("zip"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, description, streetAddress, city, state, zip } =
    validatedFields.data;

  // attempt to save the data to the database
  const postData = {
    name: name,
    description: description,
    streetAddress: streetAddress,
    city: city,
    state: state,
    zip: zip
  };

  // console.log(postData);
  const token = (await cookies()).get("token")?.value;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(postData),
  };

  // console.log(requestOptions);

  try {
    const response = await fetch(
      `${process.env.SITE_HOST}:${process.env.SITE_PORT}/locations`,
      requestOptions
    );

    if (response.ok) {
      const data = await response.json();
      console.log(`Successfully created new location record: ${data}`);
      redirect("/admin/locations");
    } else {
      throw new Error("Unable to add new location");
    }
    
  } catch (err) {
    // TODO: make this work properly - it isn't writing to the console - do we need to return something?
    console.log(err);
    throw err;
  }
};
