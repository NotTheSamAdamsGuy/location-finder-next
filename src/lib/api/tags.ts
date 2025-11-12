"use server";

import { cookies } from "next/headers";

export const getAllTags = async (): Promise<string[]> => {
  const token = (await cookies()).get("token")?.value;

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(
      `${process.env.API_HOST}:${process.env.API_PORT}/tags`,
      requestOptions
    );

    if (response.ok) {
      const data = ((await response.json()) as string[]) || Array<string>;
      return data;
    } else {
      throw new Error("Unable to retrieve tags");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getTag = async (tagToFind: string) => {
  const token = (await cookies()).get("token")?.value;

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(
      `${process.env.API_HOST}:${process.env.API_PORT}/tags/${tagToFind}`,
      requestOptions
    );

    if (response.ok) {
      const data = (await response.json()) as Promise<
        string | string[] | null | undefined
      >;
      return data;
    } else {
      throw new Error("Unable to retrieve tag");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

interface PostDataType {
  tag: string;
}
export const postTag = async (postData: PostDataType): Promise<Response> => {
  const token = (await cookies()).get("token")?.value;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  };

  try {
    return await fetch(
      `${process.env.API_HOST}:${process.env.API_PORT}/tags`,
      requestOptions
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};

interface PutDataType {
  newTag: string;
  currentTag: string;
}
export const putTag = async (putData: PutDataType): Promise<Response> => {
  const token = (await cookies()).get("token")?.value;

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(putData),
  };

  try {
    return await fetch(
      `${process.env.API_HOST}:${process.env.API_PORT}/tags`,
      requestOptions
    );
  } catch (err) {
    // TODO: make this work properly - it isn't writing to the console - do we need to return something?
    console.log(err);
    throw err;
  }
};

export const deleteTag = async (tag: string): Promise<Response> => {
  const token = (await cookies()).get("token")?.value;

  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    return await fetch(
      `${process.env.API_HOST}:${process.env.API_PORT}/tags/${tag}`,
      requestOptions
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};
