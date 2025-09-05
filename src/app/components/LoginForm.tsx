"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form
      action={action}
      className="flex flex-col items-center md:w-1/2 mx-auto px-4 md:px-0"
    >
      <input type="hidden" name="name" value="name" />

      <div className="flex flex-col mt-8">
        <label className="label flex" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          className="input flex"
          required={true}
        />
      </div>
      {state?.errors?.username && <p>{state.errors.username}</p>}

      <div className="flex flex-col mt-8">
        <label htmlFor="password" className="label flex">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="input flex"
          required={true}
        />
      </div>
      <div className="flex mt-12 justify-center">
        <button className="btn" type="submit" disabled={pending}>
          Login
        </button>
      </div>
    </form>
  );
}
