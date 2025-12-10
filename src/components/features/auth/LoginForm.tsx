"use client";

import { useActionState } from "react";

import { login } from "@/formActions/auth";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") ?? "";

  return (
    <form
      action={action}
      className="flex flex-col items-center md:w-1/2 mx-auto px-4 md:px-0"
    >
      <input type="hidden" name="name" value="name" />
      <input type="hidden" name="redirectPath" value={redirectPath} />

      <div className="flex flex-col mt-8">
        <label className="label flex" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          className="input input-lg flex"
          required={true}
        />
        <p className="text-error text-sm h-1.5">{state?.errors?.username}</p>
      </div>

      <div className="flex flex-col mt-8">
        <label htmlFor="password" className="label flex">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="input input-lg flex"
          required={true}
        />
        <p className="text-error text-sm h-1.5">{state?.errors?.password}</p>
      </div>
      <p className="text-error text-sm h-1.5">{state?.message}</p>
      <div className="flex mt-12 justify-center">
        <button className="btn" type="submit" disabled={pending}>
          Login
        </button>
      </div>
    </form>
  );
}
