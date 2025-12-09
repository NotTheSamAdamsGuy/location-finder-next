"use client";

import { useActionState } from "react";
import { LocationFeature } from "@notthesamadamsguy/location-finder-types";

import { addLocation, updateLocation } from "@/formActions/admin/locations";
import { US_STATES } from "@/lib/constants";
import FileUploader, {
  FileUploaderItem,
} from "@/components/features/admin/FileUploader";
import Multiselect from "@/components/ui/Multiselect";
import Select from "@/components/ui/Select";

type LocationFormProps = {
  tags?: string[];
  location?: LocationFeature;
  type: string;
};

export default function LocationForm({
  tags,
  location,
  type,
}: LocationFormProps) {
  const formAction = type === "update" ? updateLocation : addLocation;
  const [formState, action, pending] = useActionState(formAction, undefined);

  const tagOptions =
    tags?.map((tag) => {
      return { optionText: tag, value: tag };
    }) || [];

  const stateOptions = US_STATES.map((state) => {
    return { key: state.abbreviation, value: state.abbreviation };
  });

  // prioritize formState values over values passed in as location props; fallback to blank/empty/false values.
  const id = formState?.fields.id?.toString() || location?.id || "";
  const name =
    formState?.fields.name?.toString() || location?.properties.name || "";
  const description =
    formState?.fields.description?.toString() ||
    location?.properties.description ||
    "";
  const city =
    formState?.fields.city?.toString() || location?.properties.city || "";
  const stateAbbreviation =
    formState?.fields.stateAbbreviation?.toString() ||
    location?.properties.state?.abbreviation ||
    "";
  const postalCode =
    formState?.fields.postalCode?.toString() ||
    location?.properties.postalCode ||
    "";
  const address =
    formState?.fields.address?.toString() || location?.properties.address || "";
  // Uncomment once we have a country code input that isn't hidden
  // const countryCode =
  //   formState?.fields.countryCode?.toString() ||
  //   location?.properties.country.countryCode ||
  //   "";
  const selectedTags =
    formState?.fields.tags.map((tag) => tag.toString()) || location?.properties.tags || [];

  const displayOnSite =
    formState?.fields.displayOnSite === "on"
      ? true
      : false || location?.properties.displayOnSite || false;

  let fileUploaderItems: FileUploaderItem[] = [];

  if (location) {
    const images = location?.properties.images || [];
    fileUploaderItems = images.map((image) => {
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
        <textarea
          id="description"
          name="description"
          className="textarea h-24 input-lg flex w-full"
          autoComplete="off"
          defaultValue={description}
        />
        <p className="text-error text-sm h-1.5">
          {formState?.errors.description}
        </p>
      </div>

      <div className="flex flex-col mt-4">
        <label htmlFor="address" className="label flex">
          Address
        </label>
        <input
          id="address"
          name="address"
          type="text"
          className="input input-lg flex w-full"
          autoComplete="off"
          defaultValue={address}
          required={true}
        />
        <p className="text-error text-sm h-1.5">
          {formState?.errors.address}
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
        <label htmlFor="stateAbbreviation" className="label flex">
          State
        </label>
        <Select
          options={stateOptions}
          defaultValue={stateAbbreviation !== "" ? stateAbbreviation : "Select an option"}
          name="stateAbbreviation"
          id="stateAbbreviation"
        />
        <p className="text-error text-sm h-1.5">{formState?.errors.stateAbbreviation}</p>
      </div>

      <div className="flex flex-col mt-4">
        <label htmlFor="zip" className="label flex">
          ZIP Code
        </label>
        <input
          id="postalCode"
          name="postalCode"
          type="text"
          className="input input-lg flex w-full"
          autoComplete="off"
          defaultValue={postalCode}
          required={true}
        />
        <p className="text-error text-sm h-1.5">{formState?.errors.postalCode}</p>
      </div>

      <input type="hidden" id="countryCode" name="countryCode" value="US" />

      <div className="flex flex-col mt-4">
        <label className="label flex">Images</label>
        <div>
          <FileUploader
            inputName="images"
            items={fileUploaderItems}
            multiple={true}
            buttonLabel="Click here to add images"
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
