"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form
      action={action}
      className="flex flex-col md:w-1/2 mx-auto px-4 md:px-0"
    >
      <input type="hidden" name="name" value="name" />

      <div className="flex flex-col mt-8">
        <label className="flex text-lg md:text-3xl" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          className="border bg-white rounded text-black flex h-12 p-2 text-lg md:text-3xl"
        />
      </div>
      {state?.errors?.username && <p>{state.errors.username}</p>}

      <div className="flex flex-col mt-8">
        <label htmlFor="password" className="flex text-lg md:text-3xl">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="border bg-white rounded text-black flex h-12 p-2 text-lg md:text-3xl"
        />
      </div>
      <div className="flex mt-12 justify-center">
        <button type="submit" disabled={pending}>Login</button>
      </div>
    </form>
  );
}