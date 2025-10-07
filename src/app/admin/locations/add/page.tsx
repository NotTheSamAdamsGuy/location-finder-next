import { forbidden } from "next/navigation";

import LocationForm from "@/app/admin/components/LocationForm";
import PageHeader from "@/app/admin/components/PageHeader";
import { verifySession } from "@/app/lib/session";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { getAllTags } from "@/app/data/tags";

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
