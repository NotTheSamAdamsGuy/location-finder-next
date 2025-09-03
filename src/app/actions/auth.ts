"use server";

// import bcrypt from "bcrypt";
import { FormState, LoginFormSchema } from "@/app/lib/definitions";
import { createSession } from "../lib/session";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
// import { getUser } from "../lib/dal";

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
    console.log(err);
    throw err;
  }
};

export async function login(state: FormState, formData: FormData) {
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

// export async function signup(state: FormState, formData: FormData) {
//   // Validate form fields
//   const validatedFields = SignupFormSchema.safeParse({
//     name: formData.get("name"),
//     email: formData.get("email"),
//     password: formData.get("password"),
//   });

//   // If any form fields are invalid, return early
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//     };
//   }

//   // 2. Prepare data for insertion into database
//   const { email, password } = validatedFields.data;
//   // e.g. Hash the user's password before storing it
//   // const hashedPassword = await bcrypt.hash(password, 10);

//   // console.log(hashedPassword);

//   const user = await getUser(email, password);

//   if (!user) {
//     return {
//       message: "An error occurred while logging in.",
//     };
//   }

//   // 4. Create user session
//   await createSession(user);
//   // 5. Redirect user
//   redirect("/");
// }

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");

  redirect("/login");
}
