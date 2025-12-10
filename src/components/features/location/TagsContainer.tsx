import { LocationFeature } from "@notthesamadamsguy/location-finder-types";
import { twMerge } from "tailwind-merge";

interface Props {
  location: LocationFeature;
  className?: string;
}
export default function TagsContainer({location, className = ""}: Props) {
  const tagElements = location.properties.tags?.map((tag) => {
    return (
      <div key={tag} className="flex mr-2 mb-2 rounded bg-neutral-content dark:bg-neutral-600 text-base-content px-2 py-1">{tag}</div>
    );
  })
  return (
    <div className={twMerge("flex flex-wrap w-full uppercase text-xs font-bold", className)}>
      {tagElements}
    </div>
  );
}