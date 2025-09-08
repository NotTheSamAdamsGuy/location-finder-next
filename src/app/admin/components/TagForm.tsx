"use client";

import { useActionState } from "react";

import { addTag, updateTag } from "@/app/actions/tags";

export default function TagForm({ tag = "", type }: { tag?: string, type: string }) {
  const formAction = type === "update" ? updateTag : addTag;
  const [state, action, pending] = useActionState(formAction, undefined);

  return (
    <form action={action} className="flex flex-col w-full">
      <div className="flex flex-col">
        <label className="label flex" htmlFor="tag">
          Tag
        </label>
        <input name="currentTag" type="hidden" value={tag} />
        <input
          id="tag"
          name="tag"
          type="text"
          className="input flex w-full"
          autoComplete="off"
          required={true}
          defaultValue={decodeURIComponent(tag)}
        />
        <p className="text-error text-sm h-1.5">{state?.errors.tag}</p>
      </div>
      <div className="flex mt-12 justify-center">
        <button
          className="btn btn-primary w-full"
          type="submit"
          disabled={pending}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
