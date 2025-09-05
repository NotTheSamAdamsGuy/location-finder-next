import { forbidden } from "next/navigation";

import AddLocationForm from "@/app/components/AddLocationForm";
import PageHeader from "../../components/PageHeader";
import { verifySession } from "@/app/lib/dal";
import Breadcrumbs from "../../../components/Breadcrumbs";

export default async function AddLocationAdminPage() {
  const session = await verifySession();

  if (session.role !== "ADMIN") {
    forbidden();
  }

  return (
    <div>
      <Breadcrumbs type="admin" />
      <div className="px-3 py-1.5">
        <PageHeader title="Add a Location" />
        <div className="my-3">
          <AddLocationForm />
        </div>
      </div>
    </div>
  );
}
