import { forbidden, notFound } from "next/navigation";

import LocationForm from "@/app/admin/locations/components/LocationForm";
import PageHeader from "@/app/admin/components/PageHeader";
import { verifySession } from "@/app/lib/session";
import { getLocation } from "@/app/data/locations";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { getAllTags } from "@/app/data/tags";
import { Location } from "@/app/lib/definitions";

export default async function UpdateLocationAdminPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await verifySession();
  const { id } = await params;
  const allTags = await getAllTags();

  if (session.role !== "ADMIN") {
    forbidden();
  }

  // check if the location exists in the database; return a 404 if it does not
  const {
    name,
    streetAddress,
    city,
    state,
    zip,
    coordinates,
    description,
    images,
    tags,
    displayOnSite,
  } = { ...(await getLocation(id)) };

  if (!name) {
    notFound();
  }

  const location: Location = {
    id: id,
    name: name,
    streetAddress: streetAddress,
    city: city,
    state: state,
    zip: zip,
    coordinates: coordinates,
    description: description,
    images: images,
    tags: tags,
    displayOnSite: displayOnSite,
  };

  return (
    <div>
      <Breadcrumbs type="admin" />
      <div className="px-3 py-1.5">
        <PageHeader title="Edit Location" />
        <div className="my-3">
          <LocationForm location={location} tags={allTags} type="update" />
        </div>
      </div>
    </div>
  );
}
