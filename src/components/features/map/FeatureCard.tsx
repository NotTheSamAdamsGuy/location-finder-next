import { LocationFeature } from "@notthesamadamsguy/location-finder-types";
import { twMerge } from "tailwind-merge";

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
    <div
      className={twMerge(
        "card bg-base-100 w-full h-60 shadow-sm hover:shadow-md cursor-pointer mb-2",
        "sm:flex-1 sm:min-w-[300px]",
        "md:flex-none md:min-w-auto"
      )}
      onClick={handleClick}
      data-id={feature.id}
    >
      <figure className="h-36">
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt={name}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>
          {address}, {city}, {state.abbreviation} {postalCode}
        </p>
      </div>
    </div>
  );
}
