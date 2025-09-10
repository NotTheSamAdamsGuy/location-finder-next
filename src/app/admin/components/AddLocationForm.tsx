"use client";

import { useActionState, useState } from "react";

import { addLocation } from "@/app/actions/locations";
import { USStates, FileCard } from "@/app/lib/definitions";
import Select from "@/app/components/form/Select";
import DragDrop from "@/app/components/DragDrop";
import FileList from "@/app/admin/components/FileList";
import Multiselect from "@/app/components/form/Multiselect";

export default function AddLocationForm() {
  const [state, action, pending] = useActionState(addLocation, undefined);
  const [fileCards, setFileCards] = useState<FileCard[]>([]);
  const tags = ["tag1","tag2","tag3"].map((tag) => {return {optionText: tag, value: tag}});

  const handleFilesSelected = (files: File | File[]) => {
    const fileCardsCopy = [...fileCards];
    
    // Files are in a FileList object. Since we don't know how many there are,
    // we need to iterate over the object's entries, which are in Record<number, File>
    // format.
    Object.entries(files).forEach((entry) => {
      const fileCard: FileCard = {
        file: entry[1],
        description: ""
      };

      fileCardsCopy.push(fileCard);
    });

    setFileCards(fileCardsCopy);
  }

  const stateOptions = USStates.map((state) => {
    return { key: state.abbreviation, value: state.name };
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
        />
        <p className="text-error text-sm h-1.5">{state?.errors.name}</p>
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
        />
        <p className="text-error text-sm h-1.5">{state?.errors.description}</p>
      </div>

      <div className="flex flex-col mt-4">
        <label htmlFor="street-address" className="label flex">
          Street Address
        </label>
        <input
          id="street-address"
          name="street-address"
          type="text"
          className="input input-lg flex w-full"
          autoComplete="off"
        />
        <p className="text-error text-sm h-1.5">{state?.errors.streetAddress}</p>
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
        />
        <p className="text-error text-sm h-1.5">{state?.errors.city}</p>
      </div>

      <div className="flex flex-col mt-4">
        <label htmlFor="state" className="label flex">
          State
        </label>
        <Select
          options={stateOptions}
          defaultValue="Pick a state"
          name="state"
          id="state"
        />
        <p className="text-error text-sm h-1.5">{state?.errors.state}</p>
      </div>

      <div className="flex flex-col mt-4">
        <label htmlFor="zip" className="label flex">
          ZIP Code
        </label>
        <input
          id="zip"
          name="zip"
          type="text"
          className="input input-lg flex w-full"
          autoComplete="off"
        />
        <p className="text-error text-sm h-1.5">{state?.errors.zip}</p>
      </div>

      <div className="flex flex-col mt-4">
        <label className="label flex">Images</label>
        <div>
          <DragDrop fileCards={fileCards} onFilesSelected={handleFilesSelected} />
          <FileList fileCards={fileCards} />  
        </div>
      </div>

      <div className="flex flex-col mt-4">
        <label className="label flex">Tags</label>
        <Multiselect options={tags} formFieldValue="tag" onChange={() => {}} />
      </div>
      <div className="flex mt-12 justify-center">
        <button className="btn btn-primary w-full" type="submit" disabled={pending}>
          Submit
        </button>
      </div>
    </form>
  );
}
