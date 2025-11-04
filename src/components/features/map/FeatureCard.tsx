import { Feature } from "geojson";

type FeatureCardProps = {
  feature: Feature;
  onClick: (evt: React.MouseEvent<HTMLDivElement>) => void;
};

export default function FeatureCard({ feature, onClick }: FeatureCardProps) {
  const handleClick = (evt: React.MouseEvent<HTMLDivElement>) => {
    onClick(evt);
  };

  return (
    <div
      className="card bg-base-100 w-full shadow-sm cursor-pointer"
      onClick={handleClick}
      data-id={feature.id}
    >
      <div className="card-body">
        <h2 className="card-title">{feature.properties?.name}</h2>
        <p>{feature.properties?.description}</p>
      </div>
    </div>
  );
}