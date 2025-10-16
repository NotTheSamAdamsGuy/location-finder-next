"use client";

import { useActionState } from "react";

import { addUser } from "@/app/admin/users/formActions";
import Select from "@/app/components/form/Select";

export default function AddUserForm() {
  const formAction = addUser;
  const [formState, action, pending] = useActionState(formAction, undefined);

  const roleOptions = [{name: "user", value: "User"}, {name: "admin", value: "Admin"}].map((role) => {
      return { key: role.name, value: role.value };
    });

  // prioritize formState values over values passed in as user props; fallback to blank/empty/false values.
  const username = formState?.fields.username?.toString() || "";
  const password = formState?.fields.password?.toString() || "";
  const firstName = formState?.fields.firstName?.toString() || "";
  const lastName = formState?.fields.lastName?.toString() || "";
  const role = formState?.fields.role?.toString() || "";

  return (
    <form action={action} className="flex flex-col w-full">
      <div className="flex flex-col">
        <label className="label flex" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          className="input input-lg flex w-full"
          autoComplete="off"
          defaultValue={username}
          required={true}
        />
        <p className="text-error text-sm h-1.5">{formState?.errors.username}</p>
      </div>

      <div className="flex flex-col mt-4">
        <label htmlFor="password" className="label flex">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="input input-lg flex w-full"
          autoComplete="off"
          defaultValue={password}
        />
        <p className="text-error text-sm h-1.5">
          {formState?.errors.password}
        </p>
      </div>

      <div className="flex flex-col mt-4">
        <label htmlFor="firstName" className="label flex">
          First Name
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          className="input input-lg flex w-full"
          autoComplete="off"
          defaultValue={firstName}
          required={true}
        />
        <p className="text-error text-sm h-1.5">
          {formState?.errors.firstName}
        </p>
      </div>

      <div className="flex flex-col mt-4">
        <label htmlFor="lastName" className="label flex">
          Last Name
        </label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          className="input input-lg flex w-full"
          autoComplete="off"
          defaultValue={lastName}
          required={true}
        />
        <p className="text-error text-sm h-1.5">{formState?.errors.lastName}</p>
      </div>

      <div className="flex flex-col mt-4">
        <label htmlFor="role" className="label flex">
          Role
        </label>
        <Select
          options={roleOptions}
          defaultValue={role !== "" ? role : "Select an option"}
          name="role"
          id="role"
          className="input-lg"
        />
        <p className="text-error text-sm h-1.5">{formState?.errors.role}</p>
      </div>

      <div className="flex mt-8 justify-center">
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
