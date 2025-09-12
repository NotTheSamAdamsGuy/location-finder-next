"use client";

import { useActionState, useState } from "react";

import { addLocation } from "@/app/actions/locations";
import { USStates, FileCard } from "@/app/lib/definitions";
import Select from "@/app/components/form/Select";
import DragDrop from "@/app/components/DragDrop";
import FileList from "@/app/admin/components/FileList";
import Multiselect from "@/app/components/form/Multiselect";

type Props = {
  tags?: string[];
};

export default function AddLocationForm({ tags }: Props) {
  const [formState, action, pending] = useActionState(addLocation, undefined);
  const [fileCards, setFileCards] = useState<FileCard[]>([]);
  const tagValues =
    tags?.map((tag) => {
      return { optionText: tag, value: tag };
    }) || [];

  const name = formState?.fields.name?.toString() || "";
  const description = formState?.fields.description?.toString() || "";
  const city = formState?.fields.city?.toString() || "";
  const state = formState?.fields.state?.toString() || "";
  const zip = formState?.fields.zip?.toString() || "";
  const streetAddress = formState?.fields.streetAddress?.toString() || "";
  const selectedTagValues = formState?.fields.tags.map((tag) => tag.toString());

  const handleFilesSelected = (files: File | File[]) => {
    const fileCardsCopy = [...fileCards];

    // Files are in a FileList object. Since we don't know how many there are,
    // we need to iterate over the object's entries, which are in Record<number, File>
    // format.
    Object.entries(files).forEach((entry) => {
      const fileCard: FileCard = {
        file: entry[1],
        description: "",
      };

      fileCardsCopy.push(fileCard);
    });

    setFileCards(fileCardsCopy);
  };

  const stateOptions = USStates.map((state) => {
    return { key: state.abbreviation, value: state.abbreviation };
  });

  return (
    <form action={action} className="flex flex-col w-full">
      <div className="flex flex-col">
        <label className="label flex" htmlFor="name">
          Location name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="input input-lg flex w-full"
          autoComplete="off"
          defaultValue={name}
          required={true}
        />
        <p className="text-error text-sm h-1.5">{formState?.errors.name}</p>
      </div>

      <div className="flex flex-col mt-4">
        <label htmlFor="description" className="label flex">
          Description
        </label>
        <input
          id="description"
          name="description"
          type="text"
          className="input input-lg flex w-full"
          autoComplete="off"
          defaultValue={description}
        />
        <p className="text-error text-sm h-1.5">
          {formState?.errors.description}
        </p>
      </div>

      <div className="flex flex-col mt-4">
        <label htmlFor="streetAddress" className="label flex">
          Street Address
        </label>
        <input
          id="streetAddress"
          name="streetAddress"
          type="text"
          className="input input-lg flex w-full"
          autoComplete="off"
          defaultValue={streetAddress}
          required={true}
        />
        <p className="text-error text-sm h-1.5">
          {formState?.errors.streetAddress}
        </p>
      </div>

      <div className="flex flex-col mt-4">
        <label htmlFor="city" className="label flex">
          City
        </label>
        <input
          id="city"
          name="city"
          type="text"
          className="input input-lg flex w-full"
          autoComplete="off"
          defaultValue={city}
          required={true}
        />
        <p className="text-error text-sm h-1.5">{formState?.errors.city}</p>
      </div>

      <div className="flex flex-col mt-4">
        <label htmlFor="state" className="label flex">
          State
        </label>
        <Select
          options={stateOptions}
          defaultValue={state !== "" ? state : "Pick a state"}
          name="state"
          id="state"
        />
        <p className="text-error text-sm h-1.5">{formState?.errors.state}</p>
      </div>

      <div className="flex flex-col mt-4">
        <label htmlFor="zip" className="label flex">
          ZIP Code
        </label>
        <input
          id="zip"
          name="zip"
          type="number"
          className="input input-lg flex w-full"
          autoComplete="off"
          defaultValue={zip}
          required={true}
        />
        <p className="text-error text-sm h-1.5">{formState?.errors.zip}</p>
      </div>

      <div className="flex flex-col mt-4">
        <label className="label flex">Images</label>
        <div>
          <DragDrop
            fileCards={fileCards}
            onFilesSelected={handleFilesSelected}
          />
          <FileList fileCards={fileCards} />
        </div>
      </div>

      <div className="flex flex-col mt-4">
        <label className="label flex">Tags</label>
        <Multiselect
          options={tagValues}
          selectedValues={selectedTagValues}
          formFieldValue="tag"
          onChange={() => {}}
        />
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
