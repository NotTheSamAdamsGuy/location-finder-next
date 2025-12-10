import { LocationFeature } from "@notthesamadamsguy/location-finder-types";
import { twMerge } from "tailwind-merge";
import FeatureCardImage from "./FeatureCardImage";
import Link from "next/link";

type FeatureCardProps = {
  feature: LocationFeature;
  onClick: (evt: React.MouseEvent<HTMLDivElement>) => void;
};

export default function FeatureCard({ feature, onClick }: FeatureCardProps) {
  const handleClick = (evt: React.MouseEvent<HTMLDivElement>) => {
    onClick(evt);
  };

  const { name, address, city, state, postalCode } = feature.properties;

  return (
    <Link href={`/locationdetails/${feature.id}`}>
      <div
        className={twMerge(
          "card bg-base-100 w-full h-60 shadow-sm hover:shadow-md/20 cursor-pointer",
          "sm:flex-1 sm:min-w-[300px]",
          "md:flex-none md:min-w-auto"
        )}
        onClick={handleClick}
        data-id={feature.id}
      >
        <figure className="h-36">
          <FeatureCardImage feature={feature} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>
            {address}, {city}, {state?.abbreviation} {postalCode}
          </p>
        </div>
      </div>
    </Link>
  );
}
