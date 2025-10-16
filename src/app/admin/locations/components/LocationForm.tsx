"use client";

import { useActionState } from "react";

import { addLocation, updateLocation} from "@/app/admin/locations/formActions";
import { USStates } from "@/app/lib/definitions";
import Select from "@/app/components/form/Select";
import Multiselect from "@/app/components/form/Multiselect";
import FileUploader, { FileUploaderItem } from "@/app/admin/components/FileUploader";
import { Location } from "@/app/lib/definitions";

type LocationFormProps = {
  tags?: string[];
  location?: Location;
  type: string;
};

export default function LocationForm({ tags, location, type }: LocationFormProps) {
  const formAction = type === "update" ? updateLocation : addLocation;
  const [formState, action, pending] = useActionState(formAction, undefined);

  const tagOptions =
    tags?.map((tag) => {
      return { optionText: tag, value: tag };
    }) || [];

  const stateOptions = USStates.map((state) => {
    return { key: state.abbreviation, value: state.abbreviation };
  });

  // prioritize formState values over values passed in as location props; fallback to blank/empty/false values.
  const id = formState?.fields.id?.toString() || location?.id || "";
  const name = formState?.fields.name?.toString() || location?.name || "";
  const description =
    formState?.fields.description?.toString() || location?.description || "";
  const city = formState?.fields.city?.toString() || location?.city || "";
  const state = formState?.fields.state?.toString() || location?.state || "";
  const zip = formState?.fields.zip?.toString() || location?.zip || "";
  const streetAddress =
    formState?.fields.streetAddress?.toString() ||
    location?.streetAddress ||
    "";
  const selectedTags =
    formState?.fields.tags.map((tag) => tag.toString()) || location?.tags || [];
    
  const displayOnSite =
    formState?.fields.displayOnSite === "on"
      ? true
      : false || location?.displayOnSite || false;

  let fileUploaderItems: FileUploaderItem[] = [];

  if (location) {
    fileUploaderItems = location?.images.map((image) => {
      return {
        fileName: image.filename,
        displayName: image.originalFilename,
        description: image.description || "",
      };
    });
  }

  return (
    <form action={action} className="flex flex-col w-full">
      <input type="hidden" name="id" defaultValue={id} />
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
          defaultValue={state !== "" ? state : "Select an option"}
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
          <FileUploader
            inputName="images"
            items={fileUploaderItems}
            multiple={true}
            buttonLabel = "Click here to add images"
          />
        </div>
      </div>

      <div className="flex flex-col mt-4">
        <label className="label flex">Tags</label>
        <Multiselect
          options={tagOptions}
          selectedValues={selectedTags}
          formFieldValue="tag"
        />
      </div>

      <label className="label mt-8">
        <input
          type="checkbox"
          defaultChecked={displayOnSite}
          className="toggle checked:bg-secondary checked:text-white checked:border-black"
          id="displayOnSite"
          name="displayOnSite"
        />
        Display on site
      </label>
      <p className="text-error text-sm h-1.5">
        {formState?.errors.displayOnSite}
      </p>

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
