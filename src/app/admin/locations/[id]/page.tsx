import { forbidden, notFound } from "next/navigation";

import LocationForm from "@/components/features/admin/locations/LocationForm";
import PageHeader from "@/components/features/admin/PageHeader";
import { verifySession } from "@/lib/session";
import { getLocation } from "@/lib/api/locations";
import Breadcrumbs from "@/components/features/admin/Breadcrumbs";
import { getAllTags } from "@/lib/api/tags";

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
  const location = await getLocation(id);

  if (!location) {
    notFound();
  }

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
