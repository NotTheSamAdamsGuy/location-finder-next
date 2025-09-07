"use client";

import { useActionState } from "react";

import { addTag } from "@/app/actions/tags";

export default function AddTagForm() {
  const [state, action, pending] = useActionState(addTag, undefined);

  return (
    <form action={action} className="flex flex-col w-full">
      <div className="flex flex-col">
        <label className="label flex" htmlFor="tag">
          Tag
        </label>
        <input
          id="tag"
          name="tag"
          type="text"
          className="input flex w-full"
          autoComplete="off"
          required={true}
        />
        <p className="text-error text-sm h-1.5">{state?.errors.tag}</p>
      </div>
      <div className="flex mt-12 justify-center">
        <button className="btn btn-primary w-full" type="submit" disabled={pending}>
          Submit
        </button>
      </div>
    </form>
  );
}
