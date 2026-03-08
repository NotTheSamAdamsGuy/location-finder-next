import { forbidden } from "next/navigation";

import Breadcrumbs from "@/components/features/admin/Breadcrumbs";
import LocationForm from "@/components/features/admin/locations/LocationForm";
import PageHeader from "@/components/features/admin/PageHeader";
import { getAllTags } from "@/lib/api/tags";
import { verifySession } from "@/lib/session";

export default async function AddLocationAdminPage() {
  const session = await verifySession();
  const tags = await getAllTags();

  if (session.role !== "ADMIN") {
    forbidden();
  }

  return (
    <div>
      <Breadcrumbs type="admin" />
      <div className="px-3 py-1.5">
        <PageHeader title="Add a Location" />
        <div className="my-3">
          <LocationForm tags={tags} type="add" />
        </div>
      </div>
    </div>
  );
}
