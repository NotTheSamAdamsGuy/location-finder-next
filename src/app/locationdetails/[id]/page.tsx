import LocationContainer from "@/components/features/location/LocationContainer";
import { getLocation } from "@/lib/api/locations";
import { notFound } from "next/navigation";

export default async function LocationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const location = await getLocation(id);

  if (!location) {
    notFound();
  }

  return <LocationContainer location={location} />;
}
